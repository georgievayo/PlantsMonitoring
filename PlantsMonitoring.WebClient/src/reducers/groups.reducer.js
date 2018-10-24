export default function groups(state = { groups: [] }, action) {
    switch (action.type) {
        case 'GET_GROUPS_SUCCESS':
            return {
                ...state,
                groups: action.groups
            };
        default:
            return state;
    }
}