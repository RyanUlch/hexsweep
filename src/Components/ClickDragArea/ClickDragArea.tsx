import classes from './ClickDragArea.module.css'
import Draggable from "react-draggable";
import { useState, useEffect, useRef } from 'react';

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

	// const cardRef = useRef<HTMLDivElement>(null);

	return (
		<div className={classes.dragAreaContainer}>

		{props.gameStart
			? 
				<Draggable
				onDrag={disableClick}
				onStop={enableClick}
				defaultPosition={{x: 0, y: 0}}//-parentSize[1]/4}}
				// bounds={{left: parentSize[0]*-0.5, top: parentSize[1]*-2, right: parentSize[0]/2, bottom: 0}}
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