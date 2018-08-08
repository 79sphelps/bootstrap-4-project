const mongoose = require('mongoose');
const PersonelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    editable: {
        type: Boolean,
        required: true
    }
});

const Personel = mongoose.model("Personel", PersonelSchema);
module.exports = Personel;
