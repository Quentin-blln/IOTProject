const axios = require('axios');
const ENDPOINTLIGHT = 'http://localhost:3001/receiveLight'; //Middleware Endpoint

function randomNumber(min, max) {
    return Math.random()
}
function toByte(string, length) {
    let result = string;
    while (result.length < length * 2) {
        result = '0' + result;
    }
    return result;
}
function sendData(data) {
    axios.post(ENDPOINTLIGHT, {
        data: data,
    });
}
function start() {
    const value = parseFloat(randomNumber()); const code = toByte((50).toString(16), 1);
    const payload = { code: code, value: value, valid: Math.random()<0.5 };
    console.log(payload);
    sendData(payload);
}
setInterval(() => start(), 2000);