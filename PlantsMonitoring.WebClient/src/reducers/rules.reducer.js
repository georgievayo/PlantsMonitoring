export default function rules(state = [], action) {
    switch (action.type) {
        case 'GET_RULES_SUCCESS':
            return [
                ...action.rules
            ];
        case 'POST_RULE_SUCCESS':
            return [
                ...state,
                action.rule
            ];
        default:
            return state;
    }
}