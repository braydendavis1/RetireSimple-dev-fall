
import { Link } from 'react-router-dom';
import {Tab, Tabs} from '@mui/material';
import React, { useState } from 'react';

const HelpNav = () => {
	const [value, setValue] = useState('');
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	return (
		<Tabs 
			value={value}
			onChange={handleChange}
		>
			<Tab value='Home' label='Home' component={Link} to='/HelpPage' />
			<Tab value='Investments' label='Investments' component={Link} to='/InvestmentsInfoPage' />
			<Tab value='Vehicles' label='Vehicles' component={Link} to='/VehiclesInfoPage' />
			<Tab value='Expenses' label='Expenses' component={Link} to='/ExpensesInfoPage' />
		</Tabs>
	);
}

export default HelpNav;