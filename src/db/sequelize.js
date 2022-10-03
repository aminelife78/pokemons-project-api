const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const usersModel = require("../models/users")
const pokemons = require('./mock-pokemon')
const bcrypt = require("bcrypt")


let sequelize
if(process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize('ik4augtllg7ydffy', 'dh12xaj1uzlk95jc', 'wqzhm4xwgqlbe8j7', {
    host: 'iu51mf0q32fkhfpl.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'ik4augtllg7ydffy',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: true
  })
} else {
  sequelize = new Sequelize('pokedex', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: false
  })
  
}
  

  
const Pokemon = PokemonModel(sequelize, DataTypes)
const User = usersModel(sequelize,DataTypes)

  
const initDb = () => {
  return sequelize.sync().then(_ => {
    // ajouter les pokemones de fichier mock-pokemon a la base de données
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      }).then(pokemon => console.log(pokemon.toJSON()))
    })

    // ajouter username et password a la base donnée avec l'ecryptage de mot de passe avec le module bcryt
    bcrypt.hash("amine",10)
    .then(hash=>{
      User.create({
      username:"amine",
      password:hash,
    }).then(user=>console.log(user))
    })
    
     
    console.log('La base de donnée a bien été initialisée !')
  })
  
}


  
module.exports = { 
  initDb, Pokemon,User
}