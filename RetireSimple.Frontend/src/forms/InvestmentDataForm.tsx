import {Box, Grid} from '@mui/material';
import React from 'react';
import {useFormContext, useWatch} from 'react-hook-form';
import {FormSelectField, FormTextField} from '../components/InputComponents';
import {BondForm} from './investment/BondForm';
import {StockForm} from './investment/StockForm';

export interface InvestmentDataFormProps {
	defaultValues?: any;
	disableTypeSelect?: boolean;
	children?: React.ReactNode;
}

export const InvestmentDataForm = (props: InvestmentDataFormProps) => {
	const formContext = useFormContext();

	const investmentType = useWatch({
		name: 'investmentType',
		control: formContext.control,
		defaultValue: 'StockInvestment',
	});
	const {errors} = formContext.formState;

	//==============================================
	//Field definitions (To reduce indent depth)
	//==============================================
	const investmentNameField = (
		<FormTextField
			name='investmentName'
			label='Name'
			control={formContext.control}
			errorField={errors.investmentName}
			tooltip='The name of this investmnet. Can be a personally identifiable name.'
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
				{value: 'StockInvestment', label: 'Stock'},
				{value: 'BondInvestment', label: 'Bond'},
			]}
			disable={props.disableTypeSelect ?? false}
			tooltip='The type of security this investment represents.'
		/>
	);

	const investmentTypeSubform = React.useMemo(() => {
		switch (investmentType) {
			case 'StockInvestment':
				return (
					<StockForm
						analysisTypeField={
							<FormSelectField
								name='analysisType'
								label='Analysis Type'
								control={formContext.control}
								errorField={errors.analysisType}
								options={[
									{
										value: 'MonteCarlo_NormalDist',
										label: 'Monte Carlo (Normal Dist)',
									},
									{
										value: 'MonteCarlo_LogNormalDist',
										label: 'Monte Carlo (Log Normal Dist)',
									},
								]}
								defaultOption=''
								disable={false}
								tooltip='The type of analysis to run on this investment. Only Monte Carlo Simulations are currently supported.'
							/>
						}
					/>
				);
			case 'BondInvestment':
				return (
					<BondForm
						analyisisTypeField={
							<FormSelectField
								name='analysisType'
								label='Analysis Type'
								control={formContext.control}
								errorField={errors.analysisType}
								options={[
									{value: 'bondValuationAnalysis', label: 'Bond Valuation'},
								]}
								defaultOption=''
								disable={false}
								tooltip='The type of analysis to run on this investment. Only standard bond valuation is currently supported.'
							/>
						}
					/>
				);
			default:
				return <div>Unknown investment type</div>;
		}
	}, [investmentType, formContext.control, errors]);

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
				</Grid>
				{investmentTypeSubform}
			</Box>
			{props.children}
		</>
	);
};
