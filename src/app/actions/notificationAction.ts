export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";


export const showNotification = (notificationModel : any) => {
    return {
        type: SHOW_NOTIFICATION,
        payload: notificationModel
    }
}