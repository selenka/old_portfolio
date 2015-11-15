// progress bar constructor
function ProgressBar (options) {
	this.bar = options.bar;

	var bar = ProgressBar.bar = this.bar;
	
	ProgressBar.firstHalfProgress = function (bars) {
		console.log('first');
	};
	ProgressBar.secondHalfProgress = function () {
		console.log('second');
	};

	//define progress of every bar
	for (var i = 0; i < bar.length; i++) {
		console.log(bar[i]);
	};
	// for (var i = 0; i < progress.length; i++) {
	// 	if (+progress[i].innerHTML <= 50) {
	// 		ProgressBar.firstHalfProgress();
	// 	} else {
	// 		ProgressBar.secondHalfProgress();
	// 	}
	// };


}
var activeDownloads = new ProgressBar({
	bar: document.getElementsByClassName('progress-bar')
});