const express = require('express')
const router = express.Router()
const Document = require('../models/document')

// Get All
router.get('/', async (req, res) => {
    try {
        const docs = await Document.find()
        res.json(docs)
    } catch (error) {
        res.status(500).json({message: err.message})
    }
    
})


// Create one
router.post('/', async (req, res) => {
    const document = new Document({
        title: req.body.title,
        content: req.body.content
    })
    try {
        const newDoc = await document.save()
        res.status(201).json(newDoc)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})


// Get one
router.get('/:id', getDocument, (req, res) => {
    res.send(res.document)
})

// Update one
router.patch('/:id', getDocument, async (req, res) => {
    if (req.body.title != null)
        res.document.title = req.body.title
    if (req.body.content != null)
        res.document.content = req.body.content

    try{
        const updatedDoc = await res.document.save()
        res.json(updatedDoc)
    } catch(err){
        res.status(400).json({message:err.message})
    }
})


// Delete one
router.delete('/:id', getDocument, async (req, res) => {
    try{
        // id = res.document.id
        await Document.deleteOne({'_id': res.document.id})
        // await res.document.remove()
        // res.json({message: 'Deleted the document.'})
        res.send(res.json({message:`Successfully deleted document with id ${res.document.id}`}))
    } catch(error){
        res.json({message: error.message})
    }
})

// // Delete All
// router.delete('/clearall', async (req, res) => {
//     try{
//         await Document.deleteMany()
//         res.json("Successfully deleted all records")
//         console.log("Successfully deleted all records")
//     } catch(err){
//         res.json({message: err.message})
//     }
// })


// Middleware function
async function getDocument(req, res, next){
    let document

    try {
        document = await Document.findById(req.params.id)
        if (document == null)
            return res.status(404).json({message: 'Cannont find document'})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

    res.document = document

    // next helps to move on next piece of middleware or actual request
    next()
}

module.exports = router