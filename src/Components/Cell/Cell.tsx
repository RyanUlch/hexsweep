import React, { useEffect } from "react";
import { useState } from "react";
import classes from "./Cell.module.css";
import HexagonBack from "./HexagonBack/HexagonBack.tsx";

import type { cellInfo } from "../CellContainer/CellContainer";

const Cell = (props: {cellInfo: cellInfo, row: number, col: number, clickHandler: (row: number, col: number) => void}) => {
	
	// State to determine the ClassName to use to set the background color of cells
	const [clickedClassState, setClickedClassState] = useState(classes.inActive);

	// Update the clickedClassState when props.cellInfo.clicked changes
	useEffect(() => {
		setClickedClassState(() => {
			switch (props.cellInfo.clicked) {
				case 0: return classes.inActive;
				case 1: return classes.safe;
				case 2: return classes.unsafe;
				default: throw Error('Not a valid "clicked" property of cell Info');
			}
		})
	}, [props.cellInfo.clicked]);

	const handleClick = (event: React.SyntheticEvent) => {
		event.preventDefault(); event.stopPropagation();
		props.clickHandler(props.row, props.col);
	}

	return (
		<div className={`${classes.base} ${clickedClassState}`} onClick={handleClick}> 
			<HexagonBack hints={props.cellInfo.hints} show={props.cellInfo.showHints}/>
		</div>
	);
}

export default Cell;