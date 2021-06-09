import { assert } from 'chai';
import entry from '../entry';

suite('Configurations');

test('Default configuration', function () {
    assert.exists(entry);
});

test('Negative: missing dir', function () {
    assert.throws(() => new entry(), "'dir' option is required");
});
