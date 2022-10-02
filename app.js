const express = require("express")
const app = express()
const path = require("path")
const port = process.env.PORT || 3000
const routerPokemons = require("./src/routes/pokemons.routes")
const routerLogin = require("./src/routes/login.routes")
const path = require("path")
const bodyParser = require("body-parser")
//utilisation juste pour le mode developpememnt
// const morgan = require("morgan")
const {initDb,Pokemon} = require("./src/db/sequelize")



//utilisation de morgane juste pour le mode developpememnt
// app.use(morgan("dev"))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


initDb()

// ici nous plaçons nos future points de terminaison


app.use("/api", routerPokemons)
app.use("/api", routerLogin)
app.use((req,res)=>{
  res.status(404)
  res.json("Impossible de trouver la ressource demandée! vous pouvez essayé une autre URL")
})






app.listen(port,()=>console.log(`Notre application node est démarrée http://localhost:${port}` ))