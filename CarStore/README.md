# TODO CarStore LB

# standards
 - switch /login to /token to be more standard  X
 - use standard payload for token i.e. sub  X
 - pass as Authorization: Bearer <token>  X

# tighten client
 - store token in browser
 - retrieve token from browser on refresh
 - check authorization on location change in angular
 - show login link if not authorized

# tighten server
 - check authorization on server for api authorization
 - check origin on server for api authorization
 - use PKI rather than shared secret
 - handle expiration - renew and too late
