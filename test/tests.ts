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

test('numbers: throws if not a number', async t => {
    t.throws(() => presuppose.numbers({ prop: 'x' }));
    t.throws(() => presuppose.numbers({ prop: '32' }));
    t.throws(() => presuppose.numbers({ prop: {} }));
    t.throws(() => presuppose.numbers({ prop: null }));
    t.throws(() => presuppose.numbers({ prop: undefined }));
    t.throws(() => presuppose.numbers({ prop: true }));
    t.throws(() => presuppose.numbers({ prop: false }));
});

test('numbers: throws if compared with non-number ', async t => {
    t.throws(() => presuppose.numbers({ prop: 1 }, {greaterThan : 'x'}));
});


test('numbers: not throws if a number', async t => {
    t.notThrows(() => presuppose.numbers({ prop: 123 }));
    t.notThrows(() => presuppose.numbers({ prop: -3123 }));
    t.notThrows(() => presuppose.numbers({ prop: -0.323 }));
    t.notThrows(() => presuppose.numbers({ prop: Infinity }));
});

test('numbers: throws if not in range', async t => {
    t.throws(() => presuppose.numbers({ prop: 10 },{greaterThan: 12}));
    t.throws(() => presuppose.numbers({ prop: -34.55 },{greaterThan: -34.55}));
    t.throws(() => presuppose.numbers({ prop: 10 },{lessThan: 8}));
    t.throws(() => presuppose.numbers({ prop: -34.55 },{lessThan: -34.55}));
    t.throws(() => presuppose.numbers({ prop: -12.2 },{greaterThanOrEqual: -12.1}));
    t.throws(() => presuppose.numbers({ prop: -12.2 }, { lessThanOrEqual: -12.3 }));
    t.throws(() => presuppose.numbers({ prop: 12 },{lessThanOrEqual: 5, greaterThan: 1}));
    t.throws(() => presuppose.numbers({ prop: 12 },{lessThanOrEqual: 5, lessThan: 3}));
});

test('numbers: not throws if in range', async t => {
    t.notThrows(() => presuppose.numbers({ prop: 13 },{greaterThan: 12}));
    t.notThrows(() => presuppose.numbers({ prop: 13 },{greaterThanOrEqual: 13}));
    t.notThrows(() => presuppose.numbers({ prop: 13 },{lessThan: 15}));
    t.notThrows(() => presuppose.numbers({ prop: 13 },{lessThanOrEqual: 13}));
});



