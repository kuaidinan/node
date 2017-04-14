var http = require('http');
var fs = require('fs');

// http.createServer((req, res) => {
//   if (req.url == '/') {
//     fs.readFile('./titles.json', (err, data) => {
//       if (err) {
//         console.log(err);
//         res.end('Server Error');
//       }
//       else {
//         var titles = JSON.parse(data.toString());
//         fs.readFile('./template.html', (err, data) => {
//           if (err) {
//             console.error(err);
//             res.end('Server Error');
//           }
//           else {
//             var tmpl = data.toString();
//             var html = tmpl.replace('%', titles.join('</li><li>'));
//             res.writeHead(200, { 'Content-Type': 'text/html' })
//             res.end(html);
//           }
//         });
//       }
//     });
//   }
// }).listen(8000,"127.0.0.1");

var server = http.createServer((req, res) => {
  getTitles(res);
}).listen(8001, "127.0.0.1");

function getTitles(res) {
  fs.readFile('./titles.json', (err, data) => {
    if (err) return hadError(err, res);
    getTemplate(JSON.parse(data.toString()), res);
  })
}

function getTemplate(titles, res) {
  fs.readFile('./template.html', (err, data) => {
    if (err) return hadError(err, res);
    formatHtml(titles, data.toString(), res);
  })
}

function formatHtml(titles, tmpl, res) {
  var html = tmpl.replace('%', titles.join('</li><li>'))
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
}

function hadError(err, res) {
  console.error(err);
  res.end('Server Error');
}