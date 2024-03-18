import { Expense, ProjectionInfo } from "../../Interfaces";

export const getExpenses = async () : Promise<Expense[]> => {
	const response = await fetch(`https://localhost:7199/api/Expenses`, {
		method: 'GET',
	});
	const data = await response.json().then((data) => {
		return data;
	});
	return data
}

export const getExpense = async (id : String) : Promise<Expense> => {
	const response = await fetch(`https://localhost:7199/api/Expenses/${id}`)
	return await response.json()
}

export const createExpense = async(data : {[key: string]: string}, type : string) => {
	const response = await fetch(`https://localhost:7199/api/Expenses?type=${type}`,{
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json; charset=utf-8',
		},
	}).catch(err => console.log(err));
}

export const updateExpense = async(data : {[key: string]: string}, id : string) => {
	console.log("Updating");
	const response = await fetch(`https://localhost:7199/api/Expenses?Id=${id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			Accept: 'application/json',
			'Content-Type' : 'application/json; charset=utf-8', 
		},
	});
}

export const deleteExpense = async(id : string) => {
	const response = await fetch(`https://localhost:7199/api/Expenses?id=${id}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type' : 'application/json; charset=utf-8', 
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
			'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
		},
	});
	console.log()
}

export const getExpenseProjection = 
async (id : string, years : number) : Promise<ProjectionInfo> => {
	const response = await fetch(`https://localhost:7199/api/Expenses/Projection/${id}`, {
		method: 'GET',
	});
	return await response.json();

}
