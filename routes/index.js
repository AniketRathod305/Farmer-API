const express = require('express');

const router = express.Router();
const multer = require('multer');
const path = require('path');



let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });


  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });
  


console.log('router loaded');

const farmerController = require('../controller/farmercontroller');
const vendorController = require('../controller/vendorcontroller');

// Farmer
router.post('/api/farmer/signUp',farmerController.createFarmer);
router.post('/api/farmer/login',farmerController.Farmerlogin);
router.get('/api/farmer/logout',farmerController.logoutFarmer);
router.post('/api/farmer/addproduct',upload.single('productImage'),farmerController.addProduct);
router.get('/api/farmer/deleteproduct/:id',farmerController.deleteProduct);
router.get('/api/farmer/farmerInfo',farmerController.farmerInfo);
router.get('/api/farmer/showproducts',farmerController.showproducts);
// Vendor

router.post('/api/vendor/signUp',vendorController.vendorSignup);
router.post('/api/vendor/login',vendorController.vendorLogin);
router.get('/api/vendor/logout',vendorController.logoutVendor);

router.post('/api/vendor/orderProduct/:id',vendorController.orderProduct);

router.get('/api/vendor/vendorInfo',vendorController.vendorInfo);

router.get('/api/vendor/getAllproduct',vendorController.getAllProduct);




module.exports = router ;
