let currentPlayer = 1;
let grid = [[]];
for (let i = 0; i < 3; i++) {
	grid.push([]);
	for (let j = 0; j < 3; j++) {
		grid[i][j] = null;
	}
}

let isWinner = false;
let cells = document.querySelectorAll('.cell');
let cellOccupied = true;
let Punteggio1 = 0;
let Punteggio2 = 0;
let partitaTerminata = false;

function printGrid(grid) {
	grid.forEach((el, i) => {
		console.log(`${el[0]} | ${el[1]} | ${el[2]}`);
	});
}

for (let i = 0; i < cells.length; i++) {
	cells[i].addEventListener('click', function (e) {
		e.preventDefault();
		cellOccupied =
			e.currentTarget.classList.contains('player2') ||
			e.currentTarget.classList.contains('player1');

		if (!cellOccupied && !partitaTerminata) {
			document.getElementById('counterP1').classList.remove('bordered');
			document.getElementById('counterP2').classList.add('bordered');

			e.currentTarget.classList.add('player1');
			grid[e.currentTarget.dataset.yaxis][e.currentTarget.dataset.xaxis] = currentPlayer;
			if (checkWinner(currentPlayer) === true) {
				Punteggio1++;
				document.getElementById('p1Text').innerHTML = `Player: ${Punteggio1}`;
				partitaTerminata = true;
				showModal(2000);
			}
			let mossa = getBestMove(grid);
			currentPlayer = 2;
			let quadratino = document.querySelector(
				`.cell[data-xaxis="${mossa[1]}"][data-yaxis="${mossa[0]}"]`
			);
			grid[mossa[0]][mossa[1]] = currentPlayer;
			quadratino.classList.add('player2');
			if (checkWinner(currentPlayer)) {
				Punteggio2++;
				document.getElementById('p2Text').innerHTML = `Computer: ${Punteggio2}`;
				showModal(2000);
			}
			currentPlayer = 1;
		}
	});
}

function showModal(time) {
	document.querySelector('#winner').innerHTML = currentPlayer === 2 ? 'O' : 'X';
	document.querySelector('.modal-content').classList.toggle('open');
	setTimeout(function () {
		document.querySelector('.modal-content').classList.toggle('open');
	}, time);
}

function mainDiagonalCheck(currentPlayer) {
	if (
		grid[0][0] === currentPlayer &&
		grid[1][1] === currentPlayer &&
		grid[2][2] === currentPlayer
	) {
		return true;
	}
}

function secondDiagonalCheck(currentPlayer) {
	if (
		grid[0][2] === currentPlayer &&
		grid[1][1] === currentPlayer &&
		grid[2][0] === currentPlayer
	) {
		return true;
	}
}

function horizontalCheck(currentPlayer) {
	if (
		grid[0][0] === currentPlayer &&
		grid[0][1] === currentPlayer &&
		grid[0][2] === currentPlayer
	) {
		return true;
	} else if (
		grid[1][0] === currentPlayer &&
		grid[1][1] === currentPlayer &&
		grid[1][2] === currentPlayer
	) {
		return true;
	} else if (
		grid[2][0] === currentPlayer &&
		grid[2][1] === currentPlayer &&
		grid[2][2] === currentPlayer
	) {
		return true;
	}
}

function verticalCheck(currentPlayer) {
	if (
		grid[0][0] === currentPlayer &&
		grid[1][0] === currentPlayer &&
		grid[2][0] === currentPlayer
	) {
		return true;
	} else if (
		grid[0][1] === currentPlayer &&
		grid[1][1] === currentPlayer &&
		grid[2][1] === currentPlayer
	) {
		return true;
	} else if (
		grid[0][2] === currentPlayer &&
		grid[1][2] === currentPlayer &&
		grid[2][2] === currentPlayer
	) {
		return true;
	}
}

function checkWinner(currentPlayer) {
	if (mainDiagonalCheck(currentPlayer)) {
		return true;
	} else if (secondDiagonalCheck(currentPlayer)) {
		return true;
	} else if (horizontalCheck(currentPlayer)) {
		return true;
	} else if (verticalCheck(currentPlayer)) {
		return true;
	}
}

function reset() {
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			grid[i][j] = null;
		}
	}
	for (let i = 0; i < cells.length; i++) {
		cells[i].classList.remove('player1');
		cells[i].classList.remove('player2');
	}
	currentPlayer = 1;
	partitaTerminata = false;
	document.getElementById('counterP2').classList.remove('bordered');
	document.getElementById('counterP1').classList.add('bordered');
}

function getEmptyCells(board) {
	let emptyCells = [];
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[i][j] === null) {
				let vettorino = [i, j];
				emptyCells.push(vettorino);
			}
		}
	}

	return emptyCells;
}

function getBestMove(board) {
	return getEmptyCells(board)[0];
}