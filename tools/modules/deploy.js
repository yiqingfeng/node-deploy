/**
 * @desc 多项目部署
 */
const Base = require('./base');
const {
	clone,
} = require('../apis/git');


class Deploy extends Base {
	constructor(list, options) {
		super(list, options);
	}
	doTask(task) {
		const {
			path,
		} = task;
		return pull(path);
	}
}

module.exports = Deploy;