import test from 'ava'
import clone from 'lodash.clonedeep'
import { equalOrSubsetKeys, arrayContainsStr, existy, isBool } from '../dist/util.cjs'
import mergeAdvanced from '../dist/object-merge-advanced.cjs'

//
//                           ____
//          massive hammer  |    |
//        O=================|    |
//          upon all bugs   |____|
//
//                         .=O=.

// !!! There should be two (or more) tests in each, with input args swapped, in order to
// guarantee that there are no sneaky things happening when argument order is backwards

// ==============================
// Normal assignments with default value, false
// ==============================

test('01.01 - simple objects, no key clash', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        a: 'a',
      },
      {
        b: 'b',
      },
    ),
    {
      a: 'a',
      b: 'b',
    },
    '01.01.01',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
      },
      {
        a: 'a',
      },
    ),
    {
      a: 'a',
      b: 'b',
    },
    '01.01.02',
  )
})

test('01.02 - different types, no key clash', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        b: ['b1', 'b2', 'b3'],
        a: 'a',
      },
      {
        d: null,
        c: { c: 'c' },
      },
    ),
    {
      a: 'a',
      b: ['b1', 'b2', 'b3'],
      c: { c: 'c' },
      d: null,
    },
    '01.02.01',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        d: null,
        c: { c: 'c' },
      },
      {
        b: ['b1', 'b2', 'b3'],
        a: 'a',
      },
    ),
    {
      a: 'a',
      b: ['b1', 'b2', 'b3'],
      c: { c: 'c' },
      d: null,
    },
    '01.02.02',
  )
})

test('01.03 - string vs string value clash', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
        a: 'a',
      },
      {
        a: 'c',
      },
    ),
    {
      a: 'c',
      b: 'b',
    },
    '01.03.01',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: 'c',
      },
      {
        b: 'b',
        a: 'a',
      },
    ),
    {
      a: 'a',
      b: 'b',
    },
    '01.03.02',
  )
})

test('01.04 - array vs array value clash', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
        a: ['a'],
      },
      {
        a: ['c'],
      },
    ),
    {
      a: ['a', 'c'],
      b: 'b',
    },
    '01.04.01',
  )
  // t.deepEqual(
  //   mergeAdvanced(
  //     {
  //       a: ['c']
  //     },
  //     {
  //       b: 'b',
  //       a: ['a']
  //     }
  //   ),
  //   {
  //     a: ['c', 'a'],
  //     b: 'b'
  //   },
  //   '01.04.02')
})

test('01.05 - object vs object value clash', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        a: { c: 'c' },
      },
      {
        b: 'b',
        a: { a: 'a' },
      },
    ),
    {
      a: {
        c: 'c',
        a: 'a',
      },
      b: 'b',
    },
    '01.05',
  )
})

test('01.06 - array vs empty array', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
        a: ['a1', 'a2'],
      },
      {
        a: [],
      },
    ),
    {
      a: ['a1', 'a2'],
      b: 'b',
    },
    '01.06.01',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: [],
      },
      {
        b: 'b',
        a: ['a1', 'a2'],
      },
    ),
    {
      a: ['a1', 'a2'],
      b: 'b',
    },
    '01.06.02',
  )
})

test('01.07 - object vs empty array - object wins', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
        a: { x: 'y' },
      },
      {
        a: [],
      },
    ),
    {
      a: { x: 'y' },
      b: 'b',
    },
    '01.07.01',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: [],
      },
      {
        b: 'b',
        a: { x: 'y' },
      },
    ),
    {
      a: { x: 'y' },
      b: 'b',
    },
    '01.07.02',
  )
})

test('01.08 - string vs empty array - string wins', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
        a: 'a',
      },
      {
        a: [],
      },
    ),
    {
      a: 'a',
      b: 'b',
    },
    '01.08.01',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: [],
      },
      {
        b: 'b',
        a: 'a',
      },
    ),
    {
      a: 'a',
      b: 'b',
    },
    '01.08.02',
  )
})

test('01.09 - empty array vs empty array', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
        a: [],
      },
      {
        a: [],
      },
    ),
    {
      a: [],
      b: 'b',
    },
    '01.09.01',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: [],
      },
      {
        b: 'b',
        a: [],
      },
    ),
    {
      a: [],
      b: 'b',
    },
    '01.09.02',
  )
})

test('01.10 - string vs array', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
        a: ['a'],
      },
      {
        a: 'a',
      },
    ),
    {
      a: ['a'],
      b: 'b',
    },
    '01.10.01',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: 'a',
      },
      {
        b: 'b',
        a: ['a'],
      },
    ),
    {
      a: ['a'],
      b: 'b',
    },
    '01.10.02',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
        a: 'a',
      },
      {
        a: ['a'],
      },
    ),
    {
      a: ['a'],
      b: 'b',
    },
    '01.10.03',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: ['a'],
      },
      {
        b: 'b',
        a: 'a',
      },
    ),
    {
      a: ['a'],
      b: 'b',
    },
    '01.10.04',
  )
})

test('01.11 - string vs object', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
        a: 'a',
      },
      {
        a: { c: 'c' },
      },
    ),
    {
      a: { c: 'c' },
      b: 'b',
    },
    '01.11.01',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: { c: 'c' },
      },
      {
        b: 'b',
        a: 'a',
      },
    ),
    {
      a: { c: 'c' },
      b: 'b',
    },
    '01.11.02',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
        a: { c: 'c' },
      },
      {
        a: 'a',
      },
    ),
    {
      a: { c: 'c' },
      b: 'b',
    },
    '01.11.03',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: 'a',
      },
      {
        b: 'b',
        a: { c: 'c' },
      },
    ),
    {
      a: { c: 'c' },
      b: 'b',
    },
    '01.11.04',
  )
})

test('01.12 - object vs array', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
        a: {
          c: 'c',
        },
      },
      {
        a: ['c'],
      },
    ),
    {
      a: ['c'],
      b: 'b',
    },
    '01.12.01',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: ['c'],
      },
      {
        b: 'b',
        a: {
          c: 'c',
        },
      },
    ),
    {
      a: ['c'],
      b: 'b',
    },
    '01.12.02',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
        a: ['c'],
      },
      {
        a: {
          c: 'c',
        },
      },
    ),
    {
      a: ['c'],
      b: 'b',
    },
    '01.12.03',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: {
          c: 'c',
        },
      },
      {
        b: 'b',
        a: ['c'],
      },
    ),
    {
      a: ['c'],
      b: 'b',
    },
    '01.12.04',
  )
})

test('01.13 - empty object vs empty array', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
        a: [],
      },
      {
        a: {},
      },
    ),
    {
      a: [],
      b: 'b',
    },
    '01.13.01',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: {},
      },
      {
        b: 'b',
        a: [],
      },
    ),
    {
      a: [],
      b: 'b',
    },
    '01.13.02',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
        a: {},
      },
      {
        a: [],
      },
    ),
    {
      a: [],
      b: 'b',
    },
    '01.13.03',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: [],
      },
      {
        b: 'b',
        a: {},
      },
    ),
    {
      a: [],
      b: 'b',
    },
    '01.13.04',
  )
})

test('01.14 - empty string vs object', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
        a: '',
      },
      {
        a: {
          c: 'c',
        },
      },
    ),
    {
      a: {
        c: 'c',
      },
      b: 'b',
    },
    '01.14.01',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: {
          c: 'c',
        },
      },
      {
        b: 'b',
        a: '',
      },
    ),
    {
      a: {
        c: 'c',
      },
      b: 'b',
    },
    '01.14.02',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
        a: {
          c: 'c',
        },
      },
      {
        a: '',
      },
    ),
    {
      a: {
        c: 'c',
      },
      b: 'b',
    },
    '01.14.03',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: '',
      },
      {
        b: 'b',
        a: {
          c: 'c',
        },
      },
    ),
    {
      a: {
        c: 'c',
      },
      b: 'b',
    },
    '01.14.04',
  )
})

test('01.15 - object values are arrays and get merged', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
        a: [
          {
            c: ['c'],
          },
          {
            d: 'd',
          },
        ],
      },
      {
        a: [
          {
            c: 'c',
          },
          {
            d: ['d'],
          },
        ],
      },
    ),
    {
      a: [
        {
          c: ['c'],
        },
        {
          d: ['d'],
        },
      ],
      b: 'b',
    },
    '01.15.01',
  )
})

test('01.16 - object values are objects and get merged', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
        a: {
          c: 'c',
          d: ['d', 'e', 'f'],
        },
      },
      {
        a: {
          c: ['c', 'd', 'e'],
          d: 'd',
        },
      },
    ),
    {
      a: {
        c: ['c', 'd', 'e'],
        d: ['d', 'e', 'f'],
      },
      b: 'b',
    },
    '01.16.01',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: {
          c: ['c', 'd', 'e'],
          d: 'd',
        },
      },
      {
        b: 'b',
        a: {
          c: 'c',
          d: ['d', 'e', 'f'],
        },
      },
    ),
    {
      a: {
        c: ['c', 'd', 'e'],
        d: ['d', 'e', 'f'],
      },
      b: 'b',
    },
    '01.16.02',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
        a: {
          d: 'd',
          c: ['c', 'd', 'e'],
        },
      },
      {
        a: {
          d: ['d', 'e', 'f'],
          c: 'c',
        },
      },
    ),
    {
      a: {
        c: ['c', 'd', 'e'],
        d: ['d', 'e', 'f'],
      },
      b: 'b',
    },
    '01.16.03',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: {
          d: ['d', 'e', 'f'],
          c: 'c',
        },
      },
      {
        b: 'b',
        a: {
          d: 'd',
          c: ['c', 'd', 'e'],
        },
      },
    ),
    {
      a: {
        c: ['c', 'd', 'e'],
        d: ['d', 'e', 'f'],
      },
      b: 'b',
    },
    '01.16.04',
  )
})

test('01.17 - merging booleans', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            b: false,
          },
        ],
      },
      {
        a: false,
      },
    ),
    {
      a: [
        {
          b: false,
        },
      ],
    },
    '01.17.01',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: false,
      },
      {
        a: [
          {
            b: false,
          },
        ],
      },
    ),
    {
      a: [
        {
          b: false,
        },
      ],
    },
    '01.17.02',
  )
})

test('01.18 - merging undefined', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        a: undefined,
      },
      {
        a: 'a',
      },
    ),
    {
      a: 'a',
    },
    '01.18.01',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: 'a',
      },
      {
        a: undefined,
      },
    ),
    {
      a: 'a',
    },
    '01.18.02',
  )
})

test('01.19 - merging null', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        a: null,
      },
      {
        a: 'a',
      },
    ),
    {
      a: 'a',
    },
    '01.19.01',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: 'a',
      },
      {
        a: null,
      },
    ),
    {
      a: 'a',
    },
    '01.19.02',
  )
})

test('01.20 - boolean vs boolean merge (#78)', (t) => {
  // base 2^2 combinations, default behaviour - OR logical operation
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
        a: true,
      },
      {
        a: false,
      },
    ),
    {
      a: true,
      b: 'b',
    },
    '01.20.01',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: false,
      },
      {
        b: 'b',
        a: true,
      },
    ),
    {
      a: true,
      b: 'b',
    },
    '01.20.02',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: false,
      },
      {
        b: 'b',
        a: false,
      },
    ),
    {
      a: false,
      b: 'b',
    },
    '01.20.03',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: true,
      },
      {
        b: 'b',
        a: true,
      },
    ),
    {
      a: true,
      b: 'b',
    },
    '01.20.04',
  )
  // !opts.mergeBoolsUsingOrNotAnd - AND logical operation
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
        a: true,
      },
      {
        a: false,
      },
      {
        mergeBoolsUsingOrNotAnd: false,
      },
    ),
    {
      a: false,
      b: 'b',
    },
    '01.20.05',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: false,
      },
      {
        b: 'b',
        a: true,
      },
      {
        mergeBoolsUsingOrNotAnd: false,
      },
    ),
    {
      a: false,
      b: 'b',
    },
    '01.20.06',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: false,
      },
      {
        b: 'b',
        a: false,
      },
      {
        mergeBoolsUsingOrNotAnd: false,
      },
    ),
    {
      a: false,
      b: 'b',
    },
    '01.20.07',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: true,
      },
      {
        b: 'b',
        a: true,
      },
      {
        mergeBoolsUsingOrNotAnd: false,
      },
    ),
    {
      a: true,
      b: 'b',
    },
    '01.20.08',
  )
})

test('01.21 - boolean vs undefined merge (#80)', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
        a: true,
      },
      {
        a: undefined,
      },
    ),
    {
      a: true,
      b: 'b',
    },
    '01.21.01',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: undefined,
      },
      {
        b: 'b',
        a: true,
      },
    ),
    {
      a: true,
      b: 'b',
    },
    '01.21.02',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
        a: false,
      },
      {
        a: undefined,
      },
    ),
    {
      a: false,
      b: 'b',
    },
    '01.21.03',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: undefined,
      },
      {
        b: 'b',
        a: false,
      },
    ),
    {
      a: false,
      b: 'b',
    },
    '01.21.04',
  )
})

test('01.22 - null vs empty object merge (#84)', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
        a: {},
      },
      {
        a: null,
      },
    ),
    {
      a: {},
      b: 'b',
    },
    '01.22.01',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: null,
      },
      {
        b: 'b',
        a: {},
      },
    ),
    {
      a: {},
      b: 'b',
    },
    '01.22.02',
  )
})

test('01.23 - null vs. undefined (#90)', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
        a: null,
      },
      {
        a: undefined,
      },
    ),
    {
      a: null,
      b: 'b',
    },
    '01.23.01',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: undefined,
      },
      {
        b: 'b',
        a: null,
      },
    ),
    {
      a: null,
      b: 'b',
    },
    '01.23.02',
  )
})

function f() {
  return null
}
test('01.24 - no clash, just filling missing values', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
      },
      {
        a: f,
      },
    ),
    {
      a: f,
      b: 'b',
    },
    '01.24.01',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: f,
      },
      {
        b: 'b',
      },
    ),
    {
      a: f,
      b: 'b',
    },
    '01.24.02',
  )
})

// ==============================
// Edge cases
// ==============================

test('02.01 - missing second arg', (t) => {
  t.deepEqual(
    mergeAdvanced({
      a: 'a',
    }),
    {
      a: 'a',
    },
    '02.01',
  )
})

test('02.02 - missing first arg', (t) => {
  t.deepEqual(
    mergeAdvanced(
      undefined,
      {
        a: 'a',
      },
    ),
    {
      a: 'a',
    },
    '02.02.01',
  )
  t.deepEqual(
    mergeAdvanced(
      null,
      {
        a: 'a',
      },
    ),
    {
      a: 'a',
    },
    '02.02.02',
  )
})

test('02.03 - both args missing - throws', (t) => {
  t.throws(() => {
    mergeAdvanced()
  })
})

test('02.04 - various, mixed', (t) => {
  t.deepEqual(
    mergeAdvanced(null, null),
    null,
    '02.04.01',
  )
  t.deepEqual(
    mergeAdvanced(undefined, undefined),
    undefined,
    '02.04.02',
  )
  t.deepEqual(
    mergeAdvanced(true, false),
    true,
    '02.04.03',
  )
  t.deepEqual(
    mergeAdvanced(['a'], ['b']),
    ['a', 'b'],
    '02.04.04',
  )
  t.deepEqual(
    mergeAdvanced([], []),
    [],
    '02.04.05',
  )
})

test('02.05 - third arg is not a plain object - throws', (t) => {
  t.throws(() => {
    mergeAdvanced(
      { a: 'a' },
      { b: 'b' },
      'c',
    )
  })
})

// ==============================
// Input argument mutation
// ==============================

test('03.01 - testing for mutation of the input args', (t) => {
  const obj1 = {
    a: 'a',
    b: 'b',
  }
  const originalObj1 = clone(obj1)
  const obj2 = {
    c: 'c',
    d: 'd',
  }
  mergeAdvanced(obj1, obj2)
  t.deepEqual(obj1, originalObj1)
})

// ================================================
// does not introduce non-unique values into arrays
// ================================================

test('04.01 - arrays, checking against dupes being added', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        b: 'b',
        a: [
          {
            x1: 'x1',
            x2: 'x2',
            x3: 'x3',
          },
          {
            y1: 'y1',
            y2: 'y2',
          },
        ],
      },
      {
        a: [
          {
            x1: 'x1',
          },
          {
            y1: 'y1',
            y2: 'y2',
          },
        ],
      },
    ),
    {
      a: [
        {
          x1: 'x1',
          x2: 'x2',
          x3: 'x3',
        },
        {
          y1: 'y1',
          y2: 'y2',
        },
      ],
      b: 'b',
    },
    '04.01.01',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            x1: 'x1',
            x2: 'x2',
            x3: 'x3',
          },
          {
            y1: 'y1',
            y2: 'y2',
          },
        ],
        b: 'b',
      },
      {
        a: [
          {
            x1: 'x1',
          },
          {
            y1: 'y1',
            y2: 'y2',
          },
        ],
      },
    ),
    {
      a: [
        {
          x1: 'x1',
          x2: 'x2',
          x3: 'x3',
        },
        {
          y1: 'y1',
          y2: 'y2',
        },
      ],
      b: 'b',
    },
    '04.01.02',
  )
})

// ================================================
// does not introduce non-unique values into arrays
// ================================================

test('05.01 - merges objects within arrays if keyset and position within array matches', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            b: 'b1',
            c: 'c1',
          },
          {
            x: 'x1',
            y: 'y1',
          },
        ],
      },
      {
        a: [
          {
            b: 'b2',
            c: 'c2',
          },
          {
            x: 'x2',
            y: 'y2',
          },
        ],
      },
    ),
    {
      a: [
        {
          b: 'b2',
          c: 'c2',
        },
        {
          x: 'x2',
          y: 'y2',
        },
      ],
    },
    '05.01.01',
  )
})

test('05.02 - concats instead if objects within arrays are in a wrong order', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            x: 'x1',
            y: 'y1',
          },
          {
            b: 'b1',
            c: 'c1',
          },
        ],
      },
      {
        a: [
          {
            b: 'b2',
            c: 'c2',
          },
          {
            x: 'x2',
            y: 'y2',
          },
        ],
      },
    ),
    {
      a: [
        {
          x: 'x1',
          y: 'y1',
        },
        {
          b: 'b2',
          c: 'c2',
        },
        {
          b: 'b1',
          c: 'c1',
        },
        {
          x: 'x2',
          y: 'y2',
        },
      ],
    },
    '05.02',
  )
})

test('05.03 - concats instead if objects within arrays are in a wrong order', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            b: 'b1',
            c: 'c1',
          },
          {
            n: 'n1',
            m: 'm1',
          },
          {
            x: 'x1',
            y: 'y1',
          },
        ],
      },
      {
        a: [
          {
            b: 'b2',
            c: 'c2',
          },
          {
            x: 'x2',
            y: 'y2',
          },
        ],
      },
    ),
    {
      a: [
        {
          b: 'b2',
          c: 'c2',
        },
        {
          n: 'n1',
          m: 'm1',
        },
        {
          x: 'x2',
          y: 'y2',
        },
        {
          x: 'x1',
          y: 'y1',
        },
      ],
    },
    '05.03',
  )
})

test('05.04 - merges objects within arrays, key sets are a subset of one another', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            b: 'b1',
          },
          {
            x: 'x1',
            y: 'y1',
          },
        ],
      },
      {
        a: [
          {
            b: 'b2',
            c: 'c2',
          },
          {
            x: 'x2',
          },
        ],
      },
    ),
    {
      a: [
        {
          b: 'b2',
          c: 'c2',
        },
        {
          x: 'x2',
          y: 'y1',
        },
      ],
    },
    '05.04',
  )
})

test('05.05 - merges objects within arrays, subset and no match, mixed case', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            c: 'c1',
          },
          {
            x: 'x1',
            y: 'y1',
          },
        ],
      },
      {
        a: [
          {
            b: 'b2',
            c: 'c2',
          },
          {
            m: 'm3',
            n: 'n3',
          },
        ],
      },
    ),
    {
      a: [
        {
          b: 'b2',
          c: 'c2',
        },
        {
          x: 'x1',
          y: 'y1',
        },
        {
          m: 'm3',
          n: 'n3',
        },
      ],
    },
    '05.05',
  )
})

test('05.06 - opts.mergeObjectsOnlyWhenKeysetMatches', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            a: 'a',
            b: 'b',
          },
          {
            c: 'c',
            d: 'd',
          },
        ],
      },
      {
        a: [
          {
            k: 'k',
            l: 'l',
          },
          {
            m: 'm',
            n: 'n',
          },
        ],
      },
    ),
    {
      a: [
        {
          a: 'a',
          b: 'b',
        },
        {
          k: 'k',
          l: 'l',
        },
        {
          c: 'c',
          d: 'd',
        },
        {
          m: 'm',
          n: 'n',
        },
      ],
    },
    '05.06.01 - mergeObjectsOnlyWhenKeysetMatches = default',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            a: 'a',
            b: 'b',
          },
          {
            c: 'c',
            d: 'd',
          },
        ],
      },
      {
        a: [
          {
            k: 'k',
            l: 'l',
          },
          {
            m: 'm',
            n: 'n',
          },
        ],
      },
      {
        mergeObjectsOnlyWhenKeysetMatches: true,
      },
    ),
    {
      a: [
        {
          a: 'a',
          b: 'b',
        },
        {
          k: 'k',
          l: 'l',
        },
        {
          c: 'c',
          d: 'd',
        },
        {
          m: 'm',
          n: 'n',
        },
      ],
    },
    '05.06.02 - mergeObjectsOnlyWhenKeysetMatches = true',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            a: 'a',
            b: 'b',
          },
          {
            c: 'c',
            d: 'd',
          },
        ],
      },
      {
        a: [
          {
            k: 'k',
            l: 'l',
          },
          {
            m: 'm',
            n: 'n',
          },
        ],
      },
      {
        mergeObjectsOnlyWhenKeysetMatches: false,
      },
    ),
    {
      a: [
        {
          a: 'a',
          k: 'k',
          b: 'b',
          l: 'l',
        },
        {
          c: 'c',
          m: 'm',
          d: 'd',
          n: 'n',
        },
      ],
    },
    '05.06.03 - mergeObjectsOnlyWhenKeysetMatches = false',
  )
})

test('05.07 - README example: opts.mergeObjectsOnlyWhenKeysetMatches', (t) => {
  const obj1 = {
    a: [
      {
        a: 'a',
        b: 'b',
        yyyy: 'yyyy',
      },
    ],
  }

  const obj2 = {
    a: [
      {
        xxxx: 'xxxx',
        b: 'b',
        c: 'c',
      },
    ],
  }

  t.deepEqual(
    mergeAdvanced(obj1, obj2),
    {
      a: [
        {
          a: 'a',
          b: 'b',
          yyyy: 'yyyy',
        },
        {
          xxxx: 'xxxx',
          b: 'b',
          c: 'c',
        },
      ],
    },
    '05.07.01',
  )

  t.deepEqual(
    mergeAdvanced(obj1, obj2, { mergeObjectsOnlyWhenKeysetMatches: false }),
    {
      a: [
        {
          a: 'a',
          b: 'b',
          yyyy: 'yyyy',
          xxxx: 'xxxx',
          c: 'c',
        },
      ],
    },
    '05.07.02',
  )
})

// ==============================
// 06. Real world tests
// ==============================

test('06.01 - real world use case', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            b: 'b',
            c: false,
            d: [
              {
                e: false,
                f: false,
              },
            ],
          },
        ],
        g: false,
        h: [
          {
            i: 'i',
          },
        ],
        j: 'j',
      },
      {
        a: [
          {
            b: {
              b2: 'b2',
            },
            c: false,
            d: [
              {
                e: false,
                f: false,
              },
            ],
          },
        ],
        g: false,
        h: [
          {
            i: 'i',
          },
        ],
        j: 'j',
      },
    ),
    {
      a: [
        {
          b: {
            b2: 'b2',
          },
          c: false,
          d: [
            {
              e: false,
              f: false,
            },
          ],
        },
      ],
      g: false,
      h: [
        {
          i: 'i',
        },
      ],
      j: 'j',
    },
    '06.01',
  )
})

test('06.02 - real world use case, mini', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            b: 'b',
            d: [
              {
                f: false,
              },
            ],
          },
        ],
      },
      {
        a: [
          {
            b: {
              b2: 'b2',
            },
            d: [
              {
                f: false,
              },
            ],
          },
        ],
      },
    ),
    {
      a: [
        {
          b: {
            b2: 'b2',
          },
          d: [
            {
              f: false,
            },
          ],
        },
      ],
    },
    '06.02',
  )
})

// ==============================
// 07. Merging arrays
// ==============================

test('07.01 - merges two arrays of equal length', (t) => {
  t.deepEqual(
    mergeAdvanced(
      ['a', 'b', 'c'],
      ['d', 'e', 'f'],
    ),
    ['a', 'd', 'b', 'e', 'c', 'f'],
    '07.01',
  )
})

test('07.02 - merges two arrays of different length', (t) => {
  t.deepEqual(
    mergeAdvanced(
      ['a', 'b', 'c', 'd'],
      ['e', 'f'],
    ),
    ['a', 'e', 'b', 'f', 'c', 'd'],
    '07.02.01',
  )
  t.deepEqual(
    mergeAdvanced(
      ['a', 'b'],
      ['d', 'e', 'f', 'g'],
    ),
    ['a', 'd', 'b', 'e', 'f', 'g'],
    '07.02.02',
  )
})

test('07.03 - merges non-empty array with an empty array', (t) => {
  t.deepEqual(
    mergeAdvanced(
      ['a', 'b', 'c', 'd'],
      [],
    ),
    ['a', 'b', 'c', 'd'],
    '07.03.01',
  )
  t.deepEqual(
    mergeAdvanced(
      [],
      ['d', 'e', 'f', 'g'],
    ),
    ['d', 'e', 'f', 'g'],
    '07.03.02',
  )
  t.deepEqual(
    mergeAdvanced(
      ['a', 'b', 'c', 'd'],
      {},
    ),
    ['a', 'b', 'c', 'd'],
    '07.03.03',
  )
  t.deepEqual(
    mergeAdvanced(
      {},
      ['d', 'e', 'f', 'g'],
    ),
    ['d', 'e', 'f', 'g'],
    '07.03.04',
  )
  t.deepEqual(
    mergeAdvanced(
      ['a', 'b', 'c', 'd'],
      '',
    ),
    ['a', 'b', 'c', 'd'],
    '07.03.05',
  )
  t.deepEqual(
    mergeAdvanced(
      '',
      ['d', 'e', 'f', 'g'],
    ),
    ['d', 'e', 'f', 'g'],
    '07.03.06',
  )
})

// ==============================
// 08. Merging arrays
// ==============================

test('08.01 - arrays in objects', (t) => {
  t.deepEqual(
    mergeAdvanced(
      { a: ['b', 'c'] },
      { d: ['e', 'f'] },
    ),
    {
      a: ['b', 'c'],
      d: ['e', 'f'],
    },
    '08.01',
  )
})

test('08.02 - arrays in objects, deeper', (t) => {
  t.deepEqual(
    mergeAdvanced(
      { a: ['b', 'c'] },
      { a: ['e', 'f'] },
    ),
    {
      a: ['b', 'e', 'c', 'f'],
    },
    '08.02',
  )
})

test('08.03 - objects in arrays in objects', (t) => {
  t.deepEqual(
    mergeAdvanced(
      { a: [{ b: 'b' }] },
      { a: [{ c: 'c' }] },
    ),
    {
      a: [
        { b: 'b' },
        { c: 'c' },
      ],
    },
    '08.03',
  )
})

test('08.04 - objects in arrays in objects', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          { b: 'b', c: ['d1'] },
        ],
      },
      {
        a: [
          { b: 'd', c: ['d2'] },
        ],
      },
    ),
    {
      a: [
        { b: 'd', c: ['d1', 'd2'] },
      ],
    },
    '08.04.01 - default',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          { b: 'b', c: ['d1'] },
        ],
      },
      {
        a: [
          { b: 'd', c: ['d2'] },
        ],
      },
      {
        mergeArraysContainingStringsToBeEmpty: true,
      },
    ),
    {
      a: [
        { b: 'd', c: [] },
      ],
    },
    '08.04.02 - arrays with strings merged into empty arrays',
  )
})

// ==============================
// 09. Various
// ==============================

test('09.01 - empty string vs boolean #58', (t) => {
  t.deepEqual(
    mergeAdvanced(
      '',
      true,
    ),
    '',
    '09.01.01',
  )
  t.deepEqual(
    mergeAdvanced(
      true,
      '',
    ),
    '',
    '09.01.02',
  )
})

test('09.02 - empty string vs undefined #59', (t) => {
  t.deepEqual(
    mergeAdvanced(
      '',
      null,
    ),
    '',
    '09.02.01',
  )
  t.deepEqual(
    mergeAdvanced(
      null,
      '',
    ),
    '',
    '09.02.02',
  )
})

test('09.03 - empty string vs undefined #60', (t) => {
  t.deepEqual(
    mergeAdvanced(
      '',
      undefined,
    ),
    '',
    '09.03.01',
  )
  t.deepEqual(
    mergeAdvanced(
      undefined,
      '',
    ),
    '',
    '09.03.02',
  )
})

test('09.04 - number - #81-90', (t) => {
  t.deepEqual(
    mergeAdvanced(
      1,
      ['a'],
    ),
    ['a'],
    '09.04.01',
  )
  t.deepEqual(
    mergeAdvanced(
      ['a'],
      1,
    ),
    ['a'],
    '09.04.02',
  )
  t.deepEqual(
    mergeAdvanced(
      1,
      'a',
    ),
    'a',
    '09.04.03',
  )
  t.deepEqual(
    mergeAdvanced(
      'a',
      1,
    ),
    'a',
    '09.04.04',
  )
  t.deepEqual(
    mergeAdvanced(
      [],
      1,
    ),
    1,
    '09.04.05',
  )
  t.deepEqual(
    mergeAdvanced(
      1,
      [],
    ),
    1,
    '09.04.06',
  )
})

test('09.05 - empty string vs undefined #60', (t) => {
  t.deepEqual(
    mergeAdvanced(
      '',
      undefined,
    ),
    '',
    '09.05.01',
  )
  t.deepEqual(
    mergeAdvanced(
      undefined,
      '',
    ),
    '',
    '09.05.02',
  )
})

// ==============================
// 10. opts.ignoreKeys
// ==============================

test('10.01 - OPTS > opts.ignoreKeys - basic cases', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        a: 'b',
        k: 'l',
      },
      {
        a: ['c'],
        m: 'n',
      },
    ),
    {
      a: ['c'],
      k: 'l',
      m: 'n',
    },
    '10.01.01 - #1, forward',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: ['c'],
        m: 'n',
      },
      {
        a: 'b',
        k: 'l',
      },
    ),
    {
      a: ['c'],
      k: 'l',
      m: 'n',
    },
    '10.01.02 - #1, backward',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: 'b',
        k: 'l',
      },
      {
        a: ['c'],
        m: 'n',
      },
      {
        ignoreKeys: ['a'],
      },
    ),
    {
      a: 'b',
      k: 'l',
      m: 'n',
    },
    '10.01.03 - #2, forward, ignoreKeys as array',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: ['c'],
        m: 'n',
      },
      {
        a: 'b',
        k: 'l',
      },
      {
        ignoreKeys: ['a'],
      },
    ),
    {
      a: ['c'],
      k: 'l',
      m: 'n',
    },
    '10.01.04 - #2, backward, ignoreKeys as array',
  )
  //
  // more array vs. array clashes:
  //
  t.deepEqual(
    mergeAdvanced(
      {
        a: ['b', 'c', 'd'],
        k: 'l',
      },
      {
        a: ['c', 'd', 'e'],
        m: 'n',
      },
      {
        concatInsteadOfMerging: false,
      },
    ),
    {
      a: ['b', 'c', 'd', 'e'],
      k: 'l',
      m: 'n',
    },
    '10.01.05',
  )
})

test('10.02 - OPTS > opts.ignoreKeys - multiple keys ignored, multiple merged', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        a: 'b',
        d: ['e'],
        k: 'l',
        p: 1,
        r: '',
        t: 'u',
      },
      {
        a: ['c'],
        d: { f: 'g' },
        m: 'n',
        p: 2,
        r: 'zzz',
        t: ['v'],
      },
      {
        ignoreKeys: ['a', 'p', 'r'],
      },
    ),
    {
      a: 'b',
      d: ['e'],
      k: 'l',
      m: 'n',
      p: 1,
      r: '',
      t: ['v'],
    },
    '10.02',
  )
})

test('10.03 - OPTS > opts.ignoreKeys - wildcards', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        something: 'a',
        anything: 'b',
        everything: 'c',
      },
      {
        something: ['a'],
        anything: ['b'],
        everything: 'd',
      },
      {
        ignoreKeys: ['*thing'],
      },
    ),
    {
      something: 'a',
      anything: 'b',
      everything: 'c',
    },
    '10.03',
  )
})

test('10.04 - OPTS > opts.ignoreKeys - wildcard, but not found', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        something: 'a',
        anything: 'b',
        everything: 'c',
      },
      {
        something: ['a'],
        anything: ['b'],
        everything: 'd',
      },
      {
        ignoreKeys: ['*z*'],
      },
    ),
    {
      something: ['a'],
      anything: ['b'],
      everything: 'd',
    },
    '10.04',
  )
})

// ==============================
// 11. opts.hardMergeKeys
// ==============================

test('11.01 - OPTS > opts.hardMergeKeys', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        a: 'b',
        d: ['e'],
        k: 'l',
        p: 1,
        r: '',
        t: { u: 'u' },
      },
      {
        a: ['c'],
        d: { f: 'g' },
        m: 'n',
        p: 2,
        r: 'zzz',
        t: 'v',
      },
    ),
    {
      a: ['c'],
      d: ['e'],
      k: 'l',
      m: 'n',
      p: 2,
      r: 'zzz',
      t: { u: 'u' },
    },
    '11.01.01 - default behaviour',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: 'b',
        d: ['e'],
        k: 'l',
        p: 1,
        r: '',
        t: { u: 'u' },
      },
      {
        a: ['c'],
        d: { f: 'g' },
        m: 'n',
        p: 2,
        r: 'zzz',
        t: 'v',
      },
      {
        hardMergeKeys: ['d', 't'],
      },
    ),
    {
      a: ['c'],
      d: { f: 'g' },
      k: 'l',
      m: 'n',
      p: 2,
      r: 'zzz',
      t: 'v',
    },
    '11.01.02 - hardMergeKeys only',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: 'b',
        d: ['e'],
        k: 'l',
        p: 1,
        r: '',
        t: { u: 'u' },
      },
      {
        a: ['c'],
        d: { f: 'g' },
        m: 'n',
        p: 2,
        r: 'zzz',
        t: 'v',
      },
      {
        hardMergeKeys: ['d', 't'],
        ignoreKeys: ['a'],
      },
    ),
    {
      a: 'b',
      d: { f: 'g' },
      k: 'l',
      m: 'n',
      p: 2,
      r: 'zzz',
      t: 'v',
    },
    '11.01.03 - hardMergeKeys and ignoreKeys, both',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: 'b',
        d: ['e'],
        k: 'l',
        p: 1,
        r: '',
        t: { u: 'u' },
      },
      {
        a: ['c'],
        d: { f: 'g' },
        m: 'n',
        p: 2,
        r: 'zzz',
        t: 'v',
      },
      {
        hardMergeKeys: 'd',
        ignoreKeys: 'a',
      },
    ),
    {
      a: 'b',
      d: { f: 'g' },
      k: 'l',
      m: 'n',
      p: 2,
      r: 'zzz',
      t: { u: 'u' },
    },
    '11.01.04 - hardMergeKeys and ignoreKeys both at once, both as strings',
  )
})

test('11.02 - OPTS > opts.hardMergeKeys and opts.ignoreKeys together', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        something: ['aaa'],
        anything: ['bbb'],
        everything: { c: 'ccc' },
        xxx: ['ddd'],
        yyy: 'yyy',
        zzz: 'zzz',
      },
      {
        something: 'aaa',
        anything: 'bbb',
        everything: 'ccc',
        xxx: 'overwrite',
        yyy: 'overwrite',
        zzz: 'overwrite',
      },
      {
        hardMergeKeys: ['*thing', '*xx'],
        ignoreKeys: 'nonexisting key',
      },
    ),
    {
      something: 'aaa',
      anything: 'bbb',
      everything: 'ccc',
      xxx: 'overwrite',
      yyy: 'overwrite',
      zzz: 'overwrite',
    },
    '11.02.01',
  )
})

test('11.03 - case #10', (t) => {
  t.deepEqual(
    mergeAdvanced(
      ['a'],
      undefined,
    ),
    ['a'],
    '11.03.01 - default',
  )
  t.deepEqual(
    mergeAdvanced(
      { a: ['a'] },
      { a: undefined },
    ),
    { a: ['a'] },
    '11.03.02.1 - default, objects',
  )
  t.deepEqual(
    mergeAdvanced(
      { a: undefined },
      { a: ['a'] },
    ),
    { a: ['a'] },
    '11.03.02.2 - 11.03.02 opposite order (same res.)',
  )
  t.deepEqual(
    mergeAdvanced(
      { a: ['a'] },
      { a: undefined },
      { hardMergeKeys: '*' },
    ),
    { a: undefined },
    '11.03.03 - hard merge',
  )
})

test('11.04 - case #91', (t) => {
  t.deepEqual(
    mergeAdvanced(
      { a: undefined },
      { a: ['a'] },
      { hardMergeKeys: '*' },
    ),
    { a: ['a'] },
    '11.04.01 - useless hardMergeKeys setting',
  )
  t.deepEqual(
    mergeAdvanced(
      { a: undefined },
      { a: ['a'] },
      { ignoreKeys: '*' },
    ),
    { a: undefined },
    '11.04.02 - checkin the ignores glob',
  )
})

test('11.05 - case #81', (t) => {
  t.deepEqual(
    mergeAdvanced(
      { a: null },
      { a: ['a'] },
      { hardMergeKeys: '*' },
    ),
    { a: ['a'] },
    '11.05.01 - useless hardMergeKeys setting',
  )
  t.deepEqual(
    mergeAdvanced(
      { a: null },
      { a: ['a'] },
      { ignoreKeys: '*' },
    ),
    { a: null },
    '11.05.01 - checkin the ignores glob',
  )
})

test('11.06 - case #9 (mirror to #81)', (t) => {
  t.deepEqual(
    mergeAdvanced(
      { a: ['a'] },
      { a: null },
      { hardMergeKeys: '*' },
    ),
    { a: null },
    '11.06.01 - useless hardMergeKeys setting',
  )
})

test('11.07 - case #8 and its mirror, #71', (t) => {
  t.deepEqual(
    mergeAdvanced(
      { a: ['a'] },
      { a: true },
      { hardMergeKeys: '*' },
    ),
    { a: true },
    '11.07.01 - #8',
  )
  t.deepEqual(
    mergeAdvanced(
      { a: true },
      { a: ['a'] },
      { ignoreKeys: '*' },
    ),
    { a: true },
    '11.07.01 - #71',
  )
})

test('11.08 - case #7 and its mirror, #61', (t) => {
  t.deepEqual(
    mergeAdvanced(
      { a: ['a'] },
      { a: 1 },
      { hardMergeKeys: '*' },
    ),
    { a: 1 },
    '11.08.01 - #7',
  )
  t.deepEqual(
    mergeAdvanced(
      { a: 1 },
      { a: ['a'] },
      { ignoreKeys: '*' },
    ),
    { a: 1 },
    '11.08.02 - #61',
  )
  t.deepEqual(
    mergeAdvanced(
      { a: 1 },
      { a: ['a'] },
      { hardMergeKeys: '*' },
    ),
    { a: ['a'] },
    '11.08.03 - #7 redundant hardMerge setting',
  )
})

test('11.09 - #27 and its mirror #63 - full obj vs number + hardMerge/ignore', (t) => {
  t.deepEqual(
    mergeAdvanced(
      { a: { b: 'c' } },
      { a: 1 },
      { hardMergeKeys: '*' },
    ),
    { a: 1 },
    '11.09.01 - #27',
  )
  t.deepEqual(
    mergeAdvanced(
      { a: 1 },
      { a: { b: 'c' } },
      { ignoreKeys: '*' },
    ),
    { a: 1 },
    '11.09.01 - #63',
  )
})

test('11.10 - #23 two full objects', (t) => {
  t.deepEqual(
    mergeAdvanced(
      { a: { b: 'c' } },
      { a: { b: 'd' } },
    ),
    { a: { b: 'd' } },
    '11.10.01 - default behaviour',
  )
  t.deepEqual(
    mergeAdvanced(
      { a: { b: 'c' } },
      { a: { b: 'd' } },
      { hardMergeKeys: '*' },
    ),
    { a: { b: 'd' } },
    '11.10.02 - redundant setting',
  )
  t.deepEqual(
    mergeAdvanced(
      { a: { b: 'c' } },
      { a: { b: 'd' } },
      { ignoreKeys: '*' },
    ),
    { a: { b: 'c' } },
    '11.10.03 - checking ignores',
  )
})

// ==================================
// 12. opts.oneToManyArrayObjectMerge
// ==================================

test('12.01 - OPTS > opts.oneToManyArrayObjectMerge', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            k: false,
            l: false,
            m: 'm1',
          },
          {
            k: 'k1',
            l: 'l1',
            m: false,
          },
        ],
      },
      {
        a: [
          {
            k: 'k2',
            l: 'l2',
            m: 'm2',
          },
        ],
      },
    ),
    {
      a: [
        {
          k: 'k2',
          l: 'l2',
          m: 'm2',
        },
        {
          k: 'k1',
          l: 'l1',
          m: false,
        },
      ],
    },
    '12.01.01 - default behaviour will merge first keys and leave second key as it is',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            k: 'k2',
            l: 'l2',
            m: 'm2',
          },
        ],
      },
      {
        a: [
          {
            k: false,
            l: false,
            m: 'm1',
          },
          {
            k: 'k1',
            l: 'l1',
            m: false,
          },
        ],
      },
    ),
    {
      a: [
        {
          k: 'k2',
          l: 'l2',
          m: 'm1',
        },
        {
          k: 'k1',
          l: 'l1',
          m: false,
        },
      ],
    },
    '12.01.02 - same as #01, but swapped order of input arguments. Should not differ except for string merge order.',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            k: false,
            l: false,
            m: 'm1',
          },
          {
            k: 'k1',
            l: 'l1',
            m: false,
          },
        ],
      },
      {
        a: [
          {
            k: 'k2',
            l: 'l2',
            m: 'm2',
          },
        ],
      },
      {
        oneToManyArrayObjectMerge: true,
      },
    ),
    {
      a: [
        {
          k: 'k2',
          l: 'l2',
          m: 'm2',
        },
        {
          k: 'k2',
          l: 'l2',
          m: 'm2',
        },
      ],
    },
    '12.01.03 - one-to-many merge, normal argument order',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            k: 'k2',
            l: 'l2',
            m: 'm2',
          },
        ],
      },
      {
        a: [
          {
            k: false,
            l: false,
            m: 'm1',
          },
          {
            k: 'k1',
            l: 'l1',
            m: false,
          },
        ],
      },
      {
        oneToManyArrayObjectMerge: true,
      },
    ),
    {
      a: [
        {
          k: 'k2',
          l: 'l2',
          m: 'm1',
        },
        {
          k: 'k1',
          l: 'l1',
          m: 'm2',
        },
      ],
    },
    '12.01.04 - one-to-many merge, opposite arg. order',
  )
})

test('12.02 - OPTS > opts.oneToManyArrayObjectMerge - two-to-many does not work', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            k: false,
            l: 'l1',
            m: 'm1',
          },
          {
            k: 'k1',
            l: 'l1',
            m: false,
          },
          {
            k: 'k1',
            l: false,
            m: 'm1',
          },
        ],
      },
      {
        a: [
          {
            k: 'k2',
            l: 'l2',
            m: 'm2',
          },
          {
            k: 'k2',
            l: 'l2',
            m: 'm2',
          },
        ],
      },
      {
        oneToManyArrayObjectMerge: true,
      },
    ),
    {
      a: [
        {
          k: 'k2',
          l: 'l2',
          m: 'm2',
        },
        {
          k: 'k2',
          l: 'l2',
          m: 'm2',
        },
        {
          k: 'k1',
          l: false,
          m: 'm1',
        },
      ],
    },
    '12.02.01 - does not activate when two-to-many found',
  )
})

// ==============================
// 13. throws of all kinds
// ==============================

test('13.01 - OPTS > third argument is not a plain object', (t) => {
  t.throws(() => {
    mergeAdvanced({ a: 'a' }, { b: 'b' }, 1)
  })
  t.notThrows(() => {
    mergeAdvanced({ a: 'a' }, { b: 'b' }, {})
  })
})

test('13.02 - OPTS > opts.mergeObjectsOnlyWhenKeysetMatches type checks work', (t) => {
  t.throws(() => {
    mergeAdvanced({ a: 'a' }, { b: 'b' }, { mergeObjectsOnlyWhenKeysetMatches: 'true' })
  })
  t.notThrows(() => {
    mergeAdvanced({ a: 'a' }, { b: 'b' }, { mergeObjectsOnlyWhenKeysetMatches: true })
  })
})

test('13.03 - OPTS > opts.ignoreKeys type checks work', (t) => {
  t.throws(() => {
    mergeAdvanced({ a: 'a' }, { b: 'b' }, { ignoreKeys: 1 })
  })
  t.throws(() => {
    mergeAdvanced({ a: 'a' }, { b: 'b' }, { ignoreKeys: true })
  })
  t.notThrows(() => {
    mergeAdvanced({ a: 'a' }, { b: 'b' }, { ignoreKeys: '' })
  })
  t.notThrows(() => {
    mergeAdvanced({ a: 'a' }, { b: 'b' }, { ignoreKeys: [''] })
  })
  t.notThrows(() => {
    mergeAdvanced({ a: 'a' }, { b: 'b' }, { ignoreKeys: [] })
  })
})

test('13.04 - OPTS > opts.hardMergeKeys type checks work', (t) => {
  t.throws(() => {
    mergeAdvanced({ a: 'a' }, { b: 'b' }, { hardMergeKeys: 1 })
  })
  t.throws(() => {
    mergeAdvanced({ a: 'a' }, { b: 'b' }, { hardMergeKeys: true })
  })
  t.notThrows(() => {
    mergeAdvanced({ a: 'a' }, { b: 'b' }, { hardMergeKeys: '' })
  })
  t.notThrows(() => {
    mergeAdvanced({ a: 'a' }, { b: 'b' }, { hardMergeKeys: [''] })
  })
  t.notThrows(() => {
    mergeAdvanced({ a: 'a' }, { b: 'b' }, { hardMergeKeys: [] })
  })
})

// ==============================
// 14. ad-hoc
// ==============================

test('14.01 - objects within arrays', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            b: 'zzz',
            c: 'ccc', // <----- this key is unique.
          },
        ],
      },
      {
        a: [
          {
            b: false,
            d: 'ddd', // <----- and this key is unique.
          },
        ],
      },
    ),
    {
      a: [
        {
          b: 'zzz',
          c: 'ccc',
        },
        {
          b: false,
          d: 'ddd',
        },
      ],
    },
    '14.01.01 - default behaviour',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            b: 'zzz',
            c: 'ccc', // <----- this key is unique.
          },
        ],
      },
      {
        a: [
          {
            b: false,
            d: 'ddd', // <----- and this key is unique.
          },
        ],
      },
      {
        mergeObjectsOnlyWhenKeysetMatches: false,
      },
    ),
    {
      a: [
        {
          b: 'zzz',
          c: 'ccc',
          d: 'ddd',
        },
      ],
    },
    '14.01.02.01 - customising opts.mergeObjectsOnlyWhenKeysetMatches - one way',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            b: false,
            d: 'ddd', // <----- this key is unique.
          },
        ],
      },
      {
        a: [
          {
            b: 'zzz',
            c: 'ccc', // <----- and this key is unique.
          },
        ],
      },
      {
        mergeObjectsOnlyWhenKeysetMatches: false,
      },
    ),
    {
      a: [
        {
          b: 'zzz',
          c: 'ccc',
          d: 'ddd',
        },
      ],
    },
    '14.01.02.02 - customising opts.mergeObjectsOnlyWhenKeysetMatches - other way (swapped args of 14.01.02.01)',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            b: 'zzz',
            c: 'ccc', // <----- this key is unique.
          },
        ],
      },
      {
        a: [
          {
            b: false,
            d: 'ddd', // <----- and this key is unique.
          },
        ],
      },
      {
        hardMergeKeys: '*', // <----- notice it's glob
      },
    ),
    {
      a: [
        {
          b: 'zzz',
          c: 'ccc',
        },
        {
          b: false,
          d: 'ddd',
        },
      ],
    },
    '14.01.03 - hard merge * - does nothing different because keys are not clashing',
    // the problem is, hard merges drive key-vs.-key choice and here without
    // opts.mergeObjectsOnlyWhenKeysetMatches: false
    // the objects are not merged since they have unique keys.
    // Their parent arrays are contatenated instead.
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            b: 'zzz',
            c: 'ccc', // <----- this key is unique.
          },
        ],
      },
      {
        a: [
          {
            b: false,
            d: 'ddd', // <----- and this key is unique.
          },
        ],
      },
      {
        hardMergeKeys: 'b', // <----- forcing hard merge on "b"
        mergeObjectsOnlyWhenKeysetMatches: false,
      },
    ),
    {
      a: [
        {
          b: false,
          c: 'ccc',
          d: 'ddd',
        },
      ],
    },
    '14.01.04 - with mergeObjectsOnlyWhenKeysetMatches=false objects will clash, plus we got hard merge',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            b: false,
            d: 'ddd', // <----- and this key is unique.
          },
        ],
      },
      {
        a: [
          {
            b: 'zzz',
            c: 'ccc', // <----- this key is unique.
          },
        ],
      },
      {
        hardMergeKeys: 'b', // <----- unnecessarily forcing hard merge on "b"
        mergeObjectsOnlyWhenKeysetMatches: false,
      },
    ),
    {
      a: [
        {
          b: 'zzz', // it would result in string anyway, without a hard merge.
          c: 'ccc',
          d: 'ddd',
        },
      ],
    },
    '14.01.05 - with mergeObjectsOnlyWhenKeysetMatches=false objects will clash, plus we got hard merge',
  )
})


// ==============================
// 15. combo of opts.oneToManyArrayObjectMerge and unidirectional merge,
// either opts.ignoreKeys, opts.hardMergeKeys, opts.hardMergeEverything or opts.ignoreEverything
// ==============================

test('15.01 - hard merge on clashing keys only case #1', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            b: '888',
            c: '111',
          },
          {
            b: '999',
            c: '222',
          },
        ],
      },
      {
        a: [
          {
            c: '333',
          },
        ],
      },
    ),
    {
      a: [
        {
          b: '888',
          c: '333', // <------ overwrites just this
        },
        {
          b: '999',
          c: '222', // <------ not this
        },
      ],
    },
    '15.01.01 - default behaviour',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            b: '888',
            c: '111',
          },
          {
            b: '999',
            c: '222',
          },
        ],
      },
      {
        a: [
          {
            c: '333', // <------ imagine this is an override, used in mapping
          },
        ],
      },
      {
        oneToManyArrayObjectMerge: true,
      },
    ),
    {
      a: [
        {
          b: '888',
          c: '333', // <------ gets overwritten as standard
        },
        {
          b: '999',
          c: '333', // <------ BUT ALSO THIS TOO
        },
      ],
    },
    '15.01.02 - one-to-many',
  )

  // PRESS PAUSE HERE.

  // LET'S TEST TYPE CLASHES.

  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            b: '888',
            c: ['111'], // <------ OOPS! array!
          },
          {
            b: '999',
            c: ['222'], // <------ OOPS! array!
          },
        ],
      },
      {
        a: [
          {
            c: '333', // <------ now it's a string vs array...
          },
        ],
      },
      {
        oneToManyArrayObjectMerge: true,
      },
    ),
    {
      a: [
        {
          b: '888',
          c: ['111'], // <------ nothing happens because array is higher in food chain
        },
        {
          b: '999',
          c: ['222'], // <------ nothing happens because array is higher in food chain
        },
      ],
    },
    '15.01.03 - one to many, string tries override arrays, against the food chain order',
  )

  // WHAT DO WE DO? HOW CAN WE OVERWRITE LIKE IN 15.01.02 ?

  // LET'S TRY HARD OVERWRITE!

  t.deepEqual(
    mergeAdvanced(
      {
        a: [
          {
            b: '888',
            c: ['111'], // <------ will this get overwritten by '333'?
          },
          {
            b: '999',
            c: ['222'], // <------ will this get overwritten by '333'?
          },
        ],
      },
      {
        a: [
          {
            c: '333',
          },
        ],
      },
      {
        oneToManyArrayObjectMerge: true,
        hardMergeKeys: ['c'], // <------ is this the solution?
      },
    ),
    {
      a: [
        {
          b: '888',
          c: '333',
        },
        {
          b: '999',
          c: '333',
        },
      ],
    },
    '15.01.04 - hard overwrite, per-key setting',
  )
})

// ==============================
// 16. Object values are arrays and they contain strings.
// We test their various merge cases.
// ==============================

test('16.01 - values as arrays that contain strings', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        a: ['a'],
      },
      {
        a: ['b'],
      },
    ),
    {
      a: ['a', 'b'],
    },
    '16.01.01 - default behaviour, different strings',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: ['a'],
      },
      {
        a: ['a'],
      },
    ),
    {
      a: ['a', 'a'],
    },
    '16.01.02 - default behaviour, same string',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: ['a'],
      },
      {
        a: ['a'],
      },
      {
        concatInsteadOfMerging: false,
      },
    ),
    {
      a: ['a'],
    },
    '16.01.03 - opts.concatInsteadOfMerging',
  )
  // now the first array goes straight to result, so three "zzz" will come.
  // then second array's "zzz" will be matched as existing and won't be let in.
  t.deepEqual(
    mergeAdvanced(
      {
        a: ['zzz', 'zzz', 'zzz'],
      },
      {
        a: ['zzz'],
      },
      {
        concatInsteadOfMerging: false,
      },
    ),
    {
      a: ['zzz', 'zzz', 'zzz'],
    },
    '16.01.04 - opts.concatInsteadOfMerging pt2.',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: ['bbb', 'zzz', 'zzz', 'bbb', 'zzz', 'bbb'],
      },
      {
        a: ['zzz', 'bbb'],
      },
      {
        concatInsteadOfMerging: false,
        dedupeStringsInArrayValues: true,
      },
    ),
    {
      a: ['bbb', 'zzz'],
    },
    '16.01.05 - opts.concatInsteadOfMerging + opts.dedupeStringsInArrayValues',
  )
})

// ===============================
// 17. opts.useNullAsExplicitFalse
// ===============================

test('17.01 - opts.useNullAsExplicitFalse, simple merges', (t) => {
  //
  // ===
  // ===  PART 1. Baseline.
  // ===

  // So, first let's establish the default behaviour
  t.deepEqual(
    mergeAdvanced(
      {
        a: false,
      },
      {
        a: null,
      },
    ),
    {
      a: false,
    },
    '17.01.01.01 - control, case #79 - false',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: true,
      },
      {
        a: null,
      },
    ),
    {
      a: true,
    },
    '17.01.01.02 - control, case #79 - true',
  )

  // ===

  t.deepEqual(
    mergeAdvanced(
      {
        a: null,
      },
      {
        a: false,
      },
    ),
    {
      a: false,
    },
    '17.01.02.01 - control, case #88 - false',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: null,
      },
      {
        a: true,
      },
    ),
    {
      a: true,
    },
    '17.01.02.02 - control, case #88 - true',
  )

  // ===
  // ===  PART 2. Real deal.
  // ===

  // Onto the null-as-explicit-false mode then.

  t.deepEqual(
    mergeAdvanced(
      {
        a: false,
      },
      {
        a: null,
      },
      {
        useNullAsExplicitFalse: true,
      },
    ),
    {
      a: false,
    },
    '17.01.03.01 - null-as-explicit-false, case #79 - false',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: true,
      },
      {
        a: null,
      },
      {
        useNullAsExplicitFalse: true,
      },
    ),
    {
      a: false,
    },
    '17.01.03.02 - null-as-explicit-false, case #79 - true',
  )

  // ===

  t.deepEqual(
    mergeAdvanced(
      {
        a: null,
      },
      {
        a: false,
      },
      {
        useNullAsExplicitFalse: true,
      },
    ),
    {
      a: false,
    },
    '17.01.04.01 - null-as-explicit-false, case #88 - false',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: null,
      },
      {
        a: true,
      },
      {
        useNullAsExplicitFalse: true,
      },
    ),
    {
      a: false,
    },
    '17.01.04.02 - null-as-explicit-false, case #88 - true',
  )
})

test('17.02 - opts.useNullAsExplicitFalse, null vs. non-Booleans, cases #81-90', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        a: null,
      },
      {
        a: ['a'],
      },
      {
        useNullAsExplicitFalse: true,
      },
    ),
    {
      a: false,
    },
    '17.02.01 - #81 - null vs non-empty array',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: null,
      },
      {
        a: [],
      },
      {
        useNullAsExplicitFalse: true,
      },
    ),
    {
      a: false,
    },
    '17.02.02 - #82 - null vs. empty array',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: null,
      },
      {
        a: { b: 'c' },
      },
      {
        useNullAsExplicitFalse: true,
      },
    ),
    {
      a: false,
    },
    '17.02.03 - #83 - null vs. non-empty plain object',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: null,
      },
      {
        a: {},
      },
      {
        useNullAsExplicitFalse: true,
      },
    ),
    {
      a: false,
    },
    '17.02.04 - #84 - null vs. empty plain object',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: null,
      },
      {
        a: 'zzz',
      },
      {
        useNullAsExplicitFalse: true,
      },
    ),
    {
      a: false,
    },
    '17.02.05 - #85 - null vs. non-empty string',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: null,
      },
      {
        a: '',
      },
      {
        useNullAsExplicitFalse: true,
      },
    ),
    {
      a: false,
    },
    '17.02.06 - #86 - null vs. non-empty string',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: null,
      },
      {
        a: 1,
      },
      {
        useNullAsExplicitFalse: true,
      },
    ),
    {
      a: false,
    },
    '17.02.07 - #87 - null vs. num',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: null,
      },
      {
        a: true,
      },
      {
        useNullAsExplicitFalse: true,
      },
    ),
    {
      a: false,
    },
    '17.02.08.01 - #88 - null vs. bool, true',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: null,
      },
      {
        a: false,
      },
      {
        useNullAsExplicitFalse: true,
      },
    ),
    {
      a: false,
    },
    '17.02.08.02 - #88 - null vs. bool, false',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: null,
      },
      {
        a: null,
      },
      {
        useNullAsExplicitFalse: true,
      },
    ),
    {
      a: false,
    },
    '17.02.09 - #89 - null vs. null',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: null,
      },
      {
        a: undefined,
      },
      {
        useNullAsExplicitFalse: true,
      },
    ),
    {
      a: false,
    },
    '17.02.10 - #90 - null vs. null',
  )
})

test('17.03 - opts.useNullAsExplicitFalse, non-Booleans vs. null, cases #9, 19, 29, 39, 49...99', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        a: ['a'],
      },
      {
        a: null,
      },
      {
        useNullAsExplicitFalse: true,
      },
    ),
    {
      a: false,
    },
    '17.03.01 - #9 - null vs non-empty array',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: [],
      },
      {
        a: null,
      },
      {
        useNullAsExplicitFalse: true,
      },
    ),
    {
      a: false,
    },
    '17.03.02 - #19 - null vs. empty array',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: { b: 'c' },
      },
      {
        a: null,
      },
      {
        useNullAsExplicitFalse: true,
      },
    ),
    {
      a: false,
    },
    '17.03.03 - #29 - null vs. non-empty plain object',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: {},
      },
      {
        a: null,
      },
      {
        useNullAsExplicitFalse: true,
      },
    ),
    {
      a: false,
    },
    '17.03.04 - #39 - null vs. empty plain object',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: 'zzz',
      },
      {
        a: null,
      },
      {
        useNullAsExplicitFalse: true,
      },
    ),
    {
      a: false,
    },
    '17.03.05 - #49 - null vs. non-empty string',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: '',
      },
      {
        a: null,
      },
      {
        useNullAsExplicitFalse: true,
      },
    ),
    {
      a: false,
    },
    '17.03.06 - #59 - null vs. non-empty string',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: 1,
      },
      {
        a: null,
      },
      {
        useNullAsExplicitFalse: true,
      },
    ),
    {
      a: false,
    },
    '17.03.07 - #69 - null vs. num',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: true,
      },
      {
        a: null,
      },
      {
        useNullAsExplicitFalse: true,
      },
    ),
    {
      a: false,
    },
    '17.03.08.01 - #79 - null vs. bool, true',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: false,
      },
      {
        a: null,
      },
      {
        useNullAsExplicitFalse: true,
      },
    ),
    {
      a: false,
    },
    '17.03.08.02 - #79 - null vs. bool, false',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: null,
      },
      {
        a: null,
      },
      {
        useNullAsExplicitFalse: true,
      },
    ),
    {
      a: false,
    },
    '17.03.09 - #89 - null vs. null',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: undefined,
      },
      {
        a: null,
      },
      {
        useNullAsExplicitFalse: true,
      },
    ),
    {
      a: false,
    },
    '17.03.10 - #99 - null vs. null',
  )
})
test('18.04 - OPTS > opts.hardConcatKeys - basic cases', (t) => {
  t.deepEqual(
    mergeAdvanced(
      {
        a: [0, 1, 2],
      },
      {
        a: [3, 4, 5],
      },
      {
        hardArrayConcatKeys: ['a'],
      },
    ),
    {
      a: [0, 1, 2, 3, 4, 5],
    },
    '18.04.01',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: [{ a: 0 }, { a: 1 }, { a: 2 }],
      },
      {
        a: [{ a: 0 }, { a: 1 }, { a: 2 }],
      },
      {
        hardArrayConcatKeys: ['a'],
      },
    ),
    {
      a: [{ a: 0 }, { a: 1 }, { a: 2 }, { a: 0 }, { a: 1 }, { a: 2 }],
    },
    '18.04.02',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: [1, 2, 3],
        b: [1, 2, 3],
        c: [{ a: 1 }, { a: 2 }, { a: 3 }],
      },
      {
        a: [4, 5, 6],
        b: [4, 5, 6],
        c: [{ a: 4 }, { a: 5 }, { a: 6 }],
      },
      {
        hardArrayConcatKeys: ['a'],
      },
    ),
    {
      a: [1, 2, 3, 4, 5, 6],
      b: [1, 4, 2, 5, 3, 6], // no objects, so an "orderer" concat happend
      c: [{ a: 4 }, { a: 5 }, { a: 6 }], // objects so
    },
    '18.04.03',
  )
  t.deepEqual(
    mergeAdvanced(
      {
        a: [1, 2, 3],
        b: [1, 2, 3],
        c: [{ a: 1 }, { a: 2 }, { a: 3 }],
      },
      {
        a: [4, 5, 6],
        b: [4, 5, 6],
        c: [{ a: 4 }, { a: 5 }, { a: 6 }],
      },
      {
        hardArrayConcat: true,
      },
    ),
    {
      a: [1, 2, 3, 4, 5, 6],
      b: [1, 2, 3, 4, 5, 6],
      c: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }, { a: 6 }], // objects so
    },
    '18.04.03',
  )
})
// ============================================================
//                   U T I L   T E S T S
// ============================================================

// ==============================
// util/arrayContainsStr()
// ==============================

test('98.01 - UTIL > arrayContainsStr - throws when there\'s no input', (t) => {
  t.is(
    arrayContainsStr(),
    false,
    '98.01',
  )
  t.throws(() => {
    arrayContainsStr(1)
  })
  t.throws(() => {
    arrayContainsStr('a')
  })
})

// ==============================
// util/equalOrSubsetKeys()
// ==============================

test('99.01 - UTIL > equalOrSubsetKeys - two equal plain objects', (t) => {
  t.truthy(
    equalOrSubsetKeys(
      {
        a: 'ccc',
        b: 'zzz',
      },
      {
        a: 'ddd',
        b: 'yyy',
      },
    ),
    '99.01',
  )
})

test('99.02 - UTIL > equalOrSubsetKeys - first is a subset of the second', (t) => {
  t.truthy(
    equalOrSubsetKeys(
      {
        a: 'ccc',
      },
      {
        a: 'ddd',
        b: 'b',
      },
    ),
    '99.02.01',
  )
  t.truthy(
    equalOrSubsetKeys(
      {
        a: ['ccc'],
      },
      {
        a: ['ddd'],
        b: ['b'],
      },
    ),
    '99.02.02',
  )
})

test('99.03 - UTIL > equalOrSubsetKeys - second is a subset of the first', (t) => {
  t.truthy(
    equalOrSubsetKeys(
      {
        a: 'a',
        b: 'ccc',
      },
      {
        b: 'ddd',
      },
    ),
    '99.03',
  )
  t.truthy(
    equalOrSubsetKeys(
      {
        a: ['a'],
        b: ['ccc'],
      },
      {
        b: ['ddd'],
      },
    ),
    '99.03',
  )
})

test('99.04 - UTIL > equalOrSubsetKeys - empty object is a subset', (t) => {
  t.truthy(
    equalOrSubsetKeys(
      {
        a: 'a',
        b: 'ccc',
      },
      {},
    ),
    '99.04.01',
  )
  t.truthy(
    equalOrSubsetKeys(
      {},
      {
        b: ['ddd'],
      },
    ),
    '99.04.02',
  )
})

test('99.05 - UTIL > first input is not an object - throws', (t) => {
  t.throws(() => {
    equalOrSubsetKeys('z')
  })
})

test('99.06 - UTIL > first input is missing - throws', (t) => {
  t.throws(() => {
    equalOrSubsetKeys()
  })
})

test('99.07 - UTIL > second input is not an object - throws', (t) => {
  t.throws(() => {
    equalOrSubsetKeys({ a: 'a' }, 'z')
  })
  t.throws(() => {
    equalOrSubsetKeys({ a: 'a' }, () => undefined)
  })
})

test('99.08 - UTIL > existy()', (t) => {
  t.is(
    existy(undefined),
    false,
    '99.08.01',
  )
  t.is(
    existy(null),
    false,
    '99.08.02',
  )
  t.is(
    existy(1),
    true,
    '99.08.03',
  )
  t.is(
    existy('a'),
    true,
    '99.08.04',
  )
})

test('99.09 - UTIL > isBool()', (t) => {
  t.is(
    isBool(true),
    true,
    '99.09.01',
  )
  t.is(
    isBool(false),
    true,
    '99.09.02',
  )
  t.is(
    isBool(1),
    false,
    '99.09.03',
  )
  t.is(
    isBool('a'),
    false,
    '99.09.04',
  )
})

test('99.10 - UTIL > arrayContainsStr()', (t) => {
  t.is(
    arrayContainsStr([]),
    false,
    '99.10.01',
  )
  t.is(
    arrayContainsStr([1, 2, 3]),
    false,
    '99.10.02',
  )
  t.is(
    arrayContainsStr([null, 'a']),
    true,
    '99.10.03',
  )
  t.throws(() => {
    arrayContainsStr(1)
  })
  t.throws(() => {
    arrayContainsStr('a')
  })
  t.throws(() => {
    arrayContainsStr(null)
  })
})
