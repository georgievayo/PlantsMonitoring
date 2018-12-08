import { HttpClient, api } from '../httpClient';
import { toRulesModel, toRuleModel } from '../models/rules';

export function getAllRules() {
    return function (dispatch) {
        return HttpClient.get(`${api.RULES}`, true)
            .then(toRulesModel)
            .then(rules => dispatch(getAllRulesSuccess(rules)));
    };
}

export function postRule(rule) {
    return function (dispatch) {
        return HttpClient.post(api.RULES, rule, true)
            .then(toRuleModel)
            .then(createdRule => dispatch(postRuleSuccess(createdRule)));
    }
}

function getAllRulesSuccess(rules) {
    return {
        type: 'GET_RULES_SUCCESS',
        rules
    };
}

function postRuleSuccess(rule) {
    return {
        type: 'POST_RULE_SUCCESS',
        rule
    };
}