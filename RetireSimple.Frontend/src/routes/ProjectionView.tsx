import {Box, CircularProgress, Typography} from '@mui/material';
import React from 'react';
import {useLoaderData, useNavigation} from 'react-router-dom';
import {PortfolioAggregateGraph} from '../components/GraphComponents';
import { convertProjectionData} from '../api/ApiMapper';
import { getPortfolioProjection } from '../api/New API/InvestmentVehicleApi';
import { ProjectionInfo } from '../Interfaces';

export const ProjectionView = () => {
	const [hasData, setHasData] = React.useState<boolean>(false);
	const [portfolioData, setPortfolioData] = React.useState<any[]>([]);
	const [loadIndicator, setLoadIndicator] = React.useState<boolean>(false);
	const navigation = useNavigation();

	React.useEffect(() => {
		getModelData();
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


	return (
		<div style={{display: 'flex', justifyContent: 'center' }}>
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
							<PortfolioAggregateGraph modelData={portfolioData} height={350} />
						</Box>
					)}
				</Box>
			</Box>
		</div>
	);
};
