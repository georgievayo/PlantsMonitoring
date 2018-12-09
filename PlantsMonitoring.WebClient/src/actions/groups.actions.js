import { HttpClient, api } from '../httpClient';
import { toGroupsModel, toGroupModel } from '../models/groups';

export function getAllGroups() {
    return function (dispatch) {
        return HttpClient.get(`${api.GROUPS}`, true)
            .then(toGroupsModel)
            .then(groups => dispatch(getAllGroupsSuccess(groups)));
    };
}

export function postGroup(group) {
    return function (dispatch) {
        return HttpClient.post(api.GROUPS, group, true)
            .then(toGroupModel)
            .then(createdGroup => dispatch(postGroupSuccess(createdGroup)));
    }
}

function getAllGroupsSuccess(groups) {
    return {
        type: 'GET_GROUPS_SUCCESS',
        groups
    };
}

function postGroupSuccess(group) {
    return {
        type: 'POST_GROUP_SUCCESS',
        group
    };
}