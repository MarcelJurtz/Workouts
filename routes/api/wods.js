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

router.get('/random', async(req, res) => {
    try {
        // Get the count of all wods
        Wod.count().exec(function(err, count) {

            if (count === 0) {
                throw new Error("No wods found");
            }

            // Get a random entry
            var random = Math.floor(Math.random() * count)

            // Again query all users but only fetch one offset by our random #
            Wod.findOne().skip(random).exec(
                function(err, result) {
                    if (err) {
                        throw new Error(err.message);
                    } else {
                        res.status(200).json(result);
                    }
                });
        })
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