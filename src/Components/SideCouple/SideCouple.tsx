import classes from './SideCouple.module.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

interface Props {
	children: JSX.Element[],
	isButton?: boolean,
	clickHandler?: () => void,
	isDisabled?: boolean,
	isActive?: boolean,
}

const SideCouple = (props: Props) => {
	return (
		<Col className={classes.column}>
			<Card className={`${classes.card} ${props.isButton && !props.isDisabled ? classes.btn :''}`} onClick={props.isButton && !props.isDisabled ? props.clickHandler : ()=>{}}>
				<Card.Header className={`cardHeader ${classes.titleHolder}`}>
					{props.children[0]}
				</Card.Header>
				<Card.Body className={`cardHighlight
					${props.isButton && classes.btnBody}
					${props.isActive && !props.isDisabled && classes.active}
					${props.isDisabled && classes.disabled}`
				}>
					{props.children[1]}
				</Card.Body>
			</Card>
		</Col>
	)
}

export default SideCouple;