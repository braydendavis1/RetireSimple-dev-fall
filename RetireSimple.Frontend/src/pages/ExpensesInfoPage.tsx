import Icon from '@mui/material/Icon';
import { Link } from 'react-router-dom'; 
import SettingsNav from './SettingsNav';
import React, { useState } from 'react';
import SetUpNav from './HelpNav';
  
export function ExpensesInfoPage() { 

	const [currentIndex, setCurrentIndex] = useState(0);
  
	// Array of image URLs
	const imageUrls = [
		'/images/AddExpense.PNG',
		'/images/ExpenseInfo.PNG',
	];

	const goToPrevious = () => {
		setCurrentIndex((prevIndex) => (prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1));
	};
    
	const goToNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
	};
  
	return (
		<div>
			<SettingsNav />
			<h1>How to use Expenses</h1>
			<SetUpNav />
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
				<div style={{ display: 'flex', marginBottom: '10px' }}>
					<button onClick={goToPrevious}>
						<Icon sx={{ fontSize: 36 }}>arrow_backward</Icon>
					</button>
					<img style={{ maxWidth: '100%', maxHeight: '100%' }} 
						src={imageUrls[currentIndex]} alt={`Image ${currentIndex + 1}`} />
					<button onClick={goToNext}>
						<Icon sx={{ fontSize: 36 }}>arrow_forward</Icon>
					</button>
				</div>
				<div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', color: 'white', fontSize: '18px', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '5px 10px', borderRadius: '5px' }}>
					Page {currentIndex + 1} of {imageUrls.length}
				</div>
			</div>
		</div>
	);
}