const mongoose = require('mongoose');

const SleepSchema = new mongoose.Schema({
    sleepDate: {
        type: String,
        required: true,
    },
    asleepTime: {
        type: String,
        required: true,
    },
    wakeupTime: {
        type: String,
        required: true,
    }
});

const Sleep = mongoose.model("SleepData", SleepSchema)
module.exports = Sleep;