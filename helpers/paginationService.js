module.exports = async (model, pageNumber, pagination, populate = '') => {
    return await model.find().populate(populate)
        .skip((+pageNumber - 1) * +pagination)
        .limit(+pagination)
}