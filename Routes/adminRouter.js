const express = require('express')
const adminController = require('../Controllers/adminController')
const adminRouter = express.Router()
const auth = require('../helpers/middlewares/verifyHelper.middleware')
const isAdmin = require('../helpers/middlewares/checkAdmin.middleware')
const {check} = require('express-validator')
const checkCards = require('../helpers/middlewares/checkCard.middleware')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

adminRouter.get('/card/statistics', auth, isAdmin, adminController.GetCardStatistics)
adminRouter.get('/auctions', adminController.GetAuctions)
adminRouter.get('/statistics', auth, isAdmin, adminController.GetCardStatistics)
adminRouter.get('/users', auth, isAdmin, adminController.GetUsers)
adminRouter.get('/sets', adminController.GetSets)

adminRouter.post('/pagination', adminController.Pagination)
adminRouter.post('/create/card', upload.single('image'), adminController.CreateCard)
adminRouter.post('/userlock', adminController.UserLock)
adminRouter.post('/create/location', auth, isAdmin, adminController.CreateLocation)
adminRouter.post('/create/episode', auth, isAdmin, adminController.CreateEpisode)
adminRouter.post('/create/set', auth, isAdmin, adminController.CreateSet)
adminRouter.post('/appoint-admin', auth, isAdmin, adminController.Appointment)
adminRouter.post('/auction', auth, checkCards, [
    check('start_bet', 'Enter valid bet').isNumeric(),
    check('min_step_bet', 'Enter valid bet').isNumeric(),
    check('min_extension_time', 'Enter number').isNumeric(),
    check('max_bet', 'Enter valid bet').isNumeric()
], adminController.Auction)

adminRouter.delete('/card/delete/:id', auth, isAdmin, adminController.DeleteCard)
adminRouter.delete('/delete/location/:id', auth, isAdmin, adminController.DeleteLocations)
adminRouter.delete('/delete/episode/:id', auth, isAdmin, adminController.DeleteEpisode)

adminRouter.put('/update/location/:id', auth, isAdmin, adminController.UpdateLocation)
adminRouter.put('/update/episode/:id', auth, isAdmin, adminController.UpdateEpisode)
adminRouter.put('/card/update/:id', auth, isAdmin, upload.single('image'), adminController.UpdateCard)


module.exports = adminRouter