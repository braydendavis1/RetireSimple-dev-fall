
import {Button, Typography, Icon} from '@mui/material';
import React, { useState } from 'react';

import {useNavigate} from 'react-router-dom';
import {Investment, ApiPresetData} from '../Interfaces';
import {AddInvestmentDialog} from '../components/DialogComponents';
import { InvestmentComponent } from '../components/InvestmentComponent';
import { getInvestments } from '../api/New API/InvestmentApi';
export const PresetContext = React.createContext<ApiPresetData | undefined>(undefined);
export const InvestmentsPage = () => { 
	const [presetData, setPresetData] = React.useState<ApiPresetData | undefined>(undefined);
	const [invAddDialogOpen, setInvAddDialogOpen] = React.useState(false);
	const [vehicleAddInvTarget, setVehicleAddInvTarget] = React.useState<number>(-1); //by default, adds as individual investment
	const navigate = useNavigate();
	const [investmentList, setInvestmentList] = useState<Investment[]>([]);

	React.useEffect(() => {
		loadInvestments();
	}, [presetData]);

	const loadInvestments = () => {
		getInvestments().then((data) => {
			setInvestmentList(data);
		});
	};

	const navigatePage = (id: string) => {
		navigate(`/Investment/${id}`);
	};

	return <div><PresetContext.Provider value={presetData}><h2>Investments</h2>
		<Button onClick={() => setInvAddDialogOpen(true)}>
			<Icon baseClassName='material-icons'>add_circle</Icon>
			<Typography component='div' sx={{marginLeft: '10px'}}>
				Add Investment
			</Typography>
		</Button>

		{investmentList.map((investment: Investment) => 
			(InvestmentComponent(
				investment, 
				() => {navigatePage(investment.investmentId!)},
				() => {loadInvestments()},
			)		
			))
		}

		<AddInvestmentDialog
			loadInvestments={loadInvestments}
			open={invAddDialogOpen}
			onClose={() => setInvAddDialogOpen(false)}
			vehicleTarget={vehicleAddInvTarget}
		/>
	</PresetContext.Provider>
	</div>;
} 
