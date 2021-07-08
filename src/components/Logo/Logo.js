import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import brain from './brain.png'

const Logo= ()=> {
	return(
		<div>
			<Tilt>
			      <div className= "Tilt br2 shadow-2" style={{ height: '100px', width: '100px', backgroundColor: 'darkgreen' }}>
			      	<div className= "Tilt-inner">
			      		<img src={brain} alt='logo' style={{paddingTop: '5px'}}/>
			      	</div>
			      </div>
    			</Tilt>
		</div>
	);
}

export default Logo;