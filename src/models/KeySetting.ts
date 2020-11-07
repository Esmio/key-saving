import mongoose  from 'mongoose';

export type KeyDocument = mongoose.Document & {
  target: string;
  key: string;
  secret: string;
  clientID: string;
  scope: string;
  createUser: mongoose.Schema.Types.ObjectId;
  updateUser: mongoose.Schema.Types.ObjectId;
};

const KeySchema = new mongoose.Schema({
  name: String,
  key: String,
  secret: String,
  clientID: String,
  scope: String,
  createUser: mongoose.Schema.Types.ObjectId,
  updateUser: mongoose.Schema.Types.ObjectId,
}, {timestamps: true});

export const KeySetting = mongoose.model<KeyDocument>('KeySetting', KeySchema);
