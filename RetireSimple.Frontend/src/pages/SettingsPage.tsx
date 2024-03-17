import {Box} from '@mui/material';
import React from 'react';
import { getUserInfo, saveUserInfo } from '../api/New API/UserAPI'
import SettingsForm from '../components/SettingsComponent';
import SettingsNav from './SettingsNav';
import { UserInfo } from '../Interfaces';
  
export function SettingsPage() { 
	const [userInfo, setUserInfo] = React.useState<UserInfo>();
	React.useEffect(() => {
		if (userInfo === undefined) {
			getUserInfo().then((data) => {
				setUserInfo(data);
			});
		}
	});

	const updateUserInfo = (data: UserInfo) => {
		saveUserInfo(data);
	}

	return (<div>
		<SettingsNav />
		<h1>Account Settings</h1>
		<Box sx={{ padding: '2rem' }}>
			<SettingsForm userInfo={userInfo} 
				setUserInfo={(data: UserInfo) => updateUserInfo(data) } />
		</Box>
	</div>
	); 
} 