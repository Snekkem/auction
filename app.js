const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const http = require('http')
const WebSocket = require('ws')
const keys = require('./vercel.json')
const cors = require("cors");
const bodyParser = require('body-parser')
const Users = require('./models/Users')
const CronJob = require('cron').CronJob;
const calculate = require('./helpers/calculateRating')
const path = require('path')
const checkAuctions = require('./helpers/checkAuctions')

const app = express();

app.use(express.static('./public'))

app.use(bodyParser.json())
app.use(cors())

const adminRouter = require('./Routes/adminRouter');
const authRouter = require("./Routes/authRouter");
const userRouter = require("./Routes/userRouter");

app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message || 'Something went wrong. Try again!')
})

app.use(express.static(path.resolve(__dirname, 'build')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

const wss = new WebSocket.Server({ port: 3030 })

const job = new CronJob('* * * * * *', async function() {
    await checkAuctions(wss)
}, null, true, 'America/Los_Angeles');

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
});

const calculateRating = new CronJob('0 0 * * *', async function() {
    const users = await Users.find()
    for (const user of users) {
        const calculateUser = await calculate(user.cards.map(card => card.toString()))
        user.sets = calculateUser.userSets
        user.rating = calculateUser.userRating
    }
}, null, true, 'America/Los_Angeles');

async function start() {
    try {
        await mongoose.connect(keys.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        job.start();
        calculateRating.start()
        app.listen(process.env.PORT || 5000, () => console.log(`App has been started on port ${process.env.PORT || 5000}...`))
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start();