const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const usersModel = require("../models/users")
const pokemons = require('./mock-pokemon')
const bcrypt = require("bcrypt")
  
const sequelize = new Sequelize('pokedex', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})
  
const Pokemon = PokemonModel(sequelize, DataTypes)
const User = usersModel(sequelize,DataTypes)

  
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
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