let valideType = ["eau","feu","normale","plante"] 

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:{msg:"Le nom est deja prise"},
      validate:{
        notNull:{msg:"le nom sont une propriété requise"},
        notEmpty:{msg:"le nom ne peut pas etre vide"},
        
            }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        isInt:{msg:"Utilisé uniquement des nombre entiers pour les points de vie"},
        notNull:{msg:"Les point de vie sont une propriété requise"},
        isSuperior(hp){
          if(parseInt(hp) > 999){
            throw new Error('Les point de vie doivent etres inférieur ou egale a 999.')
          }
          if(parseInt(hp) < 0){
            throw new Error('Les point de vie doivent etres supérieur ou egale a 0.')
          }
        }

      }
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        isInt:{msg:"Utilisé uniquement des nombre entiers pour les point de dégats"},
        notNull:{msg:"les point de dégats sont une propriété requise"},
        min:{
          args:[0],
          msg:"les points dégats doivent etres supérieur ou égale à 0"
        },
        max:{
          args:[99],
          msg:"les points dégats doivent etres inférieur ou égale à 99"
        }

      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isUrl:{msg:"Utilisé uniquement une url valide pour l'image"},
        notNull:{msg:"l'image est une propriété requise"}
        

      }
      
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get(){
        return this.getDataValue("types").toString().split(",")
      },
      set(types){
        this.setDataValue("types",types.join().toString())
      },
      validate:{
        nombrePoekmonMax(value){
          if(!value){
            console.log(value)
            throw new Error('le tableau doit contenir ou moin un pokémone')
          }
          
          if(value.toString().split(",").length > 3){
            throw new Error('le tableau doit contenir maximum 3 pokémones')
          }
         
        },
      },
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}