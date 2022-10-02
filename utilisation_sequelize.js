// instalation de sequelize :  npm install sequelize
// instalation d'un drive de la base de donnée par exemple mariadb  : npm i mariadb
/*connceté sequelize, mariadb et notre api voici les etape :
1/ importe sequelize dans app.js  : const {Sequelize} = require("sequilize")
2/cree une instance de module sequilize : 
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect:  un parmis 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' 
  logging: false
})
3/ sequelize.authenticate().then(()=>console.log("la connection a la base de donnée a bien été établie")).catch(error=>console.log("impossible de se connecté à la base de donnée" + error))

//crée un model sequelize : 
module.exports = (sequelize, DataTypes) => {
return sequelize.define("user", {
  name: DataTypes.TEXT,
  favoriteColor: {
    type: DataTypes.TEXT,
    defaultValue: 'green'
  },
  age: DataTypes.INTEGER,
  cash: DataTypes.INTEGER
})
};

//synchronisé le model avec la base des donnée
1/ importe l'objet Datatype exemple : const { Sequelize,DataTypes} = require('sequelize')
2/ importe le model exemple : const PokemonModel = require("./src/models/pokemon") 
3/instancier le model exemple : const Pokemon = PokemonModel(sequelize,DataTypes)
4/ synchronisé le model avec la base des donnée exemple : sequelize.sync({force: true}).then(_ =>console.log(`la base des données "pokemons" a bien été synchronisée`))

*/

// authentification etapes:
/*
1) cree un nouveau  model authentification dans le dossier model
2) faire les meme etape que le module pokemon
3) encrypté le mot de passe avec le module bcrypte

*/ 



// etape deployement en ligne avec Heroku

/*
1) se connecter a heroku
2)instalation git
3)instalation heroku cli
4) saisir la commande heroku --version sur le terminal
5) saisir la commande heroku login puis appuyer sur nimporte quels touche sauf le q
6)remplacer port = 3000 de app.js  par port = process.env.PORT || 3000
7)changer la configuration de script sur package.json :
 "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
8)passer express en mode production : 
 "scripts": {
    "start": "NODE_ENV=production node app.js",
    "dev": "NODE_ENV=developement nodemon app.js"
  },
9)ne pas utilisé les dependences de developpepent comme morgan et nodemon
10) sauvgarder le projet sur git si vous avez pas fais ou prealable
11) faire la commande heroku create pour ajouter le projet a heroku
12)deplyer notre api rest sur heroku deployement git push heroku master

*/