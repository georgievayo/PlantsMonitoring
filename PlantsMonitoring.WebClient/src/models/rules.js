import { getResult } from '../utilities/methods';

export const toRulesModel = (response) => getResult(response)
    .map(toRuleModel);

export const toRuleModel = (response = {}) => {
    return {
        id: response.Id,
        name: response.Name,
        description: response.Descrition,
        group: response.GroupId
    };
} 