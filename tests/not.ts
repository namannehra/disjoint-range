import assert from 'assert'

const not = (value: any, message?: string) => assert(!value, message)

export default not