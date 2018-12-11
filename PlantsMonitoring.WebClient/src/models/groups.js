import { getResult } from '../utilities/methods';

export const toGroupsModel = (response) => getResult(response)
    .map(toGroupModel);

export const toGroupModel = (response = {}) => {
    return {
        id: response.id,
        name: response.Name,
        description: response.Description
    };
} 