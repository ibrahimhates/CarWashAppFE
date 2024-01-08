import axios from 'axios'
import {AuthModel, Data, UserModel} from './_models'
import HttpService, {API_URL} from '../../../services/HttpService'
import {CustomerCreate} from '../components/Registration'
import Cookies from 'js-cookie'

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/Auth/getuserbytoken`
export const LOGIN_MANAGER_URL = `${API_URL}/Auth/emplogin`
export const LOGIN_CUSTOMER_URL = `${API_URL}/Auth/custlogin`
export const REGISTER_URL = `${API_URL}/Auth/custregister`
export const REGISTER_EMPLOYEE_URL = `${API_URL}/Auth/empregister`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

// Server should return AuthModel
export async function login(email: string, password: string,isManager:boolean) {

  const URL:string = isManager?LOGIN_MANAGER_URL:LOGIN_CUSTOMER_URL;

  return await axios.post<Data>(URL, {
    email,
    password,
  })
}

// Server should return AuthModel
export function register(customer:CustomerCreate) {
  return axios.post(REGISTER_URL, customer)
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

/*export function getUserByToken(token: any) {
  return HttpService.post(GET_USER_BY_ACCESSTOKEN_URL, null, token)
}*/

export function getUserByToken(token: any):UserModel {
  return {
    fullName: "ibrahim Halil Ates",
    id: crypto.randomUUID(),
    email: "ibrahim@ates.com",
    profilePicture: '',
    role: "SuperAdmin"
  }
}

export function getUserInfosByToken(token: any) {
  return {
    fullName: "ibrahim Halil Ates",
    id: crypto.randomUUID(),
    email: "ibrahim@ates.com",
    profilePicture: '',
    role: "SuperAdmin"
  }
 /* return HttpService.post(GET_USER_BY_ACCESSTOKEN_URL, null, token)*/
}
