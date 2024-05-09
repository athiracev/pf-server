const jwt = require('jsonwebtoken')

const jwtMiddlewareFun = (req, res, next) => {
    console.log("Inside JwtMiddelware")
    // res.status(404).json("middle")
    try {
        console.log("try block")

        const token = req.headers.authorization.split(" ")[1]
        
        console.log(token)
        if (token) {
            const result = jwt.verify(token, process.env.secret_key)
            console.log(result)
            req.payload = result.userId
            next()

        } else {
            res.status(406).json("Please Login First")
        }


    } catch (error) {
        console.log(error)
        res.status(406).json("Login first")

    }
}


module.exports = jwtMiddlewareFun