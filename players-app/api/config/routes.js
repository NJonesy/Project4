var express  = require('express');
var router   = express.Router();
var passport = require("passport");

var playersController = require('../controllers/playersController');
var gamesController = require('../controllers/gamesController');
var authenticationsController = require('../controllers/authenticationsController');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/players')
  .get(playersController.playersIndex);

router.route('/players/:id')
  .get(playersController.playersShow)
  .put(playersController.playersUpdate)
  .delete(playersController.playersDelete);

router.route('/games')
  .get(gamesController.gamesIndex)
  .post(gamesController.gamesCreate);
  

router.route('/games/:id')
  .get(gamesController.gamesShow)
  .put(gamesController.gamesUpdate)
  .delete(gamesController.gamesDelete);

module.exports = router