# presuppose

Assertion library

Syntax:

```ts
presuppose.validator(properties:object, options?:any, msg:string | ((propName:string) => string)):void;
```

Available validators are listed below

## nonEmptyStrings

Checks if given object has only fields with non empty strings values. Example:

```js
const presuppose = require(presuppose');

presuppose.nonEmptyStrings({ prop1: 'test', prop2: 'test2' });
```

the above code will not throw. However this:

```js
presuppose.nonEmptyStrings({ prop1: 123, prop2: 'test2' });
```

will thrwo `AssertionError` because `prop1` is not a stirng.

This assertion also checks for emptiness:

```js
presuppose.nonEmptyStrings({ prop: '' });
```

will throw because `prop` is empty.

## stringsOrUndefined

Checks if given object has only fields with strings or undefined values. Example:

```js
presuppose.stringsOrUndefined({ prop1: 'abc', prop2: undefined });
```

the above code will not throw. However:

```js
presuppose.stringsOrUndefined({ prop: 123 });
```

will throw `AssertionError`

## arrays

Checks if given object has only fields with array valuest. Example:

```js
presuppose.arrays({ arr: [] });
```

the above code will not throw. However:

```js
presuppose.arrays({ arr: { length: 123 } });
```

will throw;

## specificValues

Checks if given object has only fields with values specified by an argument to this function. Example:

```js
presuppose.specificValues({ prop1: 123, prop2: 123 }, 123);
```

will not throw. However:

```js
presuppose.specificValues({ prop: 111 }, 123);
```

will throw;

## objects

Checks if given object has only objects as fields. Example

```js
presuppose.objects({ prop1: {foo: 'bar'}, prop2: new Date() });
```

will not throw. However this:

```js
presuppose.objects({ prop1: 123 });
```

will throws. Also when given an array it will throw:

```js
presuppose.objects({ prop1: [] }); // throws
```

## stringsNotMatch

Checks if all properties in a given object do not match a certain pattern. Example:

```js
presuppose.stringsNotMatch({ prop1: 'test' }, /error/);
```

the above code will not throw because `'test'` do not match `/error/`. However:

```js
presuppose.stringsNotMatch({ prop1: 'test' }, /te*/);
```

will throw.

## Customizing error message

You can customize error message by providing a custom string:

```js
presuppose.nonEmptyStrings({ a: 123 }, null, 'a cannot be empty');
```

If you have more then one property then it's useful to add a property name to the error message. you can do it like that:

```js
presuppose.nonEmptyStrings({ a: 123, b: 222 }, null, propName => `${propName} cannot be empty`);
```

## License

ISC - see LICENSE file
