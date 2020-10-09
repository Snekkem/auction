const express = require('express')
const userController = require('./../Controllers/userController')
const userRouter = express.Router()
const checkBalance = require('../helpers/middlewares/checkBalance.middleware')

userRouter.get('/chat', userController.Chat)
userRouter.get('/cards', userController.GetCardsInfo)
userRouter.get('/me/:id', userController.Me)
userRouter.get('/auctions', userController.GetAuctions)
userRouter.get('/locations', userController.GetLocations)
userRouter.get('/episodes', userController.GetEpisodes)
userRouter.get('/user-cards/:id', userController.GetUserCards)
userRouter.get('/user-sets/:id', userController.GetUserSets)
userRouter.get('/bet-history/:id', userController.GetBetHistory)

userRouter.post('/send-message', userController.SendMessage)
userRouter.post('/place-a-bet', checkBalance, userController.PlaceABet)

module.exports = userRouter;
