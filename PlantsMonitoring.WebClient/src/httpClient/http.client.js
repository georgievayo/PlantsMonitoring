const headers = {
    'content-type': 'application/json',
    'accept': 'application/json',
};

const HttpClient = {
    get: (url) => {
        return fetch(url)
            .then(response => response.json())
    },

    post: (url, body) => {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: headers
        })
        .then(response => response.json());
    }
};

export default HttpClient;