// Bootstrap Imports:
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
// Component Import:
import classes from './Header.module.css'

// Header contains just the title of the game - No State or Logic
const Header = () => {
	return (
		<Row className={classes.headerRow}>
			<header className='p-0'>
				<Card className={classes.headerCard}>
					<Card.Header className='cardHeader'>
						<h1 className={classes.headerText}>Hex-Sweep</h1>
					</Card.Header>
				</Card>
			</header>
		</Row>
	)
}

export default Header;