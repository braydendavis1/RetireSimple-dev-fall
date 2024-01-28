import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../api/UserAPI'
import { UserInfo } from '../Interfaces';
import CurrencyInput from 'react-currency-input-field';




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
<<<<<<< HEAD
	console.log("in form");
	console.log(settingsInfo.userInfo?.retirementGoal);
	
	const [settings, setSettings] = useState<UserInfo>(settingsInfo.userInfo!);

	// const [settings, setSettings] = useState<UserInfo>({
	// 	age: settingsInfo.userInfo?.age || 0,
	// 	retirementAge: settingsInfo.userInfo?.retirementAge || 0,
	// 	retirementGoal: settingsInfo.userInfo?.retirementGoal || 0,
	// 	filingStatus: settingsInfo.userInfo?.filingStatus || '',
	// });
=======


	console.log(settingsInfo.userInfo);



	const [settings, setSettings] = useState<UserInfo>(settingsInfo.userInfo!);




	React.useEffect(() => {
		//settingsInfo.setUserInfo(settingsInfo.userInfo)
		if(settings == undefined){
			setSettings(settingsInfo.userInfo!)
		}
	});
>>>>>>> 3b8fea79a6f571ea338089c40ba4027391e3e118

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
		console.log("save");
<<<<<<< HEAD
		console.log(settingsInfo.userInfo);


=======

	

		settingsInfo.setUserInfo(settings);
>>>>>>> 3b8fea79a6f571ea338089c40ba4027391e3e118
		
		// saveDataToDatabase();
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
					defaultValue = {settingsInfo.userInfo?.age}
					onChange={(e) => handleInputChange('age', Number(e.target.value))}
				/>
			</label>
			<br />
			<label>
				Retirement Age:
				<input
					// type='number'
<<<<<<< HEAD
					defaultValue={settingsInfo.userInfo?.retirementAge}
=======
					defaultValue={settingsInfo.userInfo?.retirementAge }
>>>>>>> 3b8fea79a6f571ea338089c40ba4027391e3e118
					onChange={(e) => handleInputChange('retirementAge', Number(e.target.value))}
				/>
			</label>
			<br />
			<label>
				Retirement Goal ($):
				<input
<<<<<<< HEAD
					// type='number'
					defaultValue={settingsInfo.userInfo?.retirementGoal}
					onChange={(e) => handleRetirementGoalChange(e.target.value)}
				/>
			</label>
			<br />
			{/* Adds commas and other formatting, but can't get default value to work */}
			{/* <label>
				Retirement Goal ($):
				<CurrencyInput
					id='input-example'
					name='input-name'
					placeholder='Please enter a number'
					defaultValue={settingsInfo.userInfo?.retirementGoal!}
					decimalsLimit={2}
=======
					placeholder='Please enter a number'
					defaultValue={settingsInfo.userInfo?.retirementGoal}
>>>>>>> 3b8fea79a6f571ea338089c40ba4027391e3e118
					onChange={(e: { target: { value: any; }; }) =>  
						handleRetirementGoalChange(e.target.value)}
					// onValueChange={(value: any, name: any, values: any) =>
					// 	handleInputChange('retirementGoal', value)}
				/>
			</label>
			<br /> */}
			<label>
				Filing Status:
				<select
					value={settingsInfo.userInfo?.filingStatus}
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
			</label>
			<br />
			<button style={{ float: 'right' }} onClick={handleSave}>
				Save
			</button>
		</div>
	);
};

export default SettingsForm;