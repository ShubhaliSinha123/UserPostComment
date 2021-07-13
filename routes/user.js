const router = require('express').Router();

const {
     createUser, updateUser, deleteUser, findAndCountUserPostComment, findAndCountUser
    } = require('../controllers/user');

const {verify} = require('../middleware/verify');


router.post(
    '/create-user',
    createUser
    );

router.use(verify)
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
