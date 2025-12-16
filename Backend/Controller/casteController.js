const {casteModel} = require('../Models/casteModel');
const casteController = async(req,res) => {
    try{
        const caste = await casteModel(req.body);
        res.status(200).json({message:'caste', caste});
    }
    catch(err)
    {
        res.status(500).json({error : err.message});
    }
}

module.exports = {
    casteController
}