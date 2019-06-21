Anti CSRF Node Example
======
* express
* csurf
* ejs

# Get Started
```
npm install
npm start
```
Open http://localhost:3000

Click <ins>Go to User Page</ins> (or open http://localhost:3000/users)

In the `Form with token`, input text and click `Add User`, will show user list in the page.

In the `Form without token`, input text and click `Add User`, will show `Unauthorized Access!`.

# Change Details

## New Express Project

```
express --ejb --git anti-csrf-node
npm i
DEBUG=anti-csrf-node:* npm start

```

## Import csurf

```
npm i csurf
```

## Generate CSRF Token

Generate CSRF token and send to web page.

app.js

```js
var csurf = require('csurf');
app.use(csurf({ cookie: true }));

app.use((req, res, next) => {
  // console.log(req.csrfToken());
  res.locals.csrfToken = req.csrfToken();
  next();
});
```

## Custom Error Handling

The verification process is automatic, can check source code in `csurf` module.

app.js
```js
// error handler
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)

  // handle CSRF token errors here
  res.status(403);
  res.send('Unauthorized Access!');
});

```

## Send Back CSRF Token

Get `csrfToken` from server and send back by hidden input.

user.ejs

```js
    <form action='/users' method='POST'>
      <input type='hidden' name='_csrf' value='<%=csrfToken %>'>
      <input type='text' name='userName' value=''>
      <input type='submit' value='Add user'>
    </form>
```

# Reference

https://github.com/expressjs/csurf

