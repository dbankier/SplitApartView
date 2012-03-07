var SplitApartView = require('/SplitApartView').SplitApartView;

var win = Ti.UI.createWindow({
	backgroundColor : '#2192E3',
	fullscreen : true
});

var insideView = Ti.UI.createView({
	backgroundColor : "#666"
});

var textField = Titanium.UI.createTextArea({
	height : 100,
	width : 200,
	borderColor : "black",
	borderRadius : 10,
	font : {
		fontSize : 20
	}
});
win.add(textField);

var split = new SplitApartView({
	hostWin : win,
	insideView : insideView
});

win.addEventListener("swipe", function() {
	split.prepare();
	split.open();
});

win.open();
