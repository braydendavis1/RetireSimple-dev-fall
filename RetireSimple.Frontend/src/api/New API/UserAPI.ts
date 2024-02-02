import { UserInfo } from "../../Interfaces";
import { convertUserInfo } from "../ApiMapper";

// export const getAnalysisPresets = async (): Promise<ApiPresetData> => {
// 	const response = await fetch(`${API_BASE_URL}/Analysis/Presets`);
// 	const data = await response.json().then((data) => convertApiPresets(data));
// 	return data;
// };

export const getUserInfo = async (): Promise <UserInfo> => {

	const response = await fetch(`https://localhost:7199/api/users`);
	const data = await response.json().then((data) => {
		console.log("This is the prinr! " + data)
		return convertUserInfo(data)
		
	});
	console.log(data)
	return data
	// const response = await fetch(`${API_BASE_URL}/users/`);
	// //error in  json from response
	// //const data = await response.json().then((data) => convertUserInfo(data));
	// const result: UserInfo = {
	// 	age: 22,
	// 	retirementAge: 63,
	// 	retirementGoal: 100,
	// 	filingStatus: 'Single',
	// };
	// return result;

} 


export const saveUserInfo = async (data: UserInfo) => {

	console.log(data)

	const response = await fetch(`https://localhost:7199/api/users?id=${data.id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json; charset=utf-8',
		},
	});


}  