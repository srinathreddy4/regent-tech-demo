module.exports = (sequelize, DataTypes) => {
  const Consultant = sequelize.define('consultant', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    skills: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    assigned: {
      type: DataTypes.BOOLEAN
    }
  },
  {
    indexes: [
      { unique: false, fields: ['name'] },
      { unique: false, fields: ['assigned'] }
    ]
  })

  return Consultant
}