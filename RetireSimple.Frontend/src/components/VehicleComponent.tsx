import {InvestmentVehicleInfo} from '../Interfaces';
import { VehicleModelGraph } from './GraphComponents';
// import { deleteVehicle } from '../api/VehicleApi';
import { getInvestmentVehicleProjection, getInvestmentVehicles } from '../api/New API/InvestmentVehicleApi';
import { deleteInvestmentVehicle } from '../api/New API/InvestmentVehicleApi';
import React from 'react';


export const VehicleComponent = 
( key: string,
	vehicle: InvestmentVehicleInfo, 
	navigate: Function, 
	loadVehicles: Function) => {

	return <div style={{backgroundColor: 'white', margin: '15px', outline: '5px solid black'}}>
		<div style={{width: '900px', paddingLeft: '10px', paddingBottom: '10px', paddingRight: '0px'}}>
			<div onClick={() => navigate()}>
				<span>
					<h2> {vehicle.name} 	
					</h2>				
				</span>
				<h3> Current Value: ${vehicle.value} </h3>
				<h3> Projected Value: ${vehicle.projection} </h3>
			</div>
			<div style={{flex: '50%', width: '250px'}}>
				<VehicleModelGraph vehicleId={vehicle.id!} />
			</div>
		</div>
	</div>
}