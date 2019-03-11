const http = require('http');

const server = http.createServer((req, res) => {
   const url = req.url;
   const method = req.method;

   if (url === '/') {
      const greetings = '<p>Hello, client.</p>';
      const userform = '<form method="POST" action="/create_user">' +
         'Username: <input type="text" name="username"><br>' +
         '<button type="submit">Submit</button>' +
         '</form>';

      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');
      res.write('<header><title>Greetings</title></header>');
      res.write('<body>' + greetings + userform + '</body>');
      res.write('</html>');

      return res.end();
   } else if (url === '/users') {
      let ul = '<ul>' +
                  '<li>John</li>' +
                  '<li>Doe</li>' +
                  '<li>Smith</li>' +
                  '<li>Jane</li>' +
                  '<li>Steven</li>' +
               '</ul>';

      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');
      res.write('<header><title>Greetings</title></header>');
      res.write('<body>' + ul + '</body>');
      res.write('</html>');

      return res.end();
   } else if (url === '/create_user' && method == 'POST') {
      const body = [];
      req.on('data', (chunk) => {
         console.log(chunk);
         body.push(chunk);
      });
      req.on('end', () => {
         const parsedBody = Buffer.concat(body).toString();
         console.log(parsedBody);
      });
      console.log('done.');
      return res.end();
   }

   res.setHeader('Content-Type', 'text/html');
   res.write('<html>');
   res.write('<header><title>Greetings</title></header>');
   res.write('<body><p>Page does not exist.</p>' + url + '</body>');
   res.write('</html>');

   return res.end();
});

server.listen(3000);