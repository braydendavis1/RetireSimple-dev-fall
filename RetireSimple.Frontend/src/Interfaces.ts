export interface Investment {
	investmentId: number;
	investmentName: string;
	investmentType: string;
	analysisType: string;
	lastAnalysis?: string | null; //treat as date later?
	portfolioId: number;
	investmentData: {[key: string]: string};
	analysisOptionsOverrides: {[key: string]: string};
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
	filingStatus: string
}

export interface InvestmentVehicleInfo{
	id: string
	name: string
	value: number
	type: string
	contributions: number | null
	salary: number | null
	salaryIncrease: number | null
	rate: number | null
	employerMatch: number | null
	employerMatchCap: number | null
	projection: number | null
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
	expenseName: string;
	expenseAmount: number;
	expenseFrequency: string;
	lastUpdated: string; //treat as a date later?
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

