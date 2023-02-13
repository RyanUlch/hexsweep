import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import classes from './Footer.module.css';

const Footer = () => {
	return (
		<Row className={classes.footerRow}>
			<footer className='p-0'>
				<Card className={classes.footerCard}>
					<Card.Header>
						<h6 className={classes.footerTextHeader}>Footer Header</h6>
					</Card.Header>
					<Card.Body>
						<p className={classes.footerTextBody}>Footer Body</p>
					</Card.Body>
				</Card>
			</footer>
		</Row>
	)
}

export default Footer;