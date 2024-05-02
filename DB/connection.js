
const mongoose= require('mongoose')

const connectionString =process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log('MongoDB Atlas connection successfull!!!')
}).catch((err)=>{
    console.log('MOngoDB connection Failed')
})