import Cookies from 'js-cookie';
import { AuthModel } from './_models'

const AUTH_LOCAL_STORAGE_KEY = 'kt-auth-react-v' // out of use
const getAuth = (): AuthModel | undefined => {
  const token: string | undefined = Cookies.get('authToken');
  if (!token) {
    return
  }

  try {
    const auth: AuthModel = {token: token}
    if (auth && auth.token) {
      // You can easily check auth_token expiration also
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
    return undefined;
  }
}

const removeAuth = () => {
  try {
    Cookies.remove('authToken')
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    (config: { headers: { Authorization: string } }) => {
      const auth = getAuth()
      if (auth /*&& auth.api_token*/) {// todo refresh token sonrasi burasi duzeltilsin
        config.headers.Authorization = `Bearer ${auth.token}`
      }

      return config
    },
    (err: any) => Promise.reject(err)
  )
}

export { getAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY }
