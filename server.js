const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 7823;
const ROOT = __dirname;

const mime = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
};

http.createServer((req, res) => {
  let filePath = path.join(ROOT, req.url === '/' ? '/songinfo.html' : req.url);
  const ext = path.extname(filePath);
  const ct = mime[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': ct });
    res.end(data);
  });
}).listen(PORT, () => console.log(`Listening on ${PORT}`));
