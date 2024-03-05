import { style  } from '@mui/system';
import {Box, Button, Divider, Tab, Tabs, Typography, Icon} from '@mui/material';

import {InvestmentVehicle, InvestmentVehicleInfo} from '../Interfaces';
import { InvestmentModelGraph, VehicleModelGraph } from './GraphComponents';
import { deleteVehicle } from '../api/VehicleApi';
import { getInvestmentVehicles } from '../api/New API/InvestmentVehicleApi';
import { deleteInvestmentVehicle } from '../api/New API/InvestmentVehicleApi';
import { Link, useNavigate } from 'react-router-dom';


export const VehicleComponent = 
(vehicle: InvestmentVehicleInfo, 
	navigate: Function, 
	loadVehicles: Function) => {

	return <body 
		onClick={() => navigate()}
		style={{backgroundColor: 'white', margin: '15px', outline: '5px solid black'}}>
		<div style={{width: '900px', paddingLeft: '10px', paddingBottom: '10px', paddingRight: '0px'}}>
			<span>
				<h2> {vehicle.name} 	
				</h2>				
			</span>
			<h3> Current Value: ${vehicle.value} </h3>
			<h3> Projected Value: NYI </h3>
			<div style={{flex: '50%', width: '50px'}}>
				<VehicleModelGraph vehicleId={vehicle.id} />
			</div>
		</div>
	</body>
}