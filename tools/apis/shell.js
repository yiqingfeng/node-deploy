/**
 * @description 支持 shell 相关指令
 */
const { exec } = require('child_process');
// https://github.com/pkrumins/node-tree-kill
const kill = require('../../libs/tree-kill');

/**
 * 获取输出信息
 */
function getStr (out, encoding) {
	if (out instanceof Buffer) {
		return out.toSting(encoding || 'utf8');
	}
	return out;
}

/**
 * 获取当前时间
 */
function getNowInfo () {
	const now = new Date();
	const autoCompleteZero = num => {
		let flag = '';
		if (num < 10) {
			flag = '0';
		}
		return flag + num;
	};
	return {
		timestamp: now.getTime(),
		timeStr: `${autoCompleteZero(now.getHours())}:${autoCompleteZero(now.getMinutes())}:${autoCompleteZero(now.getSeconds())}`,
	};
}

/**
 * 时间对比（默认 ts1 大于 ts2）
 */
function compTime (ts1, ts2) {
	const distance = ts1 - ts2;
	const ONE_MS = 1000;
	const ONE_S = 1000000;
	if (distance < ONE_MS) {
		return `${distance} μs`;
	}
	if (distance < ONE_S) {
		return `${(distance / ONE_MS).toFixed(2)} ms`;
	}
	return `${(distance / ONE_S).toFixed(2)} s`;
}

exports.exec = (command, { isNeedTimer, delayTime } = {}) => {
	return new Promise((resolve, reject) => {
		const startTime = getNowInfo();
		console.log('> [\x1b[36m%s\x1b[0m] Starting \'\x1b[32m%s\x1b[0m\'...', startTime.timeStr, command);

		const end = error => {
			const endTime = getNowInfo();
			console.log('> [\x1b[36m%s\x1b[0m] Finished \'\x1b[32m%s\x1b[0m\' after \x1b[35m%s\x1b[0m',
				endTime.timeStr, command, compTime(endTime.timestamp, startTime.timestamp));
			if (error) {
				reject(error);
				return;
			}
			resolve();
		}
        const child = exec(command, (error, stdout, stderr) => {
        	if (error) {
        		console.log('\x1b[31m%s\x1b[0m ', error);
            	end(error);
            	return;
        	}
        	stdout && console.log(`> ${getStr(stdout)}`);
        	stderr && console.log('> %s', getStr(stderr));
        	end();
        });

        // child.stdout.on('data', data => {
        //     console.log(`> ${data}`);
        // });
        // child.stderr.on('data', data => {
        //     console.log('\x1b[31m%s\x1b[0m ', data);
        //     reject(data);
        // });
        // child.on('exit', (code, signal) => {
        //     console.log(`\x1b[36m[exit]:\x1b[0m child process ${code} ${signal}`);
        //     resolve();
        // });

        if (isNeedTimer) {
        	setTimeout(() => {
	        	console.log('\x1b[33m[end]\x1b[0m: ', `时间到结束子任务${command}`);
	            // child.kill(child.pid); // 子进程无限循环时，无法杀死
	            kill(child.pid);
	        }, delayTime || 120000);
        }
    });
}