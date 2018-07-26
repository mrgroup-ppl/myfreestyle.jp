var ssTrcVar = ssTrcEvt = {};
var ssTrcLnk = function (g, n, b) {
	if (typeof g === "undefined" || typeof n === "undefined") {
		return
	}
	var i = "sameer";
	var m = false;
	var c = [],
	o = n.nameProp,
	l = n.events,
	k = n.variables;
	if (n.trckTags != "" || typeof n.trckTags === "undefined") {
		m = n.trckTags
	}
	reportSuite = b || s_account,
	s = s_gi(reportSuite);
	var a = "";
	if (n.eventName === "" || typeof n.eventName === "undefined") {
		if (g.id !== "") {
			a = g.id
		} else {
			a = n.eventName
		}
	}
	if (g.className !== "") {
		var e = /(?:^|\s)sstl-(.*?)(?:\s|$)/g.exec(g.className);
		var f = "";
		if (e !== null) {
			f = e[1];
			f.replace(/^sstl-/i, "")
		}
		if ((a === "" || typeof a === "undefined") && f != "null") {
			a = f
		}
		if (f == "null") {
			a = ""
		}
	}
	if (typeof a !== "undefined" && a !== "") {
		a = a.replace(/^sstl-/i, "");
	}
	s.linkTrackEvents = "None";
	s.linkTrackVars = "None";
	if (l && typeof l === "string") {
		c.push("events");
		s.linkTrackVars = c.join(",");
		s.linkTrackEvents = l;
		s.events = l
	}
	if (k && typeof k === "object") {
		for (var j in k) {
			if (k.hasOwnProperty(j)) {
				c.push(j);
				s.linkTrackVars = c.join(",");
				s[j] = k[j]
			}
		}
	}
	if (a && (a !== "null" || a !== "")) {
		if (o && typeof o === "string") {
			s[o] = a
		}
		s.tl(g, "o", a);
		console.log("link-click:" + a);
		ga("send","event","link","click",a,{page:k})
	} else {
		if (m == true) {
			if (g.tagName) {
				if (g.tagName.toLowerCase() === "a") {
					var d = g.href && !(g.href.lastIndexOf("#") >= 0 || g.href.indexOf("javascript") >= 0) ? g.href.split("?")[0].split("#")[0] : "";
					if ((g.title !== null && g.title !== "") && d === "") {
						d = g.title
					}
					if (d !== "") {
						s.tl(g, "o", d)
					}
					console.log("link-click-nav:" + d);
				}
			}
		}
	}
};