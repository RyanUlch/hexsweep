// CSS Import:
import classes from './Hexagon.module.css';

// Hexagon is 3 div elements rotated to create a "Cell",
// Hexagon is purely for display, and does not need/have tests
const Hexagon = () => {
	return (
		<>
			<div className={`${classes.cell} ${classes.rot1}`} />
			<div className={`${classes.cell} ${classes.rot2}`} />
			<div className={`${classes.cell}`} />
		</>
	);
};

export default Hexagon;
