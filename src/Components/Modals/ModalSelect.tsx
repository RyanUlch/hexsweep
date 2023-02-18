import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import classes from './Modal.module.css';

interface Props {
	show: boolean
	handleClose: (hintRequest: number)=>void
}

const ModalSelect = (props: Props) => {
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
				case "1": value = 0; break;
				case "2": value = 1; break; 
				case "3": value = 2; break;
			}
			if (value > -1) {
				handleClose(value);
			}
		}
	}

	return (
		<Modal className={classes.modal} show={props.show} >
			<Modal.Header className={classes.modalHeader}>
				<Modal.Title>Select Hint</Modal.Title>
			</Modal.Header>
			<Modal.Body className={`${classes.modalBody}`}>Pick the Hint you would like on this cell:</Modal.Body>
			<Modal.Footer className={`${classes.modalFooter}`}>
				<ButtonGroup className={classes.btnGroup}>
					<Button className={classes.btn} id={'0'} onClick={handleSelect}>
						{`NW/SE Hint \u2921 (1)`}
					</Button>
					<Button className={classes.btn} id={'1'} onClick={handleSelect}>
						{`N/S Hint \u2B0D (2)`}
					</Button>
					<Button className={classes.btn} id={'2'} onClick={handleSelect}>
						{`NE/SW Hint \u2922 (3)`}
					</Button>
				</ButtonGroup>
			</Modal.Footer>
		</Modal>
	)
}

export default ModalSelect;