const mongoose = require('mongoose')

mongoose
    /*.connect('mongodb+srv://datab:Zz46541215+-@cluster1-9ud1y.mongodb.net/cinema',{ useUnifiedTopology: true,useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })*/
    .connect('mongodb://127.0.0.1:27017/cinema',{ useUnifiedTopology: true,useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection
db.once('open', () => console.log('connected to the database'));
module.exports = db