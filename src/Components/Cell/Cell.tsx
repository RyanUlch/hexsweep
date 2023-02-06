// const Cell = (props: Props) => {

// 	// State to determine the ClassName to use to set the background color of cells
// 	const [clickedClassState, setClickedClassState] = useState(classes.inActive);

// 	// Update the clickedClassState when props.cellInfo.clicked changes
// 	useEffect(() => {
// 		setClickedClassState(() => {
// 			switch (props.cellInfo.clicked) {
// 				case 0: return classes.inActive;
// 				case 1: return classes.safe;
// 				case 2: return classes.unsafe;
// 				default: throw Error('Not a valid "clicked" property of cell Info');
// 			}
// 		})
// 	}, [props.cellInfo.clicked]);

// 	const handleClick = (event: React.SyntheticEvent) => {
// 		event.preventDefault(); event.stopPropagation();
// 		props.clickHandler(props.row, props.col);
// 	}

// 	return (
// 		<div data-testid='cell' className={`${classes.base} ${clickedClassState}`} onClick={handleClick}>
// 			<HexagonBack hints={props.cellInfo.hints} show={props.cellInfo.showHints} newHint={props.hintNum}/>
// 		</div>
// 	);
// }

// export default Cell;

// CSS Import:
import classes from './Cell.module.css';
// Component Imports:
import Hexagon from '../Hexagon/Hexagon';
// Helper imports:
import { errorReport } from '../../helper/errorHelpers';

import { useEffect, useState } from 'react';

// Props interface:
export interface Props {
	cellInfo: cellInfo;
	row: number;
	col: number;
	onClick: (row: number, col: number) => void;
}

// Cell used to display current state of 1 game piece.
// Needs to handle being clicked, and triggering changing in Game state through prop method
// State being used for what the cell should have for BackgroundColor, and text.
// No logic is run from Cell, and for display and click handler purposes.
// Tests: "Click on Cell", "Handle Click passing to Props"

const Cell = (props: Props) => {
	// Handling clicking on the cell by sending row/col info up to parent
	const handleClick = (event: React.SyntheticEvent) => {
		event.preventDefault();
		event.stopPropagation();
		props.onClick(props.row, props.col);
	};

	const [hint, setHint] = useState("");

	useEffect(() => {
		setHint(() => {
			switch (props.cellInfo.hint) {
				case 0: 
					return `${props.cellInfo.hints[props.cellInfo.hint]} \u2921`;
				case 1:
					return `${props.cellInfo.hints[props.cellInfo.hint]} \u2B0D`;
				case 2:
					return `${props.cellInfo.hints[props.cellInfo.hint]} \u2922`;
				default: return '';
			}
		})
	}, [props.cellInfo.hint]);

	// Show hint text above Hexagon background. Hint number and symbol provided by parent
	// Click event to send row and column info up to parent
	return (
		<div
			onClick={handleClick}
			// className={props.cellInfo.cellState === 0 ? classes.inactive : props.cellInfo.cellState === 1 ? classes.safe : classes.bomb}
			className={props.cellInfo.isBomb ? classes.bomb : classes.safe}
		>
			<p className={classes.text}>
				{hint}
			</p>
			<Hexagon />
		</div>
	);
};

export default Cell;
