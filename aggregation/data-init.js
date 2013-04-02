function generateDate(index) {
	"use strict";
	
	var someDate, someDay, someHour, someMinute, someSeconde;
	someDay = (index % 7) + 1;
	someHour = Math.floor(Math.random() * 24);
	someMinute = Math.floor(Math.random() * 60);
	someSeconde = Math.floor(Math.random() * 60);
	
	someDate = new Date(2012, 9, someDay, someHour, someMinute, someSeconde, 0);
	return someDate;
}

function getMediaType(index) {
	"use strict";
	
	var mediaType = "BOOK";
	if (index % 5 === 0) {
		mediaType = "DVD";
	} else if (index % 6 === 0) {
		mediaType = "CD";
	}
	
	return mediaType;
}

function generateTags(index) {
    var tags = [];
    
    var mediaId = index % 10;
    
	if (mediaId % 2 === 0) {
		tags.push("Comedy");
	}
	if (mediaId % 3 === 0) {
		tags.push("History");
	}
	if (mediaId % 5 === 0) {
		tags.push("Music");
	}
    
    return tags;
}

function getMediaTitle(index) {
	"use strict";
	
	return "Titre du media n° " + (index % 10);	
}

function newUser (index) {
	"use strict";
	
	var user = {}, nb;
	nb = Math.floor(Math.random() * 100);
	user.firstname = "Prénom de l'utilisateur n° " + nb;
	user.lastname = "Nom de l'utilisateur n° " + nb;
	
	return user;
}

function newMedia (index) {
	"use strict";
	
	var media = {};
	media.title = getMediaTitle(index);
	media.type = getMediaType(index);
    media.tags = generateTags(index);
	
	return media;
}

function newVisit (index) {
	"use strict";
	
	var visit = {};
	visit.date = generateDate(index);
	visit.media = newMedia(index);
	visit.user = newUser(index);
	
	return visit;
}

function init () {
	"use strict";
	
	db.visit.drop();
	
	var index;
	for (index = 0; index < 1000; index = index + 1) {
		db.visit.insert(newVisit(index));
	}
}

init();
