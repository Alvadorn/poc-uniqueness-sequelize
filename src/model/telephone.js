module.exports = (sequelize, DataTypes) => {
  const Telephone = sequelize.define(
    'telephone',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      ddd: {
        type: DataTypes.INTEGER(2),
        allowNull: false
      },
      number: {
        type: DataTypes.INTEGER(9),
        allowNull: false
      }
    },
    {
      indexes: [{ unique: true, fields: ['ddd', 'number'] }]
    }
  );

  return Telephone;
};
