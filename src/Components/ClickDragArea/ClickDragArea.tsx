// CSS Import:
import classes from './ClickDragArea.module.css'
// React, React-Component Imports:
import { useRef } from 'react';
import Draggable from "react-draggable";

interface Props {
	children: JSX.Element | JSX.Element[],
	difficulty: number,
	parentSize: number[],
	gameStart: boolean,
	setDrag: React.Dispatch<React.SetStateAction<boolean>>,
}

// ClickDragArea is the underlying "game board" is a fixed length and width so it can slide the spaces around.
const ClickDragArea = (props: Props) => {
	// Ref used to not let {disableClick} run multiple times
	const setRef = useRef(false);

	// When user lifts up the mouse/touchscreen, allow user to click cells again
	const enableClick = () => {
		// Need to use timeout, as a race condition occurs with the click handler in {cell} when user stops dragging area
		setTimeout(() => {
			props.setDrag(false);
			window.removeEventListener('mouseup', enableClick);
			window.removeEventListener('touchend', enableClick);
			setRef.current = false;
		}, 10);
	}

	// When user clicks and drags on the play area, prevent the selection of cells. When the user stops, allow user to click again.
	const disableClick = () => {
		if (!setRef.current) {
			props.setDrag(true);
			setRef.current = true;
			window.addEventListener('mouseup', enableClick);
			window.addEventListener('touchend', enableClick);
		}
	}

	return (
		<div className={classes.dragAreaContainer} onTouchMove={disableClick}>
			{props.gameStart
				? <Draggable
					onDrag={disableClick}
					// Bounds/DefaultPosition are set statically as the size of the underlying container is also static
						// It's so large that you won't be able to hit the edges
					defaultPosition={{x: -(1000-props.parentSize[0])-props.parentSize[0]/4, y: -(1000-props.parentSize[1])-props.parentSize[1]/4}}
					bounds={{left: -1200 , top: -1200, right: 400, bottom: 280}}
				>
					<div className={`${classes.dragArea}`}>
						<div className={classes.rowContainer}>
							{props.children}
						</div>
					</div>
				</Draggable>
				: <></>}
		</div>
	)
}

export default ClickDragArea;