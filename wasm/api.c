#include <stdlib.h>

int nand(int a, int b) {
  return a && b ? 0 : 1;
}

int and(int a, int b) {
  return nand(nand(a,b), nand(a,b));
}

int xor(int a,int b) {
  return nand(nand(a,nand(a,b)),nand(b,nand(a,b)));
}

int or(int a, int b) {
  return nand(nand(a, a), nand(b, b));
}

int* halfAdder(int a, int b) {
  int *arr = malloc(2 * sizeof(int));
  arr[0] = xor(a,b);
  arr[1] = and(a,b);

  return arr;
}

	// let s = xor(xor(a, b), c)
	// let oc = or(and(xor(a, b), c), and(a, b))

int* fullAdder(int a, int b, int c) {
  int *arr = malloc(2 * sizeof(int));
  arr[0] = xor(xor(a, b), c);
  arr[1] = or(and(xor(a, b), c), and(a, b));

  return arr;

}