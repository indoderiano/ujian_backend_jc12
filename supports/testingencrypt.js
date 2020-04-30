// const encrypt=require('./crypto')
const crypto=require('crypto')

module.exports=(password)=>{
    return crypto.createHmac('sha256','puripuri').update(password).digest('hex')
}


const password='maungapain'

const hashpass=crypto.createHmac('sha256','puripuri').update(password).digest('hex')


console.log(hashpass)

