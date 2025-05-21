const router = require("express").Router();
const {
    userLogin,
    userRegister,
    getUsers,
    getUserByEmail,
    updateUser
} = require("./loginController")
const { checktoken } = require("../auth/tokenValidation");

router.post("/login", userLogin); //API For Login no need to authenticate
router.post("/register", userRegister); // API For register no need to authenticate
router.get("/getUser", checktoken, getUsers); // API For get all users data (testing api) need to authenticate
router.post("/getUserByEmail", checktoken, getUserByEmail); // API For get user data by user email (testing api) need to authenticate
router.get("/auth", checktoken, (req, res) => { // API For authenticate
    const { _id, firstname, lastname, email, password } = req.user
    return res.json({
        success: 1,
        user: {
            id: _id,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        }
    })
})
router.patch("/update/:id", checktoken, updateUser); // API For update user data need to authenticate

module.exports = router;