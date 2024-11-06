import mongoose, { Schema, model } from "mongoose";
import map from "mongoose-aggregate-paginate-v2";

const VideoSchema = new Schema({
    videoFile:{
        type:String,
        required: true
    },
    thumbnail:{
        type:String,
        required: true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref:"video"
    },
    title: {
        type:String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    duration: {
        type:Number,
        required: true
    },
    views: {
        type:Number,
        required: true
    },
    isPublished: {
        type:Boolean,
        required: true
    }
}, {timestamps: true})

VideoSchema.plugin(map)

export const Video = model("Video", VideoSchema)