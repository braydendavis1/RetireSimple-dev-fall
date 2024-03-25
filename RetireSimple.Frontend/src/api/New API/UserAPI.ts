import { UserInfo } from "../../Interfaces";
import { convertUserInfo } from "../ApiMapper";

export const getUserInfo = async (): Promise <UserInfo> => {

	const response = await fetch(`https://localhost:7199/api/users`);
	const data = await response.json().then((data) => {
		console.log("This is the prinr! " + data)
		return convertUserInfo(data)
		
	});
	console.log(data)
	return data
} 


export const saveUserInfo = async (data: UserInfo) => {
	const response = await fetch(`https://localhost:7199/api/users?id=${data.id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
}  