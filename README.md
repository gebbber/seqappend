# seqappend

Make consecutive/repeated calls to fs.appendFile sequential!

## Use:

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
