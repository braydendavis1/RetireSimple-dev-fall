import {Box, Button, DialogActions, Typography} from '@mui/material';
import React from 'react';
import {FieldValues, FormProvider, useForm, useFormState} from 'react-hook-form';
import {useFormAction, useLoaderData, useSubmit} from 'react-router-dom';
import {ConfirmDeleteExpense} from '../components/DialogComponents';
import {useSnackbar} from 'notistack';
import { ExpenseDataForm } from '../forms/ExpenseDataForm';
import { updateExpense } from '../api/New API/ExpenseApi';
import { Expense } from '../Interfaces';
//import { Int32 } from 'bson';

export const ExpenseView = () => {
	const [showDelete, setShowDelete] = React.useState(false);
	const expenseData = useLoaderData() as any;
	const submit = useSubmit();
	const deleteAction = useFormAction('delete');
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
		const expense: {[key: string]: string} = {};
		
		Object.entries(data)
			.map(([key, value]) => [key, value.toString()])
			.forEach(([key, value]) => (expense[key] = value));
		//expense['start'] = (Int32.valueOf(expense['start']) - yearOffset!).toString();
		expense["id"] = expenseData.id;
		updateExpense(expense, expenseData.id).then(() => {
			enqueueSnackbar('Expense updated successfully.', {variant: 'success'});
		}).catch((error) => {
			enqueueSnackbar(`Failed to update expense: ${error.message}`, {variant: 'error'});
		});
	});

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
			<ConfirmDeleteExpense
				open={showDelete}
				onClose={() => setShowDelete(false)}
				onConfirm={() => submit(null, {action: deleteAction, method: 'delete'})}
				expenseId={expenseData.id}
			/>
		</Box>
	);
};
