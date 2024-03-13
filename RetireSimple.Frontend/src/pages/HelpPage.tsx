import {Box, Typography} from '@mui/material';
import React from 'react';
import SettingsNav from './SettingsNav';
  
export function HelpPage() { 
	return (<div>
		<SettingsNav />
		<h1>Help</h1>
		
		
		<Box sx={{padding: '2rem'}}>
			<Typography variant='h6' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
				Welcome to RetireSimple!
			</Typography>
			<Typography variant='body1' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
				To get started, add some information about investments or vehicles
				to the application.
			</Typography>
			<Typography variant='body1' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
				Once you have added some information, you can view a portfolio
				analysis by clicking the button below.
			</Typography>
			<Typography variant='body1' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
				You can come back here using the "Home" item in the top of the
				sidebar list.
			</Typography>
			<br />
			<Typography variant='h6'>TODO: Create help page/ wizard </Typography>
			<br />
		</Box>
	</div>
	);
    
} 