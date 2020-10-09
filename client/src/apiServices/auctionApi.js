import * as axios from "axios";

export const auctionApi = {
    getAuctions(pageNumber = 1, pagination = 20, filter) {
        return axios.get('/api/user/auctions', {
            params: {pageNumber, pagination, ...filter},
        }, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(response => response.data)
    },
    placeABet(auction, user, bet) {
        return axios.post('/api/user/place-a-bet', {auction, user, bet}).then(response => response.data)
    },
    getLastBet(auctionId) {
        return axios.post('/api/user/last-bet', {auctionId}).then(response => response.data)
    },
    createAuction(auctionData) {
        return axios.post('/api/admin/auction', auctionData).then(response => response.data)
    }
}
