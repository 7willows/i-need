import test from 'ava';
import * as iNeed from '../src/';

test('function is defined', t => {
    t.notThrows(() => iNeed.nonEmptyStrings({}));
});
