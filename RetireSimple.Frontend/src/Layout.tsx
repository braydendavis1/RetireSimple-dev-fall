import {
	AppBar,
	Box,
	Divider,
	Icon,
	IconButton,
	List,
	MenuItem,
	Paper,
	Tooltip,
	Typography,
} from '@mui/material';
import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import {ApiPresetData} from './Interfaces';


import logo from '../../logo.png';

export const PresetContext = React.createContext<ApiPresetData | undefined>(undefined);

export const Layout = () => {

	const [presetData, setPresetData] = React.useState<ApiPresetData | undefined>(undefined);
	

	React.useEffect(() => {
	}, [presetData]);

	const renderPageList = (
		<Box sx={{width: '100%', alignSelf: 'start'}}>
			<List>
				<MenuItem component={Link} to='/'>
					<Icon baseClassName='material-icons'>home</Icon>
					<Typography variant='body1' component='div' sx={{marginLeft: '10px'}}>
						Home
					</Typography>
				</MenuItem>
				<Divider />
				<MenuItem component={Link} to='/InvestmentPage'>
					<Icon baseClassName='material-icons'>show_chart</Icon>
					<Typography variant='body1' component='div' sx={{marginLeft: '10px'}}>
						Investments
					</Typography>
				</MenuItem>
				<Divider />
				<MenuItem component={Link} to='/VehiclesPage'>
					<Icon baseClassName='material-icons'>stacked_line_chart</Icon>
					<Typography variant='body1' component='div' sx={{marginLeft: '10px'}}>
						Vehicles
					</Typography>
				</MenuItem>
				<Divider />
				<MenuItem component={Link} to='/ExpensesPage'>
					<Icon baseClassName='material-icons'>paid</Icon>
					<Typography variant='body1' component='div' sx={{marginLeft: '10px'}}>
						Expenses
					</Typography>
				</MenuItem>
				<Divider />
			</List>
		</Box>
	);

	let contents = (
		<Paper
			elevation={2}
			sx={{marginX: '1rem', height: '85vh', width: '100%', overflow: 'auto', position: 'sticky', top: '75px'}}>
			{renderPageList}
		</Paper>
	);

	return (
		<div>
			<PresetContext.Provider value={presetData}>
				<AppBar position='sticky' sx={{padding: '1rem', maxHeight: '4rem'}}>
					<Box sx={{display: 'flex'}}>
						<img
							src={logo}
							alt='logo'
							style={{
								marginRight: '1rem',
								height: '2rem',
								width: 'auto',
								objectFit: 'contain',
							}}
						/>
						<Typography variant='h6' component='div'>
							RetireSimple
						</Typography>
						<Box component='span' sx={{flex: '1 1 auto'}} />
						<Tooltip title='Open the settings page'>
							<IconButton
								color='inherit'
								href='/settings'>
								<Icon baseClassName='material-icons'>settings</Icon>
							</IconButton>
						</Tooltip>
						<Tooltip title='Report Bug/Issue on GitHub'>
							<IconButton
								color='inherit'
								href='https://github.com/RetireSimple/RetireSimple/issues/new/choose'>
								<Icon baseClassName='material-icons'>bug_report</Icon>
							</IconButton>
						</Tooltip>
					</Box>
				</AppBar>
				<Box sx={{marginTop: '0.5rem', display: 'flex', flexDirection: 'row', position: 'sticky'}}>
					<Box sx={{marginRight: '2rem'}}>{contents}</Box>
					<Box
						sx={{
							display: 'flex',
							marginY: '0.5rem',
							marginLeft: '1rem',
							maxWidth: '100vh',
						}}>
						<Outlet />
					</Box>
				</Box>
			</PresetContext.Provider>
		</div>
	);
};
