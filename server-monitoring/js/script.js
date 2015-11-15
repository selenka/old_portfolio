// progress bar constructor
function ProgressBar (options) {
	this.bar = options.bar;

	var bar = ProgressBar.bar = this.bar;
	
	ProgressBar.firstHalfProgress = function (bar) {
		// firstHlf is 180 deg
		// 180deg = 50%
		// x      = bar.progress
		// x = (180deg * bar.progress ) / 50%

		deg = (180 * bar.progress) / 50;

		ProgressBar.rotation(bar.hidePanel, deg);
	};
	ProgressBar.secondHalfProgress = function (bar) {
		// show first 50% fully
		bar.hidePanel.style.zIndex = '3';
		var progress = 50 - (100 - bar.progress);

		// 180deg = 50%
		// x      = progress
		//x = (180deg * progress) / 50$

		deg = (180 * progress) / 50;

		ProgressBar.rotation(bar.activePanel, deg);

	};
	ProgressBar.rotation = function (panel, deg) {
		panel.style.transform = 'rotate('+deg+'deg)'; 
		panel.style.oTransform = 'rotate('+deg+'deg)'; 
		panel.style.msTransform = 'rotate('+deg+'deg)'; 
		panel.style.mozTransform = 'rotate('+deg+'deg)'; 
		panel.style.webkitTransform = 'rotate('+deg+'deg)';
	};

	//define progress, hide(dark) panel and active2 (green) panel of every bar
	for (var i = 0; i < bar.length; i++) {
		bar[i].progress = parseFloat(bar[i].children[0].innerText);
		var panels = bar[i].children[0].children;
		for (var j = 0; j < panels.length; j++) {
			var attr = panels[j].getAttribute('data-progress');
			if (attr == 'hide-panel') {
				bar[i].hidePanel = panels[j];
			} else if (attr == 'active-panel') {
				bar[i].activePanel = panels[j];
			}
		}
	};
	
	// define current progress styling

	for (var i = 0; i < bar.length; i++) {
		if (bar[i].progress <= 50) {
			ProgressBar.firstHalfProgress(bar[i]);
		} else {
			ProgressBar.secondHalfProgress(bar[i]);
		}
	};

}
var activeDownloads = new ProgressBar({
	bar: document.getElementsByClassName('progress-bar')
});


//navigation items active state
var navigation = document.getElementById('navigation');
navigation.addEventListener('click', function navActive (e) {
	var target = e.target;
	if (!target.classList.contains('active')) {
		for (var i = 0; i < navigation.children.length; i++) {
			navigation.children[i].classList.remove('active');
		};
		target.classList.add('active');
	}
	
});


