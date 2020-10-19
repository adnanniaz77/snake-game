const board = document.querySelector('.board')
const top_score = document.querySelector('#top-score')
const startButton = document.querySelector('#start-button')
const eating_sound = document.querySelector('#eating_sound');
const collision_sound = document.querySelector('#collision_sound');
const scoreText = document.querySelector('#score')
const board_size = 100;
let squares = [];
let direction = 1;
const width = 10;

let local_score = localStorage.getItem("topScore") || 0
let score = 0;

let gameSpeed = 500;
let intervalId;

// local storage
let topScore = local_score;
top_score.textContent = topScore

// initial Snake
let currentSnake = [1,0];

// show beginning score "0"
scoreText.textContent = score;

// START THE GAME with "start-button"
startButton.addEventListener('click', (e) => {
	resetGame();

	// create grid-board 
	createBoard();

	for (let i = 0; i < currentSnake.length; i++) {
		squares[i].classList.add('snake')
	}

	// create random apple
	generateApple();

	// move snake
	intervalId = setInterval(moveSnake, gameSpeed);

	// Keyboard Event to handle direction controls
	function control(e) {
		if (e.key === "ArrowRight") {
			direction = 1;
		} else if (e.key === "ArrowUp") {
			direction = -width;
		} else if (e.key === "ArrowLeft") {
			direction = -1;
		} else if(e.key === "ArrowDown") { 
			direction = +width;
		}

	}

	document.addEventListener('keydown', control);
});

// *************** FUNCTIONS *************** //

// function	create grid-board
function createBoard() {
	for (let i = 0; i < board_size; i++) {
		let square = document.createElement('square')
		square.classList.add('square')
		board.append(square)
		squares.push(square)
	}
}

// function move snake
function moveSnake() {
	if (
        (currentSnake[0] + width >= width * width && direction === width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
		currentSnake.forEach((sqr) => squares[sqr].classList.add("shake"));
		collision_sound.play();
		score = getTotalScore();

		if (score > topScore) {
			localStorage.setItem("topScore", JSON.stringify(score))		
			local_score = localStorage.getItem("topScore") || 0
			let topScore = local_score;
			top_score.textContent = topScore	
		}
		
		return clearInterval(intervalId);
    }

	const tail = currentSnake.pop();
	squares[tail].classList.remove('snake')

	currentSnake.unshift(currentSnake[0] + direction)
	squares[currentSnake[0]].classList.add('snake')

	console.log(squares[currentSnake[0]])

	if (squares[currentSnake[0]].classList.contains('apple')) {
		eating_sound.play();
		squares[currentSnake[0]].classList.remove('apple');

		generateApple();

		// add to score
		score += 1;
		scoreText.textContent = score;

		// pause audio
		collision_sound.pause();
		
		// grow snake
		currentSnake.unshift(currentSnake[0])

		// speed up the game difficulty
		clearInterval(intervalId)
		gameSpeed *= 0.9;
		intervalId = setInterval(moveSnake, gameSpeed);
	}
}

// generate apple
function generateApple() {
	do {
        const randNum = Math.floor(Math.random() * 
            (board_size - currentSnake.length) + currentSnake.length);
		squares[randNum].classList.add('apple')
	} while (currentSnake.length > squares.length)
}

// reset game 
function resetGame() {
	squares = [];
	direction = 1;
	gameSpeed = 500;
	currentSnake = [1,0];

	score = 0;
	scoreText.textContent = score;

	clearInterval(intervalId);

	board.innerHTML = "";
}

// get total score
function getTotalScore() {
	return score;
}