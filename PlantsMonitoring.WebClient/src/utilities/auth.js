import decode from 'jwt-decode';

export const hasLoggedUser = () => {
    const token = sessionStorage.getItem('token');
    return !!token;
}

export const isTokenExpired = () => {
    const token = sessionStorage.getItem('token');
    try {
        const decoded = decode(token);
        return decoded.exp < Date.now() / 1000;
    } catch (err) {
        return false;
    }
}