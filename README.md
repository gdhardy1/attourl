# Attourl

A url shortener service built with NestJS. Check out [Attourl](https://attourl.herokuapp.com) on Heroku.
  
## About the Project

I used this project as a way to learn the NestJS framework. While the framework itself is overkill for a simple url shortener service, the project was involved enough to cover most of the framework's core features.

## Learning Areas Covered

- Modules, Controllers, Providers
- Custom Providers
- Dependency Injection
- Pipes
- Configuration
- Validation Pipes
- Testing (End-to-End and Unit)
- Serve Static
- Mongoose

## Technologies Used

- TypeScript
- Express
- MongoDB + Mongoose
- Jest + Supertest

<br></br>

# Documentation

[Shorten Url](#shorten)

[Retrieve Url](#retrieve)

<br></br>

### <a name="shorten"></a> Shorten Url

URL: `/api/url/shorten`

Method: `POST`
<br></br>

**Request**

Body:

```javascript
{ "longUrl": String (required) }
```

**Response**

Code: `201 Created`

Body:

```json
{
  "urlCode": "urlCode",
  "longUrl": "user submitted url",
  "shortUrl": "attourl.herokuapp.com/urlCode",
  "date": "date created"
}
```

<br></br>

### <a name="retrieve"></a> Retrieve Url

URL: `/:code`

Method: `GET`
<br></br>

Parameters:

`:code - urlCode returned from /api/url/shorten PUT`
<br></br>

**Response**

Code: `302 Redirect`

Redirects browser to retrieved url.


