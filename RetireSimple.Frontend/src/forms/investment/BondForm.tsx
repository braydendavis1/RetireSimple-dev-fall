import React from 'react';
import {useFormContext} from 'react-hook-form';
import {FormDatePicker, FormTextField} from '../Inputs';
import {Grid} from '@mui/material';

export interface BondFormProps {
	defaultValues?: any;

}

export const BondForm = (props:BondFormProps) => {
	const formContext = useFormContext();
	const {errors} = formContext.formState;

	//==============================================
	//Field definitions (To reduce indent depth)
	//==============================================
	const bondTickerField = (
		<FormTextField
			name='bondTicker'
			label='Ticker'
			control={formContext.control}
			errorField={errors.bondTicker}
		/>);

	const bondCouponRateField = (
		<FormTextField
			name='bondCouponRate'
			label='Coupon Rate'
			control={formContext.control}
			errorField={errors.bondCouponRate}
		/>);

	const bondYTMField = (
		<FormTextField
			name='bondYieldToMaturity'
			label='Yield to Maturity'
			control={formContext.control}
			errorField={errors.bondYieldToMaturity}
		/>);

	const bondMaturityDateField = (
		<FormDatePicker
			name='bondMaturityDate'
			label='Maturity Date'
			control={formContext.control}
			errorField={errors.bondMaturityDate}
			defaultValue={props.defaultValues?.bondMaturityDate ??''}
		/>);

	const bondPurchasePriceField = (
		<FormTextField
			name='bondPurchasePrice'
			label='Purchase Price'
			control={formContext.control}
			errorField={errors.bondPurchasePrice}
		/>);

	const bondPurchaseDateField = (
		<FormDatePicker
			name='bondPurchaseDate'
			label='Purchase Date'
			control={formContext.control}
			errorField={errors.bondPurchaseDate}
			defaultValue={props.defaultValues?.bondPurchaseDate ??''}
		/>);

	const bondCurrentPriceField = (
		<FormTextField
			name='bondCurrentPrice'
			label='Current Price'
			control={formContext.control}
			errorField={errors.bondCurrentPrice}
		/>);

	return(
		<>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>{bondTickerField}</Grid>
				<Grid item xs={12} sm={6}>{bondCouponRateField}</Grid>
				<Grid item xs={12} sm={6}>{bondYTMField}</Grid>
				<Grid item xs={12} sm={6}>{bondMaturityDateField}</Grid>
				<Grid item xs={12} sm={6}>{bondPurchasePriceField}</Grid>
				<Grid item xs={12} sm={6}>{bondPurchaseDateField}</Grid>
				<Grid item xs={12} sm={6}>{bondCurrentPriceField}</Grid>
			</Grid>
		</>
	)


}


