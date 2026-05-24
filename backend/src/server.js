const http = require('node:http');
const { URL } = require('node:url');

const defaultPort = Number.parseInt(process.env.PORT || '4000', 10);

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload));
}

function requestHandler(request, response) {
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);

  if (request.method === 'GET' && url.pathname === '/health') {
    sendJson(response, 200, {
      status: 'ok',
      service: 'artloop-backend',
      chatBackend: 'firebase-firestore',
    });
    return;
  }

  if (request.method === 'GET' && url.pathname === '/') {
    sendJson(response, 200, {
      name: 'ArtLoop backend',
      endpoints: ['GET /health'],
      note: 'Realtime chat is served by Firebase Firestore.',
    });
    return;
  }

  sendJson(response, 404, { error: 'Not found' });
}

function startServer(port = defaultPort) {
  const server = http.createServer(requestHandler);
  return server.listen(port, () => {
    console.log(`ArtLoop backend listening on http://localhost:${port}`);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { requestHandler, startServer };
