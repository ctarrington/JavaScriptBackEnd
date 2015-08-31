# TODO CarStore LB

# standards
 - switch /login to /token to be more standard  X
 - use standard payload for token i.e. sub  X
 - pass as Authorization: Bearer <token>  X

# tighten client
 - show login link if not authorized X
 - store token and user in session storage
 - retrieve token from session storage on refresh

# tighten server
 - check authorization on server for api authorization
 - check origin on server for api authorization
 - use PKI rather than shared secret
 - handle expiration - renew and too late
