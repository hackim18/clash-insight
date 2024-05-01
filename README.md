# IP-RMT46

# ClashInsight Documentation

## 1. Player Verification

Endpoint: /players/:playerTag/verifytoken

Method: POST

Request Body:

```json
{
  "token": "player_token"
}
```

Response:

Status 200 OK: If the token is successfully verified.

```json
{
  "status": "valid"
}
```

Status 400 Bad Request: If the token is invalid.

```json
{
  "status": "invalid"
}
```

## 2. Image Gallery

Endpoint: /get-image

Method: GET

Response:

Status 200 OK: List of images successfully received.

```json
[
{
"id": "image_id",
"imgUrl": "image_url"
},
...
]
```

Endpoint: /add-images

Method: PATCH

Response:

Status 200 OK: Images successfully added.

```json
[
{
"id": "image_id",
"imgUrl": "image_url"
},
...
]
```

## 3. Login

Endpoint: /login

Method: POST

Request Body:

```json
{
  "email": "user_email",
  "password": "user_password"
}
```

Response:

Status 200 OK: Authentication successful

```json
{
  "access_token": "access_token"
}
```

## 4. User Registration

Endpoint: /register

Method: POST

Request Body:

```json
{
  "email": "user_email",
  "password": "user_password"
}
```

Response:

Status 200 OK: Registration successful

```json
{
  "access_token": "user_access_token"
}
```
