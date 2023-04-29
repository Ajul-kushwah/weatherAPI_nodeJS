const http = require('http');
const fs = require('fs');
var requests = require('requests');
const replaceVal = (tempVal, orgVal) =>{
    let temprature = tempVal.replace("{%tempval%}", orgVal.main.temp);
    temprature = tempVal.replace("{%tempval_min%}", orgVal.main.temp_min);
    temprature = tempVal.replace("{%tempval_max%}", orgVal.main.temp_max);
    temprature = tempVal.replace("{%location%}", orgVal.name);
    temprature = tempVal.replace("{%country%}", orgVal.sys.country);

    return temprature
}
        
const homeFile = fs.readFileSync('index.html', 'utf-8');
const server = http.createServer((req, res) => {
    if(req.url = "/"){
        requests('https://google.com/foo/bar')
        .on('data', function (chunk) {
        const objData = JSON.parse(chunk);
        const arrData = [objData];

        const realTimeData = arrData.map((val) => {
            replaceVal(homeFile, val)
        }).join("")
        // console.log(arrData[0].main.temp)
        res.write(realTimeData);
        })
        .on('end', function (err) {
            res.end();
        });

    }
});