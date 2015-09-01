# TODO CarStore LB

# standards
 - switch /login to /token to be more standard  X
 - use standard payload for token i.e. sub  X
 - pass as Authorization: Bearer <token>  X

# tighten client
 - show login link if not authorized X
 - store token and user in local storage  X
 - retrieve token from local storage on refresh  X

# tighten server
 - check authorization on server for api authorization X
 - check origin on server for api authorization
 - use PKI rather than shared secret
 - handle expiration - renew and too late
