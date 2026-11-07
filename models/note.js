const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    requied: true,
  },
  important: Boolean,
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
    delete returnedObject._id
  },
})

module.exports = mongoose.model('Note', noteSchema)
