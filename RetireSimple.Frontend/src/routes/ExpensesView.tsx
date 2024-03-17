import {yupResolver} from '@hookform/resolvers/yup';
import {Box, Button, DialogActions, Divider, Typography} from '@mui/material';
import React from 'react';
import {FieldValues, FormProvider, useForm, useFormState} from 'react-hook-form';
import {useFormAction, useLoaderData, useSubmit} from 'react-router-dom';
import {ConfirmDeleteDialog, ConfirmDeleteExpense} from '../components/DialogComponents';
import {VehicleModelGraph} from '../components/GraphComponents';
import {VehicleFormDefaults, vehicleFormSchema} from '../forms/FormSchema';
import {VehicleDataForm} from '../forms/VehicleDataForm';
import {useSnackbar} from 'notistack';
import { ExpenseDataForm } from '../forms/ExpenseDataForm';
import { createExpense, updateExpense } from '../api/New API/ExpenseApi';
import { Expense } from '../Interfaces';

export const ExpenseView = () => {
	const [showDelete, setShowDelete] = React.useState(false);
	const expenseData = useLoaderData() as any;
	const submit = useSubmit();
	const deleteAction = useFormAction('delete');
	const updateAction = useFormAction('update');
	// const formContext = useForm({
	// 	shouldUnregister: true,
	// 	resolver: yupResolver(vehicleFormSchema),
	// 	defaultValues: expenseData ?? VehicleFormDefaults,
	// });

	const formContext = useForm({
		shouldUnregister: true,
	});

	const {reset, control, handleSubmit} = formContext;
	const {isDirty, dirtyFields} = useFormState({control});
	const {enqueueSnackbar} = useSnackbar();

	React.useEffect(() => {
		reset(expenseData, {keepErrors: true});
	}, [reset, expenseData]);

	const handleUpdate = handleSubmit((data: FieldValues) => {
		const expense: Expense = {
			id: expenseData.id,
			name: data.name,
			amount: data.amount,
			start: data.start,
			end: data.end,
			type: data.expenseType,
		}
		updateExpense(expense, expenseData.id).then(() => {
			enqueueSnackbar('Expense updated successfully.', {variant: 'success'});
		}).catch((error) => {
			enqueueSnackbar(`Failed to update expense: ${error.message}`, {variant: 'error'});
		});

		// const requestData: {[key: string]: string} = {};
		// Object.entries(dirtyFields).forEach(([key, value]) => {
		// 	if (value === true) {
		// 		requestData[key] = data[key].toString();
		// 	}
		// });

		// updateExpense(expenseData.investmentVehicleId, requestData)
		// 	.then(() => {
		// 		enqueueSnackbar('Vehicle updated successfully.', {variant: 'success'});
		// 		submit(null, {action: updateAction, method: 'post'});
		// 	})
		// 	.catch((error) => {
		// 		enqueueSnackbar(`Failed to update vehicle: ${error.message}`, {variant: 'error'});
		// 	});
	});

	const temp = () => {
		console.log("clicked")
	};

	return (
		<Box sx={{display: 'flex', flexDirection: 'column'}}>
			<Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
				<Typography variant='h6' component='div' sx={{flexGrow: 1, marginBottom: '1rem'}}>
					Expense Details: {expenseData.name}
				</Typography>
				<FormProvider {...formContext}>
					<ExpenseDataForm defaultValues={expenseData} disableTypeSelect={true}>
						<DialogActions>
							<Button color='error' onClick={() => setShowDelete(true)}>
								Delete
							</Button>
							<Button onClick={handleUpdate} disabled={!isDirty}>
								Update
							</Button>
						</DialogActions>
						
					</ExpenseDataForm>
				</FormProvider>
			</Box>
			{/* <Box sx={{width: '100%', height: '100%'}}>
				<VehicleModelGraph vehicleId={expenseData.investmentVehicleId} />
			</Box> */}
			<ConfirmDeleteExpense
				open={showDelete}
				onClose={() => setShowDelete(false)}
				onConfirm={() => submit(null, {action: deleteAction, method: 'delete'})}
				expenseId={expenseData.id}
			/>
		</Box>
	);
};
