import classes from './ClickDragArea.module.css'
import Draggable from "react-draggable";
import { useState, useEffect } from 'react';

import type {DraggableEvent} from 'react-draggable';
import type {Dispatch, SetStateAction} from 'react';

interface Props {
	children: JSX.Element | JSX.Element[],
	difficulty: number,
	parentRef: React.RefObject<HTMLDivElement>,
	gameStart: boolean,
	setDrag: Dispatch<SetStateAction<boolean>>,
}

const ClickDragArea = (props: Props) => {
	const [parentSize, setParentSize] = useState(()=> {
		if (props.parentRef.current) {
			return [props.parentRef.current.offsetWidth, props.parentRef.current.offsetHeight]
		} else {
			return [0, 0];
		}
		});

	useEffect(() => {
		setParentSize(() => {
			if (props.parentRef.current) {
				return [props.parentRef.current.offsetWidth, props.parentRef.current.offsetHeight];
			} else {
				return [0,0];
			}
		});
	}, [props.parentRef.current?.offsetHeight, props.parentRef.current?.offsetWidth]);

	const disableClick = (e: DraggableEvent) => {
		e.preventDefault();
		e.stopPropagation();
		props.setDrag(true);
	}

	const enableClick = (e: any) => {
		e.preventDefault();
		e.stopPropagation();
		setTimeout(() => {
			props.setDrag(false);
		}, 100);
	}

	return (
		// <Draggable bounds={{left: (props.difficulty*(-(dragArea/2))), top: (props.difficulty*(-(dragArea/2))), right: (props.difficulty*(dragArea/2)), bottom: (props.difficulty*(dragArea/2))}}>
		props.gameStart
			? <Draggable
				onDrag={disableClick}
				onStop={enableClick}
				defaultPosition={{x: -parentSize[0]/2, y: -parentSize[1]/2}}
				bounds={{left: parentSize[0]*-1, top: parentSize[1]*-1, right: 0, bottom: 0}}>
				<div className={`${classes.dragArea}`}>
					<div className={classes.rowContainer}>
						{props.children}
					</div>
				</div>
			</Draggable>
		: <></>
	)
}

export default ClickDragArea;