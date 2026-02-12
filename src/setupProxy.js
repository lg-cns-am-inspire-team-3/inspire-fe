// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080', // 팀장님이 말한 백엔드 주소
      changeOrigin: true,
      credentials: true, // 쿠키 주고받기 허용 (핵심!)
    })
  );
};