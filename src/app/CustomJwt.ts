import jwtDecode, { InvalidTokenError } from "jwt-decode";

export function customJwtDecode<T = unknown>(token: string) {
    if (!token) {
        document.location.reload()
        throw new InvalidTokenError('Giris sureniz doldugu icin tekrar giris yapmalisiniz');
    }
    return jwtDecode<T>(token);
}

