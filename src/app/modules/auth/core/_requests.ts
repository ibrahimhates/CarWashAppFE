import axios from 'axios'
import {AuthModel, UserModel} from './_models'
import HttpService, {API_URL} from '../../../services/HttpService'

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/Auth/getuserbytoken`
export const LOGIN_URL = `${API_URL}/Auth/login`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post<AuthModel>(LOGIN_URL, {
    email,
    password,
  })
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(token: any) {
  return HttpService.post(GET_USER_BY_ACCESSTOKEN_URL, null, token)
}

export function getUserInfosByToken(token: any) {
  return HttpService.post(GET_USER_BY_ACCESSTOKEN_URL, null, token)
}
