# senhung.net authentication

## Description

An authentication server for all senhung.net user register/login.

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
POST {{senhung-auth-host}}/v1/api/auth/existence/email

REQUEST:

{
    "email": "alex@senhung.net"
}

RESPONSE:

{
    "isTaken": false
}
```

**Check username existence**

```
POST {{senhung-auth-host}}/v1/api/auth/existence/username

REQUEST:

{
    "username": "myusername"
}

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
    "token": "somerandomjsonwebtoken",
    "user": {
        "id": "5b9ec3fbbea9303db19896a2",
        "username": "myusername",
        "email": "alex@senhung.net"
    }
}
```
