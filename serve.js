const esbuild = require('esbuild');
const http = require('http');
const httpProxy = require('http-proxy');

// Start esbuild's server on a random local port
esbuild.serve({
  servedir: 'public',
}, {
  entryPoints: ['src/index.tsx', 'src/index.css'],
  outdir: 'public/dist',
  bundle: true,
}).then(result => {
  // The result tells us where esbuild's local server is
  const {host, port} = result
  const proxy = httpProxy.createProxyServer({});

  // Then start a proxy server on port 3000
  http.createServer((req, res) => {

    const options = {
      hostname: host,
      port: port,
      path: req.url,
      method: req.method,
      headers: req.headers,
    }

    if (req.url && req.url.startsWith('/api')) {
      proxy.web(req, res, { target: 'http://127.0.0.1:8001' });
      return;
    }

    // Forward each incoming request to esbuild
    const proxyReq = http.request(options, proxyRes => {
      // If esbuild returns "not found", send a custom 404 page
      if (proxyRes.statusCode === 404) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>A custom 404 page</h1>');
        return;
      }

      // Otherwise, forward the response from esbuild to the client
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    // Forward the body of the request to esbuild
    req.pipe(proxyReq, { end: true });
  }).listen(3000);
});
