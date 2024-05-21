const { ObjectId } = require('mongodb');
const ShopItem = require('../models/ShopItem');

const createItem = async (req, res)=>{
    let {title, image, price, description, availableCount, genre} = req.body

    genre = genre.split(",") || genre;

    const newItem = await ShopItem.create({title, image, price, description, availableCount, genre});

    // 1 to render created message
    let sess = req.session;
    sess.itemMsg = 1;
    // 
    res.redirect('/admin/dashboard');
}

const getItems = async ()=>{
    const item = await ShopItem.find();
    return item;
}

const deleteItem = async (req, res)=>{
    const {id} = req.params;
    await ShopItem.deleteOne({"_id": id});

    // 2 to render deletion message
    let sess = req.session;
    sess.itemMsg = 2;
    res.redirect('/admin/dashboard');
}

const updateItem = async (req,res)=>{
    const {id} = req.params;
    let {title, image, price, description, availableCount, genre} = req.body
    genre = genre.split(",") || genre;
    await ShopItem.updateOne({"_id": id},{
        $set:{
            title: title,
            image: image,
            price: price,
            description: description,
            availableCount: availableCount,
            genre: genre
        }
    });

    // 3 to render update message
    let sess = req.session;
    sess.itemMsg = 3;
    res.redirect('/admin/dashboard');
}

module.exports = {
    createItem,
    getItems,
    deleteItem,
    updateItem
};
