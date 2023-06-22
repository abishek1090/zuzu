const mongoose =require('mongoose');
const url = "mongodb+srv://abishek:abishek@cluster0.ynkm5pm.mongodb.net/test?retryWrites=true&w=majority";

module.exports=()=>{
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    }).catch((e) => {
        console.log(e);
    });
}