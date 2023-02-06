// React imports:
import { useState, useEffect } from 'react';
// CSS import:
import classes from './Game.module.css'
import Row from '../Row/Row';

import ModalSelect from '../ModalSelect/ModalSelect';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

// Variables during testing, will move to appropriate place
const difficulty = 3; // Determine the amount of cells/bombs to produce, cannot be lower than 2
const rowAmt = (difficulty - 1) * 4 + 1;
const cellAmt = 3 * Math.pow(difficulty, 2) - 3 * difficulty + 1;
const midCell = [Math.ceil(rowAmt/2)-1, Math.ceil((difficulty-1)/2) - ((difficulty%2 === 0) ? 1 : 0)];
const freeHintNum = difficulty -2;

// Generates the cellInfo for each cell with initial state within given row
const infoArrGen = (cellAmt: number, midline: boolean = false) => {
	const cellInfoArr: cellInfo[] = [];
	for (let j = 0; j < cellAmt; ++j) {
		if (midline && j === midCell[1]) {
			cellInfoArr.push({
				isBomb: false,
				hints: [0, 0, 0],
				hint: 3,
				cellState: 1,
			});
		} else {
			cellInfoArr.push({
				isBomb: false,
				hints: [0, 0, 0],
				hint: -1,
				cellState: 0,
			});
		}
	}
	return cellInfoArr;
};

// Generates the number of buffer cells needed. Only used on Pre and Post full rows (full rows have no buffer)
const bufferGen = (isPre: boolean, row: number) => {
	// Math slightly different if this row is before the full rows or not, using ternary
	return Math.floor((difficulty - (isPre ? row + 1 : rowAmt - row)) / 2);
};

// Generates the locations of the bomb-cells mutates passed array, and returns array of the bombs locations
const bombGen = (arr: gameArray) => {
	const bombArr: number[][] = [];
	const bombNum: number = Math.floor(cellAmt / 4 + Math.random() * difficulty);
	for (let i = 0; i < bombNum; ++i) {
		let row = Math.floor(Math.random() * rowAmt);
		let col = Math.floor(Math.random() * arr[row].rowArray.length);
		if (!arr[row].rowArray[col].isBomb && row !== midCell[0] && row !== midCell[1]) {
			arr[row].rowArray[col].isBomb = true;
			bombArr.push([row, col]);
		} else {
			--i;
		}
	}
	return bombArr;
};

// Create hints based on surrounding cells
const updateHints = (arr: gameArray, bombArr: number[][]) => {
	// Needs to check 6 times:
	/* Even */ /* Odd */
	// NW: 	[-1, -1], 	[-1, +0],
	// N : 	[-2, +0],	[-2, +0],
	// NE: 	[-1, +0],	[-1, +1],
	// SE: 	[+1, +0],	[+1, +1],
	// S : 	[+2, +0],	[+2, +0],
	// SW: 	[+1, -1],	[+1, +0],
	for (let i = 0; i < bombArr.length; ++i) {
		const bBuf = arr[bombArr[i][0]].buffer; // Amount of buffer space to account for
		const bRow = bombArr[i][0]; // Current Bomb Row
		const bCol = bombArr[i][1] + bBuf; // Current Bomb Column, adjusted to buffer position

		// Add 1 to counter to each adjoining cell. Will need to check that there is a valid row/column for each direction.
		// When checking a row/column before current cell, check that new value is 0 or above
		// When checking a row/column after  current cell, check that new value is smaller than the row/column length
		// Row being even/odd only matters for East/West directions
		const isOdd = (difficulty % 2 === 0 
						? (bRow % 2 === 0) ? false : true
						: (bRow % 2 === 0) ? true : false);

		console.log(`
			Location: 	[${bRow}, ${bCol}],
			NW:			[${bRow - 1}, ${bCol - (isOdd ? 1 : 0)}],
			N :			[${bRow - 2}, ${bCol}],
			NE:			[${bRow - 1}, ${bCol + (isOdd ? 0 : 1)}],
			SE:			[${bRow + 1}, ${bCol + (isOdd ? 0 : 1)}],
			S :			[${bRow + 2}, ${bCol}],
			SW:			[${bRow + 1}, ${bCol - (isOdd ? 1 : 0)}],
		`);
		// Logic for finding column number in array with buffer considered
		const bColExp = [
			bCol - arr[bRow - 1]?.buffer - (isOdd ? 1 : 0),
			bCol - arr[bRow - 2]?.buffer,
			bCol - arr[bRow - 1]?.buffer + (isOdd ? 0 : 1),
			bCol - arr[bRow + 1]?.buffer + (isOdd ? 0 : 1),
			bCol - arr[bRow + 2]?.buffer,
			bCol - arr[bRow + 1]?.buffer - (isOdd ? 1 : 0),
		];
		//  lengths of all possible rows, can be undefined if doesn't exist, won't interfere with below check
		const bRowExp = [
			arr[bRow - 1]?.rowArray.length, // North-East/West
			arr[bRow - 2]?.rowArray.length, // North
			arr[bRow + 1]?.rowArray.length, // South-East/West
			arr[bRow + 2]?.rowArray.length, // South
		];

		// Check Row Exists			// Check Column Exists in specific row

		// North-West:
		if ((bRow - 1 > -1) 		&& (bColExp[0] < bRowExp[0]) && (bColExp[0] > -1)) ++arr[bRow - 1].rowArray[bColExp[0]].hints[0];
		// North:
		if ((bRow - 2 > -1) 		&& (bColExp[1] < bRowExp[1]) && (bColExp[1] > -1)) ++arr[bRow - 2].rowArray[bColExp[1]].hints[1];
		// North-East:
		if ((bRow - 1 > -1) 		&& (bColExp[2] < bRowExp[0]) && (bColExp[2] > -1)) ++arr[bRow - 1].rowArray[bColExp[2]].hints[2];
		// South-East:
		if ((bRow + 1 < arr.length) && (bColExp[3] < bRowExp[2]) && (bColExp[3] > -1)) ++arr[bRow + 1].rowArray[bColExp[3]].hints[0];
		// South:
		if ((bRow + 2 < arr.length) && (bColExp[4] < bRowExp[3]) && (bColExp[4] > -1)) ++arr[bRow + 2].rowArray[bColExp[4]].hints[1];
		// South-West
		if ((bRow + 1 < arr.length) && (bColExp[5] < bRowExp[2]) && (bColExp[5] > -1)) ++arr[bRow + 1].rowArray[bColExp[5]].hints[2];
	}
	return;
};

// Game handles state and logic of game-play.
// State is not complex, and only needs to be passed through 2 children: therefore not using Redux/Context
const Game = () => {
	const [gameArray, setGameArray] = useState<gameArray | undefined>();

	// Create Game and set gameArray
	useEffect(() => {
		setGameArray(() => {
			const arr: gameArray = [];
			// Create the all the rows in gameArray
			for (let i = 0; i < rowAmt; ++i) {
				// Row should contain less than the maximum cells
				if (i < difficulty) {
					arr.push({
						buffer: bufferGen(true, i),
						rowArray: [...infoArrGen(i + 1)],
					});
				}
				// Check if the current row is passed the full rows section
				// Simply, these are the last rows of the pattern, and will need buffers just like the beginning rows
				else if (i >= rowAmt - difficulty) {
					arr.push({
						buffer: bufferGen(false, i),
						rowArray: [...infoArrGen(rowAmt - i)],
					});
				}
				// Else - these rows are full row sections
				// Check within {infoArrGen} parameter if working in an "Even" row, and also an "Even" difficulty
				// This is a bit harder to explain:
				/*  when difficulty is even, the longest row will also be even, 
					Same with difficulty being odd, the longest row will be Odd.
					So, check the modulus to see if i and difficulty are even.
					If they are both even, or both odd, then this row is the longest it can be (difficulty)
					If not, then the length of the row is difficulty-1
					max row length = difficulty
				*/
				else {
					arr.push({
						buffer: 0,
						rowArray: [...infoArrGen(difficulty - ((i % 2 === 0) === (difficulty % 2 === 0) ? 1 : 0), (i === midCell[0]))]
					});
				}
			}
			// Generate bomb array, update gameArray, and return bombArray to update hints
			const bombArr = bombGen(arr);
			// Update hints, mutating the array
			updateHints(arr, bombArr);
			return [...arr];
		});
	}, []);

	const [modal, setModal] = useState({show: false, cell: [-1, -1]});

	// Check if the game is over, if every cell is marked as safe or flagged
	const checkEndGame = () => {
		if (gameArray) {
			for (let i = 0; i < gameArray.length; ++i) {
				for (let j = 0; j < gameArray[i].rowArray.length; ++j) {
					if (gameArray[i].rowArray[j].cellState === 0) {
						return false;
					}
				}
			}
			return true;
		}
	}

	// Check that the cells marked safe and flagged are accurate to what the cell containers
	const verifyGame = () => {
		if (gameArray) {
			for (let i = 0; i < gameArray.length; ++i) {
				for (let j = 0; j < gameArray[i].rowArray.length; ++j) {
					const cell = gameArray[i].rowArray[j];
					// Check if cell is a bomb, if so, make sure user flagged it. if it is safe, make sure user didn't flag it
					if ((cell.isBomb && cell.cellState !== 2) || (!cell.isBomb && cell.cellState !== 1)) {
						return false;
					}
				}
			}
			return true;
		}
	}

	// Handle when the game has ended, can lose early by clicking on a cell with a bomb
	const endGame = (hasLost: boolean = false) => {
		if (!hasLost && verifyGame()) {
			alert('You win!');
		} else {
			alert('you lose!');
		}
	}

	// User wants a "free hint" Mark cell appropriately, and set the cell to give all hints.
	const giveHint = (row: number, col: number) => {
		if (gameArray) {
			gameArray[row].rowArray[col].cellState = gameArray[row].rowArray[col].isBomb ? 2 : 1;
			gameArray[row].rowArray[col].hint = 3;
			setFreeHint(prev => {
				return {next: false, left: prev.left-1}
			})
		}
	}

	// Handle when a user "left" clicks a cell. If it is a bomb, the user has lost early, if not show modal to let user select a hint
	const handleCellClick = (row: number, col: number) => {
		if (gameArray) {
			if (freeHint.next) {
				giveHint(row, col);
			} else if (gameArray[row].rowArray[col].isBomb) {
				endGame(true);
			} else if (gameArray[row].rowArray[col].hint === -1) {
				setModal({show: true, cell: [row, col]});
			}
		}
	};

	// Upon closing modal, update state to show the correct hit the user selected. Also update the cellState to be "safe"
	const closeModal = (hintRequest: number) => {
		setGameArray(prev => {
			if (prev) {
				const newArray = [...prev];
				newArray[modal.cell[0]].rowArray[modal.cell[1]].hint = hintRequest;
				newArray[modal.cell[0]].rowArray[modal.cell[1]].cellState = 1;
				return newArray;
			} else {
				return prev;
			}
		})
		setModal({show: false, cell: [-1, -1]});
		// Check if the user has selected all cells.
		if (checkEndGame()) {
			endGame();
		}
	};

	// Mark cell as flagged, or return it to unmarked if already flagged
	const createFlag = (row: number, col: number) => {
		setGameArray(prev => {
			if (prev) {
				const newArray = [...prev];
				const currentState = newArray[row].rowArray[col].cellState;
				if (currentState === 2) {
					newArray[row].rowArray[col].cellState = 0;
				} else if (currentState === 0) {
					newArray[row].rowArray[col].cellState = 2;
				}
				return newArray;
			} else {
				return prev;
			}
		});
		if (checkEndGame()) {
			endGame();
		}
	}

	const [freeHint, setFreeHint] = useState({next: false, left: freeHintNum});
	const freeHintHandler = () => {
		setFreeHint(prev => {
			return {next: !prev.next, left: prev.left};
		});
	}

	console.log(gameArray);
	return (
		<>
			<ModalSelect show={modal.show} handleClose={closeModal}/>
			<Container className='m-3'>
				{gameArray?.map((row, index) => {
					return <Row key={`R${index}`} rowNum={index} rowArray={row.rowArray} buffer={row.buffer} onClick={handleCellClick} onFlag={createFlag}/>;
				})}
				<Button className={freeHint.next ? classes.hintBtnActive : classes.hintBtn} disabled={freeHint.left === 0} onClick={freeHintHandler}>{`Free Hint (${freeHint.left}) left`}</Button>
			</Container>
		</>
	);
};

export default Game;
