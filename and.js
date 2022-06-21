import nand from './nand.js'

export default function and(a, b) {
    return nand(nand(a, b), nand(a, b))
}