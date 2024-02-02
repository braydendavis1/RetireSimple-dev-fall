import { style  } from '@mui/system';
import {Box, Button, Divider, Tab, Tabs, Typography, Icon} from '@mui/material';

import {InvestmentVehicle, InvestmentVehicleInfo} from '../Interfaces';
import { VehicleModelGraph } from './GraphComponents';
import { deleteVehicle } from '../api/VehicleApi';
import { getInvestmentVehicles } from '../api/New API/InvestmentVehicleApi';
import { deleteInvestmentVehicle } from '../api/New API/InvestmentVehicleApi';



export const VehicleComponent = (vehicle: InvestmentVehicleInfo, callback: Function) => {
//deleteInvestment

	return <body style={{backgroundColor: 'white', margin: '15px', outline: '5px solid black'}}>
		<div style={{width: '900px', paddingLeft: '10px', paddingBottom: '10px', paddingRight: '0px'}}>
			<span>
				<button onClick={() => getInvestmentVehicles()}>
					Test
				</button>
				<h2> {vehicle.id} 
					<Button onClick={() => callback()}>
						<Icon style={{color: 'black'}} baseClassName='material-icons'>edit_circle</Icon>
						<Typography variant='body1' component='div' sx={{marginLeft: '10px'}}>
							{/* Delete Vehicle */}
						</Typography>
					</Button>
					<Button onClick={() => deleteInvestmentVehicle(vehicle.id)}>
						<Icon style={{color: 'black'}} baseClassName='material-icons'>delete_circle</Icon>
						<Typography variant='body1' component='div' sx={{marginLeft: '10px'}}>
							{/* Delete Vehicle */}
						</Typography>
					</Button>
				</h2>				
			</span>
			<span style={{display: 'flex'}}>
				<div style={{flex: '50%', width: '50px'}}>
					<VehicleModelGraph vehicleId={vehicle.id} />
				</div>
			</span>
		</div>
	</body>
}