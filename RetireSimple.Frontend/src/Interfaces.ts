export interface Investment {
	id: string | null;
	investmentName: string | null;
	investmentType: string | null;
	vehicleId: string | null;
	projection: number | null
	currentValue: number | null;
	cost: number | null;
	rate: number | null;
	bondLength: number | null;
	bondQuantity: number | null;
}

export interface InvestmentModel {
	investmentModelId: number;
	investmentId: number;
	maxModelData: number[];
	minModelData: number[];
	avgModelData: number[];
	lastUpdated: string; //treat as a date later?
}

export interface UserInfo {
	id: string
	age: number;
	retirementAge: number
	retirementGoal: number
}

export interface InvestmentVehicleInfo{
	id: string | null
	name: string | null
	value: number | null
	type: string | null
	contributions: number | null
	contributionType: string | null
	salary: number | null
	salaryIncrease: number | null
	rate: number | null
	employerMatch: number | null
	employerMatchCap: number | null
	projection: number | null
	employerLumpSum: number | null
	retirementRate: number | null
}

export interface ProjectionInfo{
	id: string | null
	yearly_projections: number[]
}


export interface Projection {
	values: number[];
}

export interface PortfolioModel {
	portfolioModelId: number;
	portfolioId: number;
	maxModelData: number[];
	minModelData: number[];
	avgModelData: number[];
	lastUpdated: string; //treat as a date later?
}

export interface FullModelData {
	portfolioModel: PortfolioModel;
	investmentModels: {[key: string]: InvestmentModel};
}

export interface InvestmentVehicle {
	portfolioId: number;
	investmentVehicleId: number;
	investmentVehicleName: string;
	investmentVehicleType: string;
	investments: Investment[];
	investmentVehicleModelId?: number;
	investmentVehicleData: {[key: string]: string};
	lastUpdated: string; //treat as a date later?
	analysisOptionsOverrides: {[key: string]: string};
}

export interface Expense {
	id: string;
	name: string;
	amount: number; 
	start: number; //starting age 
	end: number; //ending age
	type: string; 
}

export interface Portfolio {
	portfolioId: number;
	portfolioName: string;
	profileId: number;
	investments: Investment[];
	investmentVehicles: InvestmentVehicle[];
	portfolioModel: PortfolioModel;
	lastUpdated: string; //treat as a date later?
}

export interface InvestmentVehicleModel {
	modelId: number;
	investmentVehicleId: number;
	lastUpdated: string;
	maxModelData: number[];
	minModelData: number[];
	avgModelData: number[];
	taxDeductedMaxModelData: number[];
	taxDeductedMinModelData: number[];
	taxDeductedAvgModelData: number[];
}

export type ApiFormData = {[key: string]: string};
export type ApiPresetData = {[analysis: string]: {[preset: string]: {[presetkey: string]: string}}};

export interface ApiExpense {
	expenseId: number;
	sourceInvestmentId: number;
	expenseType: 'OneTime' | 'Recurring';
	amount: number;
	expenseData: {[key: string]: string};
}

