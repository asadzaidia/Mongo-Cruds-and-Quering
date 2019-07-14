const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-excersices')
    .then((res)=>{
        console.log('connected to the database');
    })
    .catch((Err)=>{
        console.log('could not connected to the database ',Err);
    });

const CourseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean,
    price : Number,
    tags : [String],
    date :Date
});

const Course = mongoose.model ('Course', CourseSchema);

async function Excersice1 () {
    const result = await Course
        .find({isPublished : true,tags: 'backend'})
        .sort({name:1})
        .select({name :1,author:1});

    console.log(result);
};
async function Excersice2 () {
    const result = await Course
        .find({isPublished : true,tags: {$in:['backend','backend']}})
        //or
        // .or({tags :'backend'},{tags:'frontend'})
        .sort({name:1})
        .select({name :1,author:1});

    console.log(result);
};

Excersice1();
Excersice2();