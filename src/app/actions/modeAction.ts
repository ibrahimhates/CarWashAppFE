export const CHANGE_MODE = "CHANGE_MODE";


export const changeMode = (mode : "light" | "dark") => {
    return {
        type: CHANGE_MODE,
        payload: mode
    }
}