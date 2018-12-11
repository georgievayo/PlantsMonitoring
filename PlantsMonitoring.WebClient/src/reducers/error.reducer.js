export default function errorMessage(state = null, action) {
    const { type } = action;
    const matches = /(.*)_FAILED/.test(type);
    if (!matches) {
        return state;
    } else {
        return action.errorMessage;
    }
};
