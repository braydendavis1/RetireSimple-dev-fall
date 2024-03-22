import {InvestmentVehicleInfo} from '../Interfaces';
import { VehicleModelGraph } from './GraphComponents';
import React from 'react';


export const VehicleComponent = 
( key: string,
	vehicle: InvestmentVehicleInfo, 
	navigate: Function, 
	loadVehicles: Function,
	yearOffset: number | undefined) => {

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
				<VehicleModelGraph vehicleId={vehicle.id!} yearOffset={yearOffset} />
			</div>
		</div>
	</div>
}