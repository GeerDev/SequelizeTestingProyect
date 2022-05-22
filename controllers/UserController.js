const { User, Post, Token, Sequelize } = require("../models/index.js");
const { Op } = Sequelize;
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development']

const UserController = {
  create(req, res, next) {
    req.body.role = "user";
    const hash = bcrypt.hashSync(req.body.password, 10)
    User.create({ ...req.body, password:hash })
      .then((user) =>
        res.status(201).send({ message: "Usuario creado con éxito", user })
      )
      .catch(error => {
        error.origin = 'User'
        next(error)
      });
  },
  login(req,res){
    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(user=>{
        if(!user){
            return res.status(400).send({message:"Usuario o contraseña incorrectos"})
        }
        const isMatch = bcrypt.compareSync(req.body.password, user.password);
        if(!isMatch){
            return res.status(400).send({message:"Usuario o contraseña incorrectos"})
        }
        token = jwt.sign({id: user.id}, jwt_secret);
        Token.create({ token, UserId: user.id })
        res.send({message: 'Holi' + user.name, user, token})
    })
},
  getAll(req, res) {
    User.findAll({
      include: [Post],
    })
      .then((users) => res.send(users))
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: "Ha habido un problema al cargar las publicaciones",
        });
      });
  },
  async delete(req, res) {
    try {
      await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      await Post.destroy({
        where: {
          UserId: req.params.id,
        },
      });
      res.send("Erradicado. Con éxito.");
    } catch (error) {
      console.log(err);
      res.status(500).send({
        message:
          "Ha habido un problema al eliminar el usuario y sus publicaciones",
      });
    }
  },
  async update(req, res) {
    await User.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.send("Usuario actualizado con éxito");
  },
  async logout(req, res) {
    try {
        await Token.destroy({
            where: {
                [Op.and]: [
                    { UserId: req.user.id },
                    { token: req.headers.authorization }
                ]
            }
        });
        res.send({ message: 'Desconectado con éxito' })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'hubo un problema al tratar de desconectarte' })
    }
}

};

module.exports = UserController;
