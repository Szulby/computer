import nand from './nand.js'
export default function or(a) {
    return nand(a, a)
}