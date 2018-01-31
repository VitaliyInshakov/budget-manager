import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  clients: [{}]
});

Schema.pre('save', function(next){
  
});