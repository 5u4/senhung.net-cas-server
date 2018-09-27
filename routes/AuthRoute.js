const router         = require('express').Router();
const AuthController = require('../app/Http/Controllers/AuthController');

const {
    checkEmailExistenceValidator,
    checkUsernameExistenceValidator,
    registerValidator,
    loginValidator,
    getUserValidator,
} = require('../app/Validators/AuthValidator');

router.get('/email/:email/existence', checkEmailExistenceValidator, AuthController.checkEmailExistence);
router.get('/username/:username/existence', checkUsernameExistenceValidator, AuthController.checkUsernameExistence);
router.post('/register', registerValidator, AuthController.register);
router.post('/login', loginValidator, AuthController.login);
router.get('/users', getUserValidator, AuthController.getUser);

module.exports = router;
