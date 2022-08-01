const http = require('http');
const fs = require('fs');
const port = 3000;
const server = http.createServer((req, res)=>{
    fs.readFile('./public/index.html', (err, data)=>{
        if(err){
            res.writeHead(404);
            res.write('<h1>File Not Found</h1>');
            return;
        }
        res.writeHead(200);
        res.write(data);
        res.end();
    });
});

server.listen(port, ()=>{
    console.log(`Server is up and running on port ${port}`);
});