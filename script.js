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
