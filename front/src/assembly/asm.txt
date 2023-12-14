// load stos, local and arg into ram
@256
d=a 
@sp
m=d
@300
d=a
@lcl
m=d
@400
d=a
@arg
m=d

// push constant 1
@1
D=A
@sp
a=m
m=d
@sp
m=m+1

// push constant 0
@0
D=A
@sp
a=m
m=d
@sp
m=m+1

// sub
@sp
am=m-1
d=m
@sp
am=m-1
d=d-m
@sp
a=m
m=d
@sp
m=m+1

// pop to white
@sp
am=m-1
d=m
@white
m=d

// push constant screen
@screen
D=A
@sp
a=m
m=d
@sp
m=m+1



@white
d=m
@sp
a=m
am=a-1
a=m
m=d


// drow to next pixel
(while)

@sp
a=m
a=m
am=m+1
m=d

@while
0;jmp
