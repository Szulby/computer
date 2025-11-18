# CLAUDE.md - AI Assistant Guide for Compik

## Project Overview

**Compik** is an educational computer science project that implements a complete 16-bit computer from first principles. The project builds everything from basic NAND gates up through a complete von Neumann architecture computer with a visual display, software toolchain, and programming environment.

**Project Philosophy**: Build a working computer entirely from software, demonstrating how complex systems emerge from simple primitives (inspired by Nand2Tetris).

## Repository Structure

```
/home/user/computer/
├── front/                          # Main React frontend application
│   ├── src/
│   │   ├── computer/              # Hardware layer (41 chip files)
│   │   │   ├── nand.js           # Fundamental primitive gate
│   │   │   ├── and.js, or.js, not.js, xor.js  # Basic logic gates
│   │   │   ├── alu.js            # Arithmetic Logic Unit
│   │   │   ├── memory.js         # 64KB RAM implementation
│   │   │   ├── computer.js       # Main computer (fetch-decode-execute)
│   │   │   ├── computerChipTester.js  # Test suite
│   │   │   └── [38 other chip files]
│   │   ├── assembly/              # Software toolchain
│   │   │   ├── bjs.js            # High-level language compiler
│   │   │   ├── vm.js             # VM-to-Assembly compiler
│   │   │   ├── asm.js            # Assembler (Assembly → Machine code)
│   │   │   ├── vm.txt            # VM source code
│   │   │   ├── asm.txt           # Assembly source code
│   │   │   └── output            # Binary machine code
│   │   ├── tests/                 # Testing files
│   │   ├── App.jsx               # Main React component
│   │   └── screen.jsx            # Screen rendering component
│   ├── vite.config.js            # Vite configuration
│   └── package.json              # Frontend dependencies
├── wasm/                          # WebAssembly optimizations
│   ├── api.c                     # C implementations of critical gates
│   ├── api.wasm                  # Compiled WebAssembly
│   └── readme.txt                # Compilation instructions
├── .eslintrc.cjs                 # ESLint configuration
├── .prettierignore               # Prettier ignore file
└── .gitignore                    # Git ignore file
```

## Technology Stack

### Core Technologies
- **React 18.2.0** - UI framework
- **Vite 4.1.0** - Build tool and dev server
- **JavaScript ES Modules** - Primary implementation language
- **WebAssembly (WASM)** - Performance-critical operations
- **Web Workers** - Non-blocking computer simulation

### Development Tools
- **ESLint 8.34.0** - Code linting (eslint:recommended)
- **Prettier** - Code formatting
- **Axios 1.3.4** - HTTP client for loading programs
- **Emscripten** - C to WebAssembly compiler

### Build Commands
```bash
cd front
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Architecture

### Three-Layer Architecture

#### 1. Hardware Layer (`/front/src/computer/`)
Implements a complete 16-bit computer using pure JavaScript functions:

**Logic Gates** (built from NAND):
- `nand.js` - Only primitive: `return a && b ? 0 : 1`
- `and.js`, `or.js`, `not.js`, `xor.js` - Derived gates
- `and16.js`, `or16.js`, `not16.js` - 16-bit versions

**Arithmetic**:
- `halfAdder.js`, `fullAdder.js` - Basic binary addition
- `adder16bit.js` - 16-bit adder with carry propagation
- `inc16.js` - 16-bit incrementer
- `alu.js` - Arithmetic Logic Unit (6 control bits)

**Memory & Sequential Logic**:
- `dff.js` - Data Flip-Flop (fundamental state element)
- `oneBitRegister.js` - 1-bit register with load control
- `sixteenBitRegister.js` - 16-bit register
- `memory.js` - 64KB RAM (65536 words)
- `programCounter.js` - Program counter with inc/load/reset

**Complete Computer** (`computer.js:1-132`):
- Fetch-decode-execute cycle
- Two registers: A (address/value) and D (data)
- Memory-mapped I/O for screen (addresses 16384-24575)
- Runs in Web Worker for non-blocking execution

#### 2. Software Toolchain (`/front/src/assembly/`)

Three-stage compilation pipeline:

1. **High-Level Language** (bjs.js):
   - Functions, variables, imports
   - Compiles to VM code
   - Usage: `node bjs.js` → generates `vm.txt`

2. **Virtual Machine** (vm.js):
   - Stack-based VM
   - Operations: push/pop, arithmetic, control flow, function calls
   - Compiles to assembly
   - Usage: `node vm.js` → generates `asm.txt`

3. **Assembler** (asm.js):
   - Two-pass assembler (labels, then instructions)
   - A-instructions: `@value` (address/constant)
   - C-instructions: `dest=comp;jump`
   - Symbol table with predefined symbols (R0-R15, SCREEN, KBD, SP, LCL, ARG)
   - Usage: `node asm.js` → generates `output` (binary)

#### 3. Frontend Layer (`/front/src/`)

**App.jsx**:
- Creates Web Worker running computer simulation
- Polls worker every 1 second for screen/RAM/stack data
- Provides Click and Reset buttons
- Renders screen via Screen component

**screen.jsx**:
- HTML5 Canvas rendering (256x512 pixels)
- Black and white display
- Memory-mapped to addresses 16384-24575

## Key Concepts & Conventions

### Binary Representation
All data represented as arrays of 0s and 1s:
```javascript
// 16-bit word representing the number 1
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]

// Two's complement for negative numbers
// -1 in 16-bit two's complement
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
```

### Instruction Format (16-bit)

**A-Instruction** (Address/Constant):
```
0vvvvvvvvvvvvvvv
│└──────────────── 15-bit value
└───────────────── 0 indicates A-instruction
```

**C-Instruction** (Computation):
```
111accccccdddjjj
│││││││││││││└──── 3-bit jump condition
││││││││││└───────── 3-bit destination
│││└────────────────── 6-bit computation
││└─────────────────── A/M select bit
└└──────────────────── Always 111 for C-instruction
```

### Memory Layout
```
0-255:      Special registers
            0   = SP (Stack Pointer)
            1   = LCL (Local segment)
            2   = ARG (Argument segment)
            3   = THIS
            4   = THAT
            5-15 = General purpose temp
            16-255 = Static variables

256-2047:   Stack space

16384-24575: Screen memory (8192 words)
             256 rows × 512 columns
             Each word controls 16 pixels

24576:      Keyboard input
```

### Coding Patterns

#### 1. Closure-Based State Management
All stateful components (registers, memory, program counter) use closures:

```javascript
export default function register() {
  let state = 0;  // Internal state hidden in closure

  return function(input, load) {
    if (load) {
      state = input;
    }
    return state;
  };
}
```

#### 2. Pure Functional Gates
All combinatorial logic is pure functions:

```javascript
export default function and(a, b) {
  return nand(nand(a, b), nand(a, b));
}
```

#### 3. Module System
- One component per file
- File name matches function name (lowercase)
- ES6 modules (`import`/`export default`)
- Clear dependency chains

### WebAssembly Integration

Critical path gates implemented in C for performance:

**Compilation** (`wasm/readme.txt:1`):
```bash
emcc api.c -o api.wasm \
  -s EXPORTED_FUNCTIONS=_nand,_and,_xor,_or,_halfAdder,_fullAdder \
  -sEXPORTED_RUNTIME_METHODS=ccall,cwrap \
  --no-entry
```

**Usage** (from JavaScript):
```javascript
// WASM functions used in hot loops (arithmetic operations)
// Falls back to JS implementation if WASM unavailable
```

## Development Workflows

### Adding a New Logic Gate

1. Create new file in `/front/src/computer/`
2. Implement using existing gates (ultimately built from NAND)
3. Export as default function
4. Follow naming convention: `newGate.js`
5. Add tests in `computerChipTester.js`

Example:
```javascript
// /front/src/computer/myGate.js
import nand from './nand.js';

export default function myGate(a, b) {
  return nand(nand(a, nand(a, b)), nand(b, nand(a, b)));
}
```

### Modifying the Computer

**File**: `/front/src/computer/computer.js`

The computer runs in an infinite loop via Web Worker:
1. Fetch instruction from ROM
2. Decode instruction type (A or C)
3. Execute via ALU
4. Update registers/memory
5. Update program counter

When modifying:
- Be careful with memory-mapped I/O (screen at 16384-24575)
- Preserve register semantics (A for address, D for data)
- Test thoroughly as changes affect entire system

### Writing Programs

Three approaches:

#### 1. Direct Machine Code
Write 16-bit binary directly to `/front/src/assembly/output`

#### 2. Assembly Language
Write in `/front/src/assembly/asm.txt`, then:
```bash
cd front/src/assembly
node asm.js
```

Assembly syntax:
```assembly
@10        // A-instruction: Load 10 into A register
D=A        // C-instruction: Set D register to A
@100       // Load address 100
M=D        // Store D into memory[100]

// Labels and jumps
(LOOP)
  @LOOP
  0;JMP    // Infinite loop
```

#### 3. VM Code
Write in `/front/src/assembly/vm.txt`, then compile:
```bash
cd front/src/assembly
node vm.js    # Generates asm.txt
node asm.js   # Generates output
```

VM syntax:
```
push constant 10
pop local 0
push local 0
push constant 5
add
return
```

#### 4. High-Level Language (BJS)
Write BJS code, then compile through full pipeline:
```bash
cd front/src/assembly
node bjs.js   # Generates vm.txt
node vm.js    # Generates asm.txt
node asm.js   # Generates output
```

### Testing Strategy

**No formal test framework**. Testing is manual/console-based:

1. **Component Testing**: Use `computerChipTester.js`
   - Add console.log assertions
   - Test individual chips in isolation

2. **Integration Testing**: Load program and observe
   - Check screen output
   - Verify memory contents
   - Monitor registers via worker messages

3. **Example Test Pattern**:
```javascript
// In computerChipTester.js
import myGate from './myGate.js';

console.log(myGate(0, 0) === 0 ? "PASS" : "FAIL");
console.log(myGate(1, 0) === 1 ? "PASS" : "FAIL");
```

## Common Tasks for AI Assistants

### 1. Adding New Hardware Features

**Example: Add a new ALU operation**

Files to modify:
- `/front/src/computer/alu.js` - Add new control bit logic
- `/front/src/computer/computer.js` - Update instruction decoding if needed
- `/front/src/computer/computerChipTester.js` - Add tests

### 2. Extending the Assembler

**Example: Add new assembly instruction**

Files to modify:
- `/front/src/assembly/asm.js` - Update instruction parsing
- `/front/src/assembly/vm.js` - Add VM-to-assembly translation if needed

### 3. Optimizing Performance

Priority areas:
1. **WebAssembly**: Move hot-path operations to `wasm/api.c`
2. **Worker Communication**: Reduce polling frequency or use event-based
3. **Screen Rendering**: Optimize canvas updates (currently full redraw)

### 4. Debugging Programs

Tools available:
1. **Screen output**: Visual feedback via canvas
2. **Memory inspection**: Worker sends RAM snapshots
3. **Register state**: A and D register values
4. **Stack inspection**: Stack pointer and contents

Debug workflow:
1. Add console.log in `computer.js` to trace execution
2. Check worker messages in browser DevTools
3. Verify assembly output matches expectations

### 5. Understanding Control Flow

**Jump Conditions** (`jmp.js`):
- `JGT` - Jump if Greater Than (out > 0)
- `JEQ` - Jump if Equal (out == 0)
- `JGE` - Jump if Greater or Equal (out >= 0)
- `JLT` - Jump if Less Than (out < 0)
- `JNE` - Jump if Not Equal (out != 0)
- `JLE` - Jump if Less or Equal (out <= 0)
- `JMP` - Unconditional jump

## Important Constraints & Gotchas

### 1. All Data is Binary Arrays
Never use JavaScript numbers directly in chip logic:
```javascript
// WRONG
function add(a, b) {
  return a + b;
}

// CORRECT
function add16(a, b) {
  // a and b are 16-element arrays of 0s and 1s
  return adder16bit(a, b);
}
```

### 2. Memory-Mapped I/O is Fragile
Screen addresses 16384-24575 must map correctly:
- Don't modify memory layout without updating screen logic
- Screen component expects exact 8192-word buffer
- Each word controls 16 pixels in row-major order

### 3. Web Worker Communication
Computer runs in isolated worker context:
- Cannot directly access DOM
- Communication via `postMessage` only
- State persistence across messages handled internally

### 4. No Type Checking
Project uses JavaScript without TypeScript:
- Be extra careful with array indexing
- Verify binary array lengths (should be 16 for words)
- Test thoroughly as no compile-time safety

### 5. Vite Filesystem Access
`vite.config.js` allows root filesystem access for loading assembly programs:
```javascript
server: {
  fs: {
    allow: ["/"],
  },
}
```
This is required for axios to fetch `/src/assembly/output`

## Code Quality Standards

### ESLint Configuration
- Environment: Node.js, ES2021
- Extends: `eslint:recommended`
- Parser: ES Modules, latest ECMAScript

### Prettier
- Active for all files except `xor.js`
- Standard formatting rules

### Naming Conventions
- **Files**: lowercase, match function name (`halfAdder.js`)
- **Functions**: camelCase (`fullAdder`, `sixteenBitRegister`)
- **Variables**: camelCase
- **Constants**: UPPER_CASE for symbolic constants (in assembler)

### Documentation Style
- Minimal inline comments (code should be self-documenting)
- File-level exports speak for themselves
- Complex logic should have brief comments explaining "why" not "what"

## Git Workflow

### Branch Strategy
- **Main branch**: Production-ready code
- **Feature branches**: `claude/claude-md-mi3so86a8k3qz06e-013cGa2Tsqz2yCV9Vy3djMR5`
- Always develop on designated feature branch

### Commit Message Style
Recent commits show informal style:
- "wasm test"
- "add nand in wasm"
- "add fill color"

When committing, use descriptive but concise messages focusing on what changed.

### Important Git Rules
1. **NEVER** push directly to main without permission
2. **ALWAYS** work on designated feature branch
3. **COMMIT** logical units of work
4. **PUSH** only when changes are tested and working

## Performance Considerations

### Current Optimizations
1. **WebAssembly** for `halfAdder` and `fullAdder` (used in arithmetic hot loop)
2. **Web Worker** prevents UI blocking during computation
3. **Polling interval** of 1 second balances responsiveness and performance

### Optimization Opportunities
1. Move more gates to WebAssembly (especially in ALU path)
2. Reduce worker polling frequency or switch to event-driven
3. Implement dirty checking for screen updates
4. Cache computed values in stateful components
5. Use TypedArrays for binary data instead of regular arrays

## Security Considerations

### Current Security Posture
- **Vite filesystem access**: Allows reading from root `/`
- **No input validation**: Assembly programs loaded without sanitization
- **No sandboxing**: Computer has full access to 64KB memory

### Recommendations
- This is an educational project, not production software
- Do not expose to untrusted users or networks
- Assembly programs have unrestricted access to simulated hardware
- WASM code runs with standard browser sandbox protections

## Future Enhancement Ideas

Based on codebase analysis:

1. **Input Handling**: Currently only Click button, could add keyboard input (address 24576 is reserved)
2. **Debugging Tools**: Visual debugger showing register/memory state
3. **Program Library**: Collection of example programs
4. **Instruction Set Extension**: Add more ALU operations
5. **Performance Dashboard**: Show clock speed, instruction count
6. **Save/Load Programs**: Persist programs to localStorage
7. **Assembly Editor**: In-browser assembly IDE with syntax highlighting
8. **Step-Through Execution**: Debug mode with breakpoints

## Resources & References

### Understanding the Architecture
- Read `computer.js` for fetch-decode-execute cycle
- Read `alu.js` for computation logic
- Read `asm.js` for instruction format

### Understanding the Toolchain
1. Start with `bjs.js` (highest level)
2. Then `vm.js` (intermediate representation)
3. Finally `asm.js` (machine code generation)

### Understanding Logic Gates
- All gates derive from `nand.js`
- Trace dependencies to understand circuit design
- `computerChipTester.js` shows expected behavior

## Quick Reference

### File Extensions
- `.js` - JavaScript modules
- `.jsx` - React components
- `.txt` - Text files (assembly/VM source, compilation notes)
- `.wasm` - WebAssembly binaries
- `.c` - C source for WebAssembly
- `.cjs` - CommonJS modules (ESLint config)

### Key Files Quick Access
- Main computer: `front/src/computer/computer.js:1-132`
- React app: `front/src/App.jsx:1-46`
- NAND gate: `front/src/computer/nand.js:1-3`
- ALU: `front/src/computer/alu.js`
- Assembler: `front/src/assembly/asm.js:1-158`
- VM compiler: `front/src/assembly/vm.js:1-420`

### Symbolic Constants (Assembler)
```
R0-R15    Registers 0-15
SP        Stack pointer (R0)
LCL       Local segment base (R1)
ARG       Argument segment base (R2)
THIS      This pointer (R3)
THAT      That pointer (R4)
SCREEN    Screen memory base (16384)
KBD       Keyboard input address (24576)
```

## When Things Go Wrong

### Computer Not Running
1. Check browser console for errors
2. Verify worker loaded correctly
3. Check that `output` file exists and contains binary data
4. Verify memory layout hasn't been corrupted

### Screen Not Updating
1. Check worker messages are being sent (every 1 second)
2. Verify screen memory addresses 16384-24575
3. Check canvas rendering in `screen.jsx`
4. Ensure program is writing to correct memory addresses

### Assembly Won't Compile
1. Check syntax in `asm.txt`
2. Verify labels are properly defined
3. Check for undefined symbols
4. Run `node asm.js` and check console output

### WebAssembly Not Loading
1. Check WASM file exists in `wasm/api.wasm`
2. Verify Emscripten compilation succeeded
3. Check browser supports WebAssembly
4. Falls back to JavaScript implementation automatically

---

**Last Updated**: 2025-11-17
**Project Status**: Active development
**Primary Developer**: Szulby
**AI Assistant Guide Version**: 1.0
