import {Box, Typography} from '@mui/material';
import React from 'react';
import EditableTable from '../components/EditableTable';
import { getUserInfo } from '../api/UserAPI'
import SettingsForm from '../components/SettingsComponent';
import { UserInfo } from '../Interfaces';
  
export function SettingsPage() { 

	const [userInfo, setUserInfo] = React.useState<UserInfo>();

	React.useEffect(() => {
		if (userInfo === undefined) {
			console.log("SETTINGS");
			getUserInfo().then((data) => {
				setUserInfo(data);
				
				console.log(data);
			});
		}
	});

	
	const updateUserInfo = (data: UserInfo) => {

		updateUserInfo(data);
	}


	return (<div>
		<h1>Account Settings</h1>
		<Box sx={{padding: '2rem'}}>
			<SettingsForm userInfo={userInfo}  />
		</Box>
	</div>
	);
    
} 