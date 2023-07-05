var express = require('express');
var router = express.Router();

const {
  getIndex,
  postIndex,
  putIndex,
  deleteIndex
} = require('./../controllers/index');

/* GET home page. */
router.get('/', getIndex);

/* POST home page. */
router.post('/', postIndex);

/* PUT home page. */
router.put('/', putIndex);

/* DELETE home page. */
router.delete('/', deleteIndex);

module.exports = router;
