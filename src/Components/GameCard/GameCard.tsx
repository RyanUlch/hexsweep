import Card from 'react-bootstrap/Card';
import ClickDragArea from '../ClickDragArea/ClickDragArea';
import CellRow from '../CellRow/CellRow';
import { useEffect, useState, useRef } from 'react';
import classes from './GameCard.module.css';

interface Props {
	info: gameInfo,
	arr: gameArray,
	cellClick: (row: number, col: number)=>void,
	createFlag: (row: number, col: number)=>void,
}

const GameCard = (props: Props) => {
	// const [isDragged, setIsDragged] = useState(false);
	// Reference to the game container (where the user plays, is passed to get correct sizing);
	const cardRef = useRef<HTMLDivElement>(null);

	// State for if ClickDragArea is being dragged to prevent errant clicks of cells
	const [, setIsDragged] = useState(false);
	const [parentSize, setParentSize] = useState([0,0]);
	useEffect(() => {
		if (cardRef.current) {
			setParentSize([cardRef.current.offsetWidth, cardRef.current.offsetHeight]);
		}
	}, [cardRef.current]);


	return (
		<>
			<Card ref={cardRef} className={`${props.info.isFinished ? classes.finished : classes.notFinished} ${classes.gameAreaBody}`}>
				{props.info.gameNumber > 0 ? <ClickDragArea setDrag={setIsDragged} gameStart={props.info.gameNumber > 0} parentSize={parentSize} difficulty={props.info.difficulty}>
					<div>
						{props.arr.map((row, index) => {
							return <CellRow key={`R${index}`} rowNum={index} rowArray={row.rowArray} buffer={row.buffer} gameNum={props.info.gameNumber} isDragged={setIsDragged} onClick={props.cellClick} onFlag={props.createFlag}/>;
						})}
					</div>
				</ClickDragArea> : <></>}
			</Card>
		</>
	)
}

export default GameCard;