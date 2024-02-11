const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

router.all('*', (req, res) => {
    res.render('404');
  });

module.exports = router;