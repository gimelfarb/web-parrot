var http = require('http'),
    replay = require('replay'),
    httpProxy = require('http-proxy'),
    _ = require('underscore'),
    argv = require('minimist')(process.argv.slice(2));

replay.fixtures = (typeof argv.cache === 'string') ? argv.cache : (process.cwd() + '/cache');
replay.mode = argv.replay ? 'replay' : 'record';

var localPort = argv.port || process.env.PORT || 3000,
    remoteTarget = argv.target || argv._[0] || process.env.TARGET || 'http://nodejs.org/';

var proxy = httpProxy.createProxy();

proxy.on('proxyRes', function (proxyRes, req, res) {
    // Remove 'domain' in cookies
    var cookies = proxyRes.headers['set-cookie'];
    if (cookies) {
        cookies = _.map(cookies, function (val) {
            return val.replace(/(;\s*)?domain=[^;]+/, '');
        });
        proxyRes.headers['set-cookie'] = cookies;
    }
});

var server = http.createServer(function (req, res) {
    console.log('Request: ' + req.url);
    proxy.web(req, res, {
        target: remoteTarget,
        changeOrigin: true,
        hostRewrite: req.headers.host
    });
});

server.on('error', function(err) {
    console.log('Error starting server: ' + err);
});

server.on('listening', function() {
    console.log('Listening on port: ' + server.address().port);
    console.log('Remote target: ' + remoteTarget);
});

server.listen(localPort);