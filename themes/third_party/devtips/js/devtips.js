dt = {
	notifications : [],
	warnings      : [],
	errors        : []
};

dt.checkH1Tag = function() {
	var h1 = document.getElementsByTagName('h1');
	if (h1.length === 0) {
		dt.warnings.push("<h1> tag is missing.");
	} else if (h1.length > 1) {
		dt.errors.push("There should be one and only one <h1> tag per page!");
	} else {
		if (document.title === h1[0].innerHTML && document.title !== undefined) {
			dt.warnings.push("The page's <title> and <h1> should not be the same!");
		}
	}
}

dt.checkTitleTag = function() {
	var title = document.getElementsByTagName('title');
	if (title.length === 0) {
		dt.errors.push("The page does not have a <title> tag specified!");
	} else if (document.title === undefined) {
		dt.warnings.push("The page's <title> tag is empty.");
	}
}

dt.checkFavicon = function() {
	var favicon = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="icon shortcut"]');
	if (favicon.length === 0) {
		dt.notifications.push("Remember to add a page favicon.");
	}
}

dt.checkMetaTags = function() {
	// dt.notifications.push("The 'keywords' meta tag is not needed.");
	// return false;
}

dt.checkInlineStyling = function() {
	var all = document.getElementsByTagName('*');
	for (i = 0; i < all.length; i++) {
		if (all[i].getAttribute('style') !== null) {
			dt.warnings.push("Inline styling detected!" + " - '" + all[i].getAttribute('style') + "'");
		}
	}
}

dt.checkImgAltAttr = function() {
	var images = document.getElementsByTagName('img');
	var images_alt = document.querySelectorAll('img[alt]');
	if (images_alt.length !== images.length) {
		dt.notifications.push("Images without the 'alt' attribute detected.");
	}

	if (images_alt.length > 0) {
		var alt_tags = [];
		for (i = 0; i < images_alt.length; i++) {
			alt_tags.push(images_alt[i].getAttribute('alt'));
		}

		var duplicates = [];
		for(var i = 0; i < alt_tags.length; i++) {
	        if((alt_tags.lastIndexOf(alt_tags[i]) != i) && (duplicates.indexOf(alt_tags[i]) == -1)) {
	            duplicates += alt_tags[i];
	        }
	    }

	    if (duplicates.length > 0) {
	    	dt.warnings.push("Image 'alt' tags should be unique across the page, the following duplicates exist:", duplicates);
	    }
	}
}

dt.checkMissingClosingTags = function() {
	// TODO
	// var all = document.getElementsByTagName("*");

	// var elements = [];

	// for (var i=0, max=all.length; i < max; i++) {
	// 	elements.push(all[i].name);
	// }
	// console.log(all[0]);
}

dt.analyze = function() {

	dt.checkH1Tag();
	dt.checkTitleTag();
	dt.checkFavicon();
	dt.checkMetaTags();
	dt.checkInlineStyling();
	dt.checkImgAltAttr();
	dt.checkMissingClosingTags();

	// Console log all messages
	if (dt.errors.length > 0) {
		for (var i = 0; i < dt.errors.length; i++){
			console.error("DevTips:", dt.errors[i]);
		}
	}

	if (dt.warnings.length > 0) {
		for (var i = 0; i < dt.warnings.length; i++){
			console.warn("DevTips:", dt.warnings[i]);
		}
	}

	if (dt.notifications.length > 0) {
		for (var i = 0; i < dt.notifications.length; i++){
			console.info("DevTips:", dt.notifications[i]);
		}
	}
}

window.onload = function(){
	dt.analyze();
};