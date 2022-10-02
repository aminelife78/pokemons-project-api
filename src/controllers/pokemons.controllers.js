const {Pokemon} = require("../db/sequelize")

const { ValidationError, UniqueConstraintError,Op } = require("sequelize")


// récupérer tous les pokémones

const pokemons = async (req,res)=>{
  const limit = parseInt(req.query.limit) || 5
  if(req.query.name ){
    const name = req.query.name
    if(name.length > 1 ){
      const {count,rows} = await Pokemon.findAndCountAll({where:{name:{[Op.like]:`%${name}%`}},order: ["name"],limit:limit})
      const message = `Il y'a ${count} pokémones qui correspond a la recherche ${name}`
      res.json({message,data:rows})
    }else{
      res.status(400).json("Le terme de recherche doit contenir au minimum 2 caractères")
    } 
  }else{
      try {
        const limit = parseInt(req.query.limit)
        const pokemons = await Pokemon.findAll({order: ["name"]})
      const message = `les pokémones sont bien récupérer`
      res.json({message,data:pokemons})
    } catch (error) {
      const message = `la liste des pokémons n'a pas pu être récupéré, essayée dans quelque minutes`
      res.status(500).json({message,data:error})
    }
  }
  
    
  }

// ajouter des pokémones
const addPokemon = async (req,res)=>{
  try {
    const pokemon = await Pokemon.create(req.body)
    const message = 'Un pokémon a bien été ajouter.'
    res.json({message,data:pokemon })
  } catch (error) {
    if(error instanceof ValidationError){
      return res.status(400).json({message:error.message,data:error})
    }
    if(error instanceof UniqueConstraintError){
     return res.status(400).json({message:error.message, data:error})
    }
    const message = `la liste des pokémons n'a pas pu être ajoutée, essayée dans quelque minutes`
    res.status(500).json({message,data:error})
  }
}

// récupérer un pokémone
const pokemon = async (req,res)=>{
  const id = req.params.id
 try {
  const pokemon = await Pokemon.findByPk(id)
  if(pokemon == null){
    res.status(404).json("Le pokémon demandé n'existe pas, Réssayé avec un autre identifiant")
  }else{
    const message = 'Un pokémon a bien été trouvé.'
    res.json({message,data:pokemon})
  }
  
 } catch (error) {
  const message = `la liste des pokémons n'a pas pu être récupéré, essayée dans quelque minutes`
  res.status(500).json({message,data:error})
 }
}


// modifier un pokémone
const updatePokemon = async (req,res)=>{
  const id = req.params.id
  try {
    await Pokemon.update(req.body,
    {where:{id:id}}
    ) 
    const pokemon = await Pokemon.findByPk(id) 
    if(pokemon === null){
      res.status(404).json("Le pokémon demandé n'existe pas, Réssayé avec un autre identifiant")
    }else{
      const message = `Le pokémon ${pokemon.name} a bien été modifier`
      res.json({message,data:pokemon})
    }
   
  } catch (error) {
    if(error instanceof ValidationError){
      
      return res.status(400).json({message:error.message,data:error})
    }
    const message = `la liste des pokémons n'a pas pu être modifier, essayée dans quelque minutes`
    res.status(500).json({message,data:error})
  }
}

// suprimer un pokémone
const deletePokemon = async (req,res)=>{
  const id  = req.params.id
  try {
    const pokemon = await Pokemon.findByPk(id)

    if(pokemon===null){
      res.status(404).json("Le pokémon demandé n'existe pas, Réssayé avec un autre identifiant")
    }else{
      await Pokemon.destroy({where:{id:id}})
      const message = `Le pokémon ${pokemon.name} a bien été suprimer`
      res.json({message,data:pokemon})
    }
    
  } catch (error) {
    const message = `la liste des pokémons n'a pas pu être suprimé, essayée dans quelque minutes`
    res.status(500).json({message,data:error})
  }

}

module.exports = {
  pokemons,
  pokemon,
  addPokemon,
  updatePokemon,
  deletePokemon
}