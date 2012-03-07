var empty = {};
var mixin = function(target, source) {
	var name, s, i;
	for(name in source) {
		s = source[name];
		if(!( name in target) || (target[name] !== s && (!( name in empty) || empty[name] !== s))) {
			target[name] = s;
		}
	}
	return target;
};

var screenHeight = Ti.Platform.displayCaps.platformHeight;
var screenWidth = Ti.Platform.displayCaps.platformWidth;
var half_screen = {
	top : 0,
	height : screenHeight,
	width : screenWidth / 2
};
var common_animation = {
	top : 0,
	duration : 500
};

exports.SplitApartView = function(obj) {
	this.hostWin = obj.hostWin;
	this.insideView = obj.insideView;
	this.animated = false;
	this.leftView = Ti.UI.createView(mixin({
		left : 0
	}, half_screen));
	this.rightView = Ti.UI.createView(mixin({
		right : 0
	}, half_screen));
	var me = this;
	function close() {
		me.rightView.animate(mixin({
			right : 0
		}, common_animation));
		me.leftView.animate(mixin({
			left : 0
		}, common_animation), function() {
			me.animated = false;
			obj.hostWin.remove(me.insideView);
			obj.hostWin.remove(me.rightView);
			obj.hostWin.remove(me.leftView);
		});
	}
	this.rightView.addEventListener('click', close);
	this.leftView.addEventListener('click', close);

};

var cropping = {
	y : 0,
	height : screenHeight,
	width : screenWidth / 2
};
exports.SplitApartView.prototype.prepare = function() {
	var screenShot = this.hostWin.toImage();

	this.leftView.backgroundImage = screenShot.imageAsCropped(mixin({
		x : 0
	}, cropping));
	this.rightView.backgroundImage = screenShot.imageAsCropped(mixin({
		x : screenWidth / 2
	}, cropping));
};
exports.SplitApartView.prototype.open = function() {
	if(!this.animated) {
		var win = this.hostWin;
		this.animated = true;
		win.add(this.insideView);
		win.add(this.leftView);
		win.add(this.rightView);

		this.rightView.animate(mixin({
			right : -(screenWidth / 3)
		}, common_animation));
		this.leftView.animate(mixin({
			left : -(screenWidth / 3)
		}, common_animation));
	}
};
