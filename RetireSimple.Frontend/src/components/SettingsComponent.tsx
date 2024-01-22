import React, { useState, useEffect } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { getUserInfo } from '../api/UserAPI'
import { UserInfo } from '../Interfaces';

interface SettingsInfo {
	userInfo: UserInfo;
}


const filingStatusOptions = [
	'Single',
	'Married filing jointly',
	'Married filing separately',
	'Head of household',
	'Qualifying widow(er) with dependent child',
];

export const SettingsForm = (settingsInfo: SettingsInfo) => {
	const [settings, setSettings] = useState<UserInfo>({
		age: 0,
		retirementAge: 0,
		retirementGoal: 0,
		filingStatus: '',
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
		console.log("save");




		console.log(settings);


		

		// saveDataToDatabase();
	};


	return (
		<div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', maxWidth: '400px', margin: 'auto' }}>
			<h2>Settings</h2>
			<label>
				Current Age:
				<input
					// type='number'
					defaultValue={settings.age}
					onChange={(e) => handleInputChange('age', Number(e.target.value))}
				/>
			</label>
			<br />
			<label>
				Retirement Age:
				<input
					// type='number'
					defaultValue={settings.retirementAge}
					onChange={(e) => handleInputChange('retirementAge', Number(e.target.value))}
				/>
			</label>
			<br />
			<label>
				Retirement Goal ($):
				<CurrencyInput
					id='input-example'
					name='input-name'
					placeholder='Please enter a number'
					defaultValue={settings.retirementGoal}
					decimalsLimit={2}
					onChange={(e: { target: { value: any; }; }) =>  
						handleRetirementGoalChange(e.target.value)}
					// onValueChange={(value: any, name: any, values: any) =>
					// 	handleInputChange('retirementGoal', value)}
				/>
			</label>
			<br />
			<label>
				Filing Status:
				<select
					value={settings.filingStatus}
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