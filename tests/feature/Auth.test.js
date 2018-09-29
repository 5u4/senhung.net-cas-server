/* Set testing environment */
process.env.NODE_ENV = 'test';

const chai        = require('chai');
const should      = chai.should();
const server      = require('../../main');
const User        = require('../../app/Models/User').UserModel;
const Session     = require('../../app/Models/Session').SessionModel;
const UserService = require('../../app/Http/Services/UserService');
const authConfig  = require('../../configs/auth');

chai.use(require('chai-http'));

const TEST_USERNAME = 'testusername';
const TEST_EMAIL    = 'example@email.com';
const TEST_PASSWORD = 'testpassword';

describe('Auth controller tests', function() {
    this.timeout(5000);

    /* Remove all database records when each test case starts */
    beforeEach(async function() {
        await User.deleteMany({});
        await Session.deleteMany({});
    });

    /**
     * Check email existence
     * 
     * GET /v1/api/auth/email/:email/existence
     */
    describe('Test check email existence api', function() {
        it('should return email is not taken', async function() {
            const res = await chai.request(server)
                .get('/v1/api/auth/email/' + TEST_EMAIL + '/existence');
            
            res.should.have.status(200);
            res.body.should.have.property('isTaken').equal(false);
        });

        it('should return email is taken', async function() {
            await UserService.createUser(TEST_USERNAME, TEST_EMAIL, TEST_PASSWORD);

            const res = await chai.request(server)
                .get('/v1/api/auth/email/' + TEST_EMAIL + '/existence');
            
            res.should.have.status(200);
            res.body.should.have.property('isTaken').equal(true);
        });
    });
    
    /**
     * Check username existence
     * 
     * GET /v1/api/auth/username/:username/existence
     */
    describe('Test check username existence api', function() {
        it('should return username is not taken', async function() {
            const res = await chai.request(server)
                .get('/v1/api/auth/username/' + TEST_USERNAME + '/existence');
            
            res.should.have.status(200);
            res.body.should.have.property('isTaken').equal(false);
        });

        it('should return username is taken', async function() {
            await UserService.createUser(TEST_USERNAME, TEST_EMAIL, TEST_PASSWORD);

            const res = await chai.request(server)
                .get('/v1/api/auth/username/' + TEST_USERNAME + '/existence');
            
            res.should.have.status(200);
            res.body.should.have.property('isTaken').equal(true);
        });
    });

    /**
     * Register an user
     * The actual email sending is not tested
     * 
     * POST /v1/api/auth/register
     */
    describe('Test registering an user', function() {
        it('should register an user', async function() {
            const res = await chai.request(server)
                .post('/v1/api/auth/register')
                .send({
                    username: TEST_USERNAME,
                    email: TEST_EMAIL,
                    password: TEST_PASSWORD,
                });
            
            const user = await User.findOne({
                username: TEST_USERNAME,
                email: TEST_EMAIL,
            });

            should.exist(user);
            res.should.have.status(201);
            res.body.should.have.property('user');
            res.body.user.should.have.property('id').equal(user._id.toString());
            res.body.user.should.have.property('username').equal(user.username);
            res.body.user.should.have.property('email').equal(user.email);
        });
    });

    /**
     * Send verification email to user
     * The actual email sending is not tested
     * 
     * POST /v1/api/auth/verify/email/link
     */
    describe('Test send verify email link', function() {
        it('should send a verification email', async function() {
            await UserService.createUser(TEST_USERNAME, TEST_EMAIL, TEST_PASSWORD);

            const res = await chai.request(server)
                .post('/v1/api/auth/verify/email/link')
                .send({
                    email: TEST_EMAIL,
                    username: TEST_USERNAME,
                });
            
            res.should.have.status(200);
        });
    });

    /**
     * Verify an user's email
     * The actual email sending is not tested
     * 
     * GET /v1/api/auth/verify/email?userId=:userId&verificationCode=:verificationCode
     */
    describe('Test verify email', function() {
        it('should activate an user', async function() {
            let user = await UserService.createUser(TEST_USERNAME, TEST_EMAIL, TEST_PASSWORD);

            const res = await chai.request(server)
                .get('/v1/api/auth/verify/email')
                .query({
                    userId: user._id.toString(),
                    verificationCode: user.emailVerificationCode,
                });

            res.should.have.status(200);
            res.should.have.cookie(authConfig.cookieKey);

            user = await User.findById(user._id);

            should.equal(user.isEmailVerified, true);
        });
    });

    /**
     * Login an user
     * 
     * POST /v1/api/auth/login
     */
    describe('Test user login', function() {
        it('should login an user', async function() {
            const user = await UserService.createUser(TEST_USERNAME, TEST_EMAIL, TEST_PASSWORD);

            user.isEmailVerified = true;

            await user.save();

            const res = await chai.request(server)
                .post('/v1/api/auth/login')
                .send({
                    username: TEST_USERNAME,
                    email: TEST_EMAIL,
                    password: TEST_PASSWORD,
                });

            res.should.have.status(200);
            res.body.should.have.property('user');
            res.body.user.should.have.property('id').equal(user._id.toString());
            res.body.user.should.have.property('username').equal(TEST_USERNAME);
            res.body.user.should.have.property('email').equal(TEST_EMAIL);
        });

        it('should refuse user login since email is not verified', async function() {
            await UserService.createUser(TEST_USERNAME, TEST_EMAIL, TEST_PASSWORD);

            const res = await chai.request(server)
                .post('/v1/api/auth/login')
                .send({
                    username: TEST_USERNAME,
                    email: TEST_EMAIL,
                    password: TEST_PASSWORD,
                });

            res.should.have.status(403);
            res.body.should.have.property('message');
        });
    });

    /**
     * Get an user info
     * 
     * GET /v1/api/auth/users
     */
    describe('Test get user', function() {
        it('should get an user info', async function() {
            const user = await UserService.createUser(TEST_USERNAME, TEST_EMAIL, TEST_PASSWORD);

            user.isEmailVerified = true;

            await user.save();

            const login = await chai.request(server)
                .post('/v1/api/auth/login')
                .send({
                    username: TEST_USERNAME,
                    email: TEST_EMAIL,
                    password: TEST_PASSWORD,
                });
            
            let token = login.header['set-cookie'][0];

            token = token.substring(
                token.indexOf('=') + 1,
                token.lastIndexOf(';')
            )

            const res = await chai.request(server)
                .get('/v1/api/auth/users')
                .set({
                    'x-access-token': token,
                });
            
            res.should.have.status(200);
            res.body.should.have.property('user');
            res.body.user.should.have.property('id').equal(user._id.toString());
            res.body.user.should.have.property('username').equal(TEST_USERNAME);
            res.body.user.should.have.property('email').equal(TEST_EMAIL);
        });
    });

    /* Disconnect server and database */
    after(async function() {
        await User.deleteMany({});
        await Session.deleteMany({});
        server.close();
        require('mongoose').connection.close();
    });
});
