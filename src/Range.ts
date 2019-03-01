import rangeToString from './rangeToString'
import InvalidRangeError from './InvalidRangeError'

class Range {

    readonly start: number
    readonly end: number
    readonly includesStart: boolean
    readonly includesEnd: boolean

    constructor(start: number, end: number, {
        includesStart = true,
        includesEnd = true,
    } = {}) {
        if (
            Number.isNaN(start) ||
            Number.isNaN(end) ||
            start > end ||
            (start === end && !includesStart || !includesEnd)
        ) {
            throw new InvalidRangeError(start, end, includesStart, includesEnd)
        }
        this.start = start
        this.end = end
        this.includesStart = includesStart
        this.includesEnd = includesEnd
    }

    equal(other: Range) {
        return (
            this.start === other.start &&
            this.end === other.end &&
            this.includesStart === other.includesStart &&
            this.includesEnd === other.includesEnd
        )
    }

    includes(other: number | Range) {
        return other instanceof Range ? this.includesRange(other) : this.includesNumber(other)
    }

    private includesNumber(number: number) {
        return this.includesRange(new Range(number, number))
    }

    private includesRange(other: Range) {
        return (
            (this.start < other.start || this.start === other.start && (this.includesStart || !this.includesStart)) &&
            (this.end > other.end || this.end === other.end && (this.includesEnd || !this.includesEnd))
        )
    }

    clone() {
        return new Range(this.start, this.end, this)
    }

    toString() {
        return rangeToString(this.start, this.end, this.includesStart, this.includesEnd)
    }

    static readonly InvalidRangeError = InvalidRangeError

}

export {InvalidRangeError}
export default Range