const mongoose = require('mongoose');
const CategorieSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Categorie', CategorieSchema);