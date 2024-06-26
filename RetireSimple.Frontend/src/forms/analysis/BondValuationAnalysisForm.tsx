import {Grid, Typography} from '@mui/material';
import {useFormContext} from 'react-hook-form';
import {FormSelectField, FormTextFieldMonthUnits} from '../../components/InputComponents';

export const BondValuationAnalysisForm = () => {
	const formContext = useFormContext();
	const {errors} = formContext.formState;

	//==============================================
	//Field definitions (To reduce indent depth)
	//==============================================
	const analysisLengthField = (
		<FormTextFieldMonthUnits
			name='analysis_analysisLength'
			label='Analysis Length'
			control={formContext.control}
			errorField={errors.analysis_analysisLength}
			tooltip='The number of months starting from today to run the analysis for.' defaultValue={''}		/>
	);
	const analysisIsAnnualField = (
		<FormSelectField
			name='analysis_isAnnual'
			label='Is Annual'
			control={formContext.control}
			options={[
				{value: 'true', label: 'Annual', tooltip: "Annual"},
				{value: 'false', label: 'Semi Annual', tooltip: "Semi annual"},
			]}
			defaultOption={'true'}
			disable={false}
			errorField={errors.analysis_isAnnual}
		/>
	);

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography variant='subtitle2'>Bond Valuation Parameters</Typography>
			</Grid>
			<Grid item xs={4}>
				{analysisLengthField}
			</Grid>
			<Grid item xs={4}>
				{analysisIsAnnualField}
			</Grid>
		</Grid>
	);
};
