# disjoint-range
Disjoint continuous ranges

## Getting Started

```
yarn add disjoint-range
```

or

```
npm install disjoint-range
```

## Usage
```js
const {Range, DisjointRange} = require('disjoint-range')

const r1 = new Range(0, 6, {includesEnd: false}) // Open end range

const r1 = new Range(4, 10, {includesStart: false}) // Open start range

const dr1 = new DisjointRange()
    .add(r1)
    .add(r2)

console.log(dr1.toString()) // [0, 10]

console.log(dr1.includes(5.5)) // true

const dr2 = new DisjointRange()
    .add(new Range(-10, 20))
    .remove(dr1)

console.log(dr2.toString()) // [-10, 0), (10, 20]
```

## API

### `class Range`
Continuous range

#### `start: number`
* `readonly`

Start of `range`

#### `end: number`
* `readonly`

End of `range`

#### `includesStart: boolean`
* `readonly`

Range includes `start`

#### `includesEnd: boolean`
* `readonly`

Range includes `end`

#### `constructor(start: number, end: number, [options])`
* `options: {includesStart: boolean = true, includesEnd: boolean = true}`

If `start > end || (start === end && !includesStart || !includesEnd)` then
throws `InvalidRangeError`

#### `equal(other: Range) => boolean`
Returns `true` if `range` is equal to `other`

#### `includes(other: number | Range) => boolean`
Returns `true` if `range` includes `other`

#### `clone() => Range`
Clones the `range`

#### `toString() => string`
Converts `range` to `string`

### `class InvalidRangeError`
* `extends Error`

Thrown by `new Range()`

#### `start: number`
* `readonly`

#### `end: number`
* `readonly`

#### `includesStart: boolean`
* `readonly`

#### `includesEnd: boolean`
* `readonly`

### `class DisjointRange`
Disjoint continuous ranges

#### `ranges: Range[]`
* `readonly`

#### `equal(other: DisjointRange) => boolean`
Returns `true` if `disjointRange` is equal to `other`

#### `add(other: number | Range | DisjointRange) => DisjointRange`
Returns union of `disjointRange` and `other`

#### `remove(other: number | Range | DisjointRange) => DisjointRange`
Returns difference of `disjointRange` and `other`

#### `intersect(other: number | Range | DisjointRange) => DisjointRange`
Returns intersection of `disjointRange` and `other`

#### `clone() => DisjointRange`
Clones the `disjointRange`

#### `toString() => string`
Converts `disjointRange` to `string`