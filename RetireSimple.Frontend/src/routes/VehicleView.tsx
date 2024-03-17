import {Box, Button, Divider, Typography} from '@mui/material';
import React from 'react';
import {FieldValues, FormProvider, useForm, useFormState} from 'react-hook-form';
import {useFormAction, useLoaderData, useSubmit} from 'react-router-dom';
// import {updateVehicle} from '../api/VehicleApi';
import {ConfirmDeleteDialog} from '../components/DialogComponents';
import {VehicleModelGraph} from '../components/GraphComponents';
import {VehicleDataForm} from '../forms/VehicleDataForm';
import {useSnackbar} from 'notistack';
import { updateInvestmentVehicle } from '../api/New API/InvestmentVehicleApi';

export const VehicleView = () => {
	const [showDelete, setShowDelete] = React.useState(false);
	const vehicleData = useLoaderData() as any;
	const submit = useSubmit();
	const deleteAction = useFormAction('delete');
	const updateAction = useFormAction('update');
	const formContext = useForm({
		shouldUnregister: true,
		// resolver: yupResolver(vehicleFormSchema),
		// defaultValues: vehicleData ?? VehicleFormDefaults,
	});

	const {reset, control, handleSubmit} = formContext;
	const {isDirty, dirtyFields} = useFormState({control});
	const {enqueueSnackbar} = useSnackbar();

	React.useEffect(() => {
		reset(vehicleData, {keepErrors: true});
	}, [reset, vehicleData]);

	const handleUpdate = handleSubmit((data: FieldValues) => {
		const vehicle: {[key: string]: string} = {};
		Object.entries(data)
			.map(([key, value]) => [key, value.toString()])
			.forEach(([key, value]) => (vehicle[key] = value));
		vehicle["id"] = vehicleData.id;
		// const vehicle: InvestmentVehicleInfo = {
		// 	id: vehicleData.id,
		// 	name: data.investmentVehicleName,
		// 	value: data.cashHoldings,
		// 	contributions: data.analysis_userContributionPercentage,
		// 	contributionType: data.analysis_userContributionType,
		// 	salary: data.analysis_salary,
		// 	salaryIncrease: data.analysis_salaryIncrease,
		// 	rate: data.analysis_rate,
		// 	type: data.investmentVehicleType,
		// 	employerMatch: data.analysis_employerMatchPercentage,
		// 	employerMatchCap: data.analysis_employerMatchCap,
		// 	projection: null,
		// };
		updateInvestmentVehicle(vehicle, vehicleData.id).then(() => {
			enqueueSnackbar('Vehicle updated successfully.', {variant: 'success'});
		}).catch((error) => {
			enqueueSnackbar(`Failed to update vehicle: ${error.message}`, {variant: 'error'});
		});
	});
	return (
		<><Box sx={{ display: 'flex', flexDirection: 'column' }}>
			<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
				<Typography variant='h6' component='div' sx={{ flexGrow: 1, marginBottom: '1rem' }}>
					Vehicle Details: {vehicleData.investmentVehicleName}
				</Typography>
				<FormProvider {...formContext}>
					<VehicleDataForm defaultValues={vehicleData} disableTypeSelect={true}>
						<Divider sx={{ paddingY: '5px' }} />
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'flex-end',
							}}>
							<Button color='error' onClick={() => setShowDelete(true)}>
								Delete
							</Button>
							<Button onClick={handleUpdate} disabled={!isDirty}>
								Update
							</Button>
						</Box>
					</VehicleDataForm>
				</FormProvider>
			</Box><Box sx={{ width: '100%', height: '100%' }}>
				<VehicleModelGraph vehicleId={vehicleData.investmentVehicleId} />
			</Box><ConfirmDeleteDialog
				open={showDelete}
				onClose={() => setShowDelete(false)}
				onConfirm={() => submit(null, {action: deleteAction, method: 'delete'})}
				vehicleId={vehicleData.id} />
		</Box>
		</>
	);
};
