/** @format */

export const saveTokenToLocalStorage = (token: string) => {
    if (typeof window !== undefined) {
        localStorage.setItem("auth-socket-token", token);
    }
};

export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem("auth-socket-token");
};

export const getInitialToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("auth-admin-token");
    }
    return null;
};
