import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import classes from './Modal.module.css';

import { useEffect, useCallback } from 'react';

interface Props {
	show: boolean
	handleClose: (hintRequest: number)=>void
}

const ModalSelect = (props: Props) => {
	// Close Modal with user selection
	const handleClose = useCallback((value: number) => {
		props.handleClose(value);
	}, [props]);

	// Handle user selecting hint through button
	const handleSelect = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const selection = e.currentTarget.id;
		handleClose(parseInt(selection));
	}



	useEffect(() => {
		// Set event listener to handle user selecting hint through key press
		// Ignored if modal is not being shown
		window.onkeydown = (e: KeyboardEvent) => {
			e.preventDefault();
			if (props.show) {
				switch(e.key) {
					case "1": handleClose(0); break;
					case "2": handleClose(1); break; 
					case "3": handleClose(2); break;
				}
			}
		}
		return ()=>{window.onkeydown = null}
	}, [props.show, handleClose]);

	return (
		<Modal className={classes.modal} show={props.show} >
			<Modal.Header className={classes.modalHeader}>
				<Modal.Title>Select Hint</Modal.Title>
			</Modal.Header>
			<Modal.Body className={`${classes.modalBody}`}>
				<p>Pick the Hint you would like on this cell:</p>
				<ButtonGroup className={classes.btnGroup}>
					<Button className={classes.btn} id={'0'} onClick={handleSelect}>
						<p>NW/SE <img className={classes.selectArrow} src='./images/nwse.png' alt=''/> (1)</p>
					</Button>
					<Button className={classes.btn} id={'1'} onClick={handleSelect}>
						<p>N/S <img className={classes.selectArrow} src='./images/ns.png' alt=''/> (2)</p>
					</Button>
					<Button className={classes.btn} id={'2'} onClick={handleSelect}>
						<p>NE/SW <img className={classes.selectArrow} src='./images/nesw.png' alt=''/> (3)</p>
					</Button>
				</ButtonGroup>
				</Modal.Body>
			<Modal.Footer className={`${classes.modalFooter}`}>
				<p className={classes.tip}>Tip: You can select the hint with the number buttons (1-3)</p>
			</Modal.Footer>
		</Modal>
	)
}

export default ModalSelect;