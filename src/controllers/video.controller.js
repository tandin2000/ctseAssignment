const Video = require('../modules/video.model');

const create = async (req, res) => {
    if(req.body) {
        const videoPayload = new Video(req.body);
        await videoPayload.save()
            .then(data=>{
                res.status(200).send({data: data});
            })
            .catch(error =>{
                res.status(500).send({error: error.message});
            });
    }
}

const getAll = async (req, res) => {
    await Video.find({})
        .populate('name')
        .then(data=>{
            res.status(200).send({data: data});
        })
        .catch(error =>{
            res.status(500).send({error: error.message});
        });
}

const getById = async (req, res) => {
    if (req.params && req.params.id) {
        await Video.findById(req.params.id)
            .populate('name')
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const updateById = async (req, res) => {
    const id = req.params.id;
    const {name} = req.body;
    const updateVideo = {
        name
    }
    await Video.findByIdAndUpdate(id, updateVideo)
        .then(() => {
            res.status(200).send({status: "Updated"})
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: " Error", error:err.message});
        })
}

const deleteById = async (req, res) => {
    const id = req.params.id
    await Video.findByIdAndRemove(id).exec()
    res.send("Deleted");
}

module.exports = {
    create,
    getAll,
    getById,
    updateById,
    deleteById,
}
