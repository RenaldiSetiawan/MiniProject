const tours = (sequelize, DataTypes) => {
  const Tours = sequelize.define(
    "tours",
    {
      tour_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      tour_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      tour_route: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      tour_package: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      tour_schedule: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      tour_price: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      tour_hotel: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      tour_pesawat: {
        type: DataTypes.STRING(35),
        allowNull: true,
      },
      tour_description: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
     
    },
    {
      sequelize,
      tableName: "tours",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "tours_pkey",
          unique: true,
          fields: [{ name: "tour_id" }],
        },
      ],
    }
  );

  //Create Join tour to tours_images
  Tours.associate = (models) => {
    // Tours.belongsTo(models.Users, { foreignKey: "tour_user_id" });

    Tours.hasMany(models.Tours_Images, {
      foreignKey: "toim_tour_id",
      onDelete: "CASCADE",
    });
    Tours.hasMany(models.Tours_Comments, {
      foreignKey: "toco_tour_id",
      onDelete: "CASCADE",
    });
    Tours.hasMany(models.Line_Items, {
      foreignKey: "lite_tour_id",
      onDelete: "CASCADE",
    });
  };
  return Tours;
};
export default tours;
