import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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
		<Modal show={props.show} >
			<Modal.Header>
				<Modal.Title>Select Hint</Modal.Title>
			</Modal.Header>
			<Modal.Body>Pick the Hint you would like on this cell:</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" id={'0'} onClick={handleSelect}>
					{`NW/SE Hint \u2921 (1)`}
				</Button>
				<Button variant="primary" id={'1'} onClick={handleSelect}>
					{`N/S Hint \u2B0D (2)`}
				</Button>
				<Button variant="primary" id={'2'} onClick={handleSelect}>
					{`NE/SW Hint \u2922 (3)`}
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ModalSelect;