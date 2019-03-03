import assert, {throws, doesNotThrow} from 'assert'

import {Range, InvalidRangeError} from '../src/DisjointRange'
import not from './not'

/* Valid ranges */

doesNotThrow(() => {
    new Range(0, 1)
})

doesNotThrow(() => {
    new Range(0, 1, {includesStart: false})
})

doesNotThrow(() => {
    new Range(0, 1, {includesEnd: false})
})

doesNotThrow(() => {
    new Range(0, 1, {includesStart: false, includesEnd: false})
})

doesNotThrow(() => {
    new Range(0, 0)
})

/* Invalid ranges */

const throwsInvalidRange = (func: Function) => throws(func, InvalidRangeError)

throwsInvalidRange(() => {
    new Range(1, 0)
})

throwsInvalidRange(() => {
    new Range(0, NaN)
})

throwsInvalidRange(() => {
    new Range(NaN, 0)
})

throwsInvalidRange(() => {
    new Range(NaN, NaN)
})

throwsInvalidRange(() => {
    new Range(0, 0, {includesStart: false})
})

throwsInvalidRange(() => {
    new Range(0, 0, {includesEnd: false})
})

throwsInvalidRange(() => {
    new Range(0, 0, {includesStart: false, includesEnd: false})
})

/* Equal */

assert(new Range(0, 1).equal(new Range(0, 1)))

assert(new Range(0, 1, {includesStart: false}).equal(new Range(0, 1, {includesStart: false})))

assert(new Range(0, 1, {includesEnd: false}).equal(new Range(0, 1, {includesEnd: false})))

assert(new Range(0, 1, {
    includesStart: false, includesEnd: false
}).equal(new Range(0, 1, {
    includesStart: false, includesEnd: false
})))

/* Not equal */

not(new Range(0, 0).equal(new Range(0, 1)))

not(new Range(0, 1).equal(new Range(0, 0)))

not(new Range(0, 1).equal(new Range(0, 1, {includesStart: false})))

not(new Range(0, 1).equal(new Range(0, 1, {includesEnd: false})))

not(new Range(0, 1).equal(new Range(0, 1, {includesStart: false, includesEnd: false})))

not(new Range(0, 1, {includesStart: false}).equal(new Range(0, 1)))

not(new Range(0, 1, {includesStart: false}).equal(new Range(0, 1, {includesEnd: false})))

not(new Range(0, 1, {includesStart: false}).equal(new Range(0, 1, {includesStart: false, includesEnd: false})))

not(new Range(0, 1, {includesEnd: false}).equal(new Range(0, 1)))

not(new Range(0, 1, {includesEnd: false}).equal(new Range(0, 1, {includesStart: false})))

not(new Range(0, 1, {includesEnd: false}).equal(new Range(0, 1, {includesStart: false, includesEnd: false})))

console.log('Range tests OK')