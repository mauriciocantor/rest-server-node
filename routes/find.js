const { Router } = require('express');
const {find} = require("../controllers/find");

const router = Router();

router.get("/:collection/", find);


module.exports = router;