# seqappend

Make consecutive/repeated calls to fs.appendFile sequential!

##

```javascript
const writeFile = require('seqappend')(targetfilename, (err)=>{
    console.log(err);
}));

fileAppenderFunction(data, (err)=>{
    console.log(err);
}));
```
The callbacks are optional.  If one is provided
## General Use:

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
## You can specify a callback in two places:

```javascript
const SeqAppend = require('seqappend');

const writeLog = SeqAppend('log.txt', (err)=>console.log(err));

writeLog1('data');
```

### ...in the constructor, or...

```javascript
const SeqAppend = require('seqappend');

const writeLog = SeqAppend('log.txt');

writeLog1('data', (err)=>console.log(err));
```

### ...with the data being written.

If you specify a callback in both places, then the one added to the 'writer' function will override the one added to the constructor.

__You cannot rely on the callback being run every time__, because subsequent calls to the 'writer' function result in data being concatenated and then appended to the file in a single call to `fs.appendFile`.  The callback is only run when this call is made to `fs.appendFile`.