const {classModel} = require(`../Models/classModel`)
const classController = async (req,res) => {
    try{
        const getclass = await classModel(req.body)
        res.status(200).json({message: 'class', getclass})
    }
    catch (err)
    {
        res.status(500).json({error : err.message});
    }
}
module.exports = {
    classController
}