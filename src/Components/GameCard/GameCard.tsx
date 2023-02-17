import Card from 'react-bootstrap/Card';
import ClickDragArea from '../ClickDragArea/ClickDragArea';
import CellRow from '../CellRow/CellRow';
import { useState, useRef } from 'react';
import ModalRules from '../Modals/ModalRules';
import classes from './GameCard.module.css';

interface Props {
	info: gameInfo,
	arr: gameArray,
	cellClick: (row: number, col: number)=>void,
	createFlag: (row: number, col: number)=>void,

}

const GameCard = (props: Props) => {
	const [isDragged, setIsDragged] = useState(false);
	// Reference to the game container (where the user plays, is passed to get correct sizing);
	const cardRef = useRef<HTMLDivElement>(null);

	

	return (
		<>
			<Card ref={cardRef} className={classes.gameAreaBody}>
				<ClickDragArea setDrag={setIsDragged} gameStart={props.info.gameNumber > 0} parentRef={cardRef} difficulty={props.info.difficulty}>
					<div>
						{props.arr.map((row, index) => {
							return <CellRow key={`R${index}`} rowNum={index} rowArray={row.rowArray} buffer={row.buffer} isDragged={isDragged} gameNum={props.info.gameNumber} setDragged={setIsDragged} onClick={props.cellClick} onFlag={props.createFlag}/>;
						})}
					</div>
				</ClickDragArea>
			</Card>
		</>
	)
}

export default GameCard;