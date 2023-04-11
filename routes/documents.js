const express = require('express')
const router = express.Router()

// Get All
router.get('/', (req, res) => {
    res.send('Welcome to document store!')
})

// Get one
router.get('/:id', (req, res) => {
    res.send(req.params.id)
})

// Create one
router.post('/', (req, res) => {

})

// Update one
router.patch('/:id', (req, res) => {

})

// Delete one
router.patch('/:id', (req, res) => {

})

module.exports = router