const db = require('../models');
const Post = db.post;
const User = db.user;
const Employee = db.employee;
const Comment = db.comment;

exports.createPost = async(req, res, next) => {
    try {
        const { title, description} = req.body;

       const post =  await Post.create({
            userId: req.params.userId,
            title,
            description
        });

        const user = await User.findOne({ where: {id: post.userId}});

        return res.status(201).send({message: `Post created successfully by:${user.name}`});

    } catch (error) {
        next(error);
    }
};


exports.createComment = async(req, res, next) => {
    try {
        const { employeeId, postId} = req.params;

        const post = await Post.findOne({where: { id: postId}});

        if(!post) {
            return res.status(401).send({message: "Post not found"});
        }

        const comment = await Comment.create({
            employeeId,
            postId,
            comment: req.body.comment
        });

        const employee = await Employee.findOne({ where: {id: employeeId}});
        const user = await User.findOne({where: {id: employee.userId}});

        return res.status(201).send({message: `Comment done successfully by -${user.name} on post = ${post.title}.`});

    } catch (error) {
        next(error);
    }
};

exports.deletePost = async(req, res, next) => {
    try {
        const id = req.params.postId;

        const post = await Post.findOne({ where: {id}});

        if(!post) {
            return res.status(401).send({message: "Post doesn't exist!"});
        }

        await post.destroy();

        return res.status(200).send({message: "Post deleted successfully...."});
    } catch (error) {
        next(error);
    }
};

exports.deleteComment = async(req, res, next) => {
    try{
        const id = req.params.commentId;

        const comment = await Comment.findOne({where: {id}});

        if(!comment) {
            return res.status(401).send({message: "No comments on this post1"});
        }

        await comment.destroy();

        return res.status(200).send({message: "Comment deleted successfully..."});
    }
    catch(err) {
        next(err);
    }
}

exports.findAndCountAllPostComment = async(req, res, next) => {
    try {
        const { offset, limit } = req.query;

        const query = {
            attributes: ["id", "title", "description"],
            include: [
                {
                    model: Comment,
                    attributes: ["id","comment"],
                    include: [
                        {
                            model: Employee,
                            attributes: ["id", "post"]
                        }
                    ]
                }
            ],
            limit,
            offset
        }

        const data = await Post.findAndCountAll(query);
        
        return res.status(201).send(data);
    } catch (error) {
        next(error);
    }
};

