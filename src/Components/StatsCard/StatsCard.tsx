import Card from 'react-bootstrap/Card';
import classes from './StatsCard.module.css';
import SideCouple from '../SideCouple/SideCouple';
import Timer from '../Timer/Timer';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

interface Props {
	info: gameInfo,
	newGame: ()=>void,
	newHint: ()=>void,
}

const StatsCard = (props: Props) => {
	return (
		<Card className={classes.statsCard}>
			<Card.Header className='cardHeader'>
				Stats & Tools
			</Card.Header>
			<Card.Body className={classes.body}>
					<Row xs={4} md={1} className='m-0'>
						<SideCouple isButton={true} isDisabled={props.info.freeHintsLeft === 0} isActive={props.info.freeHintNext} clickHandler={props.newHint}>
							<p className={`${classes.coupleTitle} ${classes.linkTitle}`}>Hints:</p>
							<p className={classes.coupleBody}>{`${props.info.freeHintsLeft}/${props.info.freeHintNum}`}</p>
						</SideCouple>
						<SideCouple>
							<p className={classes.coupleTitle}>Found:</p>
							<p className={classes.coupleBody}>{props.info.bombsFlagged}/{props.info.bombNum}</p>
						</SideCouple>
						<SideCouple>
							<p className={classes.coupleTitle}>Time:</p>
							<Timer id='timer' isStopped={props.info.isFinished} gameNumber={props.info.gameNumber}/>
						</SideCouple>
						<SideCouple>
							<p className={classes.coupleTitle}>Won:</p>
							<p className={classes.coupleBody}>{props.info.gamesWon}/{props.info.gameNumber}</p>
						</SideCouple>
					</Row>
			</Card.Body>
			<button className={`${classes.newGameLink} ${props.info.freeHintNext ? classes.newGameBtnActive : classes.newGameBtn}`} onClick={props.newGame}>
				<Card.Footer>
					New Game
				</Card.Footer>
			</button>
		</Card>
	)
}

export default StatsCard;