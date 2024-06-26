import React from 'react';
import {
	ApiFormData,
	ApiPresetData,
	Investment,
	InvestmentModel,
	InvestmentVehicle,
	InvestmentVehicleModel,
	PortfolioModel,
	UserInfo,
	InvestmentVehicleInfo,
	Expense,
	ProjectionInfo,
	Projection,
	
} from '../Interfaces';
import { getInvestmentVehicleProjection } from './New API/InvestmentVehicleApi';

//Flattens API Investment object for form use
// export const flattenApiInvestment = (investment: Investment): ApiFormData => {
// 	const result: ApiFormData = {};

// 	result['investmentId'] = investment.investmentId.toString();
// 	result['investmentName'] = investment.investmentName;
// 	result['investmentType'] = investment.investmentType;
// 	result['analysisType'] = investment.analysisType?.toString() ?? '';

// 	Object.assign(result, investment.investmentData);

// 	const renamedOverrides = Object.keys(investment.analysisOptionsOverrides).reduce((acc, key) => {
// 		acc[`analysis_${key}`] = investment.analysisOptionsOverrides[key];
// 		return acc;
// 	}, {} as {[key: string]: any});

// 	Object.assign(result, renamedOverrides);

// 	return result;
// };

//Converts InvestmentModel Data for use with Recharts
export const convertInvestmentModelData = (model: InvestmentModel) => {
	const result = [];

	for (let i = 0; i < model.avgModelData.length; i++) {
		result.push({
			year: i,
			avg: +model.avgModelData[i].toFixed(2),
			min: +model.minModelData[i].toFixed(2),
			max: +model.maxModelData[i].toFixed(2),
		});
	}

	return result;
};

export const convertPortfolioModelData = (model: PortfolioModel) => {
	const result = [];


	for (let i = 0; i < model.avgModelData.length; i++) {
		result.push({
			year: i,
			avg: +model.avgModelData[i].toFixed(2),
			min: +model.minModelData[i].toFixed(2),
			max: +model.maxModelData[i].toFixed(2),
		});
	}

	return result;
};

export const convertProjectionData = (model: number[]) => {
	const result = [];
	// const taxedResult = [];

	for (let i = 0; i < model.length; i++) {
		result.push({
			year: i,
			avg: +model[i].toFixed(2),
		});
		// taxedResult.push({
		// 	year: i,
		// 	avg: +model.taxDeductedAvgModelData[i].toFixed(2),
		// 	// min: +model.taxDeductedMinModelData[i].toFixed(2),
		// 	// max: +model.taxDeductedMaxModelData[i].toFixed(2),
		// });
	}
	return result;
};

export const createAggregateStackData = (investmentModels: {[key: string]: InvestmentModel}) => {
	const result = [];

	const exModel = Object.values(investmentModels)[0];

	for (let i = 0; i < exModel.avgModelData.length; i++) {
		const dataPoint: {[key: string]: number} = {month: i};

		Object.keys(investmentModels).forEach((key) => {
			const model = investmentModels[key];
			dataPoint[key] = +model.avgModelData[i].toFixed(2);
		});

		result.push(dataPoint);
	}

	return result;
};

export const getFlatVehicleData = (vehicle: InvestmentVehicle) => {
	const result: {[key: string]: any} = {};
	result['investmentVehicleId'] = vehicle.investmentVehicleId;
	result['investmentVehicleName'] = vehicle.investmentVehicleName;
	result['investmentVehicleType'] = vehicle.investmentVehicleType;
	result['cashHoldings'] = vehicle.investmentVehicleData['cashHoldings'];

	const renamedOverrides = Object.keys(vehicle.analysisOptionsOverrides).reduce((acc, key) => {
		acc[`analysis_${key}`] = vehicle.analysisOptionsOverrides[key];
		return acc;
	}, {} as {[key: string]: any});

	Object.assign(result, renamedOverrides);

	return result;
};



export const convertUserInfo = (data: any): UserInfo => {
	const result: UserInfo = {
		id: data.id,
		age: data.age,
		retirementAge: data.retirementAge,
		retirementGoal: data.retirementGoal,
		filingStatus: data.filingStatus,
	};

	Object.keys(data).forEach((analysis_key) => {

		//ARI- IMPLEMENT THIS
		// const properName = analysis_key.charAt(0).toUpperCase() + analysis_key.slice(1);
		// result[properName] = {};

		// Object.keys(data[analysis_key]).forEach((preset_key) => {
		// 	const properPresetName = preset_key.charAt(0).toUpperCase() + preset_key.slice(1);
		// 	result[properName][properPresetName] = {};

		// 	Object.keys(data[analysis_key][preset_key]).forEach((option_key) => {
		// 		const presetOption = `analysis_${option_key}`;
		// 		result[properName][properPresetName][presetOption] =
		// 			data[analysis_key][preset_key][option_key];
		// 	});
		// });
	});
	
	return result;
};

export const convertVehicleModelData = (model: Projection) => {
	const result = [];
	

	for (let i = 0; i < model.values.length; i++) {
		result.push({
			year: i,
			avg: +model.values[i].toFixed(2),
		});
	}
	return result;
};

export const convertInvestmentVehiclesInfo = (data : any): InvestmentVehicleInfo[] => {

	let vehicles: InvestmentVehicleInfo[] = [];
	
	data.forEach(async (vehicleInfo: any) => {
		
		const vehicle: InvestmentVehicleInfo = {
			id: vehicleInfo.id,
			name: vehicleInfo.name,
			value: vehicleInfo.value,
			type: vehicleInfo.type,
			contributions: vehicleInfo.contributions,
			salary: vehicleInfo.salary,
			salaryIncrease: vehicleInfo.salaryIncrease,
			rate: vehicleInfo.rate,
			employerMatch: vehicleInfo.employerMatch,
			employerMatchCap: vehicleInfo.employerMatchCap,
			contributionType: vehicleInfo.contributionType,
			employerLumpSum: vehicleInfo.employerLumpSum,
			retirementRate: vehicleInfo.retirementRate,
			expenseIDs: vehicleInfo.expenseIDs,
			projection: vehicleInfo.projection,
		};

		vehicles.push(vehicle);
	} )

	return vehicles;
	
}


// export const convertInvestmentVehicleInfo = (data : any): InvestmentVehicleInfo[] => {

// 	let vehicles: InvestmentVehicleInfo[] = [];

// 	data.forEach(async (vehicleInfo: any) => {
// 		const vehicle: InvestmentVehicleInfo = {
// 			id: vehicleInfo.id,
// 			name: vehicleInfo.name,
// 			type: vehicleInfo.type,
// 			value: vehicleInfo.value,
// 			contributions: vehicleInfo.contributions,
// 			salary: vehicleInfo.salary,
// 			salaryIncrease: vehicleInfo.salaryIncrease,
// 			rate: vehicleInfo.rate,
// 			employerMatch: vehicleInfo.employerMatch,
// 			employerMatchCap: vehicleInfo.employerMatchCap,
// 			projection: null,
// 		};

// 		vehicles.push(vehicle);
// 	} )

// 	return vehicles;
	
// }

// export const convertApiPresets = (data: any): ApiPresetData => {
// 	const result: ApiPresetData = {};

// 	Object.keys(data).forEach((analysis_key) => {
// 		const properName = analysis_key.charAt(0).toUpperCase() + analysis_key.slice(1);
// 		result[properName] = {};

// 		Object.keys(data[analysis_key]).forEach((preset_key) => {
// 			const properPresetName = preset_key.charAt(0).toUpperCase() + preset_key.slice(1);
// 			result[properName][properPresetName] = {};

// 			Object.keys(data[analysis_key][preset_key]).forEach((option_key) => {
// 				const presetOption = `analysis_${option_key}`;
// 				result[properName][properPresetName][presetOption] =
// 					data[analysis_key][preset_key][option_key];
// 			});
// 		});
// 	});

// 	return result;
// };


export const convertExpenseInfo = (data : any): Expense[] => {

	let expenses: Expense[] = [];

	data.forEach((expenseInfo: any) => {
		const expense: Expense = {
			id: expenseInfo.id,
			name: expenseInfo.name,
			amount: expenseInfo.amount,
			start: expenseInfo.start,
			end: expenseInfo.end,
			type: expenseInfo.type,
		};

		expenses.push(expense);
	} )

	return expenses;
	
}

export const port = "7199"
