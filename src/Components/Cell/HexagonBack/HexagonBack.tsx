import React, { useEffect, useState } from 'react';
import classes from './HexagonBack.module.css';

const HexagonBack = (props: {hints: number[], show: boolean[]}) => {
	const [hintNum, setHintNum] = useState(-1);
	
	useEffect(() => {
		setHintNum(Math.floor(Math.random()*3));
	}, []);

	const hintElement = () => {
		switch (hintNum) {
			case 0:
				return <p className='p-0 m-0'>{props.hints[0]}&#10529;</p>;
			case 1:
				return <p className='p-0 m-0'>{props.hints[1]}&#11021;</p>;
			case 2:
				return <p className='p-0 m-0'>{props.hints[2]}&#10530;</p>;
		}
		return <></>;
	}

	return (
		<>
			<div className={`${classes.cell} ${classes.rot1}`} />
			<div className={`${classes.cell} ${classes.rot2}`} />
			<div className={`${classes.cell}`}>
				{hintElement()}
				{/* &nbsp;{props.hints[3]}&#10038;</p> */}
			</div>
		</>
	);
}

export default HexagonBack;