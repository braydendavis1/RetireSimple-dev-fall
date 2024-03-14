import {Box, Grid, Typography} from '@mui/material';
import {useFormContext, useWatch} from 'react-hook-form';
import {
	FormSelectField,
	FormTextField,
	FormTextFieldCurrency,
	FormTextFieldMonthUnits,
	FormTextFieldPercent,
} from '../components/InputComponents';
import React from 'react';

export interface VehicleDataFormProps {
	defaultValues?: any;
	disableTypeSelect?: boolean;
	children?: React.ReactNode;
}

export const VehicleDataForm = (props: VehicleDataFormProps) => {
	const formContext = useFormContext();

	const investmentVehicleType = useWatch({
		name: 'investmentVehicleType',
		control: formContext.control,
		defaultValue: 'Vehicle401k',
	});

	const {errors} = formContext.formState;

	const vehicleNameField = (
		<FormTextField
			name='investmentVehicleName'
			label='Name'
			control={formContext.control}
			errorField={errors.investmentVehicleName}
			tooltip='The name of this investment vehicle. Usually a personally identifiable name.' 
			defaultValue={props.defaultValues ? props.defaultValues.name : ''}		/>
	);

	const vehicleTypeField = (
		<FormSelectField
			name='investmentVehicleType'
			label='Vehicle Type'
			control={formContext.control}
			errorField={errors.investmentVehicleType}
			defaultOption='Vehicle401k'
			options={[
				{value: 'Vehicle401k', label: '401k', tooltip: ''},
				{value: 'VehicleIRA', label: 'IRA', tooltip: ''},
				{value: 'VehicleRothIRA', label: 'Roth IRA', tooltip: ''},
				{value: 'Vehicle403b', label: '403b', tooltip: ''},
				{value: 'Vehicle457', label: '457', tooltip: ''},
			]}
			disable={props.disableTypeSelect ?? false}
			tooltip='The type of vehicle this is. This does alter how we determine the tax-applied model.'
		/>
	);

	const cashHoldingField = (
		<FormTextFieldCurrency
			name='cashHoldings'
			label='Cash Holdings'
			control={formContext.control}
			errorField={errors.cashHoldings}
			tooltip='The amount of cash in the vehicle that is not invested in a security.' 
			defaultValue={props.defaultValues ? props.defaultValues.value : ''}		/>
	);

	const Analysis401kForm = () => {
		const formContext = useFormContext();
		const userContributionType = useWatch({
			name: 'analysis_userContributionType',
			control: formContext.control,
			defaultValue: 'percentage',
		});
	
		const {errors} = formContext.formState;
	
		//==============================================
		//Field definitions (To reduce indent depth)
		//==============================================
	
		const salaryField = (
			<FormTextFieldCurrency
				name='analysis_salary'
				label='Salary'
				control={formContext.control}
				errorField={errors.analysis_salary}
				tooltip={<>
					<Typography variant='inherit'>
						The salary of the job associated with this vehicle.
					</Typography>
					<Typography variant='inherit'>
						This is used to determine the amount of money that can be contributed to the
						vehicle.
					</Typography>
				</>} 
				defaultValue={props.defaultValues ? props.defaultValues.salary : ''}			/>
		);
		const salaryIncrease = (
			<FormTextFieldPercent
				name='analysis_salaryIncrease'
				label='Salary Increase'
				control={formContext.control}
				errorField={errors.analysis_salaryIncrease}
				tooltip={<>
					<Typography variant='inherit'>
						The rate you expect your salary to grow each year.
					</Typography>
				</>} 
				defaultValue={props.defaultValues ? props.defaultValues.salaryIncrease : ''}			/>
		);
	
		// const payFrequencyField = (
		// 	<FormSelectField
		// 		name='analysis_payFrequency'
		// 		label='Pay Frequency'
		// 		control={formContext.control}
		// 		errorField={errors.analysis_payFrequency}
		// 		defaultOption='biweekly'
		// 		options={[
		// 			{value: 'biweekly', label: 'Biweekly', tooltip: ''},
		// 			{value: 'weekly', label: 'Weekly', tooltip: ''},
		// 			{value: 'monthly', label: 'Monthly', tooltip: ''},
		// 		]}
		// 		disable={false}
		// 		tooltip={
		// 			<>
		// 				<Typography variant='inherit'>
		// 					The frequency of paychecks for the job associated with this vehicle.
		// 				</Typography>
		// 				<Typography variant='inherit'>
		// 					This is used to determine monthly contribution amounts and limits.
		// 				</Typography>
		// 			</>
		// 		}
		// 	/>
		// );
	
		const employerMatchField = (
			<FormTextFieldPercent
				name='analysis_employerMatchPercentage'
				label='Employer Match'
				control={formContext.control}
				errorField={errors.analysis_employerMatchPercentage}
				tooltip={<>
					<Typography variant='inherit'>
						The percentage of the employee contribution that the employer will match.
					</Typography>
				</>} 
				defaultValue={props.defaultValues ? props.defaultValues.employerMatch : ''}			/>
		);
	
		const employerMatchCap = (
			<FormTextFieldPercent
				name='analysis_employerMatchCap'
				label='Employer Match Cap'
				control={formContext.control}
				errorField={errors.analysis_employerMatchCap}
				tooltip={<>
					<Typography variant='inherit'>
						The max employee contribution that the employer will match.
					</Typography>
				</>} 
				defaultValue={props.defaultValues ? props.defaultValues.employerMatchCap : ''}			/>
		);
	
		const rate = (
			<FormTextFieldPercent
				name='analysis_rate'
				label='Rate'
				control={formContext.control}
				errorField={errors.analysis_rate}
				tooltip={<>
					<Typography variant='inherit'>
						The rate you expect the vehicle to grow.
					</Typography>
				</>} 
				defaultValue={props.defaultValues ? props.defaultValues.rate : ''}			/>
		);
	
		const userContributionTypeField = (
			<FormSelectField
				name='analysis_userContributionType'
				label='User Contribution Type'
				control={formContext.control}
				errorField={errors.analysis_userContributionType}
				defaultOption={props.defaultValues ? props.defaultValues.contributionType : 'percentage'}		
				options={[
					{value: 'percentage', label: 'Paycheck Percentage', tooltip: ''},
					{value: 'fixed', label: 'Fixed Amount', tooltip: ''},
				]}
				disable={false}
				tooltip={
					<>
						<Typography variant='inherit'>
							The type of user contribution to the vehicle.
						</Typography>
						<Typography variant='inherit'>
							Percentage calculates the contribution based on a percentage of salary.
						</Typography>
						<Typography variant='inherit'>
							Fixed calculates the contribution based on a fixed amount.
						</Typography>
					</>
				}
			/>
		);
	
		const userContributionField = React.useMemo(() => {
			switch (userContributionType) {
				case 'percentage':
					return (
						<FormTextFieldPercent
							name='analysis_userContributionPercentage'
							label='User Contribution'
							control={formContext.control}
							errorField={errors.analysis_userContributionPercentage}
							tooltip='The percentage of the a paycheck used to contribute to a vehicle.' 
							defaultValue={props.defaultValues ? props.defaultValues.contributions : ''}							/>
					);
				case 'fixed':
					return (
						<FormTextFieldCurrency
							name='analysis_userContributionAmount'
							label='User Contribution'
							control={formContext.control}
							errorField={errors.analysis_userContributionAmount}
							tooltip='The amount of money contributed to the vehicle each month.' 
							defaultValue={props.defaultValues ? props.defaultValues.contributions : ''}							/>
					);
				default:
					return null;
			}
		}, [userContributionType, formContext.control, errors]);
	
		//add salary increase and fix contribution type
		return (
			<>
		
				<Grid item xs={6} sm={4}>
					{rate}
				</Grid>
				<Grid item xs={6} sm={4}>
					{salaryField}
				</Grid>
				<Grid item xs={6} sm={4}>
					{salaryIncrease}
				</Grid>
				<Grid item xs={6} sm={4}>
					{employerMatchField}
				</Grid>
				<Grid item xs={6} sm={4}>
					{employerMatchCap}
				</Grid>
				<Grid item xs={6} sm={4}>
					{userContributionTypeField}
				</Grid>
				<Grid item xs={6} sm={4}>
					{userContributionField}
				</Grid>
			</>
		);
	};

	const analysisSubform = React.useMemo(() => {
		switch (investmentVehicleType) {
			case 'Vehicle401k':
			case 'Vehicle403b':
			case 'Vehicle457':
				return <Analysis401kForm />;
			default:
				return (
					<Grid item xs={4}>
						<FormTextFieldCurrency
							name='analysis_userContributionFixed'
							label='User Contribution'
							control={formContext.control}
							errorField={errors.analysis_userContributionFixed}
							tooltip='The amount of money that you contribute to this vehicle each month.' 
							defaultValue={props.defaultValues ? props.defaultValues.contributions : ''}						/>
					</Grid>
				);
		}
	}, [errors.analysis_userContributionFixed, formContext.control, investmentVehicleType]);

	return (
		<>
			<Box>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						{vehicleNameField}
					</Grid>
					<Grid item xs={4}>
						{vehicleTypeField}
					</Grid>
					<Grid item xs={4} />
					<Grid item xs={4}>
						{cashHoldingField}
					</Grid>
					<Grid item xs={8} />
					<Grid item xs={12}>
						<Typography variant='subtitle2'>Analysis Configuration</Typography>
					</Grid>
					{/* <Grid item xs={4}>
						{analysisLengthField}
					</Grid>
					<Grid item xs={4}>
						{shortTermCapitalGainsField}
					</Grid>
					<Grid item xs={4}>
						{longTermCapitalGainsField}
					</Grid> */}

					{analysisSubform}
				</Grid>
			</Box>
			{props.children}
		</>
	);
};
