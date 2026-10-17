import {DataTypes} from 'sequelize';
import sequelize from "../clients/db.sequelize.js";

const Posts = sequelize.define("posts", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
    }
},{
    timestamps: true
});

export default Posts