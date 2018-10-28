export const toRulesModel = (response) => response
    .map(toRuleModel);

export const toRuleModel = (response = {}) => {
    return {
        id: response.id,
        name: response.Name,
        description: response.Description,
        group: response.Group.Name,
        operator: response.Operator,
        value: response.Value,
        field: response.Field,
        type: response.Type === 0 ? 'Critical' : (response.Type === 1 ? 'Information' : 'Warning')
    };
} 