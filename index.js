const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then((res) => { console.log('connected to mongodb') })
    .catch((err) => { console.log(err, 'Not connected!') });

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    Date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

const course = new Course({
    name: 'Angular Course3',
    author: 'Mosh',
    tags: ['Angular', 'Frontend'],
    isPublished: true,
    price : 90
});

// course.save().then((c) => {
//     console.log(c);
// }).catch((err) => {
//     console.log(err);
// });

async function getCourse() {
   const result = await Course
   .find({name:'asad',isPublished:true})
   .limit(10)
   .sort({name:1})
   .select({name:1,tags:1});
    //-1 mean descending
   console.log(result);
}

async function getByFiltering() {
    //eq (equla)
    //ne (not equal)
    //gt (greater than)
    //gte (greater than equal to)
    //lt (less  than)
    //lte (less than equal to)
    //in
    //nin (not in)
    const result = await Course
    .find({price:{$gt:100}});

    const result2 = await Course
    .find({price:{ $in:[90,120]}});
    console.log(result,result2);
}

async function logicalQuery() {
    // and
    // or
    const result = await Course
        .find()
        .or([ {name:'asad'}, {isPublished: false}]);
        console.log(result)
}

async function regularExpressionQuery () {
    const result = await Course
    // .find ({author:/^sad/i});  //starts with mosh i represent case insensitive
    .find({author:/DI$/i}) //end withs
    console.log(result);
}

async function count() {
    const result = await Course
    .find({})
    .count();
    console.log(result);
}

async function pagination () {
    const offset =0;
    const limit =3;

    const result = await Course
        .find({})
        .skip(offset)
        .limit(limit);

        console.log(result);
};

async function UpdateDocument(id){
    const course = await Course.findById(id);
    if(!course) {
        return;
    }

    course.set({
        name: 'bilal',
        isPublished : false
    });

    const result = await course.save();
    console.log(result);
}
// getCourse();
// getByFiltering();
// logicalQuery();
// regularExpressionQuery();
// count();
// pagination();
UpdateDocument('5d29fd1e9fd5e90b5cc78a2e');