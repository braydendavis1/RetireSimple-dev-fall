import {Box, Button, Grid, Typography} from '@mui/material';
import {useFormContext, useWatch} from 'react-hook-form';
import {
	FormDatePicker,
	FormSelectField,
	FormTextField,
	FormTextFieldCurrency,
	FormTextFieldMonthUnits,
	FormTextFieldPercent,
} from '../components/InputComponents';
import {Analysis401kForm} from './analysis/Analysis401kForm';
import React from 'react';
import { Expense } from '../Interfaces';

export interface ExpenseDataFormProps {
	defaultValues?: any;
	disableTypeSelect?: boolean;
	children?: React.ReactNode;
    isEditing?: boolean;
}

export const ExpenseDataForm = (props: ExpenseDataFormProps) => {
	const formContext = useFormContext();

	const {errors} = formContext.formState;

	const amountField = (
		<FormTextFieldCurrency
			control={formContext.control}
			name='amount'
			label='Expense Amount'
			errorField={undefined} 
			defaultValue={''}		/>
	);

	const expenseTypeField = (
		<FormSelectField
			control={formContext.control}
			name='type'
			label='Expense Type'
			options={[
				{value: 'OneTime', label: 'One Time', tooltip: ''},
				{value: 'Monthly', label: 'Monthly', tooltip: ''},
			]}
			defaultOption='OneTime'
			errorField={undefined}
			disable={false}
		/>
	);
        
	const nameField = (
		<FormTextField
			control={formContext.control}
			name='name'
			label='Name'
			errorField={undefined} 
			defaultValue={''}		/>
	);
    
	const startField = (
		<FormTextField
			control={formContext.control}
			name='start'
			label='Starting Age'
			errorField={undefined} 
			defaultValue={''}		/>
	);
	const endField = (
		<FormTextField
			control={formContext.control}
			name='end'
			label='Ending Age'
			errorField={undefined} 
			defaultValue={''}		/>
	);

	return (
		<>
			<Box>
				<Grid container spacing={2} sx={{marginTop: '0.25rem'}}>
					<Grid item xs={4}>
						{nameField}
					</Grid>
					<Grid item xs={4}>
						{amountField}
					</Grid>
					<Grid item xs={4}>
						{expenseTypeField}
					</Grid>

					<Grid item xs={4}>
						{startField}
					</Grid>
					<Grid item xs={4}>
						{endField}
					</Grid>
				</Grid>
			</Box>
			{props.children}
			{/* {props.isEditing ?? (
				<> 
					<Button color='error'
						//  onClick={() => setShowDelete(true)}
					>
						Delete
					</Button>
					<Button 
						// onClick={() => formContext.handleSubmit(handleUpdate)
					>
						Update
					</Button>
				</>
			)
			} */}
		</>
	);
};
