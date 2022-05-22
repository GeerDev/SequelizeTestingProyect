const { Hashtag } = require("../models/index.js");

const HashtagController = {
    create(req, res) {
        Hashtag.create({ ...req.body })
          .then((hashtag) =>{    
            hashtag.addPost(req.body.PostId)
            res.status(201).send({ message: "Hashtag creado con éxito", hashtag })
          })
          .catch(console.error);
      },
}

module.exports = HashtagController;