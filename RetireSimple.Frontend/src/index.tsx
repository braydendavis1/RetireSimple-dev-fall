import {Box, CircularProgress, Icon, Link, Typography} from '@mui/material';
import {SnackbarProvider} from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	isRouteErrorResponse,
	useRouteError,
} from 'react-router-dom';
import {Layout} from './Layout';
import {InvestmentsPage} from './pages/InvestmentsPage';
import {VehiclesPage} from './pages/VehiclesPage';
import {AboutPage} from './pages/AboutPage';
import {SetUpPage} from './pages/SetUpPage';
import './index.css';
import { HelpPage } from './pages/HelpPage';
import { ExpensesPage } from './pages/ExpensesPage';
import { EngineInfoPage } from './pages/EngineInfoPage';
import { SettingsPage } from './pages/SettingsPage';
import { getInvestmentVehicle, getPortfolioProjection } from './api/New API/InvestmentVehicleApi';
import { ExpenseView } from './routes/ExpensesView';
import { getInvestment } from './api/New API/InvestmentApi';
import { getExpense } from './api/New API/ExpenseApi';
import { ProjectionView } from './routes/ProjectionView';
import { convertProjectionData } from './api/ApiMapper';
import { ProjectionInfo } from './Interfaces';
import { VehiclesInfoPage } from './pages/VehiclesInfoPage';
import { InvestmentsInfoPage } from './pages/InvestmentsInfoPage';
import { ExpensesInfoPage } from './pages/ExpensesInfoPage';

const InvestmentView = React.lazy(() =>
	import('./routes/InvestmentView').then((module) => ({default: module.InvestmentView})),
);

const RootView = React.lazy(() =>
	import('./routes/Root').then((module) => ({default: module.Root})),
);
const VehicleView = React.lazy(() =>
	import('./routes/VehicleView').then((module) => ({default: module.VehicleView})),
);

export const SuspenseRoute = ({children}: {children: React.ReactNode}) => {
	return <React.Suspense fallback={<CircularProgress />}>{children}</React.Suspense>;
};

const ErrorPage = () => {
	const error = useRouteError();
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-around',
				alignItems: 'center',
				flexDirection: 'column',
			}}>
			<Box sx={{display: 'flex', flexDirection: 'row'}}>
				<Icon
					baseClassName='material-icons'
					color='error'
					sx={{fontSize: '4rem', marginRight: '1rem', padding: '0.25rem'}}>
					error
				</Icon>
				<Typography variant='h2'>Oops...</Typography>
			</Box>
			<br />
			<Typography variant='h4'>Something went wrong and RetireSimple crashed.</Typography>
			<br />
			<Typography variant='h5'>
				Try refreshing this page, or restarting the <code>RetireSimple.Backend</code>{' '}
				application.
			</Typography>
			<br />
			<Typography variant='h5'>
				If the problem persists, please report a bug{' '}
				<Link href='https://github.com/RetireSimple/RetireSimple/issues/new/choose'>
					on the GitHub Issues page
				</Link>
				.
			</Typography>
			{isRouteErrorResponse(error) && (
				<Typography variant='h1' component='div' sx={{textAlign: 'center'}}>
					{error.status}
				</Typography>
			)}
		</Box>
	);
};

const router = createBrowserRouter(
	createRoutesFromElements([
		<Route
			path='/'
			element={<Layout />}
			errorElement={<ErrorPage />}
			id='root'>
			<Route
				path='/'
				element={
					<SuspenseRoute>
						<ProjectionView />
					</SuspenseRoute>
				}
			/>
			<Route
				path='InvestmentPage/'
				element={
					<InvestmentsPage />
				}
			/>
			<Route
				path='InvestmentPage/:id'
				loader={async ({params}) => await getInvestment(params.id ?? '')}
				element={
					<SuspenseRoute>
						<InvestmentView />
					</SuspenseRoute>
				}
			/>
			<Route
				path='VehiclesPage/'
				element={
					<VehiclesPage />
				}
			/>
			<Route
				path='VehiclesPage/:id'
				loader={async ({params}) => await getInvestmentVehicle(params.id ?? '')}
				element={
					<SuspenseRoute>
						<VehicleView />
					</SuspenseRoute>
				}
			/>
			<Route
				path='ExpensesPage/'
				element={
					<ExpensesPage />
				}
			/>
			<Route
				path='ExpensesPage/:id'
				loader={async ({params}) => await getExpense(params.id ?? '')}
				element={
					<SuspenseRoute>
						<ExpenseView />
					</SuspenseRoute>
				}
			/>
			<Route
				path='EngineInfoPage/'
				element={
					<EngineInfoPage />
				}
			/>
			<Route
				path='AboutPage/'
				element={
					<AboutPage />
				}
			/>
			<Route
				path='Settings/'
				element={
					<SettingsPage />
				}
			/>
			<Route
				path='SetUpPage/'
				element={
					<SetUpPage />
				}
			/>
			<Route
				path='InvestmentsInfoPage/'
				element={
					<InvestmentsInfoPage />
				}
			/>
			<Route
				path='VehiclesInfoPage/'
				element={
					<VehiclesInfoPage />
				}
			/>
			<Route
				path='ExpensesInfoPage/'
				element={
					<ExpensesInfoPage />
				}
			/>
			<Route
				path='HelpPage/'
				element={
					<HelpPage />
				}
			/>
			<Route path='*' element={<div>404</div>} />
		</Route>,
	]),
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const fallback = (
	<Box>
		<Typography variant='h1' component='div' sx={{textAlign: 'center'}}>
			Loading...
		</Typography>
	</Box>
);

root.render(
	<React.StrictMode>
		<SnackbarProvider>
			<RouterProvider router={router} fallbackElement={fallback} />
		</SnackbarProvider>
	</React.StrictMode>,
);
