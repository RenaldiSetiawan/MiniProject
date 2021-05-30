const tours_cart = (sequelize, DataTypes) => {
  const Tours_Cart = sequelize.define(
    "tours_cart",
    {
      toca_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      toca_created_on: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      toca_status: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      toca_user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "user_id",
        },
      },
    },
    {
      sequelize,
      tableName: "tours_cart",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "tours_cart_pkey",
          unique: true,
          fields: [{ name: "toca_id" }],
        },
      ],
    }
  );

  Tours_Cart.associate = (models) => {
    Tours_Cart.belongsTo(models.Users, { foreignKey: "toca_user_id" });

    Tours_Cart.hasMany(models.Line_Items, {
      foreignKey: "lite_toca_id",
      onDelete: "CASCADE",
    });

  };

  return Tours_Cart;
};
export default tours_cart;
