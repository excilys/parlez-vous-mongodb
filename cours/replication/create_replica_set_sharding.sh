#!/bin/bash

REPL_DIR=/data/mongodb/formation/replication
LOG_DIR=~/Desktop/logs
GENERAL_LOGS=$LOG_DIR/general.log
PORT_OFFSET=27006

# Kills all existing mongod processus
killall mongod
killall mongos

# Deletes previous logs
[[ -d $LOG_DIR ]] && rm -r $LOG_DIR
mkdir $LOG_DIR

for shard in $(seq 2); do
	SHARD_DIR="$REPL_DIR/shard$shard"
	REPL_SET="rs$shard"
	SHARD_PORT=$((PORT_OFFSET + shard*10))

	if [ -d $SHARD_DIR ]; then
		echo "Removing directory of shard $shard"
		rm -r $SHARD_DIR
	fi
	
	for node in $(seq 3); do
		NODE_DIR="$SHARD_DIR/node$node"
		PORT=$((SHARD_PORT + node))
		mkdir -p $NODE_DIR
		echo "Starting node $node of shard $shard"
		mongod --fork --replSet $REPL_SET --logpath "$LOG_DIR/$shard.$node.log" --dbpath $NODE_DIR --port $PORT >> $GENERAL_LOGS
	done

done

echo "Initialize the first shard."
mongo --port 27017 >> $GENERAL_LOGS << 'EOF'
	cfg = {
		'_id' : 'rs1',
		'members' : [
			{'_id' : 0, 'host' : 'localhost:27017', 'tags' : {'use' : 'reporting'}},
			{'_id' : 1, 'host' : 'localhost:27018', 'tags' : {'use' : 'production'}},
			{'_id' : 2, 'host' : 'localhost:27019', 'tags' : {'use' : 'production'}}
		],
		'settings' : {'getLastErrorDefaults' : { 'w' : 'majority'}}
	};
	rs.initiate(cfg);
EOF

echo "Initialize the second shard"
mongo --port 27027 >> $GENERAL_LOGS << 'EOF'
        cfg = {
                '_id' : 'rs2',
                'members' : [
                        {'_id' : 0, 'host' : 'localhost:27027', 'tags' : {'use' : 'reporting'}},
                        {'_id' : 1, 'host' : 'localhost:27028', 'tags' : {'use' : 'production', 'tested': 'yes'}},
                        {'_id' : 2, 'host' : 'localhost:27029', 'tags' : {'use' : 'production'}}
                ],
                'settings' : {
			'getLastErrorModes' : {'tested' : {'tested' : 1}}, 
			'getLastErrorDefaults' : { 'tested' : 1}
		}
        };
        rs.initiate(cfg);
EOF


# Serveur de configuration
[[ -d $REPL_DIR/config ]] && rm -r $REPL_DIR/config
mkdir $REPL_DIR/config
echo "Start a config server for the shard environment."
mongod --port 27020 --fork --logpath $LOG_DIR/config.log --dbpath $REPL_DIR/config --configsvr >> $GENERAL_LOGS

# Routeur
echo "Start a mongos process for the shard environnement (port 27021)"
mongos --port 27021 --configdb "localhost:27020" --fork --logpath $LOG_DIR/mongos.log --chunkSize 1 >> $GENERAL_LOGS

echo "Sleep for 40 secondes (for each replica set to have a primary node)."
sleep 40

# Initialization of shards
echo "Initialize the shard environment"
mongo --port 27021 >> $GENERAL_LOGS << 'EOF'
	sh.addShard('rs1/localhost:27017');
	sh.addShard('rs2/localhost:27027');
	sh.enableSharding('foo');
	use foo;
	db.foo.ensureIndex({'date' : 1});
	sh.shardCollection('foo.bar', {'date' : 1});
EOF

echo "The shard environment is now set up"
