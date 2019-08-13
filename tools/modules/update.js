/**
 * @description 更新指定项目，将其强制切换到master，并进行更新
 */
const Base = require('./base');
const {
	pull,
} = require('../apis/git');


class Update extends Base {
	constructor(list, options) {
		super(list, options);
	}
	doTask(task) {
		const {
			gitPath,
			path,
		} = task;
		return clone(gitPath, path);
	}
}

module.exports = Update;