import Card from 'react-bootstrap/Card';
import classes from './StatsCard.module.css';
import SideCouple from '../SideCouple/SideCouple';
import Timer from '../Timer/Timer';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

interface Props {
	info: gameInfo,
	newGame: ()=>void,
	newHint: ()=>void,
}

const StatsCard = (props: Props) => {
	return (
		<Card className={classes.statsCard}>
			<Card.Header>
				Stats & Tools
			</Card.Header>
			<Card.Body>
				{/* <Container className='p-0'> */}
					<Row xs={4} md={1} className={classes.sideCoupleContainer}>
						<SideCouple isButton={true} isDisabled={props.info.freeHintsLeft === 0} isActive={props.info.freeHintNext} clickHandler={props.newHint}>
							<p className={classes.coupleTitle}>Hints:</p>
							<p className={classes.coupleBody}>{`${props.info.freeHintsLeft}/${props.info.freeHintNum} Left`}</p>
						</SideCouple>
						<SideCouple>
							<p className={classes.coupleTitle}>Found:</p>
							<p className={classes.coupleBody}>{props.info.bombsFlagged}/{props.info.bombNum} Bombs</p>
						</SideCouple>
						<SideCouple>
							<p className={classes.coupleTitle}>Game Time:</p>
							<Timer id='timer' isStopped={props.info.isFinished} gameNumber={props.info.gameNumber}/>
						</SideCouple>
						<SideCouple>
							<p className={classes.coupleTitle}>Games Won:</p>
							<p className={classes.coupleBody}>{props.info.gamesWon}/{props.info.gameNumber}</p>
						</SideCouple>
					</Row>
				{/* </Container> */}
			</Card.Body>
			<a className={props.info.freeHintNext ? classes.newGameBtnActive : classes.newGameBtn} onClick={props.newGame}>
				<Card.Footer>
					New Game
				</Card.Footer>
			</a>
		</Card>
	)
}

export default StatsCard;