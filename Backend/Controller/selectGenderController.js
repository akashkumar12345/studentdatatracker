const {selectGenderModel} = require('../Models/selectGenderModel');

const selectGenderController = async(req, res) => {
    try{
        const gender = await selectGenderModel(req.body);
        res.status(200).json({message : 'gender', gender});
    }
    catch(err){
        res.status(500).json({error : err.message});
    }
}

module.exports = {
    selectGenderController
}