const mongoose = require('mongoose');

console.log(mongoose);
mongoose.connect('mongodb+srv://darksniped:l90Do81oMNv8E8Yq@cluster0.huc2vt6.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));


const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
    age: Number,
});

const User = mongoose.model('User', userSchema);
