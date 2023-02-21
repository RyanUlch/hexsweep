import classes from './Footer.module.css';
import Button from 'react-bootstrap/Button';
import ModalRules from '../Modals/ModalRules';

import { useState } from 'react';

const Footer = () => {
	const [showRules, setShowRules] = useState(false);

	const closeModalRules = () => {
		setShowRules(false);
	}

	const openRulesModal = () => {
		setShowRules(true);
	}

	return (
		<>
			<ModalRules show={showRules} handleClose={closeModalRules} />
			<footer className={`${classes.footer}`}>
				<Button onClick={openRulesModal} className={classes.rulesBtn}>Rules</Button>
				<h6 className={classes.footerText}>A <a className={classes.siteLink} rel="noreferrer" target='_blank' href='https://RyanUlch.com'>Ryan Ulch</a> Game</h6>
				<a href="https://www.buymeacoffee.com/RyanUlch" target="_blank" rel="noreferrer"><img className={classes.BMACBtn} src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" /></a>
			</footer>
		</>
	);
}

export default Footer;