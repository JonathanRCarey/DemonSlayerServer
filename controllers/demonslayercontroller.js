const Express = require('express');
const router =  Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { DemonModel } = require('../models');

router.get('/practice', (req, res) => {
    res.send('Hey!! This is a practice route!')
});

/*
Journal Creation

*/

router.post('/create', validateJWT, async(req, res) =>{
    const {title, date, entry} = req.body.demon;
    const {id} = req.user;
    const demonEntry = {
        title, 
        date,
        entry,
        owner: id
    }
    try{
        const newDemon = await DemonModel.create(demonEntry);
        res.status(200).json(newDemon);
    } catch(err){
        res.status(500).json({error: err})
    }
    DemonModel.create(demonEntry)
});

router.get("/about", (req,res) => {
    res.send("This is the about route!")
});

/* 

Gets All Entries

*/

router.get("/", async (req, res) =>{
    try{
        const entries = await DemonModel.findAll();
        res.status(200).json(entries);
    } catch(err) {
        res.status(500).json({ error: err});
    }
});

/*

Gets Entries by the user

*/

router.get("/mine", validateJWT, async (req, res) =>{
    let {id} = req.user;
    try{
        const userDemon = await DemonModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userDemon);
    } catch(err){
        res.status(500).json({error: err});
    }
});

/*
Gets Journals by title
*/

router.get("/:title", async (req, res) =>{
    const {title} = req.params;
    try{
        const results = await DemonModel.findAll({
            where: { title: title}
        });
        res.status(200).json(results);
    } catch(err){
        res.status(500).json({error: err});
    }
})

/*Updates the journal*/
router.put("/update/:entryId", validateJWT, async (req, res) => {
    const {title, date, entry} = req.body.demon;
    const demonId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where: {
            id: demonId,
            owner: userId
        }
    };

    const updatedDemon = {
        title: title,
        date: date,
        entry, entry,
    };

    try {
        const update = await DemonModel.update(updatedDemon,query);
        res.status(200).json(update);
    } catch(err){
        res.status(500).json({error: err});
    }
});

/*Deletes entry*/

router.delete("/delete/:id", async (req, res) => {
    const ownerId = req.user.id;
    const demonId = req.params.id;

    try {
      const query = {
        where: {
          id: demonId,
          owner: ownerId,
        },
      };

      await DemonModel.destroy(query);
      res.status(200).json({ message: "Demon Entry Removed" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });
module.exports = router;