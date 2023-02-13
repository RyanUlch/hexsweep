/* Setup/New Game Function Section - Called by useEffects when setting up new games*/
// Generates the cellInfo for each cell with initial state within given row
export const infoArrGen = (cellAmt: number, midCellCol: number, difficulty: number, midline: boolean = false) => {
	const cellInfoArr: cellInfo[] = [];
	for (let i = 0; i < cellAmt; ++i) {
		const isMidCell = (midline && i === midCellCol);
		cellInfoArr.push({isBomb: false, hints: [0, 0, 0], hint: isMidCell ? 3 : -1, cellState: isMidCell ? 1 : 0});
	}
	return cellInfoArr;
};

// Generates the number of buffer cells needed. Only used on Pre and Post full rows (full rows have no buffer)
export const bufferGen = (isPre: boolean, row: number, rowAmt: number, difficulty: number) => Math.floor((difficulty-(isPre ? row+1 : rowAmt-row))/2);

// Create hints based on surrounding cells
export const updateHints = (arr: gameArray, bombArr: number[][], difficulty: number) => {
	// Needs to check 6 times:
			/* Even */ 	/* Odd */
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
		const isOdd = 	(difficulty % 2 === 0 
							? (bRow % 2 === 0) ? false : true
							: (bRow % 2 === 0) ? true : false
						);
		// Logic for finding column number in array with buffer considered
		const bColExp = [
			// North-West/South-East				// North/South				// North-East/South-West
			bCol-arr[bRow-1]?.buffer-(isOdd?1:0),	bCol-arr[bRow-2]?.buffer,	bCol-arr[bRow-1]?.buffer+(isOdd?0:1),
			bCol-arr[bRow+1]?.buffer+(isOdd?0:1),	bCol-arr[bRow+2]?.buffer,	bCol-arr[bRow+1]?.buffer-(isOdd?1:0),
		];
		//  Lengths of all possible rows, can be undefined if doesn't exist, won't interfere with below check
		const bRowExp = [
			// East/West 					// North/South
			arr[bRow-1]?.rowArray.length, 	arr[bRow-2]?.rowArray.length,
			arr[bRow+1]?.rowArray.length, 	arr[bRow+2]?.rowArray.length,
		];
		// Check Row Exists			// Check Column is within row and not Negative		// Set hint for specific direction if passed all checks
		// North-West:
		if ((bRow - 1 > -1) 		&& (bColExp[0] < bRowExp[0]) && (bColExp[0] > -1)) 	++arr[bRow-1].rowArray[bColExp[0]].hints[0];
		// North:
		if ((bRow - 2 > -1) 		&& (bColExp[1] < bRowExp[1]) && (bColExp[1] > -1)) 	++arr[bRow-2].rowArray[bColExp[1]].hints[1];
		// North-East:
		if ((bRow - 1 > -1) 		&& (bColExp[2] < bRowExp[0]) && (bColExp[2] > -1)) 	++arr[bRow-1].rowArray[bColExp[2]].hints[2];
		// South-East:
		if ((bRow + 1 < arr.length) && (bColExp[3] < bRowExp[2]) && (bColExp[3] > -1)) 	++arr[bRow+1].rowArray[bColExp[3]].hints[0];
		// South:
		if ((bRow + 2 < arr.length) && (bColExp[4] < bRowExp[3]) && (bColExp[4] > -1)) 	++arr[bRow+2].rowArray[bColExp[4]].hints[1];
		// South-West
		if ((bRow + 1 < arr.length) && (bColExp[5] < bRowExp[2]) && (bColExp[5] > -1)) 	++arr[bRow+1].rowArray[bColExp[5]].hints[2];
	}
	return;
};

// Generates the locations of the bomb-cells mutates passed array, and returns array of the bombs locations
export const bombGen = (arr: gameArray, rowAmt: number, cellAmt: number, midCell: number[], bombNum: number) => {
	const bombArr: number[][] = [];
	// const bombNum: number = Math.floor(cellAmt / 4 + Math.random() * difficulty);
	for (let i = 0; i < bombNum; ++i) {
		let row = Math.floor(Math.random() * rowAmt);
		let col = Math.floor(Math.random() * arr[row].rowArray.length);
		// Check that selected cell is valid for bomb placement (doesn't have a bomb already and is not the middle cell);
		if (!arr[row].rowArray[col].isBomb && row !== midCell[0] && row !== midCell[1]) {
			arr[row].rowArray[col].isBomb = true;
			bombArr.push([row, col]);
		} else {--i}
	}
	return bombArr;
};