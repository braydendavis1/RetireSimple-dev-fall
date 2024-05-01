import {Box, Icon, Typography} from '@mui/material';
import { Link } from 'react-router-dom'; 
import SettingsNav from './SettingsNav';
import React, { useState } from 'react';
import SetUpNav from './HelpNav';
  
export function SetUpPage() { 

	const [currentIndex, setCurrentIndex] = useState(0);
	const [showPopup, setShowPopup] = useState(true);
  
	// Array of image URLs
	const imageUrls = [
		'/images/HomePage.PNG',
	];

	const goToPrevious = () => {
		setCurrentIndex((prevIndex) => (prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1));
	};
    
	const goToNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
	};

	const handleClosePopup = () => {
		setShowPopup(false);
	};

	const handleGoToHelpPage = () => {
		setShowPopup(false);
		// Implement logic to navigate to the set up page
		console.log('Navigating to set up page...');
	};
  
	return (
		<div>
			{showPopup && currentIndex === 0 && (
				<div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', zIndex: '9999' }}>
					{/* <p>Welcome to RetireSimple! 
						If you are a new user and are unfamiliar with investing, 
						click the button below to navigate to the "How To" page.
						The page helps users set up their portfolio and shows users
						how to add different financial options to their growing portfolio!
					</p> */}
					<Box sx={{padding: '2rem'}}>
						<Typography variant='h6' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
							Welcome to RetireSimple!
						</Typography>
						<Typography variant='body1' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
							To get started, add some information about investments or vehicles
							to the application.
						</Typography>
						{/* <Typography variant='body1' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
							Once you have added some information, you can view a portfolio
							analysis by clicking the button below.
						</Typography> */}
						{/* <Typography variant='body1' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
							You can come back here using the "Home" item in the top of the
							sidebar list.
						</Typography> */}
						<Typography variant='body1' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
							If you are not sure how to set up your portfolio, go to the "Help" page 
							for assistance.
						</Typography>
					</Box>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<button onClick={handleClosePopup}>Close</button>
						<button onClick={handleGoToHelpPage}>Go to Help Page</button>
					</div>
				</div>
			)}
			<SettingsNav />
			<h1>How to use RetireSimple</h1>
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