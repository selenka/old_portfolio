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
var active = document.getElementById('active');
var statistic = document.getElementById('statistic');

navigation.addEventListener('click', function navActive (e) {
	var target = e.target;
	if (!target.classList.contains('active')) {
		for (var i = 0; i < navigation.children.length; i++) {
			navigation.children[i].classList.remove('active');
		};
		target.classList.add('active');

		//temporaly content showing
		switch(target.innerText) {
			case 'ACTIVE':
				active.style.display = "block";
				statistic.style.display = "none";
			break;

			case 'STATISTIC':
				active.style.display = "none";
				statistic.style.display = "block";
			break;
		}

	}
});


//button group active state
var buttongroup = document.getElementsByClassName('buttongroup');

for (var i = 0; i < buttongroup.length; i++) {
	buttongroup[i].addEventListener('click', function (e) {
		var target = e.target;

		if (target != this) {
			for (var i = 0; i < this.children.length; i++) {
				this.children[i].setAttribute('data-selected', 'false');
			}
			target.setAttribute('data-selected', 'true');
		}
	})
};


// appearing extra info on table row click
var table = document.getElementById('table-statistic');
var rows = table.tBodies[0].rows;
var cells = table.tBodies[0].rows[0].cells;

for (var i = 0; i < rows.length; i++) {
	// calculate colspan for extra cell
	if(rows[i].rowIndex % 2 == 0) {
		rows[i].cells[0].colSpan = cells.length;
	}
	rows[i].addEventListener('click', function (e) {

		var target = e.target;

		if (target != this) {
			var ifSelected = target.parentElement.getAttribute('data-selected');
			if (ifSelected == 'false') {
				//make all odd rows not selected
				for (var i = 0; i < rows.length; i++) {
					if (rows[i].rowIndex % 2 != 0) {
						rows[i].setAttribute('data-selected', 'false');	
					}
				};
				// select the target row
				target.parentElement.setAttribute('data-selected', 'true');
				
				// show row with extra info
				var extra = target.parentElement.nextElementSibling;
				//make all even rows closed
				for (var i = 0; i < rows.length; i++) {
					if (rows[i].rowIndex % 2 == 0) {
						rows[i].setAttribute('data-extra', 'closed');	
					}
				}
				extra.setAttribute('data-extra', 'opened');
				
			}
		}
	})
}

