# Aggregation

Durant ce TP nous allons effectuer des opérations d'aggrégation de données en utlisant les différents différents outils proposés par MongoDB :
* Commandes "basiques" : count(), distinct() et group()
* Map/Reduce
* Aggregation framework

Nous effectuerons ces opérations sur une base de données recensant des visites de medias. Ces visites sont structurées dans des documents de la forme : 

 ```javascript
{
  "_id" : ObjectId("515b52db75a2e8048937cc03"),
  "date" : ISODate("2012-09-30T23:59:49Z"),
	"media" : {
		"title" : "I Can Dance",
		"type" : "DVD",
		"tags" : [
			"Comedy",
			"Music"
		]
	},
	"user" : {
		"firstname" : "Jean",
		"lastname" : "Martin"
	}
}
 ```

## Déroulement

1. Importer les données en utilisant le script data-init.js
2. Calculer le nombre d'emprunts de livres le 06 octobre 2012
3. Trouver les titres des livres empruntés le 06 octobre 2012 (éviter les doublons!)
4. Utiliser la commande group pour déterminer le nombre de visites de DVD pour chaque utilisateur.
5. Utiliser une commande map/reduce pour calculer le nombre de visites par type de media.  Le résultat sera sauvegardé dans une collection nommmée media_stats. 
6. Utiliser une commande aggregate pour calculer le nombre de visites par type de media
7. Utiliser une commande aggregate pour calculer le nombre de visites par tags
