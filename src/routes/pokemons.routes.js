const express = require("express")
const router = express.Router()
const {pokemons,pokemon,addPokemon,updatePokemon,deletePokemon}  = require("../controllers/pokemons.controllers")
const auth = require("../auth/auth")

router.get("/pokemons",pokemons)
router.get("/pokemons/:id",auth,pokemon)

router.post("/pokemons",auth,addPokemon)
router.put("/pokemons/:id",auth,updatePokemon)
router.delete("/pokemons/:id",auth,deletePokemon)



module.exports = router