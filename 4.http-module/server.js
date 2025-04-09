const http = require("http");

const server = http.createServer((req, res) => {
    // console.log("req: ", req)
    res.writeHead(200, {"Content-Type" : "text/plain"});
    res.end("Hello Node js from http module");
})

const port = 5001;

server.listen(port, () => {
    console.log(`Server is listening to port ${port}`);
});