import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import classes from './Modal.module.css';

interface Props {
	show: boolean,
	handleClose: ()=>void,
	children: JSX.Element[],
}

const ModalRules = (props: Props) => {
	return (
		<Modal className={classes.modal} show={props.show} onHide={props.handleClose}>
			<Modal.Header className={classes.modalHeader}>
				<Modal.Title className={classes.modalTitle}>{props.children[0]}</Modal.Title>
				<Button onClick={props.handleClose} type="button" className="btn-close" aria-label="Close"></Button>
			</Modal.Header>
			<Modal.Body className={`${classes.modalBody}`}>
				{props.children[1]}
			</Modal.Body>
		</Modal>
	)
}

export default ModalRules;