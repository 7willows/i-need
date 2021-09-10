import test from 'ava';
import * as iNeed from '../src/';

test('nonEmptyStrings: function is defined', t => {
    t.notThrows(() => iNeed.nonEmptyStrings({}));
});

test('nonEmptyStrings: without strings it fails', t => {
    const a = 2;
    t.throws(() => iNeed.nonEmptyStrings({ a }), {
        instanceOf: iNeed.AssertionError
    });
});

test('stringsOrUndefined: throws on not strings', t => {
    const a = 2;
    t.throws(() => iNeed.stringsOrUndefined({ a }), {
        name: 'AssertionError'
    });
});

test('stringsOrUndefined: does not throw on undefined', t => {
    const a = undefined;
    t.notThrows(() => iNeed.stringsOrUndefined({ a }));
});

test('arrays: throws on not arrays', t => {
    const a = { length: 0 };
    t.throws(() => iNeed.arrays({ a }));
});

test('arrays: does not throw on arrays', t => {
    const a: unknown[] = [];
    t.notThrows(() => iNeed.arrays({ a }));
});

test('specificValue: not throws if specifc value match', t => {
    t.notThrows(() => iNeed.specificValues({ a: 123 }, 123));
});

test('specificValue: throws if specifc value does not match', t => {
    t.throws(() => iNeed.specificValues({ a: 111 }, 123));
});

test('custom error message works', t => {
    t.throws(() => iNeed.specificValues({ a: 111 }, 123, 'Value must be 123'), {
        message: 'Value must be 123'
    });
});

test('custom error msg can be a function', t => {
    t.throws(() => iNeed.specificValues({ a: 111 }, 123, propName => '123 must be a value of ' + propName), {
        message: '123 must be a value of a'
    });
});
