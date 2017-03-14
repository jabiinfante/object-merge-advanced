'use strict'

// ===================================
// V A R S

var isObj = require('lodash.isplainobject')
var isNum = require('lodash.isnumber')
var includesAll = require('array-includes-all')

// ===================================
// F U N C T I O N S

function existy (x) { return x != null }

function isBool (bool) {
  return typeof bool === 'boolean'
}

function nonEmpty (something) {
  if (Array.isArray(something) || (typeof something === 'string')) {
    return something.length > 0
  } else if (isObj(something)) {
    return Object.keys(something).length > 0
  } else if (isNum(something)) {
    return true
  }
}

function equalOrSubsetKeys (obj1, obj2) {
  if (!isObj(obj1)) {
    throw new TypeError('object-merge-advanced/ mergeAdvanced()/ equalOrSubsetKeys(): First input is not an object, it\'s ' + typeof obj1)
  }
  if (!isObj(obj2)) {
    throw new TypeError('object-merge-advanced/ mergeAdvanced()/ equalOrSubsetKeys(): Second input is not an object, it\'s ' + typeof obj2)
  }
  if ((Object.keys(obj1).length === 0) || (Object.keys(obj2).length === 0)) {
    return true
  }
  return includesAll(Object.keys(obj1), Object.keys(obj2)) || includesAll(Object.keys(obj2), Object.keys(obj1))
}

module.exports = {
  existy: existy,
  isBool: isBool,
  nonEmpty: nonEmpty,
  equalOrSubsetKeys: equalOrSubsetKeys
}
