import nand from './nand.js'
import not from './not.js'
import and from './and.js'
import or from './or.js'
import nor from './nor.js'
import xor from './xor.js'

console.log('not 1:', not(1))
console.log('not 0:', not(0))
console.log('and 0,0:', and(0, 0))
console.log('and 0,1:', and(0, 1))
console.log('and 1,0:', and(1, 0))
console.log('and 1,1:', and(1, 1))
console.log('or 0,0:', or(0, 0))
console.log('or 0,1:', or(0, 1))
console.log('or 1,0:', or(1, 0))
console.log('or 1,1:', or(1, 1))
console.log('nor 0,0:', nor(0, 0))
console.log('nor 0,1:', nor(0, 1))
console.log('nor 1,0:', nor(1, 0))
console.log('nor 1,1:', nor(1, 1))
console.log('xor 0,0:', xor(0, 0))
console.log('xor 0,1:', xor(0, 1))
console.log('xor 1,0:', xor(1, 0))
console.log('xor 1,1:', xor(1, 1))
