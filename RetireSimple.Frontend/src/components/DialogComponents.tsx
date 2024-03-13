import {yupResolver} from '@hookform/resolvers/yup';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid} from '@mui/material';
import {FieldValues, FormProvider, useForm, useWatch} from 'react-hook-form';
import {useFormAction, useSubmit} from 'react-router-dom';
import {convertDates} from '../api/ConvertUtils';
// import {addInvestmentToVehicle, addVehicle} from '../api/VehicleApi';
import {investmentFormSchema, vehicleFormSchema} from '../forms/FormSchema';
import {InvestmentDataForm} from '../forms/InvestmentDataForm';
import {VehicleDataForm} from '../forms/VehicleDataForm';
import {
	FormTextFieldCurrency,
	FormSelectField,
	FormDatePicker,
	FormTextField,
} from './InputComponents';
import {enqueueSnackbar, useSnackbar} from 'notistack';
import { Expense, Investment, InvestmentVehicleInfo } from '../Interfaces';
import { createInvestmentVehicle } from '../api/New API/InvestmentVehicleApi';
import { createExpense, deleteExpense } from '../api/New API/ExpenseApi';
import { createInvestment } from '../api/New API/InvestmentApi';
import { ExpenseDataForm } from '../forms/ExpenseDataForm';

export interface AddInvestmentDialogProps {
	loadInvestments: () => void;
	open: boolean;
	onClose: () => void;
	vehicleTarget: number;
}

export interface EditInvestmentDialogProps {
	open: boolean;
	onClose: () => void;
	investment: Investment;
}

export interface AddVehicleDialogProps {
	loadVehicles: Function;
	open: boolean;
	onClose: () => void;
}

export interface AddExpenseDialogProps {
	loadExpenses: Function;
	show: boolean;
	onClose: () => void;
}

export interface ConfirmDeleteDialogProps {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
	deleteTarget: string;
	deleteTargetType: string;
}

export interface ConfirmDeleteExpenseProps {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
	expenseId: string;
}

export const AddInvestmentDialog = (props: AddInvestmentDialogProps) => {
	const formContext = useForm({
		shouldUnregister: true,
		resolver: yupResolver(investmentFormSchema),
	});

	const submit = useSubmit();
	const addAction = useFormAction('/add');
	const {enqueueSnackbar} = useSnackbar();




	
	const handleAdd = (data: FieldValues) => {
		// const investment: Investment = {
		// 	// id: "",
		// 	// name: data.investmentVehicleName,
		// 	// value: data.cashHoldings,
		// 	// contributions: data.analysis_userContributionPercentage,
		// 	// salary: data.analysis_salary,
		// 	// salaryIncrease: 0,
		// 	// rate: data.analysis_rate,
		// 	// type: data.investmentVehicleType,
		// 	// employerMatch: data.analysis_employerMatchPercentage,
		// 	// employerMatchCap: data.analysis_employerMatchCap,
		// 	// projection: null,
		// };
		// console.log(investment);
		// createInvestment(investment).then ( () => {
		// 	props.onClose();
		// 	props.loadInvestments();
		// },
		// );
		// const requestData: {[key: string]: string} = {};


		// Object.entries(data)
		// 	.map(([key, value]) => [key, value.toString()])
		// 	.forEach(([key, value]) => (requestData[key] = value));

		// //Check if we have known date fields, and convert them to yyyy-MM-dd
		// convertDates(requestData);
		// // use new api
		// addInvestment(requestData)
		// 	.then((investmentId) => {
		// 		if (props.vehicleTarget > -1) {
		// 			addInvestmentToVehicle(props.vehicleTarget, Number.parseInt(investmentId));
		// 		} //Add investment to vehicle
		// 		enqueueSnackbar('Investment added successfully.', {variant: 'success'});
		// 		props.onClose();
		// 		submit(null, {method: 'post', action: addAction});
		// 	})
		// 	.catch((error) => {
		// 		enqueueSnackbar(`Failed to add investment: ${error.message}`, {variant: 'error'});
		// 	});
	};

	return (
		<FormProvider {...formContext}>
			<Dialog open={props.open} maxWidth='md'>
				<DialogTitle>
					{props.vehicleTarget > -1 ? 'Add Investment to Vehicle' : 'Add Investment'}
				</DialogTitle>
				<Box sx={{padding: '2rem'}}>
					<InvestmentDataForm>
						<DialogActions>
							<Button onClick={props.onClose}>Cancel</Button>
							<Button onClick={formContext.handleSubmit(handleAdd)}>Add</Button>
						</DialogActions>
					</InvestmentDataForm>
				</Box>
			</Dialog>
		</FormProvider>
	);
};


export const EditInvestmentDialog = (props: EditInvestmentDialogProps) => {
	const formContext = useForm({
		shouldUnregister: true,
		resolver: yupResolver(investmentFormSchema),
	});
	console.log("EDITING:");
	console.log(props.investment);

	const submit = useSubmit();
	const addAction = useFormAction('/add');
	const {enqueueSnackbar} = useSnackbar();

	const handleAdd = (data: FieldValues) => {
		const requestData: {[key: string]: string} = {};


		Object.entries(data)
			.map(([key, value]) => [key, value.toString()])
			.forEach(([key, value]) => (requestData[key] = value));

		//Check if we have known date fields, and convert them to yyyy-MM-dd
		convertDates(requestData);

		// //TODO: will need to make an edit investment method
		// addInvestment(requestData)
		// 	.then((investmentId) => {
		// 		// if (props.vehicleTarget > -1) {
		// 		// 	addInvestmentToVehicle(props.vehicleTarget, Number.parseInt(investmentId));
		// 		// } //Add investment to vehicle
		// 		enqueueSnackbar('Investment added successfully.', {variant: 'success'});
		// 		props.onClose();
		// 		submit(null, {method: 'post', action: addAction});
		// 	})
		// 	.catch((error) => {
		// 		enqueueSnackbar(`Failed to add investment: ${error.message}`, {variant: 'error'});
		// 	});
	};

	return (
		<FormProvider {...formContext}>
			<Dialog open={props.open} maxWidth='md'>
				<DialogTitle>
					{'Edit Investment'}
				</DialogTitle>
				<Box sx={{padding: '2rem'}}>
					<InvestmentDataForm selectedInvestment={props.investment}>
						<DialogActions>
							<Button onClick={props.onClose}>Cancel</Button>
							<Button onClick={formContext.handleSubmit(handleAdd)}>Save</Button>
						</DialogActions>
					</InvestmentDataForm>
				</Box>
			</Dialog>
		</FormProvider>
	);
};

export const AddVehicleDialog = (props: AddVehicleDialogProps) => {
	const formContext = useForm({
		shouldUnregister: true,
		resolver: yupResolver(vehicleFormSchema),
	});

	const handleVehicleAdd = (data: FieldValues) => {
		console.log("vehicle data");
		console.log(data);
		const vehicle: InvestmentVehicleInfo = {
			id: "",
			name: data.investmentVehicleName,
			value: data.cashHoldings,
			contributions: data.analysis_userContributionPercentage,
			salary: data.analysis_salary,
			salaryIncrease: 0,
			rate: data.analysis_rate,
			type: data.investmentVehicleType,
			employerMatch: data.analysis_employerMatchPercentage,
			employerMatchCap: data.analysis_employerMatchCap,
			projection: null,
		};
		console.log(vehicle);
		createInvestmentVehicle(vehicle, '401k').then ( () => {
			props.onClose();
			props.loadVehicles();
		},
		);
		
	};

	return (
		<FormProvider {...formContext}>
			<Dialog open={props.open} maxWidth='md'>
				<DialogTitle>Add Investment Vehicle</DialogTitle>
				<Box sx={{padding: '2rem'}}>
					<VehicleDataForm>
						<DialogActions>
							<Button onClick={props.onClose}>Cancel</Button>
							<Button onClick={formContext.handleSubmit(handleVehicleAdd)}>
								Add
							</Button>
						</DialogActions>
					</VehicleDataForm>
				</Box>
			</Dialog>
		</FormProvider>
	);
};

export const ConfirmDeleteDialog = (props: ConfirmDeleteDialogProps) => {
	const {enqueueSnackbar} = useSnackbar();

	const handleConfirm = () => {
		props.onConfirm();
		enqueueSnackbar(
			`${props.deleteTargetType === 'vehicle' ? 'Vehicle' : 'Invesetment'} was deleted`,
			{variant: 'success'},
		);
		props.onClose();
	};

	return (
		<Dialog open={props.open}>
			<DialogTitle>Confirm Deletion</DialogTitle>
			<DialogContent>
				Are you sure you want to delete{' '}
				{props.deleteTargetType + ' ' + props.deleteTarget + ' '}
				{props.deleteTargetType === 'vehicle' ? 'and all associated investments' : ''}?
			</DialogContent>
			<DialogActions>
				<Button onClick={props.onClose}>Cancel</Button>
				<Button color='error' onClick={handleConfirm}>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};


export const ConfirmDeleteExpense = (props: ConfirmDeleteExpenseProps) => {
	const {enqueueSnackbar} = useSnackbar();

	const handleConfirm = () => {
		deleteExpense(props.expenseId);
		props.onClose();
	};

	return (
		<Dialog open={props.open}>
			<DialogTitle>Confirm Deletion</DialogTitle>
			<DialogContent>
				Are you sure you want to delete this expense?
			</DialogContent>
			<DialogActions>
				<Button onClick={props.onClose}>Cancel</Button>
				<Button color='error' onClick={handleConfirm}>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};



export const AddExpenseDialog = (props: AddExpenseDialogProps) => {
	const formContext = useForm({
		shouldUnregister: true,
	});
	const expenseType = useWatch({
		control: formContext.control,
		name: 'expenseType',
		defaultValue: 'OneTime',
	});



	const handleExpenseAdd = (data: FieldValues) => { 
		const expense: Expense = {
			id: "",
			name: data.name,
			amount: data.amount,
			start: data.start,
			end: data.end,
			type: data.expenseType,
		}
		createExpense(expense, data.expenseType).then ( () => {
			props.onClose();
			props.loadExpenses();
			console.log("Added expense");
		},
		);
	};

	return (
		<FormProvider {...formContext}>
			<Dialog open={props.show} onClose={props.onClose} maxWidth='md'>
				<DialogTitle>Add Expense</DialogTitle>
				<Box sx={{padding: '2rem'}}>
					<ExpenseDataForm>
						<DialogActions>
							<Button onClick={props.onClose}>Cancel</Button>
							<Button onClick={formContext.handleSubmit(handleExpenseAdd)}>
								Add
							</Button>
						</DialogActions>
					</ExpenseDataForm>
				</Box>
			</Dialog>
		</FormProvider>
	);
};
