// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: { '^/': '/api/' },
      onProxyReq: (proxyReq, req) => {
        console.log('프록시 탐:', req.url);
      }
    })
  );
};
