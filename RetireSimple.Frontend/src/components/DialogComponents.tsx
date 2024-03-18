import {yupResolver} from '@hookform/resolvers/yup';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid} from '@mui/material';
import {FieldValues, FormProvider, useForm, useWatch} from 'react-hook-form';
import {useFormAction, useSubmit} from 'react-router-dom';
import {convertDates} from '../api/ConvertUtils';
import { useNavigate } from 'react-router-dom';

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
import { createInvestmentVehicle, deleteInvestmentVehicle } from '../api/New API/InvestmentVehicleApi';
import { createExpense, deleteExpense } from '../api/New API/ExpenseApi';
import { createInvestment, deleteInvestment } from '../api/New API/InvestmentApi';
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
	vehicleId: string;
}

export interface ConfirmDeleteExpenseProps {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
	expenseId: string;
}
export interface ConfirmDeleteInvestmentProps {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
	id: string;
}

export const AddInvestmentDialog = (props: AddInvestmentDialogProps) => {
	const formContext = useForm({
		shouldUnregister: true,
		// resolver: yupResolver(investmentFormSchema),
	});

	const submit = useSubmit();
	const addAction = useFormAction('/add');
	const {enqueueSnackbar} = useSnackbar();




	
	const handleAdd = (data: FieldValues) => {
		const investment: {[key: string]: string} = {};
		
		investment["bondLength"] = "0";
		investment["bondQuantity"] = "0";
		investment["id"] = "";
		investment["vehicleId"] = "";

		Object.entries(data)
			.map(([key, value]) => [key, value.toString()])
			.forEach(([key, value]) => (investment[key] = value));


		createInvestment(investment, data.investmentType).then(() => {
			props.onClose();
			props.loadInvestments();
			enqueueSnackbar('Investment added successfully.', {variant: 'success'});
		}).catch((error) => {
			enqueueSnackbar(`Failed to add investment: ${error.message}`, {variant: 'error'});
		});
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

export const AddVehicleDialog = (props: AddVehicleDialogProps) => {
	const formContext = useForm({
		shouldUnregister: true,
		// resolver: yupResolver(vehicleFormSchema), 
		// how to do form validations!
	});

	const handleVehicleAdd = (data: FieldValues) => {
		const vehicle: {[key: string]: string} = {};
		Object.entries(data)
			.map(([key, value]) => [key, value.toString()])
			.forEach(([key, value]) => (vehicle[key] = value));
		createInvestmentVehicle(vehicle, data.type).then(() => {
			props.onClose();
			props.loadVehicles();
			enqueueSnackbar('Vehicle added successfully.', {variant: 'success'});
		}).catch((error) => {
			enqueueSnackbar(`Failed to add vehicle: ${error.message}`, {variant: 'error'});
		});
		
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
	const navigate = useNavigate();
	const handleConfirm = () => {
		deleteInvestmentVehicle(props.vehicleId).then(() => {
			enqueueSnackbar('Vehicle deleted successfully.', {variant: 'success'});
		}).catch((error) => {
			enqueueSnackbar(`Failed to delete vehicle: ${error.message}`, {variant: 'error'});
		});
		props.onClose();
		
		navigate(`/VehiclesPage/`);
	};

	return (
		<Dialog open={props.open}>
			<DialogTitle>Confirm Deletion</DialogTitle>
			<DialogContent>
				Are you sure you want to delete this vehicle?
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

export const ConfirmDeleteInvestment = (props: ConfirmDeleteInvestmentProps) => {
	const {enqueueSnackbar} = useSnackbar();
	const navigate = useNavigate();
	const handleConfirm = () => {
		deleteInvestment(props.id).then(() => {
			enqueueSnackbar('Investment deleted successfully.', {variant: 'success'});
		}).catch((error) => {
			enqueueSnackbar(`Failed to delete investment: ${error.message}`, {variant: 'error'});
		});
		props.onClose();
		
		navigate(`/InvestmentPage/`);
	};

	return (
		<Dialog open={props.open}>
			<DialogTitle>Confirm Deletion</DialogTitle>
			<DialogContent>
				Are you sure you want to delete this investment?
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
	const navigate = useNavigate();
	const handleConfirm = () => {
		deleteExpense(props.expenseId).then(() => {
			enqueueSnackbar('Expense deleted successfully.', {variant: 'success'});
		}).catch((error) => {
			enqueueSnackbar(`Failed to delete expense: ${error.message}`, {variant: 'error'});
		});
		props.onClose();
		navigate(`/ExpensesPage/`);
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
		// const expense: Expense = {
		// 	id: "",
		// 	name: data.name,
		// 	amount: data.amount,
		// 	start: data.start,
		// 	end: data.end,
		// 	type: data.expenseType,
		// }
		const expense: {[key: string]: string} = {};
		Object.entries(data)
			.map(([key, value]) => [key, value.toString()])
			.forEach(([key, value]) => (expense[key] = value));
		expense['type'] = "Monthly";
		expense["id"] = '';
		createExpense(expense, data.expenseType).then ( () => {
			props.onClose();
			props.loadExpenses();
			enqueueSnackbar('Expense added successfully.', {variant: 'success'});
		}).catch((error) => {
			enqueueSnackbar(`Failed to add expense: ${error.message}`, {variant: 'error'});
		});
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
