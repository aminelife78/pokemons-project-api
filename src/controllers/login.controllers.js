const {User} = require("../db/sequelize")
// const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const privateKey = require("../auth/private_key")

const login = (req,res)=>{
  User.findOne({ where: { username: req.body.username } }).then(user => {
    if(!user){
      const message = "L'utilisateur demandée n'existe pas"
      return res.status(404).json({message})
    }
    bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
      if(!isPasswordValid) {
        const message = "Le mot de passe est incorrecte."
         res.status(404).json({ message })
      }else{
        // jwt
        const token = jwt.sign(
          {userId:user.id},
          privateKey,
          {expiresIn:'24h'}
        )
        const message = `L'utilisateur a été connecté avec succès`;
        return res.json({ message, data: user,token })
      }
    })
  }).catch(error=>{
    const message = "L'utilisateur n'a pas peut etres connecté. Réssayer dans quelques instants"
    res.json({message,data:error})
  })
}




module.exports = {login}