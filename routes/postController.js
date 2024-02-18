const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const { PostModel } = require('../models/postModel');

router.get('/', (req, res) => {
    PostModel.find().then(
        (docs) => {
            res.send(docs);
        }).catch((err) => {
            res.status(500).send("Erreur lors de la récupération des documents");
        });
});

router.post('/', (req, res) => {

    const newInsertion = new PostModel({
        author: req.body.author,
        message: req.body.message
    });

    newInsertion.save().then(
        (docs) => {
            res.send(docs);
            console.log(docs);
        }).catch((err) => {
            res.status(500).send("Erreur d'envoi des données: " + err);
        });

});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send("ID unknown : " + req.params.id);
    }
    else {
        const updateInsertion = {
            author: req.body.author,
            message: req.body.message
        };

        PostModel.findByIdAndUpdate(
            req.params.id,
            { $set: updateInsertion },
            { new: true }
        ).then(
            (docs) => {
                res.send(docs)
            }
        ).catch((err) => {
            res.status(500).send("Update Error : " + err);
        });
    }
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send("ID unknown : " + req.params.id);
    }
    else {
        PostModel.findByIdAndDelete(req.params.id).then(
            (docs) => {
                res.send(docs)
            }
        ).catch((err) => {
            res.status(500).send("Delete Error : " + err);
        });
    }
});
module.exports = router;