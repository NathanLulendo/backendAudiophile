const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join('public/images/products/'));
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const cpUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 3 }])

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);
router.post('/', cpUpload , productController.createProduct);
router.put('/:id', cpUpload, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;