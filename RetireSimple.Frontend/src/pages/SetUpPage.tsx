import {Box, Typography} from '@mui/material';
import { Link } from 'react-router-dom'; 
import SettingsNav from './SettingsNav';
import React, { useState } from 'react';
  
export function SetUpPage() { 

	const [currentIndex, setCurrentIndex] = useState(0);
  
	// Array of image URLs
	const imageUrls = [
		'/images/AddExpense.PNG',
		'/images/ExpenseInfo.PNG',
		'/images/AddInvestment.PNG',
		'/images/InvestmentInfo.PNG',
		'/images/AddVehicle.PNG',
		'/images/VehicleInfo.PNG',
	];

	const handleClick = () => {
		// Increment currentIndex, looping back to 0 if at the end
		setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
	};
  
	return (
		<div>
			<button onClick={handleClick}>Click to see how to use RetireSimple</button>
			<div>
				<img src={imageUrls[currentIndex]} alt={`Image ${currentIndex + 1}`} />
			</div>
		</div>
	);
}