import { InvestmentVehicleInfo, ProjectionInfo } from "../../Interfaces";

export const getInvestmentVehicles = async () : Promise<InvestmentVehicleInfo[]> => {
	const response = await fetch(`https://localhost:7199/api/InvestmentVehicles`, {
		method: 'GET',
	});
	const data = await response.json().then((data) => {
		return data;
	});
	return data
}

export const getInvestmentVehicle = async (id : String) : Promise<InvestmentVehicleInfo> => {
	const response = await fetch(`https://localhost:7199/api/InvestmentVehicles/${id}`)
	return await response.json()
}

export const createInvestmentVehicle = async(data : InvestmentVehicleInfo, type : string) => {
	const response = await fetch(`https://localhost:7199/api/InvestmentVehicles?Type=${type}`,{
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
}

export const updateInvestmentVehicle = async(data : InvestmentVehicleInfo, id : string) => {
	const response = await fetch(`https://localhost:7199/api/InvestmentVehicles?Id=${id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			Accept: 'application/json',
			'Content-Type' : 'application/json; charset=utf-8', 
		},
	});
}

export const deleteInvestmentVehicle = async(id : string) => {
	const response = await fetch(`https://localhost:7199/api/InvestmentVehicles?id=${id}`, {
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

export const getInvestmentVehicleProjection = 
async (id : string, years : number) : Promise<ProjectionInfo> => {
	//remove years??
	const response = await fetch(`https://localhost:7199/api/InvestmentVehicles/Projection/${id}/${years}`, {
		method: 'GET',
	});
	return await response.json();

}
	
export const getPortfolioProjection = async () : Promise<ProjectionInfo> => {
	const response = await fetch(`https://localhost:7199/api/InvestmentVehicles/PortfolioProjection/0`, {
		method: 'GET',
	});
	return await response.json();
}