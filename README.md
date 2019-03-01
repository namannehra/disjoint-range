## `class Range`
Continuous range

### `start: number`
* `readonly`
Start of `range`

### `end: number`
* `readonly`
End of `range`

### `includesStart: boolean`
* `readonly`
Range includes `start`

### `includesEnd: boolean`
* `readonly`
Range includes `end`

### `constructor(start: number, end: number, [options])`
* `options: {includesStart: boolean = true, includesEnd: boolean = true}`
If `start > end || (start === end && !includesStart || !includesEnd)` then
throws `InvalidRangeError`

### `equal(other: Range) => boolean`
Returns `true` if `range` is equal to `other`

### `includes(other: number | Range) => boolean`
Returns `true` if `range` includes `other`

### `clone() => Range`
Clones the `range`

### `toString() => string`
Converts `range` to `string`

## `class InvalidRangeError`
* `extends Error`
Thrown by `new Range()`

### `start: number`
* `readonly`

### `end: number`
* `readonly`

### `includesStart: boolean`
* `readonly`

### `includesEnd: boolean`
* `readonly`

## `class DisjointRange`
Disjoint continuous ranges

### `ranges: Range[]`
* `readonly`

### `equal(other: DisjointRange) => boolean`
Returns `true` if `disjointRange` is equal to `other`

### `add(other: number | Range | DisjointRange) => DisjointRange`
Returns union of `disjointRange` and `other`

### `remove(other: number | Range | DisjointRange) => DisjointRange`
Returns difference of `disjointRange` and `other`

### `intersect(other: number | Range | DisjointRange) => DisjointRange`
Returns intersection of `disjointRange` and `other`

### `clone() => DisjointRange`
Clones the `disjointRange`

### `toString() => string`
Converts `disjointRange` to `string`