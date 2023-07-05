var express = require('express');
var router = express.Router();

const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers
} = require('./../controllers/user');

/* GET test listing. */
router.get('/', getUsers);

router.post('/', postUsers);

router.put('/:id', putUsers);

router.delete('/', deleteUsers);

module.exports = router;
