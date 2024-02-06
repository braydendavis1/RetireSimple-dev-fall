import {Button, Icon, Typography} from '@mui/material';
import React, { useState } from 'react';
import {ApiPresetData,InvestmentVehicleInfo} from '../Interfaces';
import { AddVehicleDialog } from '../components/DialogComponents';
import { PresetContext } from '../Layout';
import { getAnalysisPresets } from '../api/ApiCommon';
import { VehicleComponent } from '../components/VehicleComponent';

import { getInvestmentVehicles } from '../api/New API/InvestmentVehicleApi';
import { deleteInvestmentVehicle } from '../api/New API/InvestmentVehicleApi';
import { convertInvestmentVehiclesInfo } from '../api/ApiMapper';
import { useNavigate } from 'react-router-dom';

  
export function VehiclesPage() { 

	const [vehicleList, setVehicleList] = useState<InvestmentVehicleInfo[]>([]);
	
	const [presetData, setPresetData] = React.useState<ApiPresetData | undefined>(undefined);

	const [vehicleAddDialogOpen, setVehicleAddDialogOpen] = React.useState(false);
	const navigate = useNavigate();

	React.useEffect(() => {
		if (presetData === undefined) {
			getAnalysisPresets().then((data) => {
				setPresetData(data);
			});
		}
		getInvestmentVehicles().then((data) => {
			console.log("VEHICLES")
			console.log(data);
			setVehicleList(convertInvestmentVehiclesInfo(data));
		});
	}, [presetData]);
	
	const navigatePage = (id: string) => {
		navigate(`/VehiclesPage/${id}`);
	};


	const openEditDialog = () => {
		console.log("PRESS Vehicle FROM FUNC");
		//setEdit(true);
	};


	return <div><PresetContext.Provider value={presetData}>
		<h2>Vehicles</h2>
		<Button onClick={() => setVehicleAddDialogOpen(true)}>
			<Icon baseClassName='material-icons'>add_circle</Icon>
			<Typography variant='body1' component='div' sx={{marginLeft: '10px'}}>
				Add Vehicle
			</Typography>
		</Button>
		
		{vehicleList.map((vehicle: InvestmentVehicleInfo) => 
			(VehicleComponent(vehicle, () => {openEditDialog()}, () => {navigatePage(vehicle.id)})))
		}
		
		<AddVehicleDialog
			open={vehicleAddDialogOpen}
			onClose={() => setVehicleAddDialogOpen(false)}
		/>
	</PresetContext.Provider>
	</div>;
} 