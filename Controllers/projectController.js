


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
        } else {
            res.status(401).json("No projects available")
        }


    } catch (error) {
        console.log(error)
        res.status(406).json(error)

    }
}


exports.allProjects = async (req, res) => {
    const search = req.query.search
    console.log(search)
    try {

        const query ={
            languages:{$regex:search,$options:'i'}
        }

        const result = await projects.find(query)
        console.log(result)
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(401).json("No projects available")
        }


    } catch (error) {
        console.log(error)
        res.status(406).json(error)

    }
}


exports.userProjects = async (req, res) => {
    try {
        const userId = req.payload
        console.log(userId)


        const result = await projects.find({ userId })
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(401).json("No projects available")
        }


    } catch (error) {
        console.log(error)
        res.status(406).json(error)

    }
}


exports.editProject = async (req, res) => {
    const { title, overview, language, github, demo, image } = req.body // this fields are given in frondend side with in double quotes
    const userId = req.payload
    const projectImage = req.file ? req.file.filename : image
    const { pid } = req.params

    try {
        const updateProject = await projects.findByIdAndUpdate({ _id: pid },
            //in below lines key value pairs are in the form of model field: field in req.body
            { title, overview, languages: language, github, demo, image: projectImage, userId }, { new: true } //should make new=true otherwise updated data won't store in db
        )
        await updateProject.save()  //update data to mongodb
        res.status(200).json(updateProject)

    } catch (error) {
        console.log(error)
        res.status(406).json(error)

    }
}

exports.removeProject = async (req, res) => {
    const { pid } = req.params

    try {
        const result = await projects.findByIdAndDelete({ _id: pid })
        res.status(200).json(result)

    } catch (error) {
        console.log(error)
        res.status(406).json(error)

    }
}







