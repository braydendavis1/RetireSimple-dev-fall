import {Box, Button, CircularProgress, Typography} from '@mui/material';
import React from 'react';
import {useNavigation} from 'react-router-dom';
import {getAggregateModel} from '../api/InvestmentApi';
import {PortfolioAggregateGraph, PortfolioBreakdownGraph} from '../components/GraphComponents';
import {convertPortfolioModelData, convertProjectionData, createAggregateStackData} from '../api/ApiMapper';
import { getPortfolioProjection } from '../api/New API/InvestmentVehicleApi';
import { ProjectionInfo } from '../Interfaces';
export const Root = () => {
	const [hasData, setHasData] = React.useState<boolean>(false);
	const [portfolioData, setPortfolioData] = React.useState<any[]>([]);
	const [breakdownData, setBreakdownData] = React.useState<any[]>([]);
	const [loadIndicator, setLoadIndicator] = React.useState<boolean>(false);
	const [noInvestments, setNoInvestments] = React.useState<boolean>(false);
	const navigation = useNavigation();

	

	React.useEffect(() => {
		getModelData();

	}, [navigation.state]);

	const getModelData = () => {
		setLoadIndicator(true);
		
		getPortfolioProjection()
			.then((data: ProjectionInfo) => {
				setPortfolioData(convertProjectionData(data.yearly_projections));
				console.log("portfolioData:");
				console.log(portfolioData);
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
							{/* <PortfolioBreakdownGraph modelData={breakdownData} height={350} /> */}
						</Box>
					)}
					{noInvestments && (
						<Box>
							<h1>No Investment Data</h1>
						</Box>
					)}
					{/* <Button style={{ width: '200px' }} onClick={getModelData}>
						Get Model Data
					</Button> */}
				</Box>
			</Box>
		</div>
	);
};
