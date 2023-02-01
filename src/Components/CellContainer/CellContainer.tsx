import React from "react";
import { useState, useEffect } from "react";
import classes from "./CellContainer.module.css";
import Cell from "../Cell/Cell.tsx";
import Button from "react-bootstrap/Button";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export type cellInfo = {
	// If Cell contains a bomb //
	hasBomb: boolean,
	// Hint numbers of adjoining cells //
		// 0: NW/SE, 1: N/S, 2: NE/SW, 3: All //
	hints: [number,	number, number, number,]
	showHints: [boolean, boolean, boolean, boolean,]
	// Clicked indicates if user marked cell
		// 0: Not-Marked, 1: Marked "Safe", 2: Marked: "Unsafe"
	clicked: number,
}

type cellArray = cellInfo[][];

const CellContainer = () => {
	const game = {
		rows: 8,
		cols: 4,
	}

	const [cellArray, setCellArray] = useState<cellArray>([
		[
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
	
		], [
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
	
		], [
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},

		], [
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
		], [
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
		], [
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
		], [
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
		], [
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
			{
				hasBomb: false,
				hints: [0, 0, 0, 0],
				showHints: [false, false, false, false,],
				clicked: 0,
			},
		],
	]);

	useEffect(() => {
		// 28 cells // 14 Hints // 7 Bombs
		setCellArray(prev => {
			const cells = [...prev];
			const bombArray : number[][] = [];
			for (let i = 0; i < 7; ++i) {
				let row = Math.floor(Math.random() * 8);
				let col = Math.floor(Math.random() * (row % 2 === 0 ? 4 : 3));				
				if (!cells[row][col].hasBomb) {
					bombArray.push([row, col]);
					cells[row][col].hasBomb = true;
				} else {
					--i;
				}
			}
			// Create hints based on surrounding cells
				// Needs to check 6 times:
							/* Even */	/* Odd */
					// NW: 	[-1, -1], 	[-1, +0],
					// N : 	[-2, +0],	[-2, +0],
					// NE: 	[-1, +0],	[-1, +1],
					// SE: 	[+1, +0],	[+1, +1],
					// S : 	[+2, +0],	[+2, +0],
					// SW: 	[+1, -1],	[+1, +0],
			for (let i = 0; i < bombArray.length; ++i) {
				const bRow = bombArray[i][0];	// Current Bomb Row
				const bCol = bombArray[i][1];	// Current Bomb Column
				// Add one to current Cell Count in All Count
				// ++cells[bRow][bCol].hints[3];

				

				// Add 1 to counter to each adjoining cell. Will need to check that there is a valid row/column for each direction.
					// When checking a row/column before current cell, check that new value is 0 or above
					// When checking a row/column after  current cell, check that new value is smaller than the row/column length
					// Row being even/odd only matters for East/West directions
				const isOdd = (bRow%2 === 0) ? false : true;			

				console.log(`
					Location: 	[${bRow}, ${bCol}],
					NW:			[${bRow-1}, ${bCol - (isOdd?0:1)}],
					N :			[${bRow-2}, ${bCol}],
					NE:			[${bRow-1}, ${bCol + (isOdd?1:0)}],
					SE:			[${bRow+1}, ${bCol + (isOdd?1:0)}],
					S :			[${bRow+2}, ${bCol}],
					SW:			[${bRow+1}, ${bCol - (isOdd?0:1)}],
				`)
				// Check Row Exists		// Check Column Exists in specific row
				// North-West:
				if ((bRow-1 > -1) 			&& (isOdd ? bCol < cells[bRow-1].length : bCol-1 > -1))	++cells[bRow-1][bCol-(isOdd?0:1)].hints[0];
				// North:
				if ((bRow-2 > -1) 			&& (bCol < cells[bRow-2].length))						++cells[bRow-2][bCol].hints[1];
				// North-East:
				if ((bRow-1 > -1) 			&& (bCol + (isOdd ? 1 : 0) < cells[bRow-1].length))		++cells[bRow-1][bCol+(isOdd?1:0)].hints[2];
				// South-East:
				if ((bRow+1 < cells.length)	&& (bCol + (isOdd ? 1 : 0) < cells[bRow+1].length))		++cells[bRow+1][bCol+(isOdd?1:0)].hints[0];
				// South:
				if ((bRow+2 < cells.length)	&& (bCol < cells[bRow+2].length)) 						++cells[bRow+2][bCol].hints[1];
				// South-West
				if ((bRow+1 < cells.length)	&& (isOdd ? bCol < cells[bRow+1].length : bCol-1 > -1))	++cells[bRow+1][bCol-(isOdd?0:1)].hints[2];

				
			}
			return cells;
		});
		console.log(cellArray);
	}, []);



	const createCells = () => {
		const cellArray : JSX.Element[][] = [];
		for (let i = 0; i < game.rows; ++i) {
			cellArray.push([]);
			for (let j = 0; j < (i % 2) ? game.cols : game.cols-1; ++j) {
				// cellArray[i].push(<Cell row={i} col={j} key={`${i}-${j}`}/>);
			}
		}
		const rowArray : JSX.Element[] = [];
		for (let i = 0; i < game.rows; ++i) {
			rowArray.push(
				<Row key={`Row${i}`} style={{transform: `translateY(${-48.5 * i}px)`}} className={(i % 2) ? classes.evenRow : classes.oddRow}>
					{/* {cellArray[i]} */}
				</Row>
			)
		}
		return rowArray;
	}

	// Handle Changing of cells when user clicks them
	const clickOnCellHandler = (row: number, col: number) => {
		console.log("Changing Color");
		setCellArray(prev => {
			// Copy previous state, add 1 to clicked if it is not already at 2 (range [0-2]), if 2 or above, set back to 0
			const newArray = [...prev];
			newArray[row][col].clicked = newArray[row][col].clicked >= 2 ? 0 : ++newArray[row][col].clicked;
			return newArray;
		});
	}

	const validateGame = () => {
		let bombCounter = 0;
		let incorrectCounter = 0;
		for (let i = 0; i < cellArray.length; ++i) {
			for (let j = 0; j < cellArray[i].length; ++j) {
				const cell = cellArray[i][j];
				if (cell.clicked === 0) {
					alert("You haven't marked every cell yet");
					return;
				} else if ((cell.clicked === 1) && cell.hasBomb) {
					++bombCounter;
				} else if ((cell.clicked === 2) && !cell.hasBomb) {
					++incorrectCounter;
				}
			}
		}
		if (bombCounter > 0 || incorrectCounter > 0) {
			alert(`Sorry... You missed: ${bombCounter} Bombs, and you marked ${incorrectCounter} safe cells as dangerous`)
		} else {
			alert("Congrats, you win!");
		}
	}

	return (
		<>
			<Container className={classes.cellContainer}>
				<Row key={`Row${0}`} style={{transform: `translateY(${-48.5 * 0}px)`}} className={(0 % 2) ? classes.oddRow : classes.evenRow}>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[0][0]} row={0} col={0} key={`${0}-${0}`}/>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[0][1]} row={0} col={1} key={`${0}-${1}`}/>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[0][2]} row={0} col={2} key={`${0}-${2}`}/>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[0][3]} row={0} col={3} key={`${0}-${3}`}/>
				</Row>
				<Row key={`Row${1}`} style={{transform: `translateY(${-48.5 * 1}px)`}} className={(1 % 2) ? classes.oddRow : classes.evenRow}>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[1][0]} row={1} col={0} key={`${1}-${0}`}/>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[1][1]} row={1} col={1} key={`${1}-${1}`}/>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[1][2]} row={1} col={2} key={`${1}-${2}`}/>
				</Row>
				<Row key={`Row${2}`} style={{transform: `translateY(${-48.5 * 2}px)`}} className={(2 % 2) ? classes.oddRow : classes.evenRow}>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[2][0]} row={2} col={0} key={`${2}-${0}`}/>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[2][1]} row={2} col={1} key={`${2}-${1}`}/>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[2][2]} row={2} col={2} key={`${2}-${2}`}/>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[2][3]} row={2} col={3} key={`${2}-${3}`}/>
				</Row>
				<Row key={`Row${3}`} style={{transform: `translateY(${-48.5 * 3}px)`}} className={(3 % 2) ? classes.oddRow : classes.evenRow}>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[3][0]} row={3} col={0} key={`${3}-${0}`}/>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[3][1]} row={3} col={1} key={`${3}-${1}`}/>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[3][2]} row={3} col={2} key={`${3}-${2}`}/>
				</Row>
				<Row key={`Row${4}`} style={{transform: `translateY(${-48.5 * 4}px)`}} className={(4 % 2) ? classes.oddRow : classes.evenRow}>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[4][0]} row={4} col={0} key={`${4}-${0}`}/>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[4][1]} row={4} col={1} key={`${4}-${1}`}/>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[4][2]} row={4} col={2} key={`${4}-${2}`}/>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[4][3]} row={4} col={3} key={`${4}-${3}`}/>
				</Row>
				<Row key={`Row${5}`} style={{transform: `translateY(${-48.5 * 5}px)`}} className={(5 % 2) ? classes.oddRow : classes.evenRow}>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[5][0]} row={5} col={0} key={`${5}-${0}`}/>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[5][1]} row={5} col={1} key={`${5}-${1}`}/>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[5][2]} row={5} col={2} key={`${5}-${2}`}/>
				</Row>
				<Row key={`Row${6}`} style={{transform: `translateY(${-48.5 * 6}px)`}} className={(6 % 2) ? classes.oddRow : classes.evenRow}>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[6][0]} row={6} col={0} key={`${6}-${0}`}/>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[6][1]} row={6} col={1} key={`${6}-${1}`}/>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[6][2]} row={6} col={2} key={`${6}-${2}`}/>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[6][3]} row={6} col={3} key={`${6}-${3}`}/>
				</Row>
				<Row key={`Row${7}`} style={{transform: `translateY(${-48.5 * 7}px)`}} className={(7 % 2) ? classes.oddRow : classes.evenRow}>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[7][0]} row={7} col={0} key={`${7}-${0}`}/>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[7][1]} row={7} col={1} key={`${7}-${1}`}/>
					<Cell clickHandler={clickOnCellHandler} cellInfo={cellArray[7][2]} row={7} col={2} key={`${7}-${2}`}/>
				</Row>
			</Container>
			<Button onClick={validateGame}>Validate!</Button>
		</>
	);
}

export default CellContainer;