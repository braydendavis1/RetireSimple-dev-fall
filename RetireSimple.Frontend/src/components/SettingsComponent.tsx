import React, { useState, useEffect } from 'react';
import { getUserInfo, saveUserInfo } from '../api/New API/UserAPI'
import { UserInfo } from '../Interfaces';
// import CurrencyInput from 'react-currency-input-field';
import { enqueueSnackbar } from 'notistack';




const filingStatusOptions = [
	'Single',
	'Married filing jointly',
	'Married filing separately',
	'Head of household',
];

interface SettingsInfo {
	userInfo: UserInfo | undefined;
	setUserInfo: any
}


export const SettingsForm = (settingsInfo: SettingsInfo) => {


	console.log(settingsInfo.userInfo);



	const [settings, setSettings] = useState<UserInfo>(settingsInfo.userInfo!);




	React.useEffect(() => {
		//settingsInfo.setUserInfo(settingsInfo.userInfo)
		if(settings === undefined){
			setSettings(settingsInfo.userInfo!)
		}
	});

	// useEffect(() => {
	// 	// Fetch settings data from the database and update the state
	// 	// Example: Replace this with your actual database fetching logic
	// 	const fetchDataFromDatabase = async () => {
	// 		try {
	// 			// Simulating an API call to fetch data
	// 			const response = await fetch('/api/settings');
	// 			const data = await response.json();
	// 			setSettings(data);
	// 		} catch (error) {
	// 			console.error('Error fetching data from the database', error);
	// 		}
	// 	};

	// 	fetchDataFromDatabase();
	// }, []);

	const handleInputChange = (field: keyof UserInfo, value: number | string) => {
		setSettings((prevSettings) => ({
			...prevSettings,
			[field]: value,
		}));
	};

	const handleRetirementGoalChange = ( value: string) => {
		setSettings((prevSettings) => ({
			...prevSettings,
			'retirementGoal': parseInt(value.replace(/,/g, '')),
		}));
	};

	const handleSave = () => {
		saveUserInfo(settings).then ( () => {
			enqueueSnackbar('Settings saved successfully.', {variant: 'success'});
		}).catch((error: { message: any; }) => {
			enqueueSnackbar(`Failed to save: ${error.message}`, {variant: 'error'});
		});
	};


	return (
		<div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', maxWidth: '400px', margin: 'auto' }}>
			<h2>Settings</h2>
			<label>
				Current Age:
				<input
					// type='number'
					//defaultValue={settings.age}
					defaultValue = {settingsInfo.userInfo?.age}
					onChange={(e) => handleInputChange('age', Number(e.target.value))}
				/>
			</label>
			<br />
			<label>
				Retirement Age:
				<input
					// type='number'
					defaultValue={settingsInfo.userInfo?.retirementAge }
					onChange={(e) => handleInputChange('retirementAge', Number(e.target.value))}
				/>
			</label>
			<br />
			<label>
				Retirement Goal ($):
				<input
					placeholder='Please enter a number'
					defaultValue={settingsInfo.userInfo?.retirementGoal}
					onChange={(e: { target: { value: any; }; }) =>  
						handleRetirementGoalChange(e.target.value)}
					// onValueChange={(value: any, name: any, values: any) =>
					// 	handleInputChange('retirementGoal', value)}
				/>
			</label>
			{/* <br /> 
			<label>
				Filing Status:
				<select
					value={settingsInfo.userInfo?.filingStatus}
					onChange={(e) => handleInputChange('filingStatus', e.target.value)}
				>
					<option value=''>Select filing status</option>
					{filingStatusOptions.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			</label> */}
			<br />
			<button style={{ float: 'right' }} onClick={handleSave}>
				Save
			</button>
		</div>
	);
};

export default SettingsForm;