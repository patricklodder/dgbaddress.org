var unobtrusive = {
	bindToClass: function (cls, eName, fn) {
		var elems = document.getElementsByClassName(cls);
		this.bindMany(elems, eName, fn);
	},
	bindToId: function (id, eName, fn) {
		var elem = document.getElementById(id);
		if (elem) elem['on' + eName] = this.makeListener(elem, fn);
	},
	bindToTag: function (tag, eName, fn) {
		var elems = document.getElementsByTagName(tag);
		this.bindMany(elems, eName, fn);
	},
	bindMany: function (elems, eName, fn) {
		for(var z = 0; z < elems.length; z++){
			var elem = elems[z];
			elem['on' + eName] = this.makeListener(elem, fn);
		}
	},
	makeListener: function (ctx, fn) {
		return function () {
			return fn.apply(ctx, arguments);
		};
	}
};
