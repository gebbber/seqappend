# seqappend - sequential append!

Forces repeated calls to `fs.appendFile` to be added to the file in the correct order.  Writes to the file are still made asynchronously.

## Life without `seqappend`:

```
89
90
78
73
92
94
91
95
96
93
99
97
100
98
```
(This is from the end of `badFile.txt` after running `npm run test`. These numbers "should" count in order to 100.)

## General use, with no callbacks:

```javascript
const writeLog = require('seqappend')('logfile.txt');

writeLog('Several...');
writeLog('...logged...');
writeLog('.......events');
```
### ...or:
```javascript
const SeqAppend = require('seqappend');

const writeLog = SeqAppend('log.txt');

writeLog('Several...');
writeLog('...logged...');
writeLog('.......events');
```
### ...or even:
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

### Callbacks are declared in the constructor

```javascript
const SeqAppend = require('seqappend');

const writeLog = SeqAppend('log.txt', (err)=>console.log(err));

writeLog1('data');
```

Callbacks are passed into the constructor, and are run for every call to `fs.appendFile` made internally by `seqappend`.  Since `seqappend` concatenates write requests and writes them at once, __the callback is not necessarily called once for every write request.__

Originally, callbacks were to be supported with the 'write' operations, but the resulting behavior was difficult to predict, and you still couldn't expect every callback passed into the 'write' function to be called. Functionality to call every callback could be provided by keeping a second array of callbacks and iterating through them when the write is complete, but this is not a requirement for my use case.  If you have a compelling use case for this then please get in touch and maybe I'll be bored that evening...

## One final caveat...

If you have more than one 'write' function writing to the same file, then the data may not be written in teh correct order.