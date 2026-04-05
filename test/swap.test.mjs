import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import swapModule from '../out/swap.js';

const { swapSelectedText } = swapModule;

test('swaps the first and last words while preserving separators', () => {
	deepStrictEqual(swapSelectedText('a = b'), 'b = a');

	deepStrictEqual(swapSelectedText('中文 | English'), 'English | 中文');

	deepStrictEqual(swapSelectedText('13,12,11'), '11,12,13');

	deepStrictEqual(swapSelectedText('left; mid; right'), 'right; mid; left');

	deepStrictEqual(swapSelectedText('"a", "b", "c"'), '"c", "b", "a"');

	deepStrictEqual(swapSelectedText('A[i]<=A[j]'), 'A[j]<=A[i]');

	deepStrictEqual(swapSelectedText('x!=y'), 'y!=x');

	deepStrictEqual(swapSelectedText('ab!cd'), 'db!ca');
});

test('swaps characters inside a single word', () => {
	deepStrictEqual(swapSelectedText('ia'), 'ai');
});
