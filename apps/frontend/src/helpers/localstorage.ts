export function getTokenFromLocalStorage(): string {
    const data = localStorage.getItem("token");
    const token = data ? JSON.parse(data) : '';

    return token;
}

export function setTokenToLocalStorage(token: string) {
    localStorage.setItem('token', JSON.stringify(token))
}

export function removeTokenFromLocalStorage() {
    localStorage.removeItem('token')
}