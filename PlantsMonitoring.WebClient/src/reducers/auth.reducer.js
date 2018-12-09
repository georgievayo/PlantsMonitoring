export default function auth(state = {isAuthenticated: false}, action) {
    switch (action.type) {
        case 'SIGN_IN_SUCCESS':
            return {
                isAuthenticated: true
            };
        case 'SIGN_IN_FAILED': 
            return {
                isAuthenticated: false
            };
        case 'LOGOUT_SUCCESS': 
            return {
                isAuthenticated: false
            };
        default:
            return state;
    }
}