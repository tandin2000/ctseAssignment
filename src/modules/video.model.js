const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 450
    },
});

module.exports = mongoose.model('videos', VideoSchema);