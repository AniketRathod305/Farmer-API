const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://aniket:12345@cluster0.0huje.mongodb.net/farmerwebsite?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});



const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to MongoDB"));

db.once('open',function(){
    console.log('Connected to Database');
});

module.exports = db;