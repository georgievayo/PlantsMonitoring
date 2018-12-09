export default function groups(state = [], action) {
    switch (action.type) {
        case 'GET_GROUPS_SUCCESS':
            return [
                ...action.groups
            ];
        case 'POST_GROUP_SUCCESS':
            return [
                ...state,
                action.group
            ];
        default:
            return state;
    }
}