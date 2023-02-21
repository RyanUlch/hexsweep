// CSS Import:
import classes from './CellRow.module.css';
// Component Imports:
import Cell from '../Cell/Cell';

interface Props {
	rowNum: number,
	rowArray: cellInfo[],
	buffer: number,
	onClick: (row: number, col: number) => void,
	onFlag: (row: number, col: number) => void,
	isDragged: React.Dispatch<React.SetStateAction<boolean>>,
	gameNum: number,
}

// Row handles displaying "Cells" and the space needed before starting cell
// Row should only determine placement of cells, all game logic handled above (requires passing props from parent to each cell)
const CellRow = (props: Props) => {
	return (
		<div className={classes.row}>
			{/* Map through all rows passing props for the game handlers, as well as row information */}
			{props.rowArray.map((cell, index) => {
				return (
					<Cell key={`r${props.rowNum}c${index}`} onClick={props.onClick} row={props.rowNum} col={index} cellInfo={cell} gameNum={props.gameNum} isDragged={props.isDragged} onFlag={props.onFlag}/>
				);
			})}
		</div>
	);
};

export default CellRow;