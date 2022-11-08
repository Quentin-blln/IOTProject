const InfluxDB = require('@influxdata/influxdb-client').InfluxDB
const Point = require('@influxdata/influxdb-client').Point
const http = require('http');
var cors = require('cors')
var express = require('express');
var bodyParser = require('body-parser')

/** Environment variables **/
const url = 'http://localhost:8086/'
const token = 'nTabqN0cLDqCedqWEpDf7rKkr6sb1acKKQPS7Tz46O8UI5JCnoYG63SaYA_n2GpOn-RHQLNSsbUAeQzzjN4Gig=='
const org = 'admin'
const bucket = '2436f5fe3e0b2888'

const influxDB = new InfluxDB({ url, token })

const writeApi = influxDB.getWriteApi(org, bucket)

writeApi.useDefaultTags({ region: 'west' })

var app = express()
app.use(bodyParser.json())
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post('/receiveTemperature', (req, res) => {
    // console.log('Datas: ', req.body.data)

    const point = new Point('temperature')
        .tag('code', req.body.data.code)
        .tag('valid', Boolean(req.body.data.valid))
        .floatField('value', req.body.data.value)
        console.log(`Recorded: ${point}`)

    writeApi.writePoint(point)

    // writeApi.close().then(() => {
    //     console.log('WRITE FINISHED')
    // })

})

app.post('/receiveLight', (req, res) => {
    // console.log('Datas: ', req.body.data)

    const point = new Point('light')
        .tag('code', req.body.data.code)
        .tag('valid', Boolean(req.body.data.valid))
        .floatField('value', req.body.data.value)
        console.log(`Recorded: ${point}`)

    writeApi.writePoint(point)

    // writeApi.close().then(() => {
    //     console.log('WRITE FINISHED')
    // })

})

app.post('/receiveMovement', (req, res) => {
    // console.log('Datas: ', req.body.data)

    const point = new Point('movement')
        .tag('code', req.body.data.code)
        .tag('valid', Boolean(req.body.data.valid))
        .booleanField('value', Boolean(req.body.data.value))
        console.log(`Recorded:  ${point}`)

    writeApi.writePoint(point)

    // writeApi.close().then(() => {
    //     console.log('WRITE FINISHED')
    // })

})

http.createServer(app).listen(3001);
