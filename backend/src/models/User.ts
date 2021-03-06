import mongoose from '../db/mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import { default  as jwt }  from 'jsonwebtoken';
import { IUserDocument, UserStaticModel } from '../interfaces/DatabaseModels';

const userSchema = new mongoose.Schema<IUserDocument>({
    name: { type: String },
    age: {
        type: Number,
        default: 0,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: (value) => {
            if (!validator.isEmail(value)) throw new Error('Email is invalid..');
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate: (value) => {
            if (value.toLowerCase().includes('password')) throw new Error('Password contains password');
        },
    },
    favoritesMovies: {
        type: [ Number ],
    },
    tokens: [ {
        token: {
            type: String,
            required: true,
        },
    } ],
}, {
    timestamps: true,
});

userSchema.methods.generateAuthToken = async function ():Promise<string> {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_WORD);

    user.tokens = (user.tokens as any[]).concat({ token });
    await user.save();

    return token;
};

userSchema.methods.markFavoriteMovie = async function (id:number):Promise<number> {
    const user = this;

    user.favoritesMovies = [ ...new Set([ ...user.favoritesMovies, id ]) ];
    await user.save();

    return id;
};

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

userSchema.statics.findByCredentials = async (email, password):Promise<IUserDocument> => {
    const user = await User.findOne({ email });

    if (!user) {
        throw { message: 'User not found', code: 404 };
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
        throw { message: 'Password incorrect', code: 401 };
    }

    return user;
};

userSchema.pre<IUserDocument>('save', async function(next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcryptjs.hash(user.password, 8);
    }

    next();
});

userSchema.post<IUserDocument>('save', async function(error, _doc, next) {
    if ([ 'MongoError' ].includes(error.name)) {
        next(new Error(error.message));
    }
});

const User = mongoose.model<IUserDocument, UserStaticModel>('User', userSchema);

export default User;