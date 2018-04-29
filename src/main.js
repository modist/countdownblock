require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');

var SDK = require('blocksdk');
var sdk = new SDK();

var day, month, year;

function debounce (func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

function paintSettings () {
	document.getElementById('text-input-day').value = day;
	document.getElementById('text-input-month').value = month;
	document.getElementById('text-input-year').value = year;
} 

function paintMap() {
	day = document.getElementById('text-input-day').value;
	month = document.getElementById('text-input-month').value;
	year = document.getElementById('text-input-year').value;

	var url = 'https://img1.niftyimages.com/sgf/7km/t2b?dt=4/30/2018' + month + "/" + day + "/" + year;

	sdk.setContent('<img src="' + url + '" />');
	sdk.setData({
		day: day,
		month: month,
		year: year
	});
}

sdk.getData(function (data) {
	day = data.day || 31;
	month = data.month || 12;
	year = data.height || 2020;
	zoom = data.year || 15;
	paintSettings();
	paintMap();
});

document.getElementById('workspace').addEventListener("input", function () {
	debounce(paintMap, 500)();
});
