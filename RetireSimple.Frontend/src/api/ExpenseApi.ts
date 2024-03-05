import {Expense, InvestmentVehicleModel} from '../Interfaces';
import {API_BASE_URL} from './ApiCommon';
import {convertToDecimal} from './ConvertUtils';

export const getExpenses = async (): Promise<Expense[]> => {
	const response = await fetch(`${API_BASE_URL}/Expense`);
	return await response.json();
};

export const getExpense = async (id: string): Promise<Expense> => {
	const response = await fetch(`${API_BASE_URL}/Expense/${id}`);
	return await response.json();
};

export const addExpense = async (data: any) => {
	convertToDecimal(data);
	await fetch(`${API_BASE_URL}/Expense`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
};

export const deleteExpense = async (id: number) => {
	await fetch(`${API_BASE_URL}/Expense/${id}`, {
		method: 'DELETE',
	});
};

export const updateVehicle = async (id: number, data: any) => {
	convertToDecimal(data);
	await fetch(`${API_BASE_URL}/Expense/${id}`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
};

export const addInvestmentToExpense = async (vehicleId: number, investmentId: number) => {
	await fetch(`${API_BASE_URL}/Expense/InvestmentAdd/${vehicleId}?investmentId=${investmentId}`, {
		method: 'POST',
	});
};

export const getExpenseModel = async (id: number): Promise<InvestmentVehicleModel> => {
	const response = await fetch(`${API_BASE_URL}/Analysis/Expense/${id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return await response.json();
};
