# i-need

Assertion library

Syntax:

```ts
iNeed.validator(properties:object, options?:any, msg:string | ((propName:string) => string)):void;
```

Available validators are listed below

## nonEmptyStrings

Checks if given object has only fields with non empty strings values. Example:

```js
const iNeed = require('i-need');

iNeed.nonEmptyStrings({ prop1: 'test', prop2: 'test2' });
```

the above code will not throw. However this:

```js
iNeed.nonEmptyStrings({ prop1: 123, prop2: 'test2' });
```

will thrwo `AssertionError` because `prop1` is not a stirng.

This assertion also checks for emptiness:

```js
iNeed.nonEmptyStrings({ prop: '' });
```

will throw because `prop` is empty.

## stringsOrUndefined

Checks if given object has only fields with strings or undefined values. Example:

```js
iNeed.stringsOrUndefined({ prop1: 'abc', prop2: undefined });
```

the above code will not throw. However:

```js
iNeed.stringsOrUndefined({ prop: 123 });
```

will throw `AssertionError`

## arrays

Checks if given object has only fields with array valuest. Example:

```js
iNeed.arrays({ arr: [] });
```

the above code will not throw. However:

```js
iNeed.arrays({ arr: { length: 123 } });
```

will throw;

## specificValues

Checks if given object has only fields with values specified by an argument to this function. Example:

```js
iNeed.specificValues({ prop1: 123, prop2: 123 }, 123);
```

will not throw. However:

```js
iNeed.specificValues({ prop: 111 }, 123);
```

will throw;

## Customizing error message

You can customize error message by providing a custom string:

```js
iNeed.nonEmptyStrings({ a: 123 }, null, 'a cannot be empty');
```

If you have more then one property then it's useful to add a property name to the error message. you can do it like that:

```js
iNeed.nonEmptyStrings({ a: 123, b: 222 }, null, propName => `${propName} cannot be empty`);
```
