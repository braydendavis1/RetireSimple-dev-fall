import {Button, Icon, Typography} from '@mui/material';
import React, { useState } from 'react';
import {ApiPresetData,Expense,InvestmentVehicleInfo} from '../Interfaces';
import { AddExpenseDialog, AddVehicleDialog } from '../components/DialogComponents';
import { PresetContext } from '../Layout';
import { getAnalysisPresets } from '../api/ApiCommon';
import { VehicleComponent } from '../components/VehicleComponent';

import { getInvestmentVehicles } from '../api/New API/InvestmentVehicleApi';
import { convertExpenseInfo } from '../api/ApiMapper';
import { useNavigate } from 'react-router-dom';
import { ExpenseComponent } from '../components/ExpenseComponent';
  
export function ExpensesPage() { 
	
	const [expenseList, setExpenseList] = useState<Expense[]>([]);
	
	const [presetData, setPresetData] = React.useState<ApiPresetData | undefined>(undefined);

	const [expenseAddDialogOpen, setExpenseAddDialogOpen] = React.useState(false);
	const navigate = useNavigate();

	React.useEffect(() => {
		if (presetData === undefined) {
			getAnalysisPresets().then((data) => {
				setPresetData(data);
			});
		}
		loadExpenses();
	}, [presetData]);
	

	const loadExpenses = () => {
		getInvestmentVehicles().then((data) => {
			setExpenseList(convertExpenseInfo(data));
		});
	};


	const navigatePage = (id: string) => {
		navigate(`/ExpensesPage/${id}`);
	};


	const openEditDialog = () => {
		//setEdit(true);
	};


	return <div><PresetContext.Provider value={presetData}>
		<h2>Expenses</h2>
		<Button onClick={() => setExpenseAddDialogOpen(true)}>
			<Icon baseClassName='material-icons'>add_circle</Icon>
			<Typography component='div' sx={{marginLeft: '10px'}}>
				Add Expense
			</Typography>
		</Button>
		
		{expenseList.map((expense: Expense) => 
			(ExpenseComponent(expense, 
				() => {navigatePage(expense.id)},
			)))
		}
		
		<AddExpenseDialog
			show={expenseAddDialogOpen}
			onClose={() => setExpenseAddDialogOpen(false)} 
		/>
	</PresetContext.Provider>
	</div>;
	
    
} 