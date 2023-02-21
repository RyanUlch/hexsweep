import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import classes from './Modal.module.css';
import { ButtonGroup } from 'react-bootstrap';
interface Props {
	show: boolean
	handleClose: (difficulty: number)=>void
}

const ModalNewGame = (props: Props) => {
	const handleClose = (value: number) => {
		props.handleClose(value);
	};

	const handleCancel = () => {
		props.handleClose(-1);
	}

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
		<Modal className={classes.modal} show={props.show} onHide={handleCancel}>
			<Modal.Header className={classes.modalHeader}>
				<Modal.Title>Select Difficulty:</Modal.Title>
				<Button onClick={handleCancel} type="button" className="btn-close" aria-label="Close"></Button>
			</Modal.Header>
			<Modal.Body className={`${classes.modalBody}`}>
				<ButtonGroup className={classes.btnGroup}>
					<Button className={classes.btn} variant="primary" id={'2'} onClick={handleSelect}>
						<p className={classes.btnText}>Beginner (1)</p>
					</Button>
					<Button className={classes.btn} variant="primary" id={'3'} onClick={handleSelect}>
						<p className={classes.btnText}>Easy (2)</p>
					</Button>
					<Button className={classes.btn} variant="primary" id={'4'} onClick={handleSelect}>
						<p className={classes.btnText}>Medium (3)</p>
					</Button>
					<Button className={classes.btn} variant="primary" id={'5'} onClick={handleSelect}>
						<p className={classes.btnText}>Hard (4)</p>
					</Button>
					<Button className={classes.btn} variant="primary" id={'6'} onClick={handleSelect}>
						<p className={classes.btnText}>Impossible (5)</p>
					</Button>
				</ButtonGroup>
			</Modal.Body>
			<Modal.Footer className={classes.modalFooter}>
				<p className={classes.tip}>Tip: You can select the difficulty with the number buttons (1-5)</p>
			</Modal.Footer>
		</Modal>
	)
}

export default ModalNewGame;