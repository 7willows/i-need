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

will throw.

## arraysOfNonEmptyStrings

Checks if given object has only fields with arrays of non empty strings as values.Example

```js
presuppose.arraysOfNonEmptyStrings({ arr: [ 'item1', 'item2' ] });
```

the above code will not throw since the input object has only one key: `arr` which is an array of non empty strings. However:

```js
presuppose.arraysOfNonEmptyStrings({ arr: [ 'item', 123 ] });
```

will throw.


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

will throw. Also when given an array it will throw:

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

## numbers

Checks if all properties in a given object are numbers. Optionally can include range codnditions. 

Example:
```js
presuppose.numbers({prop1: '1'})
``` 
will throw, cause `'1'` is a string , while 
```js
presuppose.numbers({prop1: 1})
``` 
will not throw.

To check if the number is in specific range you can add a second parameter, which has to be an object containing one or more of the following props:
 - `greaterThan`
 - `greaterThanOrEqual`
 - `lessThan`
 - `lesThanOrEqual`

Example:
```js
presuppose.numbers(
    {prop1:10},
    {greaterThan:5, lessThanOrEqual:10}
)
```
will not throw, as `prop1` is greater than `5` and less than or equal `10`.


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
