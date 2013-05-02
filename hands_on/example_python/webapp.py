#coding=UTF-8
import bottle
import pymongo

connection_string = "mongodb://localhost"

@bottle.route('/')
def home_page():
	current_user = {'firstname' : 'Dupond', 'lastname' : 'Dupont'}
	return bottle.template('home', dict(user=current_user))

@bottle.post('/display-media/')
def displayMedia () : 
	print "Find and display a media"
	connection = pymongo.Connection(connection_string, safe=True)
	db = connection.indexation
	collection = db.media

	title = bottle.request.forms.get('title')
	media = collection.find_one ({'title' : title})

	return bottle.template('display_media', dict(media=media))

bottle.debug(True)
bottle.run(host='localhost', port=8080)
