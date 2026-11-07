const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/',  async (req, resp) => {
  const notes = await Note.find({})
  resp.json(notes)
})

notesRouter.get('/:id', async (req, resp) => {
  const note = await Note.findById(req.params.id)
  note ? resp.json(note) : resp.status(404).end()
})

notesRouter.post('/', async (req, resp) => {
  const body = req.body

  if (!body.content) {
    return resp.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  const savedNote = await note.save()
  resp.status(201).json(savedNote)

})

notesRouter.delete('/:id', async (req, resp) => {
  await Note.findByIdAndDelete(req.params.id)
  resp.status(204).end()
})

notesRouter.put('/:id', (req, resp, next) => {
  const { content, important } = req.body
  Note.findById(req.params.id)
    .then((note) => {
      if (!note) {
        return resp.status(404).end
      }
      note.content = content
      note.important = important
      return note.save().then((updatedNote) => resp.json(updatedNote))
    })
    .catch((err) => next(err))
})

module.exports = notesRouter