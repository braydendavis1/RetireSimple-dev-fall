
import { Link } from 'react-router-dom';
import {Tab, Tabs} from '@mui/material';
import React, { useState } from 'react';

const SetUpNav = () => {
	const [value, setValue] = useState('');
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	return (
		<Tabs 
			value={value}
			onChange={handleChange}
		>
			<Tab value='Home' label='Home' component={Link} to='/SetUpPage' />
			<Tab value='Investments' label='Investments' component={Link} to='/InvestmentsInfoPage' />
			<Tab value='Vehicles' label='Vehicles' component={Link} to='/VehiclesInfoPage' />
			<Tab value='Expenses' label='Expenses' component={Link} to='/ExpensesInfoPage' />
		</Tabs>
	);
}

export default SetUpNav;