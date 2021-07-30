const projectService = require('../services/project.service');
const { httpExceptionHandler } = require('../exceptions/handler');

/**
 *
 * Get JSON array of existing projects.
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.getAllProjects = async (req, res) => {
    return res.json(await projectService.getAllProjects());
};

/**
 *
 * Store and retrieve new project in JSON.
 *
 * @param req
 * @param res
 * @returns {Promise<Document<*, *, *>>}
 */
module.exports.storeProject = async (req, res) => {
    try {
        const { name, description, priority } = req.body;

        const newProject = await projectService.storeNewProject({
            name,
            description,
            priority,
        });

        return res.status(201).json(newProject);
    } catch (err) {
        httpExceptionHandler(err, req, res)
    }
};