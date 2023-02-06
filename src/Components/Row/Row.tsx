import classes from './Row.module.css';
import { useEffect } from 'react';
import Cell from '../Cell/Cell';

// Props interface:
export interface Props {
	rowNum: number;
	rowArray: cellInfo[];
	buffer: number;
	onClick: (row: number, col: number) => void;
	onFlag: (row: number, col: number) => void;
}

// Row handles displaying "Cells" and the space needed before starting cell
// Row should only determine placement of cells, all game logic handled above (requires passing props from parent to each cell)
const Row = (props: Props) => {
	useEffect(() => {

	}, [{...props}]);

	return (
		<div className={classes.row}>
			{props.rowArray.map((cell, index) => {
				return (
					<Cell key={`r${props.rowNum}c${index}`} onClick={props.onClick} row={props.rowNum} col={index} cellInfo={props.rowArray[index]} onFlag={props.onFlag}/>
				);
			})}
		</div>
	);
};

export default Row;
