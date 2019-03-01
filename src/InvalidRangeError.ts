import rangeToString from './rangeToString'

class InvalidRangeError extends Error {

    readonly start: number
    readonly end: number
    readonly includesStart: boolean
    readonly includesEnd: boolean

    constructor(start: number, end: number, includesStart: boolean, includesEnd: boolean) {
        super('Invalid range: ' + rangeToString(start, end, includesStart, includesEnd))
        this.start = start
        this.end = end
        this.includesStart = includesStart
        this.includesEnd = includesEnd
    }

}

export default InvalidRangeError