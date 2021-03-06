module.exports = function(sequelize, DataTypes){
	var User = sequelize.define("User", {
		username: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                message: 'Username must be unique.',
                fields: [sequelize.fn('lower', sequelize.col('username'))]
            }
        },
		password: DataTypes.STRING
	},
	{
		classMethods: {
			associate: function(models){
				User.hasMany(models.Post,{
					onDelete: "cascade"
				});
			}
		}
	});
	return User;
}