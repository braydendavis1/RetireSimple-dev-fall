import {Expense} from '../Interfaces';


export const ExpenseComponent = 
(expense: Expense, 
	navigate: Function) => {

	return <body 
		onClick={() => navigate()}
		style={{backgroundColor: 'white', margin: '15px', outline: '5px solid black'}}>
		<div style={{width: '900px', paddingLeft: '10px', paddingBottom: '10px', paddingRight: '0px'}}>
			<span>
				<h2> {expense.expenseName} 	
				</h2>				
			</span>
			<h3> Expense Cost: ${expense.expenseAmount} </h3>
			<h3> Expense Frequency: ${expense.expenseFrequency} </h3>
			
		</div>
	</body>
}