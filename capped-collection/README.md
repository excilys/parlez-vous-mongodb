# Capped Collection

# Sujet
Durant ce TP nous allons mettre en place la fonctionnalité d’historique de consultation des medias et des derniers utilisateurs connectés. Pour cela, nous allons utiliser les capped collections. La mise en place de Tailable cursor va nous permettre de suivre facilement l’évolution de ces historiques.

# Objectifs
* Création de capped collections
* Création de tailable cursors
* Utilisation des tailable cursors

# Déroulement
1. Créer 2 nouvelles collections : 
* une collection “normale” : user_history
* une capped collection : media_history
2. Sauvegarder quelques enregistrement dans les tables. Par examples : 
* user_history : ```{user:“John”, connection:new Date()}```
* media_history : ```{media:”Matrix”, user:”Jack”, date:new Date()}```
3. Créer des curseurs pour parcourir les collections (utiliser addOption(2) pour la création d’un tailable cursor)
4. Parcourir les collections en utilsant la fonction next() du curseur
5. Sauvegarder de nouveaux des enregistrement dans les tables
6. Parcourir une nouvelle fois les collections avec vos curseurs précédemment créé. Le curseur sur la collection user_history fonctionne t-il encore? Corriger cela!
