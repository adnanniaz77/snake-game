const board = document.querySelector('.board')
const startButton = document.querySelector('#start-button')
const eating_sound = document.querySelector('#eating_sound');
const collision_sound = document.querySelector('#collision_sound');
const scoreText = document.querySelector('#score')
const board_size = 100;
let squares = [];
const width = 10;
let score = 0;
let gameSpeed = 500;

// initial Snake
let currentSnake = [1,0];

// show beginning score "0"
scoreText.textContent = score;

////////////////////////////////////////////////////
// ***** FUNCTIONS *****//
////////////////////////////////////////////////////

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
		const randNum = Math.floor(Math.random() * (board_size - currentSnake.length) + currentSnake.length);
		squares[randNum].classList.add('apple')
	} while (currentSnake.length > squares.length)
}