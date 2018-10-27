export default function groups(state = [], action) {
    switch (action.type) {
        case 'GET_GROUPS_SUCCESS':
            return [
                ...action.groups
            ];
        default:
            return state;
    }
}