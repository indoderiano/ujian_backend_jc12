console.log('testing token')



const jwt = require ('jsonwebtoken');
const data = {id:3}
const data2 = {id:20,username:'test'}
const token = jwt.sign(data, "puripuriprisoner", { expiresIn : '12h' })
const token2 = jwt.sign(data2, "puripuriprisoner", { expiresIn : '5000' })

// console.log(token2)

var tokenid='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTU4NzkzMjE4MiwiZXhwIjoxNTg3OTM5MzgyfQ.Pa6XrAYGJZQp4uNdkfgBJ5oAGog45MzOB80Z3GpXv2U'


setTimeout(()=>{
    
    jwt.verify(token2, "puripuriprisoner", (error, decoded) => {
        if (error) {
            console.log('verify fail')
            // return res.status(401).json({ message: "User not authorized.", error: "User not authorized." });
        }else{
            console.log(decoded)

        }
            // next();
    });

},6000)
