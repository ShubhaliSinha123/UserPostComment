const router = require('express').Router();

const {
     createUser, updateUser, deleteUser, findAndCountUserPostComment, findAndCountUser
    } = require('../controllers/user');

const {verify} = require('../middleware/verify');
const { canAccess } = require('../middleware/access');

router.use(verify)
    .post(
    '/create-user',
    canAccess('anyone'),
    createUser
    )
    .post(
        '/update-user',
        canAccess('anyone'),
        updateUser
    )
    .delete(
        '/delete-user',
        canAccess('admin'),
        deleteUser
    )
    .get(
        "/find-and-count-user-post",
        canAccess('admin'),
        findAndCountUserPostComment
    )
    .get(
        '/find-and-count-user',
        canAccess(['admin']),
        findAndCountUser
    );
    
module.exports = router;
