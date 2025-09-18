const express = require('express');
const router = express.Router();
const leaveCtrl = require('../controllers/leaveController');
const auth = require('../middleware/auth');

router.get('/', auth, leaveCtrl.getAllLeaves);          // Admin gets all leaves
router.patch('/:id', auth, leaveCtrl.updateStatus);     // Admin approves/rejects

module.exports = router;
