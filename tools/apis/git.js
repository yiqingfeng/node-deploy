/**
 * @desc 项目文件下载
 */
// require('shelljs/global');

const { exec } = require('./shell');

exports.clone = (gitPath, outputPath) => {
	return exec(`git clone ${gitPath} ${outputPath}`)
};

exports.pull = (projectPath) => {
	const cmds = [
		`cd ${projectPath}`,
		'git remote update -p',
		'git pull --progress --no-rebase -v origin',
		'git rev-parse --abbrev-ref HEAD | git pull origin'
	];
	return exec(cmds.join(' && '))
};