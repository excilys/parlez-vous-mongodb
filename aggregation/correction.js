// 1 - Importer les données en utilisant le script data-init.js
mongo localhost:27017/test data-init.js

// 2 - Calculer le nombre d'emprunts de livres le 06 octobre 2012
var startDate, endDate;
startDate = ISODate("2012-10-06");
endDate = ISODate("2012-10-07");
db.visit.count({"media.type" : "BOOK", "date" : { $gte : startDate, $lt : endDate }});

// 3 - Trouver les titres des livres empruntés le 06 octobre 2012 (éviter les doublons!)
var startDate, endDate;
startDate = ISODate("2012-10-06");
endDate = ISODate("2012-10-07");
db.visit.distinct("media.title", { "media.type" : "BOOK", "date" : { $gte : startDate, $lt : endDate }});

// 4 - Utiliser la commande group pour déterminer le nombre de visites de DVD pour chaque utilisateur
var reduceFunction = function (obj, prev) {
	if (obj.media.type === "BOOK") {
		prev.count = prev.count + 1;	
	}
}; 
db.visit.group( { 
	key : {"user" : true },
	reduce: reduceFunction,
	initial: { count: 0 }
});

// 5 - Utiliser une commande map/reduce pour calculer le nombre de visites par type de media. Le résultat sera sauvegardé dans une collection nommmée media_stats.
var mapFunction, reduceFunction; 
mapFunction = function () {
	emit(this.media.type, 1);	
};

reduceFunction = function(key, values) {
	return values.length;
};

db.visit.mapReduce(mapFunction, reduceFunction, {out : {replace : 'media_stats'}});

// 6 - Utiliser une commande aggregate pour calculer le nombre de visites par type de media
db.visit.aggregate(
	{"$project" : {
			"_id" : 0,
			"type" : "$media.type"
		}
	},
	{
		"$group" : {
			"_id" : "$type",
			"count" : {
				"$sum" : 1
			}
		}
	}
)

// 7 - Utiliser une commande aggregate pour calculer le nombre de visites par tags
db.visit.aggregate(
	{$project : {
			"_id" : 0,
			"tags" : "$media.tags"
		}
	},{
		$unwind : "$tags"
	},{
		$group : {
			"_id" : "$tags",
			"count" : {
				"$sum" : 1
			}
		}
	}
)


