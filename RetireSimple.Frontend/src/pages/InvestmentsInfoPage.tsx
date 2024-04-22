import {Box, Typography} from '@mui/material';
import { Link } from 'react-router-dom'; 
import SettingsNav from './SettingsNav';
import React, { useState } from 'react';
import SetUpNav from './SetUpNav';
  
export function InvestmentsInfoPage() { 

	const [currentIndex, setCurrentIndex] = useState(0);
  
	// Array of image URLs
	const imageUrls = [
		'/images/AddInvestment.PNG',
		'/images/InvestmentInfo.PNG',
	];

	const handleClick = () => {
		// Increment currentIndex, looping back to 0 if at the end
		setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
	};
  
	return (
		<div>
			<SettingsNav />
			<h1>How to use Investments</h1>
			<SetUpNav />
			<button onClick={handleClick}>Next Image</button>
			<div>
				<img src={imageUrls[currentIndex]} alt={`Image ${currentIndex + 1}`} />
			</div>
		</div>
	);
}