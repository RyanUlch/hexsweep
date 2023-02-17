// Bootstrap Imports:
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
// Component Import:
import classes from './Header.module.css'

// Header contains just the title of the game - No State or Logic
const Header = () => {
	return (
		<header className={`${classes.header}`}>
			<h1 className={classes.headerText}>Hex-Sweep</h1>
		</header>
	)
}

export default Header;