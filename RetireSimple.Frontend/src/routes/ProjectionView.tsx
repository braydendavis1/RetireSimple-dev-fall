import {Box, CircularProgress, Typography} from '@mui/material';
import React, {useState} from 'react';
import {Link, useNavigation} from 'react-router-dom';
import {PortfolioAggregateGraph} from '../components/GraphComponents';
import { convertProjectionData} from '../api/ApiMapper';
import { getPortfolioProjection } from '../api/New API/InvestmentVehicleApi';
import { ProjectionInfo, UserInfo } from '../Interfaces';
import { getUserInfo } from '../api/New API/UserAPI';

export const ProjectionView = () => {
	const [hasData, setHasData] = React.useState<boolean>(false);
	const [portfolioData, setPortfolioData] = React.useState<any[]>([]);
	const [loadIndicator, setLoadIndicator] = React.useState<boolean>(false);
	const navigation = useNavigation();
	const [userInfo, setUserInfo] = React.useState<UserInfo>();
	const [showPopup, setShowPopup] = useState(true);

	React.useEffect(() => {
		getModelData();
		getUserInfo().then((data) => {
			setUserInfo(data);
		});
	}, [navigation.state]);

	const getModelData = () => {
		setLoadIndicator(true);
		getPortfolioProjection()
			.then((data: ProjectionInfo) => {
				setPortfolioData(convertProjectionData(data.yearly_projections));
			})
			.then(() => {
				setLoadIndicator(false);
				setHasData(true);
			},
			);
	};

	const handleClosePopup = () => {
		setShowPopup(false);
	};

	const handleGoToHelpPage = () => {
		setShowPopup(false);
		// Implement logic to navigate to the set up page
		console.log('Navigating to set up page...');
	};

	return (
		<div style={{display: 'flex', justifyContent: 'center' }}>
			{showPopup && (
				<div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', zIndex: '9999' }}>
					<Box sx={{padding: '2rem'}}>
						<Typography variant='h6' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
							Welcome to RetireSimple!
						</Typography>
						<Typography variant='body1' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
							To get started, add some information about investments or vehicles
							to the application.
						</Typography>
						<Typography variant='body1' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
							If you are not sure how to set up your portfolio, go to the "Help" page 
							for assistance.
						</Typography>
					</Box>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<button onClick={handleClosePopup}>Close</button>
						<Link to='/HelpPage/' style={{ textDecoration: 'none' }}>
							<button onClick={handleGoToHelpPage}>Go to Help Page</button>
						</Link>
					</div>
				</div>
			)}
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Box
					sx={{
						display: 'flex',
						width: '95%',
						height: '50%',
						marginX: 'auto',
						flexDirection: 'column',
						objectFit: 'contain',
					}}>
				
					{loadIndicator && (
						<Box sx={{display: 'flex', alignItems: 'center'}}>
							<CircularProgress />
							<Typography variant='button' sx={{marginLeft: '0.25rem'}}>
								Generating Full Portfolio Model, this may take a minute...
							</Typography>
						</Box>
					)}
					{hasData && (
						<Box>
							<PortfolioAggregateGraph yearOffset={userInfo?.age}
								modelData={portfolioData} height={350} />
						</Box>
					)}
				</Box>
			</Box>
		</div>
	);
};
