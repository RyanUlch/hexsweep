// React imports:
import { useState, useEffect } from 'react';
// CSS import:
import classes from './Game.module.css'
// Bootstrap Imports:
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// Component Imports:
import ModalNewGame from '../Modals/ModalNewGame';
import ModalSelect from '../Modals/ModalSelect';
import Row from '../Row/Row';

import { infoArrGen, bufferGen, updateHints, bombGen} from '../../helpers/setupGameHelpers';

// Game handles state and logic of game-play.
// State is not complex, and only needs to be passed through 2 children: therefore not using Redux/Context
const Game = () => {
	// State Initialization:
	const [game, setGame] = useState({
		// Game Array contains all info about the rows/cells and the info regarding those
		gameArray: [{buffer: -1, rowArray: [{isBomb: false,	hints: [-1, -1, -1], hint: -1, cellState: -1}]}],
		// Game Info contains all the info regarding the overall settings for the game (difficulty, gameNumber, etc.)
		gameInfo: {
			// Info regarding the amount of hints the user has to use, and if they have activated the free hint button
			// FreeHintNum set by ({difficulty} - 2) 
			freeHintNum: -1, 	freeHintNext: false, 	freeHintsLeft: -1,
			// Info regarding current games bombs
			bombNum: -1,		bombsFlagged: -1,
			// Info regarding larger game stats
			gameNumber:	 0,		isFinished: true,
		},
		modalHint: false,
		hintCell: [-1, -1],
		modalGame: false,

	});

/* Update Game Function Section - Passed functions to components to update GameArray/GameInfo */

	// Handle when a user "left" clicks a cell. If it is a bomb, the user has lost early, if not show modal to let user select a hint
	const handleCellClick = (row: number, col: number) => {
		if (game.gameInfo.freeHintNext) {
			giveFreeHint(row, col);
			setGame(prev => {
				return {
					...prev, 
					gameInfo: {
						...prev.gameInfo,
						freeHintNext: false,
						freeHintsLeft: prev.gameInfo.freeHintsLeft-1,
					}
				}
			})
			checkIfEndGame();
		} else if (game.gameArray && game.gameArray[row].rowArray[col].isBomb) {
			endGame(true);
		} else if (game.gameArray && game.gameArray[row].rowArray[col].hint === -1) {
			if (!checkIfEndGame()) {
				setGame(prev => {
					return {
						...prev, modalHint: true, hintCell: [row, col],
					}
				})
			}
		}
	}

	// Handle whe a user "right" clicks a cell. Mark cell as flagged, or return it to unmarked if already flagged
	const createFlag = (row: number, col: number) => {
		setGame(prev => {
			const newArray = [...prev.gameArray];
			const newInfo = {...prev.gameInfo};
			const currentState = newArray[row].rowArray[col].cellState;
			if (currentState === 2) {
				newArray[row].rowArray[col].cellState = 0;
				newInfo.bombsFlagged = newInfo.bombsFlagged - 1;
			} else if (currentState === 0) {
				newArray[row].rowArray[col].cellState = 2;
				newInfo.bombsFlagged = newInfo.bombsFlagged + 1;
			}
			return  {...prev, gameArray: newArray};
		});
		checkIfEndGame();
	}

	// User wants a "free hint" Mark cell appropriately, and set the cell to give all hints.
	const giveFreeHint = (row: number, col: number) => {
		setGame(prev => {
			const newArr = [...prev.gameArray];
			const newInfo = {...prev.gameInfo};
			newArr[row].rowArray[col].cellState = newArr[row].rowArray[col].isBomb ? 2 : 1;
			newArr[row].rowArray[col].hint = 3;
			newInfo.freeHintNext = false;
			newInfo.freeHintsLeft = newInfo.freeHintsLeft -1;
			return {...prev, gameArray: newArr};
		});
	}

	// Toggle free hint button, if set, next cell clicked will give a free hint, cancelled by hitting button again
	const freeHintHandler = () => {
		console.log(game.gameInfo.freeHintNext);
		setGame(prev => {
			return {...prev, gameInfo: {...prev.gameInfo, freeHintNext: !prev.gameInfo.freeHintNext}};
		});
	}

/* Modal Handling Functions */
	// Upon clicking new game button, show modal to let user select difficulty
	const restartGame = () => {
		setGame(prev => {
			return {
				...prev,
				modalGame: true,
			}
		});
	}

	// Upon closing modal for a new game, update the game info with the difficulty, and game number
	const closeModalGame = (difficulty: number) => {
		createGame(difficulty);
	}
	// Note: handling the showing of the Hint Modal is based in {Cell} since it needs the specific cell info to update correctly
	// Upon closing modal for cell hint, update state to show the correct hint the user selected. Also update the cellState to be "safe"
	const closeModalHint = (hintRequest: number) => {
		setGame(prev => {

			const newArray = [...prev.gameArray];
			newArray[prev.hintCell[0]].rowArray[prev.hintCell[1]].hint = hintRequest;
			newArray[prev.hintCell[0]].rowArray[prev.hintCell[1]].cellState = 1;

			return {
				...prev,
				gameArray: newArray,
				modalHint: false,
				hintCell: [-1, -1],
			};

		})
	};
// console.log(gameDifficulty)
/* End Game Functions - called to check if the game is done, and if the user has won */
	// Check if the game is over, if every cell is marked as safe or flagged, called after cells are marked
	// If game is over, automatically go to handling the endGame
	const checkIfEndGame = () => {
			for (let i = 0; i < game.gameArray.length; ++i) {
				for (let j = 0; j < game.gameArray[i].rowArray.length; ++j) {
					if (game.gameArray[i].rowArray[j].cellState === 0) {
						return false;
					}
				}
			}
			endGame();
	}
	// Check that the cells marked safe and flagged are accurate to what the cell containers
	const verifyGame = () => {
		for (let i = 0; i < game.gameArray.length; ++i) {
			for (let j = 0; j < game.gameArray[i].rowArray.length; ++j) {
				const cell = game.gameArray[i].rowArray[j];
				// Check if cell is a bomb, if so, make sure user flagged it. if it is safe, make sure user didn't flag it
				if ((cell.isBomb && cell.cellState !== 2) || (!cell.isBomb && cell.cellState !== 1)) {
					return false;
				}
			}
		}
		return true;
	}
	// Handle when the game has ended, can lose early by clicking on a cell with a bomb
	const endGame = (hasLost: boolean = false) => {
		if (!hasLost && verifyGame()) {
			alert('You win!');
		} else {
			alert('you lose!');
		}
		setGame(prev => {
			const newArr = [...prev.gameArray];
			for (let i = 0; i < newArr.length; ++i) {
				for (let j = 0; j < newArr[i].rowArray.length; ++j) {
					newArr[i].rowArray[j].cellState = newArr[i].rowArray[j].isBomb ? 2 : 1;
				}
			}
			return {
				...prev,
				gameArray: newArr,
				gameInfo: {
					...prev.gameInfo,
					isFinished: true,
				},
			}
		})
	}

/* UseEffect Section - used for creating new games, and setting new difficulties */
	// Create Game and set gameArray
	const createGame = (difficulty: number) => {
		let rowAmt = ((difficulty - 1) * 4) + 1;
		let midCell = [Math.ceil(rowAmt/2)-1, Math.ceil((difficulty-1)/2) - ((difficulty%2 === 0) ? 1 : 0)];
		let cellAmt = 3 * Math.pow(difficulty, 2) - 3 * difficulty + 1;
		// When user creates a new game with a different difficulty, change the values of {gameInfo}

		setGame(prev => {
			const gameInfo = {
				freeHintNum: difficulty - 2,
				freeHintNext: false,
				freeHintsLeft: difficulty -2,
				bombNum: Math.floor(cellAmt / 4 + Math.random() * difficulty),
				bombsFlagged: 0,
				gameNumber: prev.gameInfo.gameNumber+1,
				isFinished: false,
			}
			const arr: gameArray = [];
			// Create the all the rows in gameArray
			for (let i = 0; i < rowAmt; ++i) {
				// Row should contain less than the maximum cells
				if (i < difficulty) {
					arr.push({
						buffer: bufferGen(true, i, rowAmt, difficulty),
						rowArray: [...infoArrGen(i+1, midCell[1], difficulty)],
					});
				}
				// Check if the current row is passed the full rows section
				// Simply, these are the last rows of the pattern, and will need buffers just like the beginning rows
				else if (i >= rowAmt - difficulty) {
					arr.push({
						buffer: bufferGen(false, i, rowAmt, difficulty),
						rowArray: [...infoArrGen(rowAmt-i, midCell[1], difficulty)],
					});
				}
				// Else - these rows are full row sections
				// Check within {infoArrGen} parameter if working in an "Even" row, and also an "Even" difficulty
				// This is a bit harder to explain:
				/*  when difficulty is even, the longest row will also be even, same with difficulty being odd, the longest row will be Odd.
					So, check the modulus to see if i and difficulty are even. If they are both even, or both odd, then this row is the longest it can be (difficulty)
					If not, then the length of the row is difficulty-1. Max Row Length = difficulty
				*/
				else {
					arr.push({
						buffer: 0,
						rowArray: [...infoArrGen(difficulty - ((i % 2 === 0) === (difficulty % 2 === 0) ? 1 : 0), midCell[1], difficulty, (i === midCell[0]))],
					});
				}
			}
			// Generate bomb array, update gameArray, and return bombArray to update hints
			const bombArr = bombGen(arr, rowAmt, cellAmt, midCell, difficulty);
			// Update hints, mutating the array
			updateHints(arr, bombArr, difficulty);
			return {
				...prev,
				modalGame: false,
				gameInfo: gameInfo,
				gameArray: arr,
			};
		});
	}

	return (
		<>
			<ModalSelect show={game.modalHint} handleClose={closeModalHint} />
			<ModalNewGame show={game.modalGame} handleClose={closeModalGame} />
			<Card className={`border border-success rounded ${classes.gameCard}`}>
				<Card.Header>
					<h1>Hex-Sweep</h1>
				</Card.Header>
				<Card.Body className={classes.gameArea}>
					{/* <Row key={`R${0}`} rowNum={0} rowArray={[{isBomb: false, hints: [0, 0, 0], hint: 1, cellState: 0 }]} buffer={0} onClick={handleCellClick} onFlag={createFlag}/> */}
					{game.gameArray.map((row, index) => {
						return <Row key={`R${index}`} rowNum={index} rowArray={row.rowArray} buffer={row.buffer} onClick={handleCellClick} onFlag={createFlag}/>;
					})}
				</Card.Body>
				<Card.Footer>
					<Button className={game.gameInfo.freeHintNext ? classes.hintBtnActive : classes.hintBtn} disabled={game.gameInfo.freeHintsLeft === 0} onClick={freeHintHandler}>{`Free Hint (${game.gameInfo.freeHintsLeft}/${game.gameInfo.freeHintNum}) left`}</Button>
					<Button className={classes.restartBtn} onClick={restartGame}>{`New Game`}</Button>
					<Button>{game.gameInfo.bombsFlagged}/{game.gameInfo.bombNum} Bombs</Button>
				</Card.Footer>
			</Card>
		</>
	);
};

export default Game;