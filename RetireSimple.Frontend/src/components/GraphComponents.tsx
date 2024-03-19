import React from 'react';
import {convertProjectionData} from '../api/ApiMapper';
import {ProjectionInfo} from '../Interfaces';
import {useNavigation} from 'react-router-dom';
import {
	Box,
	Button,
	CircularProgress,
	FormControlLabel,
	FormGroup,
	Switch,
	Typography,
} from '@mui/material';
import {
	Area,
	AreaChart,
	CartesianGrid,
	Label,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { getInvestmentVehicleProjection } from '../api/New API/InvestmentVehicleApi';
import { getInvestmentProjection } from '../api/New API/InvestmentApi';

const strokeColors = [
	'#8884d8',
	'#82ca9d',
	'#ff0000',
	'#ffc658',
	'orange',
	'pink',
	'purple',
	'brown',
];

const loadIndicator = (
	<Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
		<CircularProgress />
		<Typography variant='button' sx={{marginLeft: '0.25rem'}}>
			Generating Model...
		</Typography>
	</Box>
);

export const MinMaxAvgGraph = (props: {modelData: any[]}) => {
	return (
		<ResponsiveContainer width={300} height={200}>
			<LineChart data={props.modelData}>
				<XAxis dataKey='year'>
					<Label value='Years' offset={-5} position={'bottom'} />
				</XAxis>
				<YAxis
					tickCount={10}
					allowDecimals={false}
					type={'number'}
					tickFormatter={(value) => value.toFixed(0)}>
					<Label value='$ Value (USD)' offset={0} position={'left'} angle={-90} />
				</YAxis>
				<CartesianGrid strokeDasharray='3 3' />
				<Tooltip />
				{/* <Legend /> */}
				<Line type='monotone' dataKey='avg' stroke='#8884d8' />
			</LineChart>
		</ResponsiveContainer>
	);
};

export const InvestmentModelGraph = (props: {investmentId: string}) => {
	const [modelData, setModelData] = React.useState<any[] | undefined>(undefined);
	const [loading, setLoading] = React.useState<boolean>(false);

	const navigation = useNavigation();

	React.useEffect(() => {
		if (navigation.state === 'loading') {
			setModelData(undefined);
		}
	}, [navigation.state]);

	const getModelData = () => {
		setLoading(true);
		getInvestmentProjection(props.investmentId)
			.then((data: ProjectionInfo) => {
				setModelData(convertProjectionData(data.yearly_projections));
				console.log("loading investment projection")
			})
			.then(() => setLoading(false));
	};

	return (
		<div>		
			{!loading && modelData === undefined && (
				<Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
					<Button onClick={getModelData} disabled={modelData !== undefined}>
						Get Model Data
					</Button>
				</Box>
			)}
			{/* <Button onClick={getModelData} disabled={modelData !== undefined}>
				Get Model Data
			</Button> */}
			{loading && loadIndicator}
			{modelData ? <MinMaxAvgGraph modelData={modelData} /> : <div></div>}
		</div>
	);
};

export const VehicleModelGraph = (props: {vehicleId: string}) => {
	const [modelData, setModelData] = React.useState<any[] | undefined>(undefined);
	const [loading, setLoading] = React.useState<boolean>(false);

	const navigation = useNavigation();

	React.useEffect(() => {
		if (navigation.state === 'loading') {
			setModelData(undefined);
		}
		setLoading(true);
	}, [modelData, navigation.state, props.vehicleId]);

	const getModelData = () => {
		setLoading(true);
		console.log(props.vehicleId);
		getInvestmentVehicleProjection(props.vehicleId, 50)
			.then((data: ProjectionInfo) => {
				setModelData(convertProjectionData(data.yearly_projections));
				console.log(data.yearly_projections);
				console.log(modelData);
			})
			.then(() => setLoading(false));
	};

	return (
		<div>
			<Button style={{width: '150px'}} onClick={getModelData} disabled={modelData !== undefined}>
				Get Model Data
			</Button>
			{modelData ? <MinMaxAvgGraph modelData={modelData} /> : <div></div>}
		</div>
	);
};

export const PortfolioBreakdownGraph = (props: {modelData: any[], height: number}) => {
	const breakdownAreas = React.useMemo(() => {
		if (props.modelData.length === 0) return <></>;
		return Object.keys(props.modelData[0])
			.filter((key) => key !== 'month')
			.map((key, idx) => (
				<Area
					type='monotone'
					key={`area_${key}`}
					dataKey={key}
					stackId='1'
					stroke={strokeColors[idx]}
					fill={strokeColors[idx]}
				/>
			));
	}, [props.modelData]);

	return (
		<Box
			sx={{
				display: 'flex',
				width: '100%',
				height: '50%',
				marginX: 'auto',
				flexDirection: 'column',
			}}>
			<Typography variant='h6'>Portfolio Breakdown (Average Model Projections)</Typography>
			<ResponsiveContainer width='100%' minHeight={props.height} minWidth={1200}>
				<AreaChart data={props.modelData}>
					<XAxis dataKey='month'>
						<Label value='Years' offset={-5} position={'bottom'} />
					</XAxis>
					<YAxis
						tickCount={10}
						allowDecimals={false}
						type={'number'}
						tickFormatter={(value) => value.toFixed(0)}>
						<Label value='$ Value (USD)' offset={0} position={'left'} angle={-90} />
					</YAxis>
					<CartesianGrid strokeDasharray='5 5' />
					<Tooltip />
					<Legend />
					{breakdownAreas}
				</AreaChart>
			</ResponsiveContainer>
		</Box>
	);
};

export const PortfolioAggregateGraph = (props: {modelData: any[], height: number, 
	yearOffset: number | undefined}) => {
	return (
		<Box sx={{display: 'flex', flexDirection: 'column', width: '90%', height: '50%'}}>
			<Typography variant='h6'>Portfolio Model</Typography>
			<ResponsiveContainer width='90%'  minHeight={props.height} minWidth={1200}>
				<LineChart data={props.modelData}>
					<XAxis dataKey='year' 
						tickFormatter={(value) => value + (props.yearOffset ?? 0)}
					>
						<Label value='Age' offset={-5} position={'bottom'} />
					</XAxis>
					<YAxis
						tickCount={10}
						allowDecimals={false}
						type={'number'}
						tickFormatter={(value) => value.toFixed(0)}>
						<Label value='$ Value (USD)' offset={0} position={'left'} angle={-90} />
					</YAxis>
					<CartesianGrid strokeDasharray='5 5' />
					<Tooltip />
					{/* <Legend /> shows "avg", etc on bottom */ }
					<Line type='monotone' dataKey='avg' stroke='#82ca9d' isAnimationActive />
				</LineChart>
			</ResponsiveContainer>
		</Box>
	);
};
