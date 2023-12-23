const mongoose = require("mongoose");

// const uri = "mongodb://localhost/27017";
const uri = "mongodb+srv://kasinathansj:kasi%40home61@cluster0.gumlfqd.mongodb.net/stockDB?retryWrites=true&w=majority";

console.log(uri)

mongoose.connect(uri);

const ContentSchema = new mongoose.Schema({
    file:String,
    Size : {
        type : Number,
        min : 1,
        max : 1024
    }
})

const productschema = new mongoose.Schema({
    name:{
        type:String,
        required :[true,"name must be specified"]
    },
    price:{
        type:Number,
        min:1,
        max:10
    },
    stock:Number,
    content : ContentSchema
});



const Stock = mongoose.model("stock",productschema)
const Content = mongoose.model("content",ContentSchema);

const cont1 = Content({
    file:"pdf",
    Size:10
})

const per1 = Stock({
    name:"kasi2",
    price:10,
    stock:10,
    content:cont1
})

const per2 = Stock({
    name:'kasi3',
    price:10,
    stock:10
})

per1.save()

// Stock.insertMany([per1,per2]);

// async function fin(){
//     const val = await Stock.find({name:"kasi"})
//     console.log(val)
//     mongoose.connection.close()
// }
// fin()

// async function upd(){
//     const data = await Stock.updateOne({name:"kasi2"},{name:"nathan"})
//     console.log(data);
// }

// upd()

// async function del(){
//     const data = await Stock.deleteOne({name:"kasi2"},{name:"nathan"})
//     console.log(data);
// }

// del();