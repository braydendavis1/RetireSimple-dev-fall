import {Investment} from '../Interfaces';
import { InvestmentModelGraph } from './GraphComponents';

export const InvestmentComponent = (investment: Investment, 
	navigate: Function, 
	loadInvestments: Function) => {
	
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