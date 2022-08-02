const http = require('http');
const request = require('request');
const port = 3000;

const apiKey = 'api-key';
let url = `https://api.openweathermap.org/data/2.5/weather?q=delhi,07,+91&appid=${apiKey}`

const server = http.createServer((req, res)=>{
    request({url: url, json: true}, (err, response)=>{
        if(err){
            console.log('Unable to connect to weather api');
            return;
        }else{
            res.write(`
                <html> 
                    <head>
                        <title>Weather App</title>
                    </head>
                    <body>
                    
                        <div id="container">
                            <h1> Place: ${response.body.name} </h1>
                            <h3> Weather: ${response.body.weather[0].main} </h3>
                            <h3> Temparature: ${response.body.main.temp / 10} &deg </h3>
                            <h3> Visibility: ${response.body.visibility}</h3>
                        </div>

                    </body>
                </html>
            `);
            res.end();
        }
    });
});
server.listen(port, ()=>{
    console.log(`Server is up and running on port ${port}`);
});