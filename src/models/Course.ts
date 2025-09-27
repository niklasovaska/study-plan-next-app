import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Course name is required']
    },
    code: {
        type: String,
        required: [true, 'Course code is required']
    },
    credits: {
        type: Number,
        required: [true, 'Course credits are required']
    },
    grade: {
        type: String
    },
    status: {
        type: String,
        required: [true, 'Course status is required']
    }
})

export default mongoose.models.Course || mongoose.model("Course", courseSchema)