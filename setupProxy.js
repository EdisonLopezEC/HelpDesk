<<<<<<< HEAD
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
=======
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
>>>>>>> 249c57bfc6d68c4a5b435e819488e329cb6924d6
