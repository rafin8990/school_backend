import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import config from '../../../config'
import { IUser, IUserMethod, userModel } from './user.interface'

const userSchema = new Schema<IUser, Record<string, never>, IUserMethod>(
  {
    name:{
        type:String,
        required:true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin','super_admin'],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    mobileNo: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

userSchema.methods.isUserExist = async function (
    data: string
  ): Promise<Partial<IUser> | null> {
    const user = await User.findOne(
      {
        $or: [{ email: data }, { mobileNo: data }],
      },
      {
        email: 1,
        mobileNo: 1,
        password: 1,
        role: 1,
        name:1,
        image:1

      }
    )
    return user
  }

userSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isMatched = await bcrypt.compare(givenPassword, savedPassword)
  return isMatched
}

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_sault_round),
  );
  next();
});

export const User = model<IUser, userModel>('User', userSchema)