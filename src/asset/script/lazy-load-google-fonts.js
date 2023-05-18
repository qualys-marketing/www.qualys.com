/*
 * lazy load Open Sans font from Google Font
 */
(function lazyLoadFonts () {

	"use strict";

	var l, s;

	l = document.createElement("link");
	l.rel = "stylesheet";
	l.href = "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700";
	s = document.getElementsByTagName("link")[0];
	s.parentNode.insertBefore(l, s);

}());
