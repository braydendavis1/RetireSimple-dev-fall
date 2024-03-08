import { InvestmentModel, ProjectionInfo } from "../../Interfaces";

export const getInvestments = async () : Promise<InvestmentModel[]> => {
	const response = await fetch(`https://localhost:7199/api/Investments`, {
		method: 'GET',
	});
	const data = await response.json().then((data) => {
		return data;
	});
	return data
}

export const getInvestment = async (id : String) : Promise<InvestmentModel> => {
	const response = await fetch(`https://localhost:7199/api/Investments/${id}`)
	return await response.json()
}

export const createInvestment = async(data : InvestmentModel, type : string) => {
	const response = await fetch(`https://localhost:7199/api/Investments?Type=${type}`,{
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
}

export const updateInvestment = async(data : InvestmentModel, id : string) => {
	const response = await fetch(`https://localhost:7199/api/Investments?Id=${id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			Accept: 'application/json',
			'Content-Type' : 'application/json; charset=utf-8', 
		},
	});
}

export const deleteInvestment = async(id : string) => {
	const response = await fetch(`https://localhost:7199/api/Investments?id=${id}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type' : 'application/json; charset=utf-8', 
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
			'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
		},
	});
}

export const getInvestmentProjection = 
async (id : string, years : number) : Promise<ProjectionInfo> => {
	//remove years??
	const response = await fetch(`https://localhost:7199/api/Investments/Projection/${id}`, {
		method: 'GET',
	});
	return await response.json();

}
