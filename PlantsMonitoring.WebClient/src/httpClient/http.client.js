const headers = {
    'content-type': 'application/json',
    'accept': 'application/json',
};

const HttpClient = {
    get: (url, authRequired) => {
        return fetch(url,
            {
                method: 'GET',
                headers: getHeaders(authRequired)
            })
            .then(response => {
                if(response.ok) {
                    return response.json()
                } else {
                    throw response;
                }
            });
    },

    post: (url, body, authRequired) => {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: getHeaders(authRequired)
        })
            .then(response => {
                if(response.ok) {
                    return response.json()
                } else {
                    throw response;
                }
            });
    }
};

const getHeaders = (auth) => {
    if (auth) {
        const token = sessionStorage.getItem('token');
        const authHeaders = { ...headers };
        authHeaders.authorization = `Bearer ${token}`;

        return authHeaders;
    } else {
        return headers;
    }
};

export default HttpClient;