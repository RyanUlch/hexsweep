import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import classes from './Modal.module.css';
import ListGroup from 'react-bootstrap/ListGroup';

interface Props {
	show: boolean
	handleClose: ()=>void
}

const ModalRules = (props: Props) => {
	return (
		<Modal className={classes.modal} show={props.show} onHide={props.handleClose}>
			<Modal.Header className={classes.modalHeader}>
				<Modal.Title>Hex-Sweep Rules:</Modal.Title>
				<Button onClick={props.handleClose} type="button" className="btn-close" aria-label="Close"></Button>
			</Modal.Header>
			<Modal.Body className={`${classes.modalBody}`}>
				<ListGroup>
					<ListGroup.Item>
						<h4>Objective:</h4>
						<ul>
							<li>The objective of Hex-Sweep is to help make the waters safe for ships to navigate.</li>
							<hr />
							<li>You'll accomplish this by marking cells safe and unsafe to sail in.</li>
							<hr />
							<li>To determine which spaces contain bombs or not, there are "Radars" you can use. These tell you the number of bombs are adjacent to that space; but only in certain directions (they aren't great radars).</li>
						</ul>					
					</ListGroup.Item>
					<ListGroup.Item>
						<h4>To Start:</h4>
						<ul>
							<li>Select the new Game button in the "Stats & Tools Bar". Then select the difficulty you would like to play.
							<br />&nbsp;&nbsp;&nbsp;Note: Beginner difficulty is extremely easy and is only intended to let someone understand how the game plays.</li>
							<hr />
							<li>When the game begins, you will see that the middle space already has a "Full Radar" telling you the number of bombs in each direction.</li>
						</ul>
					</ListGroup.Item>
					<ListGroup.Item>
						<h4>To Play:</h4>
						<ul>
							<li>Use the information of the Radars to mark cells safe or unsafe.</li>
							<hr />
							<li>To mark a space safe, simply left-click or tap the space. When you do this, you will be given a prompt to select a directional Radar to put on that space.</li>
							<hr />
							<li>To mark a space unsafe, you can right-click, or double click (double tap on touchscreens). You are not given a radar for these spaces as they are too dangerous.
							<br />&nbsp;&nbsp;&nbsp;Please Note: You can undo marking spaces as unsafe by right-clicking/double-clicking(tapping) again. You cannot do this with safe-marked spaces as you already selected the radar you would like in that space.</li>
							<hr />
							<li>To use a hint, click on the "Hints" button in the "Stats and Tools" bar to activate hint mode. Then simply select a space to put a "Full Radar" on that space, as well as marking if it is safe or unsafe (if not already marked).
							<br />&nbsp;&nbsp;&nbsp;Note: This can be done on any space that does not already have a "Full Radar", including unsafe spaces: this does not end the game. Use them anywhere, but be careful as you only have a limited supply of these.</li>
						</ul>
					</ListGroup.Item>
					<ListGroup.Item>
						<h4>The game ends if you: </h4>
							<ul>
								<li>Hit a bomb - If you mark a space as safe, but it actually contains a bomb; the game ends immediately with a loss.</li>
								<hr />
								<li>Marked all spaces - Once all spaces are marked as safe/unsafe, the game ends telling you whether or not you've won.</li>
							</ul>
					</ListGroup.Item>
					<ListGroup.Item>
						<h4>Tips:</h4>
						<ul>
							<li>This game is not always able to be logically worked out. Sometimes you might leave yourself in a spot where you have to guess. Try to select radars and hints cautiously.</li>
							<hr />
							<li>The "Found" box in the "Stats and Tools" bar shows you the amount of spaces you've marked as unsafe over the amount of bombs in the area.</li>
							<hr />
							<li>Spaces are out of the play area? You can click and drag within the play area to move around.</li>
						</ul>
					</ListGroup.Item>

				</ListGroup>
				
			</Modal.Body>
		</Modal>
	)
}

export default ModalRules;