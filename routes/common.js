const router = require('express').Router();

const { createPost, 
    createComment,
    deletePost,
    deleteComment,
    findAndCountAllPostComment
} = require('../controllers/common');

const {verify} = require('../middleware/verify');
const { canAccess } = require('../middleware/access');

router.use(verify)
.post(
    '/create-post/:userId',
    canAccess(['developer', 'coder', 'designer', 'hr']),
    createPost
)
.post(
    '/create-comment/:employeeId/:postId',
    canAccess(['admin', 'tester']),
    createComment
) 
.delete(
    '/delete-post/:postId',
    canAccess(['developer', 'coder', 'designer', 'hr']),
    deletePost
)
.delete(
    '/delete-comment/:commentId',
    canAccess(['admin', 'tester']),
    deleteComment
)
.get(
    '/find-and-count-all-post-comment',
    canAccess(['admin']),
    findAndCountAllPostComment
);

module.exports = router;