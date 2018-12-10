import { HttpClient, api } from '../httpClient';
import { toGroupsModel, toGroupModel } from '../models/groups';

export function getAllGroups() {
    return function (dispatch) {
        dispatch({ type: 'GET_GROUPS_REQUEST' });
        return HttpClient.get(`${api.GROUPS}`, true)
            .then(toGroupsModel)
            .then(groups => dispatch(getAllGroupsSuccess(groups)))
            .catch(error => dispatch(getAllGroupsFailed()));
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

function getAllGroupsFailed() {
    return {
        type: 'GET_GROUPS_FAILED',
        errorMessage: 'Could not get your groups.' 
    };
}

function postGroupSuccess(group) {
    return {
        type: 'POST_GROUP_SUCCESS',
        group
    };
}