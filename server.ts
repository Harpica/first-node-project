import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
  // set header of the content type
  res.setHeader('Content-type', 'text/html');
  // shorthand for path
  let path = './views/';

  switch (req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    case '/about-me':
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
  }

  // reading and sending files
  fs.readFile(path, (err, data): void => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  });
});

server.listen(3000, 'localhost', () => {
  console.log('listening');
});

console.log('hello');
console.log('again');
