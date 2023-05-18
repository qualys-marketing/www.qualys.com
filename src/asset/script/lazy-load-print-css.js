(function() {
	var s = document.getElementsByTagName("head")[0]
		, l = document.createElement("link");
	l.rel = "stylesheet";
	l.type = "text/css";
	l.href = "/asset/stylesheet/main.print.css";
	l.media = "print";
	s.appendChild(l);
})();
