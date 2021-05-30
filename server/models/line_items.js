const line_items = (sequelize, DataTypes) => {
  const Line_Items = sequelize.define(
    "line_items",
    {
      lite_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      lite_qty: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      lite_status: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      lite_tour_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "tours",
          key: "tour_id",
        },
        unique: "line_items_lite_toca_id_lite_tour_id_key",
      },
      lite_toca_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "tours_cart",
          key: "toca_id",
        },
        unique: "line_items_lite_toca_id_lite_tour_id_key",
      },
      lite_order_name: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "line_items",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "line_items_lite_toca_id_lite_tour_id_key",
          unique: true,
          fields: [{ name: "lite_toca_id" }, { name: "lite_tour_id" }],
        },
        {
          name: "line_items_pkey",
          unique: true,
          fields: [{ name: "lite_id" }],
        },
      ],
    }
  );

  Line_Items.associate = (models) => {
    Line_Items.belongsTo(models.Line_Items, { foreignKey: "lite_tour_id" });

    Line_Items.belongsTo(models.Line_Items, { foreignKey: "lite_toca_id" });
  };

  return Line_Items;
};
export default line_items;
