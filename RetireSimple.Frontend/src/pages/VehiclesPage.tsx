import {Button, Icon, Typography} from '@mui/material';
import React, { useState } from 'react';
import {ApiPresetData,InvestmentVehicleInfo, ProjectionInfo} from '../Interfaces';
import { AddVehicleDialog } from '../components/DialogComponents';
import { PresetContext } from '../Layout';
import { getAnalysisPresets } from '../api/ApiCommon';
import { VehicleComponent } from '../components/VehicleComponent';

import { getInvestmentVehicleProjection, getInvestmentVehicles } from '../api/New API/InvestmentVehicleApi';
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
		loadVehicles();
	}, [presetData]);
	

	const loadVehicles = () => {
		getInvestmentVehicles().then((data) => {
			setVehicleList(convertInvestmentVehiclesInfo(data));
		});
	};


	const navigatePage = (id: string) => {
		navigate(`/VehiclesPage/${id}`);
	};


	return <div><PresetContext.Provider value={presetData}>
		<h2>Vehicles</h2>
		<Button onClick={() => setVehicleAddDialogOpen(true)}>
			<Icon baseClassName='material-icons'>add_circle</Icon>
			<Typography component='div' sx={{marginLeft: '10px'}}>
				Add Vehicle
			</Typography>
		</Button>
		
		{vehicleList.map((vehicle: InvestmentVehicleInfo) => 
			(VehicleComponent(
				vehicle, 
				() => {navigatePage(vehicle.id)},
				() => {loadVehicles()},
			)
					
			))
		}
		
		<AddVehicleDialog
			loadVehicles={loadVehicles}
			open={vehicleAddDialogOpen}
			onClose={() => setVehicleAddDialogOpen(false)}
		/>
	</PresetContext.Provider>
	</div>;
} 