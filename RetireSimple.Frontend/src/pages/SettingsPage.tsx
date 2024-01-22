import {Box, Typography} from '@mui/material';
import React from 'react';
import EditableTable from '../components/EditableTable';
import { getUserInfo } from '../api/UserAPI'
import SettingsForm from '../components/SettingsComponent';
import { UserInfo } from '../Interfaces';
  
export function SettingsPage() { 

	const getUserInfo = () => {

		var userInfo = getUserInfo();
		
	}

	const updateUserInfo = (data: UserInfo) => {

		updateUserInfo(data);
	}


	return (<div>
		<h1>Account Settings</h1>
		<Box sx={{padding: '2rem'}}>
			<SettingsForm />
		</Box>
	</div>
	);
    
} 