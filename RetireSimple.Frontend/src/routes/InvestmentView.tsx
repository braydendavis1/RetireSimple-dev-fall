import {Box, Button, Divider, Typography} from '@mui/material';
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {FieldValues} from 'react-hook-form/dist/types';
import {useFormAction, useLoaderData, useSubmit} from 'react-router-dom';
import {Investment} from '../Interfaces';
import {ConfirmDeleteInvestment} from '../components/DialogComponents';
import {InvestmentModelGraph} from '../components/GraphComponents';
import {InvestmentDataForm} from '../forms/InvestmentDataForm';
import {useSnackbar} from 'notistack';
import { updateInvestment } from '../api/New API/InvestmentApi';

export const InvestmentView = () => {
	const [showDelete, setShowDelete] = React.useState(false);
	const investmentData = useLoaderData() as any;
	const submit = useSubmit();
	const deleteAction = useFormAction('delete');
	const formContext = useForm({
		shouldUnregister: true,
	});
	const {enqueueSnackbar} = useSnackbar();

	const {handleSubmit} = formContext;

	React.useEffect(() => {
	}, []);

	const handleUpdate = handleSubmit((data: FieldValues) => {
		const investment: {[key: string]: string} = {};
		investment["bondLength"] = "0";
		investment["bondQuantity"] = "0";
		investment["id"] = "";
		investment["vehicleId"] = "";
		Object.entries(data)
			.map(([key, value]) => [key, value.toString()])
			.forEach(([key, value]) => (investment[key] = value));
		investment["id"] = investmentData.id;
		updateInvestment(investment, investment.id).then(() => {
			enqueueSnackbar('Investment updated successfully.', {variant: 'success'});
		}).catch((error) => {
			enqueueSnackbar(`Failed to update investment: ${error.message}`, {variant: 'error'});
		});
	});

	return (
		<><Box sx={{ display: 'flex', flexDirection: 'column' }}>
			<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
				<Typography variant='h6' component='div' sx={{ flexGrow: 1, marginBottom: '1rem' }}>
					Investment Details: {investmentData.investmentVehicleName}
				</Typography>
				<FormProvider {...formContext}>
					<InvestmentDataForm defaultValues={investmentData} disableTypeSelect={true}>
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
							<Button onClick={handleUpdate}
								// disabled={!isDirty}
							>
								Update
							</Button>
						</Box>
					</InvestmentDataForm>
				</FormProvider>
			</Box>
			{/* <Box sx={{ width: '100%', height: '100%' }}>
				<InvestmentModelGraph investmentId={investmentData.investmentId} />
			</Box> */}
			<ConfirmDeleteInvestment
				open={showDelete}
				onClose={() => setShowDelete(false)}
				onConfirm={() => submit(null, {action: deleteAction, method: 'delete'})}
				id={investmentData.id} />
		</Box>
		</>
	);
};
