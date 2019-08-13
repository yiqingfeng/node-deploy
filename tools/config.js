/**
 * @description 读取相关配置
 */
const configInfo = require('../module.json') || [];

exports.getModules = () => {
	const modules = [];
	configInfo.forEach(item => {
		item.modules.forEach(name => {
			modules.push({
				name,
				path: `${item.path}/${name}`,
				gitPath: `${item.gitPath}${name}`,
			});
		});
	});
	return modules;
};