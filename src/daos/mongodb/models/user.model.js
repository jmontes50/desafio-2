import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    isGithub: {
        type: Boolean,
        required: true,
        default: false
    },
    cart:{
        type: Schema.Types.ObjectId,
        ref: 'carts',
    }
});

const UserModel = model('User', UserSchema);

export { UserModel }