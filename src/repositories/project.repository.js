const Project = require('../models/Project');

/**
 * Get all Project documents.
 *
 * @returns {Promise<Query<Array<EnforceDocument<unknown, {}>>, Document<Project>, {}, unknown>>}
 */
module.exports.getAll = async () => {
    return Project.find();
};
