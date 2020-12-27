# Next Github

- 7.5

## Start redis

- redis-server
  - redis-server /usr/local/etc/redis.conf
- redis-cli
  - auth <password-word>
- setex c 10 1 // remove c = 1 in 10 seconds
- KEYS *
- DEL <key>

## Styles

- styled-jsx

## OAuth

- Authentication
- Authorization
- OAuth
  - roles
    - client
    - server
    - auth server
  - auth
    - authorization code
      - redirect with client_id, scope, redirect_uri, ...
      - redirect code to server
      - server use code + secret to get token from github
    - refresh token
      - get token use refresh token
    - device code
    - password
    - implicit - not secure
    - client credentials - not usual
  - oauth security
    - code is only for one-time usage
    - id + secret are not exposed
    - redirect_uri must be the same
