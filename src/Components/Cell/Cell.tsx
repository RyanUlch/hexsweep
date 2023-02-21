// CSS Import:
import classes from './Cell.module.css';
// React, React-Types Imports:
import { useEffect, useState, useRef } from 'react';
// Component Imports:
import Hexagon from '../Hexagon/Hexagon';
import Arrow from '../Arrow/Arrow';

interface Props {
	cellInfo: cellInfo,
	row: number,
	col: number,
	gameNum: number,
	isDragged: React.Dispatch<React.SetStateAction<boolean>>,
	onClick: (row: number, col: number) => void,
	onFlag: (row: number, col: number) => void,
}

// Cell used to display current state of 1 game piece.
// Needs to handle being clicked, and triggering changing in Game state through prop method
// State being used for what the cell should have for BackgroundColor, and text.
// No logic is run from Cell, and for display and click handler purposes.
// Tests: "Click on Cell", "Handle Click passing to Props"
const Cell = (props: Props) => {
	// Hint contains the "radar" of the space. Updates dynamically
	const [hint, setHint] = useState(<></>);
	// Ref used to have the latest info of how many times the user clicks the cell
	const clickRef = useRef(0);

	// Cell click/tap handlers. These send the row and column information after it has been determined if the user is:
		// Left-clicking, single-tapping: Attempt to mark the space as safe.
	const markSafe = () => { props.onClick(props.row, props.col); }
		// Right-clicking, double-clicking, double-tapping: Mark the space as unsafe.
	const markUnsafe = () => { props.onFlag(props.row, props.col); }

	// Handlers - make sure to determine if user is clicking or double clicking (tapping)
	const handleClick = (event: React.SyntheticEvent) => {
		++clickRef.current;
		props.isDragged(prev => {
			if (!prev) {
				if (clickRef.current === 1) {
					setTimeout(() => {
						clickRef.current === 1 ? markSafe() : markUnsafe();
						clickRef.current = 0;
					}, 400);
				}
			} else {
				clickRef.current = 0;
			}
			return prev;
		});
	};

	// Check if the player is double tapping screen based on the timeout. Don't run single tap event if so to prevent rerenders
	// Note had to use code duplication due to the fact that handling click and touch events are different
	const tapCounter = () => {
		++clickRef.current;
		props.isDragged(prev => {
			if (!prev) {
				if (clickRef.current === 1) {
					setTimeout(() => {
						clickRef.current === 1 ? markSafe() : markUnsafe();
						clickRef.current = 0;
					}, 400);
				}
			} else {
				clickRef.current = 0;
			}
			return prev;
		});
	}

	// Special handler that is used for right-clicking a cell. No need to time the duration between clicks
	const handleFlag = (e: React.SyntheticEvent) => {
		e.preventDefault();
		props.isDragged(prev => {
			if (!prev) { markUnsafe();}
			return prev;
		});
	}

	// Using state and useEffect to be able to change the hint dynamically when the user selects the space, or uses a hint.
	useEffect(() => {
		setHint(() => {
			if (props.cellInfo.hint > -1 && props.cellInfo.hint !== 3) {
				return <Arrow direction={props.cellInfo.hint} indicator={props.cellInfo.hints[props.cellInfo.hint]} />;
			} else if (props.cellInfo.hint === 3) {
				return (
					<span className={classes.allHintText}>
						<Arrow direction={1} indicator={props.cellInfo.hints[1]} />
						<div className={classes.bottom}>
							<Arrow direction={0} indicator={props.cellInfo.hints[0]} />
							<Arrow direction={2} indicator={props.cellInfo.hints[2]} />
						</div>
					</span>
				);
			} else {
				return <></>;
			}
		})
	}, [props.cellInfo.hint, props.cellInfo.hints, props.gameNum]);

	// Show hint text above Hexagon background. Hint number and symbol provided by parent
	// Click event to send row and column info up to parent
	return (
		
		<div
			onClick={handleClick}
			onContextMenu={handleFlag}
			onTouchEnd={tapCounter}
			className={`${classes.cell} ${props.cellInfo.cellState === 0 ? classes.inactive : props.cellInfo.cellState === 1 ? classes.safe : classes.bomb}`}
		>
			{hint}
			<Hexagon />
		</div>
	);
};

export default Cell;