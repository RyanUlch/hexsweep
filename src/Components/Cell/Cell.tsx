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
	onFlag: (row: number, col: number) => void;
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

	const handleFlag = (event: React.SyntheticEvent) => {
		event.preventDefault();
		event.stopPropagation();
		props.onFlag(props.row, props.col);
	}

	const [hint, setHint] = useState(<></>);

	useEffect(() => {
		setHint(() => {
			switch (props.cellInfo.hint) {
				case 0: 
					return <p className={classes.text}>{`${props.cellInfo.hints[props.cellInfo.hint]} \u2921`}</p>;
				case 1:
					return <p className={classes.text}>{`${props.cellInfo.hints[props.cellInfo.hint]} \u2B0D`}</p>;
				case 2:
					return <p className={classes.text}>{`${props.cellInfo.hints[props.cellInfo.hint]} \u2922`}</p>;
				case 3:
					return (
					<>
						<p className={classes.text}>{`${props.cellInfo.hints[0]}\u2921`}</p>
						<p className={classes.text}>{`${props.cellInfo.hints[1]}\u2B0D`}</p>
						<p className={classes.text}>{`${props.cellInfo.hints[2]}\u2922`}</p>
					</>)
				default: return <></>;
			}
		})
	}, [props.cellInfo.hint]);

	// Show hint text above Hexagon background. Hint number and symbol provided by parent
	// Click event to send row and column info up to parent
	return (
		<div
			onClick={handleClick}
			onContextMenu={handleFlag}
			className={`${classes.cell} ${props.cellInfo.cellState === 0 ? classes.inactive : props.cellInfo.cellState === 1 ? classes.safe : classes.bomb}`}
			// className={props.cellInfo.isBomb ? classes.bomb : classes.safe}
		>
			
				{hint}
			
			<Hexagon />
		</div>
	);
};

export default Cell;
