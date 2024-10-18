import {IResponseUserData, IUser, IUserData} from "../types/types.ts";
import {instance} from "../api/axious.api.ts";
import {
    getTokenFromLocalStorage,
    removeTokenFromLocalStorage,
    setTokenToLocalStorage
} from "../helpers/localstorage.ts";

export const AuthService = {
    async login(userData: IUserData): Promise<IUser | undefined> {
        let data: IResponseUserData

        console.log(import.meta.env.API_URL)

        try {
            data = (await instance.post('auth/login', userData, {
                headers: { Authorization: `Bearer ${getTokenFromLocalStorage() || ''}` },
            })).data
        } catch (error) {
            console.log(error)
            throw error
        }

        if (data) {
            setTokenToLocalStorage(data.token)
        }

        return data.user
    },
    async logout() {
        removeTokenFromLocalStorage()
    },
    async getMe() {
        return (await instance.get('user', {
            headers: { Authorization: `Bearer ${getTokenFromLocalStorage() || ''}` },
        })).data
    }
}