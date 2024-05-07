


const projects = require('../Models/projectModel')


//Addproject

exports.addProjects = async (req, res) => {
    // console.log(req.body)
    // console.log(req.payload)
    // console.log(req.file)
    const userId = req.payload
    const { title, overview, languages, github, demo } = req.body
    const image = req.file.filename
    console.log(title, overview, languages, github, demo, userId, image)
    try {
        const existingProject = await projects.findOne({ github })
        if (existingProject) {
            res.status(406).json("Project Already Added!")
        }
        else {
            const newProject = new projects({
                title, overview, languages, github, demo, image, userId
            })
            await newProject.save()
            res.status(200).json(newProject)

        }
    }
    catch (err) {
        console.log(err)
        res.status(401).json(err)
    }

    // res.status(200).json("Success")
}

exports.homeProjects = async (req, res) => {
    try {
        const result = await projects.find().limit(3)
        if (result) {
            res.status(200).json(result)
        }else{
            res.status(401).json("No projects available")
        }


    } catch (error) {
        console.log(error)
        res.status(406).json(error)

    }
}


exports.allProjects= async(req,res)=>{
    try {

        const result=await projects.find()
        if (result) {
            res.status(200).json(result)
        }else{
            res.status(401).json("No projects available")
        }


    } catch (error) {
        console.log(error)
        res.status(406).json(error)

    }
}


exports.userProjects= async(req,res)=>{
    try {
        const userId= req.payload
        console.log(userId)


        const result=await projects.find({userId})
        if (result) {
            res.status(200).json(result)
        }else{
            res.status(401).json("No projects available")
        }


    } catch (error) {
        console.log(error)
        res.status(406).json(error)

    }
}


