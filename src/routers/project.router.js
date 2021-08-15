const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');

router.get('/', (req, res) => {
    res.json('v1.0.0');
});
router.get('/', projectController.getAllProjects);
router.post('/', projectController.storeProject);

module.exports = router;