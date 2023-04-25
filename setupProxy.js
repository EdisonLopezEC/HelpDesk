const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/static',
    createProxyMiddleware({
      target: 'http://localhost:8080/demo-0.0.1-SNAPSHOT',
      changeOrigin: true,
    })
  );
};
