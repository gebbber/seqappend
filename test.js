const fs = require('fs');
const seqAppend = require('./SeqAppend')('goodFile.txt');

//This usually provides some out-of-order values:
for (let i=1; i<=100; i++) {
    fs.appendFile('badFile.txt',`${i}\n`,(err)=>{if (err) console.log(err.message)});
    seqAppend(`${i}\n`);
}
   