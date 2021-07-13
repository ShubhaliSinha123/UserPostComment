const router = require('express').Router();

const {
     createUser, updateUser, deleteUser, findAndCountUserPostComment, findAndCountUser
    } = require('../controllers/user');

router.post(
    '/create-user',
    createUser
    )
    .post(
        '/update-user/:id',
        updateUser
    )
    .delete(
        '/delete-user/:id',
        deleteUser
    )
    .get(
        "/find-and-count-user-post/:userId",
        findAndCountUserPostComment
    )
    .get(
        '/find-and-count-user',
        findAndCountUser
    );
    
module.exports = router;
