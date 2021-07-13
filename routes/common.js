const router = require('express').Router();

const { createPost, 
    createComment,
    deletePost,
    deleteComment,
    findAndCountAllPostComment
} = require('../controllers/common');

router.post(
    '/create-post/:userId',
    createPost
)
.post(
    '/create-comment/:employeeId/:postId',
    createComment
) 
.delete(
    '/delete-post/:postId',
    deletePost
)
.delete(
    '/delete-comment/:commentId',
    deleteComment
)
.get(
    '/find-and-count-all-post-comment',
    findAndCountAllPostComment
);

module.exports = router;