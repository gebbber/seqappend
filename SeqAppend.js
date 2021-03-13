const fs = require('fs');

module.exports = SeqAppend = (filename, cb) => {
    const dataBuffer = [];
    let waitingForWrite = false;
    
    return (newData) => {
        dataBuffer.push(newData);
        if (!waitingForWrite) writeData();
    }

    function writeData() {
        setTimeout(()=>{
            if (dataBuffer.length) fs.appendFile(filename,dataBuffer.join(''),(err)=>{
                waitingForWrite = false;
                if (dataBuffer.length) writeData();
                if (cb && typeof cb === 'function') return cb(err);
            });
            waitingForWrite = true;
            dataBuffer.length = 0;
        },0);
    }
}