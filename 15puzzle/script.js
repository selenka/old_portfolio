function Puzzle (options) {
	this.puzzle = options.puzzle;
	this.moves = options.moves;

	var puzzle = Puzzle.puzzle = this.puzzle;
	var tiles = Puzzle.tiles = this.puzzle.children;
	var moves = Puzzle.moves = this.moves;

	//for compare the result
	var basicArray = [];
	for (var i = 0; i < tiles.length; i++) {
		basicTile = tiles[i].getAttribute('data-puzzle-number');
		basicArray.push(+basicTile);
	};
	Puzzle.original = function() {
		for (var i = 0; i < tiles.length; i++) {
			for (var j = 0; j < basicArray.length; j++) {
				tiles[i].setAttribute('data-puzzle-number', basicArray[i]);
				var basicTileNumber = tiles[i].getAttribute('data-puzzle-number');
				tiles[i].innerHTML = basicTileNumber;
			};
		}
	}
	Puzzle.shuffle = function() {
		var tileArray = [];
		makeRandom(tiles.length, tileArray);

		//set random numbers to tiles
		for (var i = 0; i < tiles.length; i++) {
			for (var j = 0; j < tileArray.length; j++) {
				tiles[i].setAttribute('data-puzzle-number', tileArray[i]);
				var tileNumber = tiles[i].getAttribute('data-puzzle-number');
				tiles[i].innerHTML = tileNumber;
			};
		}
	}
	// container for available tiles
	var availableTiles = {};

	Puzzle.checkAvailableTiles = function (availableTiles) {
		var emptyX;
		var emptyY;
		var nextTile;
		var prevTile;
		var topTile;
		var bottomTile;
		
		for (var i = 0; i < tiles.length; i++) {
			if (tiles[i].getAttribute('data-puzzle-number') == '0') {
				availableTiles.empty = tiles[i];
				emptyX = +tiles[i].getAttribute('data-x');
				emptyY = +tiles[i].getAttribute('data-y');
			}
		};

		var nextY = emptyY + 1;
		var prevY = emptyY - 1;
		var topX = emptyX - 1;
		var bottomX = emptyX + 1;

		for (var i = 0; i < tiles.length; i++) {
			if (tiles[i].getAttribute('data-x') == emptyX && tiles[i].getAttribute('data-y') == nextY) {
				availableTiles.nextTile = tiles[i];
			} else if (tiles[i].getAttribute('data-x') == emptyX && tiles[i].getAttribute('data-y') == prevY) {
				availableTiles.prevTile = tiles[i];
			} else if (tiles[i].getAttribute('data-x') == topX && tiles[i].getAttribute('data-y') == emptyY) {
				availableTiles.topTile = tiles[i];
			} else if (tiles[i].getAttribute('data-x') == bottomX && tiles[i].getAttribute('data-y') == emptyY) {
				availableTiles.bottomTile = tiles[i];
			}
		};
		return availableTiles;
	}
	var count = 0;
	Puzzle.countMoves = function () {
		count++;
		Puzzle.moves.innerHTML = count;
	}
	Puzzle.clearMoves = function () {
		Puzzle.moves.innerHTML = 0;
		count = 0;
	}
	Puzzle.checkWinner = function () {
		var resultArray = [];
		for (var i = 0; i < tiles.length; i++) {
			var resultTile = tiles[i].getAttribute('data-puzzle-number');
			resultArray.push(+resultTile);
		};
		if (resultArray.toLocaleString() == basicArray.toLocaleString()) {
			createOverlay();
			congratWinner();
		}
	}
	this.puzzle.addEventListener('click', function (e){
		Puzzle.checkAvailableTiles(availableTiles);
		var target = e.target;
		var emptyAttr;
		var attr;
		var empty;
		for (var prop in availableTiles) {
			if (prop == 'empty') {
				empty = availableTiles[prop];
				emptyAttr = empty.getAttribute('data-puzzle-number');
			}
			if (target == availableTiles[prop] && target.innerHTML != '0' ) {
				Puzzle.countMoves();
				attr = availableTiles[prop].getAttribute('data-puzzle-number');
				empty.setAttribute('data-puzzle-number', attr);
				empty.innerHTML = attr;
				target.setAttribute('data-puzzle-number', 0);
				target.innerHTML = 0;
			}
		}
		Puzzle.checkWinner();
	});
	document.addEventListener('keydown', function (e) {
		Puzzle.checkAvailableTiles(availableTiles);
		var code = e.keyCode;
		var attr;
		var empty;
		var curTile;

		for (var prop in availableTiles) {
			empty = availableTiles['empty'];
				switch (code) {
					case 37:
						curTile = availableTiles['nextTile'];
					break;

					case 38:
						curTile = availableTiles['bottomTile'];
					break;

					case 39:
						curTile = availableTiles['prevTile'];
					break;

					case 40:
						curTile = availableTiles['topTile'];
					break;
				}
		}
		if (curTile != undefined) {
			Puzzle.countMoves();
			attr = curTile.getAttribute('data-puzzle-number');
			empty.setAttribute('data-puzzle-number', attr);
			empty.innerHTML = attr;
			curTile.setAttribute('data-puzzle-number', 0);
			curTile.innerHTML = 0;
		}
		if (code == 37 || code == 38 || code == 39 || code ==40) {
			Puzzle.checkWinner();
		} else {
			return false;
		}
	});
}



var puzzle15 = new Puzzle({
	puzzle: document.getElementById('puzzle'),
	moves: document.getElementById('moves')
})

window.onload = function (e) {
	createOverlay();
	addNewPlayer();
}

// shuffle btn start

var shuffle = document.getElementById('shuffle-btn');
shuffle.addEventListener('click', function (e){
	pause.style.display = 'inline-block';
	Puzzle.shuffle();
	Puzzle.clearMoves();
	Timer.runIt(e.target);

});

// shuffle btn end

// timer pause btn start

var pause = document.getElementById('pause-btn');
pause.addEventListener('click', function (e){
	Timer.runIt(e.target);
	createOverlay();
	showResumePopUp();
})

// timer pause btn end
Puzzle
//add player btn start

var addPlayer = document.getElementById('player-btn');
addPlayer.addEventListener('click', function (e){
	createOverlay();
	addNewPlayer();
	Puzzle.original();
	Puzzle.clearMoves();
	Timer.runIt(e.target);
})

//add player btn end

function makeRandom(length, newArr) {
	var max = length - 1;
	tileArray = newArr;
	do {
		var rand = Math.floor(Math.random() * (max + 1));
		if (tileArray.indexOf(rand) == -1) {
			tileArray.push(rand);
		}
	} while (tileArray.length < max + 1)
	
	return tileArray;
}

var puzzleTimer = new Timer({
	timer: document.getElementById('timer')
})

function Timer (options) {
	this.timer = options.timer;

	var timer = Timer.timer = this.timer;

	var startTimer;

	Timer.runIt = function (target) {
		var btnTarget = target;
		var children = timer.children;
		var hours;
		var min;
		var sec;
		for (var i = 0; i < children.length; i++) {
			var options = children[i].getAttribute('data-time');
			switch (options) {
				case 'hours':
					hours = children[i];
				break;
				case 'minutes':
					min = children[i];
				break;
				case 'seconds':
					sec = children[i];
				break;
			};	
		}
		var count = 0;
		var minCount = 0;
		var hoursCount = 0;

		if (btnTarget.getAttribute('data-action') == 'start-timer') {
			clearInterval(startTimer);
			hours.innerHTML = '00';
			min.innerHTML = '00';
			sec.innerHTML = '00';
			count = 0;
			minCount = 0;
			hoursCount = 0;
			
			startTimer = setInterval (updateTimer, 1000);
		} else if (btnTarget.getAttribute('data-action') == 'pause-timer') {
			clearInterval(startTimer);
			
		} else if (btnTarget.getAttribute('data-action') == 'resume-timer') {
			count = +sec.innerHTML;
			minCount = +min.innerHTML;
			hoursCount = +hours.innerHTML;
			startTimer = setInterval (updateTimer, 1000);
		} else if (btnTarget.getAttribute('data-action') == 'add-player') {
			clearInterval(startTimer);
			hours.innerHTML = '00';
			min.innerHTML = '00';
			sec.innerHTML = '00';
		}

		function updateTimer () {
			sec.innerHTML = ++count;	
			if (sec.innerHTML.length < 2) {
				sec.innerHTML = '0' + count;
			}
			if (sec.innerHTML == '60') {
				sec.innerHTML = '00';
				count = 0;
				min.innerHTML = ++minCount;

				if (min.innerHTML.length < 2) {
					min.innerHTML = '0' + minCount;
				}
				if (min.innerHTML == '60') {
					min.innerHTML = '00';
					minCount = 0;
					hours.innerHTML = ++hoursCount;
					if (hours.innerHTML.length < 2) {
						hours.innerHTML = '0' + hoursCount;
					}
				}
			}
		}
	}	
}

var body = document.body;
var overlay;

document.addEventListener('click', function (e) {
	var target = e.target;
	if (target.getAttribute('data-action') == 'resume-timer') {
		closePopUp();
		destroyOverlay();
		Timer.runIt(target);
	} else if (target.getAttribute('data-action') == 'play') {
		validatePlayer();
	} else if (target.getAttribute('data-action') == 'ok') {
		closePopUp();
		destroyOverlay();
	}
})
document.addEventListener('keypress', function (e) {
	var code = e.keyCode;
	var popups = {
		popupPlayer: 'popup-player',
		popupCongrat: 'popup-congrat'
	}
	if (code == 13) {
		for (prop in popups) {
			var curPopup = document.getElementById(popups[prop]);
			if(curPopup != null && popups[prop] == 'popup-player') {
				validatePlayer();
			} else if (curPopup != null && popups[prop] == 'popup-congrat') {
				closePopUp();
				destroyOverlay();
			}
		}
	}
})

function createOverlay() {
	overlay = document.createElement('div');
	overlay.className = 'overlay';
	body.appendChild(overlay);
	return overlay;
}

function showResumePopUp() {
	var resumePopup =
	'<div class="popup-resume">' +
		'<div class="popup-center">' +
			'<span>We are waiting for you!</span>' +
			'<div>'+
				'<button class="resume" type="button"  id="resume-btn" data-action="resume-timer">Resume Game</button>' +
			'</div>' +
		'</div>' +
	'</div>';
	overlay.innerHTML = resumePopup;
}

var nicknameValue;

function addNewPlayer() {
	var addPlayerPopup =
	'<div id="popup-player" class="popup-player">' +
		'<div class="popup-center">' +
			'<span>Welcome, please enter your nickname and click Play!</span>' +
			'<div>'+
				'<label for="nickname">Your Nickname:</label>' + 
				'<input type="text" class="nickname" id="nickname">'+
			'</div>' +
			'<div>'+
				'<button class="resume" type="button"  data-action="play" >Play Game</button>' +
			'</div>' +
		'</div>' +
	'</div>';
	overlay.innerHTML = addPlayerPopup;
	nickname.focus();
}
function congratWinner() {
	var congratPopup =
	'<div id="popup-congrat" class="popup-player">' +
		'<div class="popup-center">' +
			'<span>Congratulations! You won!</span>' +
			'<div>'+
				'<button class="resume" type="button"  data-action="ok" >Thank you!</button>' +
			'</div>' +
			'<span>If you want to continue, than add New Player and have a nice time :)</span>' +
		'</div>' +
	'</div>';
	overlay.innerHTML = congratPopup;
}
function getPlayerInfo() {
	var nickname = document.getElementById('nickname');
	nicknameValue = nickname.value;
	return nicknameValue;
}
function setPlayerInHistory(){
	var history = document.getElementById('history');
	var newItem = document.createElement('li');
	newItem.innerHTML = nicknameValue;
	history.appendChild(newItem);
}
function validatePlayer() {
	getPlayerInfo();
	if (nicknameValue == '') {
		errorNickname();
	} else {
		setPlayerInHistory();
		closePopUp();
		destroyOverlay();
	}
}
function errorNickname() {
	nickname.style.borderColor = 'red';
	nickname.focus();
}
function closePopUp() {
	overlay.innerHTML = '';
}
function destroyOverlay() {
	body.removeChild(overlay);
}


