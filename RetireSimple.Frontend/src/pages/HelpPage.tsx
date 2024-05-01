import {Box, Icon, Typography} from '@mui/material';
import { Link } from 'react-router-dom'; 
import SettingsNav from './SettingsNav';
import React, { useState } from 'react';
import SetUpNav from './HelpNav';
  
export function HelpPage() { 

	const [currentIndex, setCurrentIndex] = useState(0);
  
	// Array of image URLs
	const imageUrls = [
		'/images/HomePage.PNG',
	];
  
	return (
		<div>
			<SettingsNav />
			<h1>How to use RetireSimple</h1>
			<SetUpNav />
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
				<div style={{ display: 'flex', marginBottom: '10px' }}>
					<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
						<img style={{ maxWidth: '100%', minHeight: '100%' }} 
							src={imageUrls[currentIndex]} alt={`Image ${currentIndex + 1}`} />
					</div>
				</div>
			</div>
		</div>
	);
}