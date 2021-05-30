const tours_images = (sequelize, DataTypes) => {
  const Tours_Images = sequelize.define(
    "tours_images",
    {
      toim_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      toim_filename: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      toim_filesize: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      toim_filetype: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      toim_primary: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      toim_tour_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "tours",
          key: "tour_id",
        },
      },
    },
    {
      sequelize,
      tableName: "tours_images",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "tours_images_pkey",
          unique: true,
          fields: [{ name: "toim_id" }],
        },
      ],
    }
  );
  // table Countries belong to Regions, pastikan relasi fk di set sesuai relasi di table,
  Tours_Images.associate = (models) => {
    Tours_Images.belongsTo(models.Tours, { foreignKey: "toim_tour_id" });
  };

  return Tours_Images;
};
export default tours_images;
