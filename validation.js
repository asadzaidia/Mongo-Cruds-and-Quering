const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then((res) => { console.log('connected to mongodb') })
    .catch((err) => { console.log(err, 'Not connected!') });

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
        lowercase: true,
        trim: true, //mongo automatically remove paddings from left and right
    },
    category: {
        type: String,
        enum: ['web', 'mobile', 'desktop'],
        required: true,
        uppercase: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function (v) {
                return v.length > 0;
            },
            message: 'tags length must be greater than 0'
        }
    },
    colors: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 5000);
            },
            message: 'colors length must be greater than 0'
        }

    },
    Date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        min: 5,
        required: function () { return this.isPublished; },
        get: v => Math.round(v), // automatically return the rounded value to the screen
        set: v => Math.round(v) //automatically round the value e.g if it is 18.8 => 19
    }
});

const Course = mongoose.model('Course', courseSchema);

const course = new Course({
    // name: 'Angular Course3',
    author: 'Mosh',
    // tags: ['Angular', 'Frontend'],
    isPublished: true,
    price: 90,
    category: '-',
    colors: []
});

async function createCourse() {
    try {
        const result = await course.save();
        console.log(result);
    }
    catch (ex) {
        // console.log(ex);
        for (field in ex.errors) {
            console.log(ex.errors[field].message);
        }
        console.log(ex.message, "<-Exception->")
    }
}

createCourse();