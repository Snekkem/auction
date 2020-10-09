const Sets = require('../models/Sets')


module.exports = async (cards) => {
    try {
        const globalSets = await Sets.find();
        const setCards = new Set(cards);

        let userSets = [];
        let userRating = 0;

        for (let gSet of globalSets) {
            let isBonus = true;
            let tempSet = {setId: gSet._id, isCards: []}

            for (let card of gSet.set) {
                const isHas = setCards.has(card.toString());

                if (isHas) {
                    tempSet.isCards.push({
                        cardId: card,
                        isCard: true
                    });
                } else {
                    tempSet.isCards.push({
                        cardId: card,
                        isCard: false
                    });
                }

                isBonus = isBonus ? isHas : false;
            }

            userRating += isBonus ? gSet.bonus : 0;
            userSets.push(tempSet)
        }

        return {
            userRating: userRating + cards.length,
            userSets
        }
    } catch (e) {
        console.log(e)
    }
}