const express = require('express');

const router = express.Router();

router.use('/health', require('./health'));
router.use('/upload', require('./upload'));
router.use('/fasta', require('./fasta'));
router.use('/entropy', require('./entropy'));

module.exports = router;
