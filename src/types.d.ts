// Buffer is the number of inactive cells before displaying cells that are in-play
type buffer = number;

// cellInfo contains the data associated with a specific cell.
// Used for displaying information to user, and to determine event outcomes
// Cell state is used to determine the color of the cell. 0: Untouched, 1: clicked (green), 2: bomb (red - can be triggered by clicking bomb cell, or after game ends)
// Hints are stored based on direction (0: NW/SE, 1: N/S, 2: NE/SW)
type cellInfo = {
	isBomb: boolean;
	hints: [number, number, number];
	hint: number;
	cellState: number;
}

// GameArray contains 2D array of games state.
// Rows are the first array // buffer + CellInfo is the second
type gameArray = {buffer: buffer, rowArray: cellInfo[]}[];

/*	gameArray Sample:
	[
		{
			buffer: 1,
			rowArray: [
				cellInfoObj,
				cellINfoObj,
			]
		}
	]
*/