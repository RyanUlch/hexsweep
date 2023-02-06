import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

interface Props {
	show: boolean
	handleClose: (hintRequest: number)=>void
}

const ModalSelect = (props: Props) => {
	const handleClose = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const selection = e.currentTarget.id;
		props.handleClose(parseInt(selection));
	};

	return (
		<Modal show={props.show} >
			<Modal.Header>
				<Modal.Title>Select Hint</Modal.Title>
			</Modal.Header>
			<Modal.Body>Pick the Hint you would like on this cell:</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" id={'0'} onClick={handleClose}>
					North-West / South-East Hint
				</Button>
				<Button variant="primary" id={'1'} onClick={handleClose}>
					North / South Hint
				</Button>
				<Button variant="primary" id={'2'} onClick={handleClose}>
					North-East / South-West Hint
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ModalSelect;