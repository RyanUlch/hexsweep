import classes from './CellRow.module.css';
import { useEffect } from 'react';
import Cell from '../Cell/Cell';
import type { Dispatch, SetStateAction } from 'react';


// Props interface:
interface Props {
	rowNum: number,
	rowArray: cellInfo[],
	buffer: number,
	onClick: (row: number, col: number) => void,
	onFlag: (row: number, col: number) => void,
	isDragged: boolean,
	setDragged: Dispatch<SetStateAction<boolean>>,
	gameNum: number,
}

// Row handles displaying "Cells" and the space needed before starting cell
// Row should only determine placement of cells, all game logic handled above (requires passing props from parent to each cell)
const CellRow = (props: Props) => {
	return (
		<div className={classes.row}>
			{props.rowArray.map((cell, index) => {
				return (
					<Cell key={`r${props.rowNum}c${index}`} onClick={props.onClick} row={props.rowNum} col={index} cellInfo={cell} gameNum={props.gameNum} setDragged={props.setDragged} isDragged={props.isDragged} onFlag={props.onFlag}/>
				);
			})}
		</div>
	);
};

export default CellRow;