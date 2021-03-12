# seqappend

Forces consecutive/repeated calls to fs.appendFile to be added to the file sequentially

## General use, with no callbacks:

```javascript
const writeLog = require('seqappend')('logfile.txt');

writeLog('Several...');
writeLog('...logged...');
writeLog('.......events');
```
### or:
```javascript
const SeqAppend = require('seqappend');

const writeLog1 = SeqAppend('log1.txt');
const writeLog2 = SeqAppend('log2.txt');

writeLog1('Several...');
writeLog1('...logged...');
writeLog1('.......events');

writeLog2('In...');
writeLog2('...multiple...');
writeLog2('............files');
```
## Using Callbacks

### In the constructor:

```javascript
const SeqAppend = require('seqappend');

const writeLog = SeqAppend('log.txt', (err)=>console.log(err));

writeLog1('data');
```

### Or with the 'write' operations:

```javascript
const SeqAppend = require('seqappend');

const writeLog = SeqAppend('log.txt');

writeLog1('data', (err)=>console.log(err));
```

### ...with the data being written.

If you specify a callback in both places, then the one specified with the 'write' operation will override the one added to the constructor.

## Warning with respect to Constructors!
__You cannot rely on the callback being run every time__, because subsequent write oeprations result in data being concatenated and then appended to the file in a single call to `fs.appendFile`.  __The callback is only run when this call is made to `fs.appendFile`.__