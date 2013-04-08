// 1 - Importer une dizaines fichiers présents sur votre disque dur dans une nouvelle base de données nommée mediafiles
mongofiles -d mediafiles put myFirstFile.mp3 
mongofiles -d mediafiles put mySecondFile.mp3
...

// 2 - Lister les fichiers précedement importés en utilisant mongofiles
mongofiles -d mediafiles list

// 3 - Rechercher les 3 derniers fichiers insérés
db.fs.files.find().sort({uploadDate:-1}).limit(3)

// 4 - Supprimer les fichiers et les metadatas des 4 fichiers les plus volumineux
db.fs.files.find().sort({length:-1}).limit(4).forEach(
    function(doc) {
        db.fs.chunks.remove(doc);
        db.fs.files.remove(doc);
    }
);

//5 - Lister les fichiers de la base de données mediafiles
mongofiles -d mediafiles list
