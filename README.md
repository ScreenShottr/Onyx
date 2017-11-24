# Onyx URL Shortener
[![CircleCI](https://circleci.com/gh/ScreenShottr/Onyx.svg?style=svg)](https://circleci.com/gh/ScreenShottr/Onyx)
Written in Node.JS using Serverless architecture for AWS

* API Gateway
* DynamoDB
* Lambda

## API
### Create URL
```
POST /api/create HTTP/1.1
Host: localhost:3000
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache

fullURL=https%3A%2F%2Fwww.thecjgcjg.com
```
```
{
    "Success": true,
    "response": {
        "short_url_id": "5ba32d",
        "long_url": "https://www.thecjgcjg.com",
        "short_url": "https://onyx.sh/5ba32d",
        "delete_pass": "3efb3e"
    }
}
```

### GetURLInfo
```
POST /api/getURLInfo HTTP/1.1
Host: localhost:3000
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache

shortURLID=5ba32d
```
```
{
    "Success": true,
    "response": {
        "short_url_id": "5ba32d",
        "short_url": "https://onyx.sh/5ba32d",
        "long_url": "https://www.thecjgcjg.com"
    }
}
```

### Delete URL
```
POST /api/delete HTTP/1.1
Host: localhost:3000
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache

shortURLID=5ba32d&deletePass=3efb3e
```
```
{
    "Success": true,
    "response": "Deleted"
}
```

## Visit URL
```
GET /visit/5ba32d HTTP/1.1
Host: localhost:3000
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache
```
```
HTTP 301 to Long URL with an empty body.
```
