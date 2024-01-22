import { UserInfo } from "../Interfaces";
import { API_BASE_URL } from "./ApiCommon";



export const getUserInfo = async (Data: any): Promise <UserInfo> => {

	const response = await fetch(`${API_BASE_URL}/users/`);
	return await response.json();

} 


export const saveUserInfo = async (data: UserInfo) => {

	const response = await fetch(`${API_BASE_URL}/users`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json; charset=utf-8',
		},
	});


}  