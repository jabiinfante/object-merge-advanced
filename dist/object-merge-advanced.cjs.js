'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var includesAll = _interopDefault(require('array-includes-all'));
var typeDetect = _interopDefault(require('type-detect'));
var clone = _interopDefault(require('lodash.clonedeep'));
var includes = _interopDefault(require('array-includes-with-glob'));
var checkTypes = _interopDefault(require('check-types-mini'));
var lodashIncludes = _interopDefault(require('lodash.includes'));
var uniq = _interopDefault(require('lodash.uniq'));
var arrayiffyString = _interopDefault(require('arrayiffy-if-string'));
var nonEmpty = _interopDefault(require('util-nonempty'));

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// ===================================
// V A R S

// ===================================
// F U N C T I O N S

function existy(x) {
  return x != null;
}

function isObj(something) {
  return typeDetect(something) === 'Object';
}

function isArr(something) {
  return Array.isArray(something);
}

function isBool(bool) {
  return typeof bool === 'boolean';
}

function equalOrSubsetKeys(obj1, obj2) {
  if (!isObj(obj1)) {
    throw new TypeError('object-merge-advanced/util.js/equalOrSubsetKeys(): [THROW_ID_03] First input is not an object, it\'s ' + (typeof obj1 === 'undefined' ? 'undefined' : _typeof(obj1)));
  }
  if (!isObj(obj2)) {
    throw new TypeError('object-merge-advanced/util.js/equalOrSubsetKeys(): [THROW_ID_04] Second input is not an object, it\'s ' + (typeof obj2 === 'undefined' ? 'undefined' : _typeof(obj2)));
  }
  if (Object.keys(obj1).length === 0 || Object.keys(obj2).length === 0) {
    return true;
  }
  return includesAll(Object.keys(obj1), Object.keys(obj2)) || includesAll(Object.keys(obj2), Object.keys(obj1));
}

function arrayContainsStr(arr) {
  if (arguments.length === 0) {
    return false;
  }
  if (!isArr(arr)) {
    throw new TypeError('object-merge-advanced/util.js/arrayContainsStr(): [THROW_ID_05] input must be array');
  }
  return arr.some(function (val) {
    return typeof val === 'string';
  });
}

/* eslint max-len:0, no-prototype-builtins:0 */

// ===================================
// V A R S

// ===================================
// F U N C T I O N S

function isObj$1(something) {
  return typeDetect(something) === 'Object';
}
function isArr$1(something) {
  return Array.isArray(something);
}
function isStr(something) {
  return typeDetect(something) === 'string';
}
function isNum(something) {
  return typeDetect(something) === 'number';
}

function mergeAdvanced(input1orig, input2orig, originalOpts) {
  //
  // VARS AND PRECAUTIONS
  // ---------------------------------------------------------------------------

  if (arguments.length === 0) {
    throw new TypeError('object-merge-advanced/mergeAdvanced(): [THROW_ID_01] Both inputs are missing');
  }
  if (existy(originalOpts) && !isObj$1(originalOpts)) {
    throw new TypeError('object-merge-advanced/mergeAdvanced(): [THROW_ID_02] Options object, the third argument, must be a plain object');
  }

  // DEFAULTS
  // ---------------------------------------------------------------------------

  var defaults = {
    mergeObjectsOnlyWhenKeysetMatches: true, // otherwise, concatenation will be preferred
    ignoreKeys: [],
    hardMergeKeys: [],
    hardArrayConcatKeys: [],
    mergeArraysContainingStringsToBeEmpty: false,
    oneToManyArrayObjectMerge: false,
    hardMergeEverything: false,
    hardArrayConcat: false,
    ignoreEverything: false,
    concatInsteadOfMerging: true,
    dedupeStringsInArrayValues: false,
    mergeBoolsUsingOrNotAnd: true,
    useNullAsExplicitFalse: false
  };
  var opts = Object.assign(clone(defaults), originalOpts);
  opts.ignoreKeys = arrayiffyString(opts.ignoreKeys);
  opts.hardMergeKeys = arrayiffyString(opts.hardMergeKeys);

  checkTypes(opts, defaults, { msg: 'object-merge-advanced/mergeAdvanced(): [THROW_ID_06*]' });

  // ACTION
  // ---------------------------------------------------------------------------

  if (opts.useNullAsExplicitFalse && (input1orig === null || input2orig === null)) {
    return false;
  }

  var i1 = isArr$1(input1orig) || isObj$1(input1orig) ? clone(input1orig) : input1orig;
  var i2 = isArr$1(input2orig) || isObj$1(input2orig) ? clone(input2orig) : input2orig;

  if (isArr$1(i1)) {
    // first, exclusions.
    if (opts.ignoreEverything && !isArr$1(i2)) {
      return i1;
    } else if (opts.hardMergeEverything && !isArr$1(i2)) {
      return i2;
    } else
      // now the business as usual onwards...
      // cases 1-20
      if (nonEmpty(i1)) {
        // cases 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        if (isArr$1(i2) && nonEmpty(i2)) {
          // case 1
          // two array merge
          if (opts.mergeArraysContainingStringsToBeEmpty && (arrayContainsStr(i1) || arrayContainsStr(i2))) {
            return [];
          }
          if (opts.hardArrayConcat) {
            return i1.concat(i2);
          }
          var temp = [];
          for (var index = 0, len = Math.max(i1.length, i2.length); index < len; index++) {
            if (isObj$1(i1[index]) && isObj$1(i2[index]) && (opts.mergeObjectsOnlyWhenKeysetMatches && equalOrSubsetKeys(i1[index], i2[index]) || !opts.mergeObjectsOnlyWhenKeysetMatches)) {
              temp.push(mergeAdvanced(i1[index], i2[index], opts));
            } else if (opts.oneToManyArrayObjectMerge && (i1.length === 1 || i2.length === 1 // either of arrays has one elem.
            )) {
              temp.push(i1.length === 1 ? mergeAdvanced(i1[0], i2[index], opts) : mergeAdvanced(i1[index], i2[0], opts));
            } else if (opts.concatInsteadOfMerging) {
              // case1 - concatenation no matter what contents
              if (index < i1.length) {
                temp.push(i1[index]);
              }
              if (index < i2.length) {
                temp.push(i2[index]);
              }
            } else {
              // case2 - merging, evaluating contents

              // push each element of i1 into temp
              if (index < i1.length) {
                temp.push(i1[index]);
              }
              if (index < i2.length && !lodashIncludes(i1, i2[index])) {
                temp.push(i2[index]);
              }
            }
          }
          // optionally dedupe:
          if (opts.dedupeStringsInArrayValues && temp.every(function (el) {
            return isStr(el);
          })) {
            temp = uniq(temp).sort();
          }
          i1 = clone(temp);
        } else {
          // cases 2, 3, 4, 5, 6, 7, 8, 9, 10
          return i1;
        }
      } else {
        // cases 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
        if (nonEmpty(i2)) {
          // cases 11, 13, 15, 17
          return i2;
        }
        // cases 12, 14, 16, 18, 19, 20
        return i1;
      }
  } else if (isObj$1(i1)) {
    // first, exclusions.
    //
    // if i1 contains "container" values (arrays or objects) missing stuff might
    // be added to it. If, on other hand, it's string, Bool or number, there's
    // nothing we could add to it, so we'll just Object.assign:
    if (opts.ignoreEverything && isObj$1(i2) && !Object.keys(i1).some(function (el) {
      return isArr$1(el) || isObj$1(el);
    })) {
      return Object.assign({}, i2, i1);
    } else if (opts.hardMergeEverything && isObj$1(i2) && !Object.keys(i1).some(function (el) {
      return isArr$1(el) || isObj$1(el);
    })) {
      return Object.assign({}, i1, i2);
    } else
      // now let's do it at the granular level...
      // cases 21-40
      if (nonEmpty(i1)) {
        // cases 21-30
        if (isArr$1(i2)) {
          // cases 21, 22
          if (nonEmpty(i2)) {
            // case 21
            return i2;
          }
          // case 22
          return i1;
        } else if (isObj$1(i2)) {
          // case 23
          // two object merge - we'll consider opts.ignoreEverything & opts.hardMergeEverything too.
          Object.keys(i2).forEach(function (key) {
            if (i1.hasOwnProperty(key)) {
              // key clash
              if (includes(key, opts.ignoreKeys)) {
                // set the ignoreEverything for all deeper recursive traversals,
                // otherwise, it will get lost, yet, ignores apply to all children
                i1[key] = mergeAdvanced(i1[key], i2[key], Object.assign({}, opts, { ignoreEverything: true }));
              } else if (includes(key, opts.hardMergeKeys)) {
                // set the hardMergeEverything for all deeper recursive traversals.
                // The user requested this key to be hard-merged, but in deeper branches
                // without this switch (opts.hardMergeEverything) we'd lose the visibility
                // of the name of the key; we can't "bubble up" to check all parents' key names,
                // are any of them positive for "hard merge"...
                i1[key] = mergeAdvanced(i1[key], i2[key], Object.assign({}, opts, { hardMergeEverything: true }));
              } else if (includes(key, opts.hardArrayConcatKeys)) {
                // set the hardArrayConcat option to true for all deeper values.
                // It will force a concat of both values, as long as they are both arrays
                // No merge will happen.
                i1[key] = mergeAdvanced(i1[key], i2[key], Object.assign({}, opts, { hardArrayConcat: true }));
              } else {
                // regular merge
                i1[key] = mergeAdvanced(i1[key], i2[key], opts);
              }
            } else {
              i1[key] = i2[key]; // key does not exist, so creates it
            }
          });
        } else {
          // cases 24, 25, 26, 27, 28, 29, 30
          return opts.hardMergeEverything ? i2 : i1;
        }
      } else {
        // i1 is empty obj
        // cases 31-40
        if (isArr$1(i2) || isObj$1(i2) || nonEmpty(i2)) {
          // cases 31, 32, 33, 34, 35, 37
          return i2;
        }
        // 36, 38, 39, 40
        return i1;
      }
  } else if (isStr(i1)) {
    // first, exclusions.
    if (opts.ignoreEverything) {
      return i1;
    } else if (opts.hardMergeEverything) {
      return i2;
    } else
      // now the business as usual onwards...
      if (nonEmpty(i1)) {
        // cases 41-50
        if ((isArr$1(i2) || isObj$1(i2) || isStr(i2)) && nonEmpty(i2)) {
          // cases 41, 43, 45
          // take care of hard merge setting cases, opts.hardMergeKeys
          return i2;
        }
        // cases 42, 44, 46, 47, 48, 49, 50
        return i1;
      }
    // i1 is empty string
    // cases 51-60
    if (i2 != null && !isBool(i2)) {
      // cases 51, 52, 53, 54, 55, 56, 57
      return i2;
    }
    // 58, 59, 60
    return i1;
  } else if (isNum(i1)) {
    // first, exclusions.
    if (opts.ignoreEverything) {
      return i1;
    } else if (opts.hardMergeEverything) {
      return i2;
    } else
      // now the business as usual onwards...
      // cases 61-70
      if (nonEmpty(i2)) {
        // cases 61, 63, 65, 67
        return i2;
      }
    // cases 62, 64, 66, 68, 69, 70
    return i1;
  } else if (isBool(i1)) {
    // first, exclusions.
    if (opts.ignoreEverything) {
      return i1;
    } else if (opts.hardMergeEverything) {
      return i2;
    } else
      // now the business as usual onwards...
      // cases 71-80
      if (isBool(i2)) {
        // case 78 - two Booleans
        if (opts.mergeBoolsUsingOrNotAnd) {
          return i1 || i2; // default - OR
        }
        return i1 && i2; // alternative merge using AND
      } else if (i2 != null) {
        // DELIBERATE LOOSE EQUAL - existy()
        // cases 71, 72, 73, 74, 75, 76, 77
        return i2;
      }
    // i2 is null or undefined
    // cases 79*, 80
    return i1;
  } else if (i1 === null) {
    // first, exclusions.
    if (opts.ignoreEverything) {
      return i1;
    } else if (opts.hardMergeEverything) {
      return i2;
      // now the business as usual onwards...
      // cases 81-90
    } else if (i2 != null) {
      // DELIBERATE LOOSE EQUAL - existy()
      // case 81, 82, 83, 84, 85, 86, 87, 88*
      return i2;
    }
    // cases 89, 90
    return i1;
  } else {
    // first, exclusions.
    if (opts.ignoreEverything) {
      return i1;
    } else if (opts.hardMergeEverything) {
      return i2;
    }
    // now the business as usual onwards...
    // cases 91-100
    return i2;
  }
  return i1;
}

module.exports = mergeAdvanced;
