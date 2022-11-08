const axios = require('axios');
const ENDPOINTMVT = 'http://localhost:3001/receiveMovement'; //Middleware Endpoint

function randomNumber() {
    return Math.random() < 0.5;
}
function toByte(string, length) {
    let result = string;
    while (result.length < length * 2) {
        result = '0' + result;
    }
    return result;
}
function sendData(data) {
    axios.post(ENDPOINTMVT, {
        data: data,
    });
}
function start() {
    const value = randomNumber(); const code = toByte((60).toString(16), 1);
    const payload = { code: code, value: value, valid: Math.random()<0.5 };
    console.log(payload);
    sendData(payload);
}
setInterval(() => start(), 2000);