/**
 * @desc 基础类，用于执行链式任务
 */
class Base {
	constructor(list, options) {
		this.tasks = list;
		this.options = options || {};
		this.failures = [];
	}
	setup() {
		const task = this.getTask();
		if (task) {
			this.doTask(task)
				.then(() => {
					this.setup();
				}, () => {
					this.failures.push(task);
					this.setup();
				})
		} else {
			// 已执行所有任务
			this.finishAllTasks();
		}
	}
	finishAllTasks () {

	},
	doTask(task) {
		return new Promise((resolve, reject) => {
			resolve();
		});
	}
	getTask() {
		return this.tasks.shift();
	}
}

module.exports = Base;