import Range, {InvalidRangeError} from './Range'

class DisjointRange {

    private _ranges: Range[] = []

    get ranges() {
        return this._ranges.map(range => range.clone())
    }

    equal(other: DisjointRange) {
        return this._ranges.every((range, index) => range.equal(other._ranges[index]))
    }

    add(other: number | Range | DisjointRange) {
        if (other instanceof DisjointRange) {
            return this.addDisjointRange(other)
        }
        if (other instanceof Range) {
            return this.addRange(other)
        }
        return this.addNumber(other)
    }

    private addNumber(number: number) {
        return this.addRange(new Range(number, number))
    }

    private addRange(range: Range) {
        const disjointRange = new DisjointRange()
        disjointRange._ranges = [range.clone()]
        return this.addDisjointRange(disjointRange)
    }

    private addDisjointRange(other: DisjointRange) {
        const ranges = <Range[]>[]
        const currRanges = this._ranges.slice()
        const otherRanges = other._ranges.slice()
        while (currRanges.length && otherRanges.length) {
            const currRange = currRanges[0]
            const otherRange = otherRanges[0]
            if (
                currRange.end < otherRange.start ||
                currRange.end === otherRange.start && !currRange.includesEnd && !otherRange.includesStart
            ) {
                // @ts-ignore
                ranges.push(currRanges.shift())
                continue
            }
            if (
                currRange.start > otherRange.end ||
                currRange.start === otherRange.end && !currRange.includesStart && !otherRange.includesEnd
            ) {
                // @ts-ignore
                ranges.push(otherRanges.shift())
                continue
            }
            currRanges.shift()
            otherRanges.shift()
            const start = Math.min(currRange.start, otherRange.start)
            let includesStart
            if (currRange.start < otherRange.start) {
                includesStart = currRange.includesStart
            } else if (currRange.start > otherRange.start) {
                includesStart = otherRange.includesStart
            } else {
                includesStart = currRange.includesStart || otherRange.includesStart
            }
            if (currRange.end > otherRange.end) {
                currRanges.unshift(new Range(start, currRange.end, {
                    includesStart,
                    includesEnd: currRange.includesEnd,
                }))
                continue
            }
            if (currRange.end < otherRange.end) {
                otherRanges.unshift(new Range(start, otherRange.end, {
                    includesStart,
                    includesEnd: otherRange.includesEnd,
                }))
                continue
            }
            ranges.push(new Range(start, currRange.end, {
                includesStart,
                includesEnd: currRange.includesEnd || otherRange.includesEnd,
            }))
        }
        ranges.push(...currRanges)
        ranges.push(...otherRanges)
        const disjointRange = new DisjointRange()
        disjointRange._ranges = ranges
        return disjointRange
    }

    remove(other: number | Range | DisjointRange) {
        if (other instanceof DisjointRange) {
            return this.removeDisjointRange(other)
        }
        if (other instanceof Range) {
            return this.removeRange(other)
        }
        return this.removeNumber(other)
    }

    private removeNumber(number: number) {
        return this.removeRange(new Range(number, number))
    }

    private removeRange(range: Range) {
        const disjointRange = new DisjointRange()
        disjointRange._ranges = [range]
        return this.removeDisjointRange(disjointRange)
    }

    private removeDisjointRange(other: DisjointRange) {
        const ranges = <Range[]>[]
        const currRanges = this._ranges.slice()
        const otherRanges = other._ranges.slice()
        while (currRanges.length && otherRanges.length) {
            const currRange = currRanges[0]
            const otherRange = otherRanges[0]
            if (
                currRange.end < otherRange.start ||
                currRange.end === otherRange.start && !(currRange.includesEnd && otherRange.includesStart)
            ) {
                // @ts-ignore
                ranges.push(currRanges.shift())
                continue
            }
            if (
                currRange.start > otherRange.end ||
                currRange.start === otherRange.end && !(currRange.includesStart && otherRange.includesEnd)
            ) {
                otherRanges.shift()
                continue
            }
            if (otherRange.includes(currRange)) {
                currRanges.shift()
                continue
            }
            if (
                currRange.end < otherRange.end ||
                currRange.end === otherRange.end && (!currRange.includesEnd || otherRange.includesEnd)
            ) {
                currRanges.shift()
                ranges.push(new Range(currRange.start, otherRange.start, {
                    includesStart: currRange.includesStart,
                    includesEnd: !otherRange.includesStart,
                }))
                continue
            }
            if (
                currRange.start > otherRange.start ||
                currRange.start === otherRange.start && (!currRange.includesStart || otherRange.includesStart)
            ) {
                otherRanges.shift()
                currRanges.unshift(new Range(otherRange.end, currRange.end, {
                    includesStart: !otherRange.includesStart,
                    includesEnd: currRange.includesEnd,
                }))
                continue
            }
            currRanges.shift()
            otherRanges.shift()
            ranges.push(new Range(currRange.start, otherRange.start, {
                includesStart: currRange.includesStart,
                includesEnd: !otherRange.includesStart,
            }))
            currRanges.unshift(new Range(otherRange.end, currRange.end, {
                includesStart: !otherRange.includesEnd,
                includesEnd: currRange.includesEnd,
            }))
        }
        ranges.push(...currRanges)
        const newDisjointRange = new DisjointRange()
        newDisjointRange._ranges = ranges
        return newDisjointRange
    }

    intersect(other: number | Range | DisjointRange) {
        if (other instanceof DisjointRange) {
            return this.intersectDisjointRange(other)
        }
        if (other instanceof Range) {
            return this.intersectRange(other)
        }
        return this.intersectNumber(other)
    }

    private intersectNumber(number: number) {
        return this.intersectRange(new Range(number, number))
    }

    private intersectRange(range: Range) {
        const disjointRange = new DisjointRange()
        disjointRange._ranges = [range]
        return this.intersectDisjointRange(disjointRange)
    }

    private intersectDisjointRange(other: DisjointRange) {
        const ranges = []
        const currRanges = this._ranges.slice()
        const otherRanges = other._ranges.slice()
        while (currRanges.length && otherRanges.length) {
            const currRange = currRanges[0]
            const otherRange = otherRanges[0]
            if (
                currRange.end < otherRange.start ||
                currRange.end === otherRange.start && !(currRange.includesEnd && otherRange.includesStart)
            ) {
                currRanges.shift()
                continue
            }
            if (
                currRange.start > otherRange.end ||
                currRange.start === otherRange.end && !(currRange.includesStart && otherRange.includesEnd)
            ) {
                otherRanges.shift()
                continue
            }
            const start = Math.max(currRange.start, otherRange.start)
            let includesStart
            if (currRange.start > otherRange.start) {
                includesStart = currRange.includesStart
            } else if (currRange.start < otherRange.start) {
                includesStart = otherRange.includesStart
            } else {
                includesStart = currRange.includesStart && otherRange.includesStart
            }
            if (currRange.end < otherRange.end) {
                currRanges.shift()
                ranges.push(new Range(start, currRange.end, {
                    includesStart,
                    includesEnd: currRange.includesEnd
                }))
                continue
            }
            if (currRange.end > otherRange.end) {
                otherRanges.shift()
                ranges.push(new Range(start, otherRange.end, {
                    includesStart,
                    includesEnd: otherRange.includesEnd
                }))
                continue
            }
            currRanges.shift()
            otherRanges.shift()
            ranges.push(new Range(start, currRange.end, {
                includesStart,
                includesEnd: currRange.includesEnd
            }))
        }
        const newDisjointRange = new DisjointRange()
        newDisjointRange._ranges = ranges
        return newDisjointRange
    }

    clone() {
        const disjointRange = new DisjointRange()
        disjointRange._ranges = this._ranges
        return disjointRange
    }

    toString() {
        return this._ranges.join(', ')
    }

}

export {Range, InvalidRangeError, DisjointRange}