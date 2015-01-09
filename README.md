web-parrot
==========

**WARNING**: Extreme alpha release quality. Parrot has not been potty trained yet! Approach with caution.

Caching reverse proxy to capture external web API responses for offline playback. Useful when developing applications
that depend on 3rd party services, and network connection to them is not reliable (or you want an option to develop
offline).

Based heavily on 2 primary libraries:

  * [replay](https://github.com/assaf/node-replay) by [Assaf Arkin](https://github.com/assaf)
  * [http-proxy](https://github.com/nodejitsu/node-http-proxy) by [nodejitsu.com Team](https://github.com/nodejitsu)

Install
-------

From command-line:

    > npm install web-parrot -g

Usage
-----

On command-line:

    > web-parrot --target=https://api.twitter.com

This will start a proxy listening on port 3000, and proxying results from https://api.twitter.com. Now consuming
application can use the service via the proxy and requests/responses will be recorded. By default, they are saved
in the folder 'cache', relative to the folder where application has started (working directory).

Any request to http://localhost:3000/xxx will be forwarded to https://api.twitter.com/xxx. If response is already
cached, then it will returned from local disk, rather than from the remote service.

Options:

    Usage: web-parrot [--port=3000] [--replay] [--target=]URL

    --port=X              Change listening port number (default 3000)
    --target=URL          Set the target URL of the remote web service
    --replay              Changes mode to 'replay' only, meaning only cached data is used

