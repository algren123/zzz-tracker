const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const SleepModel = require('./models/Sleep');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://algren123:duracel2@cluster0.vksrx.mongodb.net/sleep?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

app.post('/add', async (req, res) => {

    const sleepDate = req.body.sleepDate;
    const asleepTime = req.body.asleepTime;
    const wakeupTime = req.body.wakeupTime;

    const sleep = new SleepModel({
        sleepDate: sleepDate,
        asleepTime: asleepTime,
        wakeupTime: wakeupTime
    });

    try {
        await sleep.save();
    } catch(err) {
        console.log(err);
    };
});


app.get('/read', async (req, res) => {
   SleepModel.find({}, (err, result) => {
    if (err) {
        res.send(err);
    }

    res.send(result);
   });
});

app.get('/:id', (req, res) => {
    const id = req.params.id;
    SleepModel.findById(id, (err, sleepEntry) => {
        res.json(sleepEntry);
    })
})

app.listen(3001, () => {
    console.log('Server running on port 3001...');
})