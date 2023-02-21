// CSS import:
import classes from './Arrow.module.css';
// React Imports:
import { useState, useEffect } from 'react';

interface Props{
	direction: number,
	indicator: number,
}

// Arrow is a display type of the arrow image next to hints.
const Arrow = (props: Props) => {
	const [arrowTypeURL, setArrowTypeURL] = useState('');

	useEffect(() => {
		setArrowTypeURL(`./images/${(props.direction === 0) ? 'nwse' : (props.direction === 1) ? 'ns' : 'nesw'}${props.indicator.toString()}.png`);
	}, [props.direction, props.indicator]);

	return (
		<img className={classes.arrow} src={arrowTypeURL} alt=''/>
	);
}

export default Arrow;