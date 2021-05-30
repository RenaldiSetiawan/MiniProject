const tours_comments = (sequelize, DataTypes) => {
  const Tours_Comments = sequelize.define(
    "tours_comments",
    {
      toco_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      toco_comments: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      toco_created_on: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      toco_rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      toco_tour_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "tours",
          key: "tour_id",
        },
      },
      toco_user_id: {
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
      tableName: "tours_comments",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "tours_comments_pkey",
          unique: true,
          fields: [{ name: "toco_id" }],
        },
      ],
    }
  );

  Tours_Comments.associate = (models) => {
    Tours_Comments.belongsTo(models.Users, { foreignKey: "toco_user_id" });

    Tours_Comments.belongsTo(models.Tours, { foreignKey: "toco_tour_id" });
  };
  return Tours_Comments;
};
export default tours_comments;
