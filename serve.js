const esbuild = require('esbuild');
const http = require('http');
const httpProxy = require('http-proxy');

const WSL_PORT = process.env.WSL_HOST; // See ~/.profile for this, restriction of WSL

// Start esbuild's server on a random local port
esbuild.serve({
  servedir: 'public',
}, {
  entryPoints: ['src/index.tsx'],
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
      req.url = req.url.slice(4);
      proxy.web(req, res, { target: `http://${WSL_PORT}:8080` });
      return;
    }

    // Forward each incoming request to esbuild
    const proxyReq = http.request(options, proxyRes => {
      // If esbuild returns "not found", fall back to /
      if (proxyRes.statusCode === 404) {
        const redirectReq = http.request({ ...options, path: "/" }, (proxyRes2) => {
          // Forward the response from esbuild to the client
          res.writeHead(proxyRes2.statusCode, proxyRes2.headers);
          proxyRes2.pipe(res, { end: true });
        });
        redirectReq.end();
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
