import posts from '../models/posts.js';
import users from '../models/users.js';

// users --> posts
users.hasMany(posts,{
    foreignKey: 'userId',
});
posts.belongsTo(users,{
    foreignKey: 'userId',
});


