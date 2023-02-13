import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import classes from './Modal.module.css';

interface Props {
	show: boolean
	handleClose: (difficulty: number)=>void
}

const ModalNewGame = (props: Props) => {
	const handleClose = (value: number) => {
		props.handleClose(value);
	};

	// Handle user selecting hint through button
	const handleSelect = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const selection = e.currentTarget.id;
		handleClose(parseInt(selection));
	}

	// Set event listener to handle user selecting hint through key press
		// Ignored if modal is not being shown
	window.onkeydown = (e: KeyboardEvent) => {
		e.preventDefault();
		if (props.show) {
			let value = -1;
			switch(e.key) {
				case "1": value = 2; break;
				case "2": value = 3; break;
				case "3": value = 4; break;
				case "4": value = 5; break;
				case "5": value = 6; break;
			}
			if (value > -1) {
				handleClose(value);
			}
		}
	}

	return (
		<Modal show={props.show} >
			<Modal.Header>
				<Modal.Title>Select Difficulty:</Modal.Title>
			</Modal.Header>
			<Modal.Body className={classes.group}>
				<Button className={classes.btn} variant="primary" id={'2'} onClick={handleSelect}>
					{`Beginner (1)`}
				</Button>
				<Button className={classes.btn} variant="primary" id={'3'} onClick={handleSelect}>
					{`Easy (2)`}
				</Button>
				<Button className={classes.btn} variant="primary" id={'4'} onClick={handleSelect}>
					{`Medium (recommended) (3)`}
				</Button>
				<Button className={classes.btn} variant="primary" id={'5'} onClick={handleSelect}>
					{`Hard (4)`}
				</Button>
				<Button className={classes.btn} variant="primary" id={'6'} onClick={handleSelect}>
					{`Impossible (5)`}
				</Button>
			</Modal.Body>
		</Modal>
	)
}

export default ModalNewGame;