const fs = require('fs');

//make file appending sequential!

module.exports = SeqAppend = (filename, cb1) => {
    const dataBuffer = [];
    return (newData, cb2) => {
        dataBuffer.push(newData);
        setTimeout(()=>{
            if (dataBuffer.length) fs.appendFile(filename,dataBuffer.join(''),(err)=>{
                if (cb2 && typeof cb2 === 'function') return cb2(err);
                else if (cb1 && typeof cb1 === 'function') return cb1(err);
            });
            dataBuffer.length=0;
        },0);
    }
}