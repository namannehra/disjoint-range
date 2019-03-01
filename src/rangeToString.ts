const rangeToString = (start: number, end: number, includesStart: boolean, includesEnd: boolean) => (
    includesStart ? '[' : '(') + start + ', ' + end + (includesEnd ? ']' : ')'
)

export default rangeToString