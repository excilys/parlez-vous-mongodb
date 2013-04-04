// 1 - Créer 2 nouvelles collections :
db.createCollection("user_history")
db.createCollection("media_history", {capped:true,size:100000})

// 2 - Sauvegarder quelques enregistrement dans les tables :
db.user_history.save({user:“John”, connection:new Date()})
db.user_history.save({user:“Jack”, connection:new Date()})
db.user_history.save({user:“Rambo”, connection:new Date()})
db.media_history.save({media:”Toy story”, user:”Jack”, date:new Date()})
db.media_history.save({media:”Matrix”, user:”Jack”, date:new Date()})
db.media_history.save({media:”Rhhhh”, user:”Rambo”, date:new Date()})

// 3 - Créer des curseurs pour parcourir les collections : 
var userIt = db.user_history.find()
var mediaIt = db.media_history.find().addOption(2)

// 4 - Parcourir les collections en utilsant la fonction next()du curseur
userIt.next() userIt.next() userIt.next() error hasNext: false
mediaIt.next() mediaIt.next() mediaIt.next() error hasNext: false

// 5 - Sauvegarder de nouveaux des enregistrement dans les tables
db.user_history.save({user:“Dimitri”, connection:new Date()})
db.user_history.save({user:“Armand”, connection:new Date()})
db.media_history.save({media:”Matrix 2”, user:”Dimitri”, date:new Date()})
db.media_history.save({media:”Scarface”, user:”Armand”, date:new Date()})

// 6 - Parcourir une nouvelle fois les collections avec vos curseurs précédemment créé.
mediaIt.next(); mediaIt.next() // error hasNext: false
userIt.next() // error hasNext: false
db.runCommand({“convertToCapped” : “user_history”, size: 100000})
