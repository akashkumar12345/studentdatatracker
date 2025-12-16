const {stateModel} = require("../Models/stateModel")

const stateController = async(req,res) => {
    try {
         const state = await stateModel(req.body);
         res.status(200).json({message: "State",state});
    }
    catch(err)
    {
        res.status(500).json({error : err.message});
    }
}

module.exports = {
    stateController
}