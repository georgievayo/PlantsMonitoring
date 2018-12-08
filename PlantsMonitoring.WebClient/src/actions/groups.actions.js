import { HttpClient, api } from '../httpClient';
import { toGroupsModel } from '../models/groups';

export function getAllGroups() {
    return function (dispatch) {
        return HttpClient.get(`${api.GROUPS}`, true)
            .then(toGroupsModel)
            .then(groups => dispatch(getAllGroupsSuccess(groups)));
    };
}

function getAllGroupsSuccess(groups) {
    return {
        type: 'GET_GROUPS_SUCCESS',
        groups
    };
}