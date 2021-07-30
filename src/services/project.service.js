const Project = require('../models/Project');
const projectRepository = require('../repositories/project.repository');

/**
 * Return list of all projects.
 *
 * @returns {Promise<Query<Array<EnforceDocument<unknown, {}>>, Document<any, any, unknown>, {}, unknown>>}
 */
module.exports.getAllProjects = async () => {
    return projectRepository.getAll();
}

/**
 * Create new Project document.
 *
 * @param data
 * @returns {Promise<Document<any, any, unknown>>}
 */
module.exports.storeNewProject = async (data) => {
    const project = new Project(data);

    await project.validate();

    return await project.save();
}