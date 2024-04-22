
import { Link } from 'react-router-dom';
import {Tab, Tabs} from '@mui/material';
import React, { useState } from 'react';

const SettingsNav = () => {
	const [value, setValue] = useState('');
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	return (
		<Tabs 
			value={value}
			onChange={handleChange}
		>
			<Tab value='Account Settings' label='Account Settings' component={Link} to='/Settings' />
			<Tab value='Engine Info' label='Engine Info' component={Link} to='/EngineInfoPage' />
			<Tab value='About' label='About' component={Link} to='/AboutPage' />
			<Tab value='Help' label='Help' component={Link} to='/HelpPage' />
			<Tab value='How To' label='How To' component={Link} to='/SetUpPage' />
		</Tabs>
	);
}

export default SettingsNav;