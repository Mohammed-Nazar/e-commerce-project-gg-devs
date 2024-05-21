const ShopItem = require('../models/ShopItem');

const createItem = async (req, res)=>{
    let {title, image, price, description, availableCount, genre} = req.body

    genre = genre.split(",") || genre;

    const newItem = await ShopItem.create({title, image, price, description, availableCount, genre});

    res.status(200).json(newItem);
}

const getItems = async ()=>{
    const item = await ShopItem.find();
    return item;
}

module.exports = {
    createItem,
    getItems
};
