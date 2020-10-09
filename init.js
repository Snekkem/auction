const axios = require('axios')
const Episodes = require('./models/Episodes')
const Locations = require('./models/Locations')
const Cards = require('./models/Cards')
const Roles = require('./models/Roles')
const Users = require('./models/Users')
const keys = require('./vercel.json')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const createAdmin = async () => {
    const password = await bcrypt.hash('#1234qwer', 10)
    await Users.create({name: 'Admin', role: 'Admin', email: 'admin@gmail.com', password})
}

const fillRoles = async () => {
    await Roles.create({role: 'Admin'})
    await Roles.create({role: 'User'})
}

const fillLocations = async () => {
    let currentPage = null
    do {
        let urlBase = !currentPage ? 'https://rickandmortyapi.com/api/location/' : currentPage.info.next
        let {data} = await axios.get(urlBase)
        currentPage = data

        await Locations.insertMany(currentPage.results.map(l => {
                return {
                    name: l.name,
                    type: l.type,
                    dimension: l.dimension,
                    created_at: new Date(l.created)
                }
            }
        ))
    } while (currentPage.info.next !== null);
}

const fillEpisodes = async () => {
    let currentPage = null
    do {
        let urlBase = !currentPage ? 'https://rickandmortyapi.com/api/episode/' : currentPage.info.next
        let {data} = await axios.get(urlBase)
        currentPage = data

        await Episodes.insertMany(currentPage.results.map(e => {
                return {
                    name: e.name,
                    episode: e.episode,
                    air_date: e.air_date,
                }
            }
        ))

    } while (currentPage.info.next !== null);
}

const fillCards = async () => {
    let currentPage = null
    do {
        let urlEpisodes = !currentPage ? 'https://rickandmortyapi.com/api/character/' : currentPage.info.next
        let {data} = await axios.get(urlEpisodes)
        currentPage = data

        await Promise.all(currentPage.results.map(async (l) => {
            let location = null
            if (l.location.url) {
                const {data} = await axios.get(l.location.url)
                location = await Locations.findOne({name: data.name})
                location = location._id
            }

            let episodes = null
            if (l.episode.length > 0) {
                episodes = await Promise.all(l.episode.map(async (p) => {
                    const {data} = await axios.get(p)
                    const episode = await Episodes.findOne({episode: data.episode})
                    return episode._id
                }))
            }

            return {
                name: l.name,
                status: l.status,
                type: l.type,
                gender: l.gender,
                locations: [location],
                episodes,
                image: l.image,
                cardType: 'starter',
                created_at: new Date(l.created)
            }
        })).then(async data => await Cards.insertMany(data))
    } while (currentPage.info.next !== null);
}

const start = async () => {
    await mongoose.connect(keys.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })

    console.log('Creating admin...')
    await createAdmin()
    console.log('Admin created.')
    console.log('Fill roles...')
    await fillRoles()
    console.log('End.')
    console.log('Fill locations...')
    await fillLocations()
    console.log('End.')
    console.log('Fill episodes...')
    await fillEpisodes()
    console.log('End.')
    console.log('Fill cards...')
    await fillCards()
    console.log('Let\'s go! Crash my code. Enter -> npm run server')
}

start()
