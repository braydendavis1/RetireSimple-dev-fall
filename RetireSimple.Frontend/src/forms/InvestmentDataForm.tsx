import {Box, Grid} from '@mui/material';
import React from 'react';
import {useFormContext, useWatch} from 'react-hook-form';
import {FormSelectField, FormTextField, FormTextFieldCurrency, FormTextFieldPercent} from '../components/InputComponents';
import {BondForm} from './investment/BondForm';
import {StockForm} from './investment/StockForm';
import {PensionForm} from './investment/PensionForm';
import { Investment } from '../Interfaces';

export interface InvestmentDataFormProps {
	defaultValues?: any;
	disableTypeSelect?: boolean;
	children?: React.ReactNode;
	selectedInvestment?: Investment;
}

export const InvestmentDataForm = (props: InvestmentDataFormProps) => {
	const formContext = useFormContext();

	const investmentType = useWatch({
		name: 'investmentType',
		control: formContext.control,
		defaultValue: 'StockInvestment',
	});
	const {errors} = formContext.formState;

	const investmentNameField = (
		<FormTextField
			name='investmentName'
			label='Investment Name'
			// defaultValue='default-testing'
			defaultValue={props.defaultValues ? props.defaultValues.investmentName : ''}
			control={formContext.control}
			errorField={errors.investmentName}
			tooltip='The name of this investment. Can be a personally identifiable name.'
		/>
	);

	const investmentTypeField = (
		<FormSelectField
			name='investmentType'
			label='Investment Type'
			control={formContext.control}
			errorField={errors.investmentType}
			defaultOption='StockInvestment'
			options={[
				{value: 'StockInvestment', label: 'Stock', tooltip:''},
				{value: 'BondInvestment', label: 'Bond', tooltip:''},
				{value: 'PensionInvestment', label: 'Pension/Social Security', tooltip:''},
			]}
			disable={props.disableTypeSelect ?? false}
			tooltip=''
			// tooltip='The type of security this investment represents.'
		/>
	);

	const stockForm = (
		<>
			<Grid item xs={4}>
				<FormTextFieldCurrency
					name='cost'
					label='Original Cost'
					// defaultValue='default-testing'
					defaultValue={props.defaultValues ? props.defaultValues.cost : ''}
					control={formContext.control}
					errorField={errors.cost}
					tooltip='The original cost of this investment.'
				/>
			</Grid>
			<Grid item xs={4}>
				<FormTextFieldCurrency
					name='currentValue'
					label='Current Value'
					// defaultValue='default-testing'
					defaultValue={props.defaultValues ? props.defaultValues.currentValue : ''}
					control={formContext.control}
					errorField={errors.currentValue}
					tooltip='The current value of this investment.'
				/>
			</Grid>
			<Grid item xs={4}>
				<FormTextFieldPercent
					name='rate'
					label='Growth Rate'
					// defaultValue='default-testing'
					defaultValue={props.defaultValues ? props.defaultValues.rate : ''}
					control={formContext.control}
					errorField={errors.rate}
					tooltip='The expected growth rate of this investment.'
				/>
			</Grid>
		</>
	);

	// const investmentTypeSubform = React.useMemo(() => {
	// 	switch (investmentType) {
	// 		case 'StockInvestment':
	// 			return (
	// 				<StockForm
	// 					defaultValues={props.selectedInvestment}
						
	// 				/>
	// 			);
	// 		case 'BondInvestment':
	// 			return (
	// 				<BondForm
	// 					analyisisTypeField={
	// 						<FormSelectField
	// 							name='analysisType'
	// 							label='Analysis Type'
	// 							control={formContext.control}
	// 							errorField={errors.analysisType}
	// 							options={[{value: 'StdBondValuation', label: 'Bond Valuation', tooltip:'This is monte bond form'}]}
	// 							defaultOption=''
	// 							disable={false}
	// 							tooltip='The type of analysis to run on this investment. Only standard bond valuation is currently supported.'
	// 						/>
	// 					}
	// 				/>
	// 			);
	// 		case 'PensionInvestment':
	// 			return (
	// 				<PensionForm
	// 					analysisTypeField={
	// 						<FormSelectField
	// 							name='analysisType'
	// 							label='Analysis Type'
	// 							control={formContext.control}
	// 							errorField={errors.analysisType}
	// 							options={[
	// 								{
	// 									value: 'PensionSimulation',
	// 									label: 'Pension Simulation',
	// 									tooltip:'This is pension',
	// 								},
	// 							]}
	// 							defaultOption=''
	// 							disable={false}
	// 							tooltip='The type of analysis to run on this investment. Only pension simulations are currently supported.'
	// 						/>
	// 					}
	// 				/>
	// 			);
	// 		default:
	// 			return <div>Unknown investment type</div>;
	// 	}
	// }, [investmentType, formContext.control, errors]);

	return (
		<>
			<Box>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						{investmentNameField}
					</Grid>
					<Grid item xs={4}>
						{investmentTypeField}
					</Grid>
					{stockForm}
				</Grid>

				{/* {investmentTypeSubform} */}
			</Box>
			{props.children}
		</>
	);
};
