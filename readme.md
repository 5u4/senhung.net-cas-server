# senhung.net central authentication service

![Travis (.org)](https://img.shields.io/travis/senhungwong/senhung.net-cas-server.svg?style=flat-square)
![GitHub](https://img.shields.io/github/license/senhungwong/senhung.net-cas-server.svg?style=flat-square)
![GitHub tag](https://img.shields.io/github/tag/senhungwong/senhung.net-cas-server.svg?style=flat-square)

## Description

An authentication server for all senhung.net user register/login.

## Server

Hosted on Heroku at https://senhung-cas.herokuapp.com/

## Rules

**Username**

 - Required
 - First character should be an alphabet
 - Can only use alphabets (`A-Z`, `a-z`), numbers (`0-9`), underscore (`_`), and period (`.`) in username
 - Minimun length of 4 characters
 - Maximum length of 14 characters

**Email**

 - Required
 - Should be a valid email

**Password**

 - Required
 - Minimum length of 8 characters
 - Maximum length of 54 characters

## API

**Check email existence**

```
GET {{senhung-auth-host}}/v1/api/auth/email/:email/existence

RESPONSE:

{
    "isTaken": false
}
```

**Check username existence**

```
GET {{senhung-auth-host}}/v1/api/auth/username/:username/existence

RESPONSE:

{
    "isTaken": false
}
```

**Register**

```
POST {{senhung-auth-host}}/v1/api/auth/register

REQUEST:

{
    "username": "myusername",
    "email": "alex@senhung.net",
    "password": "testpassword"
}

RESPONSE:

{
    "user": {
        "id": "5b9ec340bea9303db19896a1",
        "username": "myusername",
        "email": "alex@senhung.net"
    }
}
```

**Send verify email link**

```
POST {{senhung-auth-host}}/v1/api/auth/verify/email/link

REQUEST:

{
    "email": "alex@senhung.net",
    "username": "myusername"
}

RESPONSE:

200: HTTP OK
```

**Verify email**

```
GET {{senhung-auth-host}}/v1/api/auth/verify/email?userId=the-user-id&verificationCode=the-verification-code

RESPONSE:

200: HTTP OK
```

**Login**

```
POST {{senhung-auth-host}}/v1/api/auth/login

REQUSET:

{
    "username": "myusername",
    "email": "alex@senhung.net",
    "password": "testpassword"
}

RESPONSE:

{
    "user": {
        "id": "5b9ec3fbbea9303db19896a2",
        "username": "myusername",
        "email": "alex@senhung.net"
    }
}
```

**Get user**

```
GET {{senhung-auth-host}}/v1/api/auth/users

HEADERS:

x-access-token: {{senhung-auth-token}}

RESPONSE:

{
    "user": {
        "id": "5b9ec3fbbea9303db19896a2",
        "username": "myusername",
        "email": "alex@senhung.net"
    }
}
```

## Note

Mongodb is used as a redis server since renting a redis server costs a lot every month. Sessions are stored in the mongodb.
