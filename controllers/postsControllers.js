import Posts from '../models/Posts.js';
import router from "../routes/index.js";

const postsController = {

    async createPosts(req, res, next) {
        try {
            const { title, content } = req.body;

            if(!title || !content) {
                return res.status(400).send({
                    error: 'Add title and content',
                })
            }

            const posts = await Posts.create({
                title,
                content,
            });

            return res.status(200).send(posts);
        }catch (error) {
            res.status(500).send({
                error: error,
            });
        }
    },

    async getPosts(req, res, next) {
        try {
            const allPosts = await Posts.findAll({
                attributes: ['id', 'title', 'content', 'createdAt', 'updatedAt'],
                order: [['createdAt', 'DESC']]
            });

            return res.json({
                posts: allPosts,
                message: 'All posts get successfully'
            })
        }catch (error) {
            res.status(500).send({
                error: error,
            })
        }
    },

    async getPostById(req, res, next) {
        try {
            const { id } = req.params;

            const posts = await Posts.findByPk(id, {
                attributes: ['id', 'title', 'content', 'createdAt', 'updatedAt'],
            });

            if (!posts) {
                return res.status(404).json({
                    message: 'Posts not found',
                });
            }

            return res.json({
                posts: posts,
                message: 'get posts by ID are successfully'
            })
        }catch (error) {
            res.status(500).send({
                error: error,
            })
        }
    },

    async updatePosts (req, res, next) {
        try {
            const { id } = req.params;

            const { title, content } = req.body;

            const post = await Posts.findByPk(id);

            if (!post) {
                return res.status(404).json({
                    message: 'Posts not found',
                });
            }

            await post.update({
                title: title || post.title,
                content: content || post.content,
            });

            return res.json({
                posts: post,
                message: 'Update posts successfully'
            })
        }catch (error) {
            res.status(500).send({
                error: error,
            })
        }
    },

    async removiePosts (req, res, next) {
        try {
            const { id } = req.params;


            const post = await Posts.findByPk(id);

            if (!post) {
                return res.status(404).json({
                    message: 'Posts not found',
                });
            }

            await post.destroy();

            return res.json({
                message: 'Delete posts successfully'
            })
        }catch (error) {
            res.status(500).send({
                error: error,
            })
        }
    },

}

export default postsController;