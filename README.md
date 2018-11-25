# when-expired

To install, run:

```
npm i when-expired --save
```

## Usage

```
whenExpired(id, date)
```

Params:
- `id`: A unique string identifier that is used to distinguish different entries.
- `date`: Any value that can be passed to the [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object.

## Example

You can use this package to do something when a given time in the future comes. For example, you can log a user out when their access token expires during their session:

```js
var whenExpired = require('when-expired');
var expireDate = Date.now() + 500;

whenExpired('token', expireDate).then(function () {
    console.log('interrupt session');
});

// Output:
// interrupt session (after 500ms)
```

If you call `whenExpired()` with the same entry id but dfferent date, the old Promise is ignored:

```js
whenExpired('token', Date.now() + 200).then(function () {
    console.log('first date');
});

whenExpired('token', Date.now() + 400).then(function () {
    console.log('second date');
});

// Output:
// second date (after 400ms)
```

If you call `whenExpired()` multiple times with a date that references the same point in time, the same Promise is returned:

```js
whenExpired('token', expireDate).then(function () {
    console.log('first then');
});

whenExpired('token', expireDate).then(function () {
    console.log('second then');
});

// Output:
// first then
// second then
```

If you call `whenExpired()` with a date that has already passed, a resolved Promise is returned:

```js
whenExpired('token', Date.now() - 200).then(function () {
    console.log('resolved');
});

// Output:
// resolved
```

Invalid dates will return a rejected Promise:

```js
whenExpired('token', null).catch(function (err) {
    console.log(err);
});

// Output:
// { message: 'Invalid date: null' }
```
