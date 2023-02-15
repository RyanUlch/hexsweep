import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import classes from './Footer.module.css';
import Button from 'react-bootstrap/Button';

const Footer = () => {
	return (
		<Row className={classes.footerRow}>
			<footer className='p-0'>
				<Card className={classes.footerCard}>
					<Card.Header className={`cardHeader ${classes.footerContainer}`}>
						<Button className={classes.rulesBtn}>Rules</Button>
						<h6 className={classes.footerTextHeader}>A <a className={classes.siteLink} rel="noreferrer" target='_blank' href='https://RyanUlch.com'>Ryan Ulch</a> Web Game</h6>
						<a href="https://www.buymeacoffee.com/RyanUlch" target="_blank"><img className={classes.BMACBtn} src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" /></a>
					</Card.Header>
					{/* <Card.Body className='cardBody'>
						<p className={classes.footerTextBody}>Footer Body</p>
					</Card.Body> */}
				</Card>
			</footer>
		</Row>
	)
}

export default Footer;