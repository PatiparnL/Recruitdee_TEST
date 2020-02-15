const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    product_id: Number,
    type: String,
    subtype: String,
    groupedproducts:[],
    name: String,
    images: [],
    price: String,
    thumbnail: String,
    description: [],
    attributeskv: {},
    can_sell: Boolean
});

module.exports = mongoose.model('cpc_packages', UserSchema);