import { useState, useEffect } from 'react';
import classes from './Arrow.module.css';

interface Props{
	arrowType: number,
}

const Arrow = (props: Props) => {
	const [arrowTypeURL, setArrowTypeURL] = useState('');

	useEffect(() => {
		switch(props.arrowType) {
			case 0: setArrowTypeURL('./images/NWSE-Arrow.png');break;
			case 1: setArrowTypeURL('./images/NS-Arrow.png');break;
			case 2: setArrowTypeURL('./images/NESW-Arrow.png');break;
		}
	}, [props.arrowType]);

	return (
		<img className={classes.arrow} src={arrowTypeURL} alt=''/>
	)
}

export default Arrow;