const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/api', apiRoutes);

router.use('/', homeRoutes);

router.use('*', (req, res) => {
    res.render('404', {
      loggedIn: req.session.loggedIn
    });
  });

module.exports = router;