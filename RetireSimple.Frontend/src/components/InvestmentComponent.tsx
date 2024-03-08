import { style  } from '@mui/system';
import {Box, Button, Divider, Tab, Tabs, Typography, Icon} from '@mui/material';

import {Investment} from '../Interfaces';
import { InvestmentModelGraph } from './GraphComponents';

export const InvestmentComponent = (investment: Investment, 
	navigate: Function, 
	loadInvestments: Function) => {
	//Old component
//deleteInvestment

	// return <body style={{backgroundColor: 'white', margin: '15px', outline: '5px solid black'}}>
	// 	<div style={{width: '900px', paddingLeft: '10px', paddingBottom: '10px', paddingRight: '0px'}}>
	// 		<span>
	// 			<h2> {investment.investmentName} 
	// 				<Button onClick={() => openEditDialog(investment)}>
	// 					<Icon style={{color: 'black'}} baseClassName='material-icons'>edit_circle</Icon>
	// 					<Typography variant='body1' component='div' sx={{marginLeft: '10px'}}>
	// 						{/* Delete Investment */}
	// 					</Typography>
	// 				</Button>
	// 				<Button onClick={() => deleteInvestment(investment.investmentId)}>
	// 					<Icon style={{color: 'black'}} baseClassName='material-icons'>delete_circle</Icon>
	// 					<Typography variant='body1' component='div' sx={{marginLeft: '10px'}}>
	// 						{/* Delete Investment */}
	// 					</Typography>
	// 				</Button>
	// 			</h2>				
	// 		</span>
	// 		<span style={{display: 'flex'}}>
	// 			<div style={{flex: '50%'}}>
	// 				<div>Ticker: {investment.investmentData.stockTicker}</div>
	// 				<div>Quantity: {investment.investmentData.stockQuantity}</div>	
	// 			</div>	
	// 			<div style={{flex: '50%', width: '50px'}}>
	// 				<InvestmentModelGraph investmentId={investment.investmentId} />
	// 			</div>
	// 		</span>
	// 	</div>
	// </body>
	return <body style={{backgroundColor: 'white', margin: '15px', outline: '5px solid black'}}>
		<div style={{width: '900px', paddingLeft: '10px', paddingBottom: '10px', paddingRight: '0px'}}>
			<div onClick={() => navigate()}>
				<span>
					<h2> {investment.investmentName} 	
					</h2>				
				</span>
				<h3> Current Value: ${investment.value} </h3>
				<h3> Projected Value: ${investment.projection} </h3>
			</div>
			<div style={{flex: '50%', width: '50px'}}>
				<InvestmentModelGraph  investmentId={investment.investmentId} />
			</div>
		</div>
	</body>
}