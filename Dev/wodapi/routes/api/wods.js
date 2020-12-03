const { Router } = require('express')

const Wod = require('../../models/wod')

const router = Router()

router.get('/', async(req, res) => {
    try {
        const wods = await Wod.find()
        if (!wods) throw new Error("No wods found!")
        const sorted = wods.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        res.status(200).json(sorted)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async(req, res) => {
    const newWod = new Wod(req.body)
    try {
        const wod = await newWod.save()
        if (!wod) throw new Error('Something went wrong when saving the item')
        res.status(200).json(wod)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Put for editing, delete for delete see 13:46
// https://www.youtube.com/watch?v=vr6O-IYebXA

module.exports = router