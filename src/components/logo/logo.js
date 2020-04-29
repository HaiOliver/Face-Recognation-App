import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import face from './OLIVER.jpg';

const Logo = () => {
	return (
		<div className="ma4 mt0">
			<Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150, marginLeft:20 }}>
				<div className="Tilt-inner">
					<img src={face} alt="something wrong" style={{height:150, width:150}}/>
					  </div>
			</Tilt>
		</div>
	);
};

export default Logo;
