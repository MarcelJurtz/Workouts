const { Router, query } = require('express')

const Wod = require('../../models/wod')

const router = Router()

// router.get('/', async(req, res) => {
//     try {
//         const wods = await Wod.find()
//         if (!wods) throw new Error("No wods found!")
//         const sorted = wods.sort((a, b) => {
//             return new Date(a.date).getTime() - new Date(b.date).getTime()
//         })
//         res.status(200).json(sorted)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

router.get('/random', async(req, res) => {
    try {
        // Get the count of all wods
        console.log("----")
        console.log(req.query.blacklist);
        Wod.countDocuments({ "equipment": { "$nin": req.query.blacklist } }).exec(function(err, count) {

            if (count === 0) {
                throw new Error("No wods found");
            }

            //console.log("Fetching new workout - Blacklist: " + req.query.blacklist);

            // Get a random entry
            var random = Math.floor(Math.random() * count)
            console.log("found " + count + " elements for blackist")

            // Again query all users but only fetch one offset by our random #
            Wod.findOne({ "equipment": { "$nin": req.query.blacklist } }).skip(random).exec(
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

// router.get('/query', async(req, res) => {
//     try {
//         var wodName = req.query.name;

//         const wod = await Wod.findOne({ name: wodName });
//         if (!wod) throw new Error("No wods found!")
//         res.status(200).json(wod)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// router.get('/permalink', async(req, res) => {
//     try {
//         var link = req.query.link;
//         const wod = await Wod.findOne({ permalink: link });
//         if (!wod) throw new Error("No wod found!")
//         res.status(200).json(wod);
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// router.post('/', async(req, res) => {
//     const newWod = new Wod(req.body)
//     try {
//         const wod = await newWod.save()
//         if (!wod) throw new Error('Something went wrong when saving the item')
//         res.status(200).json(wod)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// router.post('/reset', async(req, res) => {

//     await Wod.deleteMany({}, function(err, data) {
//         if (err) {
//             throw new Error("Failed deleting an item");
//         }
//     });
//     if (req.body.wods) {
//         console.log(typeof req.body.wods)
//         try {
//             // for (var element in req.body.wods) {
//             //     console.log(element);
//             //     const newWod = new Wod(element)
//             //     const wod = await newWod.save()
//             //     if (!wod)
//             //         throw new Error('Something went wrong when saving the item')
//             // }
//             await Wod.insertMany(req.body.wods);
//             res.status(200).json({ message: "WODs resetted" });
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     } else {
//         res.status(200).json({ message: "WODs deleted, none newly added" });
//     }
// })

// Put for editing, delete for delete see 13:46
// https://www.youtube.com/watch?v=vr6O-IYebXA

module.exports = router