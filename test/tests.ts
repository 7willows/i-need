import test from 'ava';
import * as presuppose from '../src/';

test('nonEmptyStrings: function is defined', t => {
    t.notThrows(() => presuppose.nonEmptyStrings({}));
});

test('nonEmptyStrings: without strings it fails', t => {
    const a = 2;
    t.throws(() => presuppose.nonEmptyStrings({ a }), {
        instanceOf: presuppose.AssertionError
    });
});

test('stringsOrUndefined: throws on not strings', t => {
    const a = 2;
    t.throws(() => presuppose.stringsOrUndefined({ a }), {
        name: 'AssertionError'
    });
});

test('stringsOrUndefined: does not throw on undefined', t => {
    const a = undefined;
    t.notThrows(() => presuppose.stringsOrUndefined({ a }));
});

test('arrays: throws on not arrays', t => {
    const a = { length: 0 };
    t.throws(() => presuppose.arrays({ a }));
});

test('arrays: does not throw on arrays', t => {
    const a: unknown[] = [];
    t.notThrows(() => presuppose.arrays({ a }));
});

test('specificValue: not throws if specifc value match', t => {
    t.notThrows(() => presuppose.specificValues({ a: 123 }, 123));
});

test('specificValue: throws if specifc value does not match', t => {
    t.throws(() => presuppose.specificValues({ a: 111 }, 123));
});

test('custom error message works', t => {
    t.throws(() => presuppose.specificValues({ a: 111 }, 123, 'Value must be 123'), {
        message: 'Value must be 123'
    });
});

test('custom error msg can be a function', t => {
    t.throws(() => presuppose.specificValues({ a: 111 }, 123, propName => '123 must be a value of ' + propName), {
        message: '123 must be a value of a'
    });
});

test('objects: works fine for objects', t => {
    t.notThrows(() => presuppose.objects({ ok: {} }));
});

test('objects: throws on any other value', t => {
    t.throws(() => presuppose.objects({ notOk: 123 }));
});

test('objects: throws on null', t => {
    t.throws(() => presuppose.objects({ notOk: null }));
});

test('objects: throws on arrays', t => {
    t.throws(() => presuppose.objects({ notOk: [] }));
});

test('stringsNotMatch: works fine when strings do not match', t => {
    t.notThrows(() => presuppose.stringsNotMatch({ prop: 'test' }, /error/));
});

test('stringsNotMatch: throws if strings do match', t => {
    t.throws(() => presuppose.stringsNotMatch({ prop: 'test' }, /te.*/));
});

test('arraysOfNonEmptyStrings: works fine when only strings are inside', t => {
    t.notThrows(() => presuppose.arraysOfNonEmptyStrings({ prop: ['item1', 'item2'] }));
});

test("arraysOfNonEmptyStrings: throw if it's not an array", async t => {
    t.throws(() => presuppose.arraysOfNonEmptyStrings({ prop: {} }));
});

test('arraysOfNonEmptyStrings: throws if some item is not a string', async t => {
    t.throws(() => presuppose.arraysOfNonEmptyStrings({ prop: ['item1', 123] }));
});

test('arraysOfNonEmptyStrings: throws if some item is empty', async t => {
    t.throws(() => presuppose.arraysOfNonEmptyStrings({ prop: ['item1', ''] }));
});
