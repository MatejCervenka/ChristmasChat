// utils/profanityFilter.js
const axios = require('axios');

exports.check = async (message) => {
    const response = await axios.get('https://www.purgomalum.com/service/containsprofanity', {
        params: { text: message },
    });
    return response.data === 'true';
};
