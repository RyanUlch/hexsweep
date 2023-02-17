// CSS Import:
import classes from './Cell.module.css';
// Component Imports:
import Hexagon from '../Hexagon/Hexagon';
import Arrow from '../Arrow/Arrow';
// Helper imports:

import { useEffect, useState, useRef } from 'react';

import type { Dispatch, SetStateAction } from 'react';
import type { TouchEvent, TouchEventHandler, RefObject, MutableRefObject } from 'react';

// Props interface:
interface Props {
	cellInfo: cellInfo,
	row: number,
	col: number,
	isDragged: boolean,
	gameNum: number,
	setDragged: Dispatch<SetStateAction<boolean>>,
	onClick: (row: number, col: number) => void,
	onFlag: (row: number, col: number) => void,
}

// Cell used to display current state of 1 game piece.
// Needs to handle being clicked, and triggering changing in Game state through prop method
// State being used for what the cell should have for BackgroundColor, and text.
// No logic is run from Cell, and for display and click handler purposes.
// Tests: "Click on Cell", "Handle Click passing to Props"
const Cell = (props: Props) => {
	const markSafe = () => {
		if (!props.isDragged) {
			props.onClick(props.row, props.col);
		}
	}
	const markUnsafe = () => {
		if (!props.isDragged) {
			props.onFlag(props.row, props.col);
		}
	}

	let clickCount = 0;
	// Handling clicking on the cell by sending row/col info up to parent
	const handleClick = (event: React.SyntheticEvent) => {
		event = event || window.event;
		event.preventDefault();
		event.stopPropagation();
		clickCount++;
		if (clickCount === 1) {
			setTimeout(function(){
				(clickCount === 1) ? markSafe() : markUnsafe();
				clickCount = 0;
			}, 200);
		}
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
					return <span className={classes.text}>{`${props.cellInfo.hints[props.cellInfo.hint]}`}<Arrow arrowType={0}/></span>;
				case 1:
					return <span className={classes.text}>{`${props.cellInfo.hints[props.cellInfo.hint]}`}<Arrow arrowType={1}/></span>;
				case 2:
					return <span className={classes.text}>{`${props.cellInfo.hints[props.cellInfo.hint]}`}<Arrow arrowType={2}/></span>;
				case 3:
					return (
					<span className={classes.allHintText}>
						<p>{props.cellInfo.hints[1]}<Arrow arrowType={1} /></p>
						<p>{props.cellInfo.hints[0]}<Arrow arrowType={0} />&nbsp;
						{props.cellInfo.hints[2]}<Arrow arrowType={2} /></p>
					</span>)
				default: return <></>;
			}
		})
	}, [props.cellInfo.hint, props.gameNum]);

// Check if the player is double tapping screen based on the timeout. Don't run single tap event if so to prevent rerenders
	// Note had to use code duplication due to the fact that handling click and touch events are different
	const tapCounter = (event: React.SyntheticEvent) => {
		event = event || window.event;
		event.stopPropagation();
		clickCount++;
		if (clickCount === 1) {
			setTimeout(function(){
				(clickCount === 1) ? markSafe() : markUnsafe();
				clickCount = 0;
			}, 200);
		}
	}

	// Show hint text above Hexagon background. Hint number and symbol provided by parent
	// Click event to send row and column info up to parent
	return (
		<div
			onClick={handleClick}
			onContextMenu={handleFlag}
			onTouchStart={tapCounter}
			className={`${classes.cell} ${props.cellInfo.cellState === 0 ? classes.inactive : props.cellInfo.cellState === 1 ? classes.safe : classes.bomb}`}
		>
			{hint}
			<Hexagon />
		</div>
	);
};

export default Cell;
