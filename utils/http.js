//域名前缀
// const baseUrl = 'https://shops.yulongtianzi.com/api';
// const prefixUrl = 'https://swoole.yulongtianzi.com/api'
const baseUrl = 'https://shop.yulongtianzi.com/api';
const prefixUrl = 'https://stamina.yulongtianzi.com/api'
//请求队列参数
const list = {
	count: 0, //正在进行的请求数量
	wait: [], //待请求数据队列
	cur: [], //当前请求进行中队列
}

//请求队列 限制同时请求的数量
const request = (options) => {
	options.complete = () => {
		list.count--;
		list.cur.splice(0, 1)
		if (list.wait.length && list.count < 10) {
			list.count--;
			uni.request(list.wait.splice(0, 1)[0]);
		}
	}
	let _flag = false;
	for (let i in list.cur) {
		if (JSON.stringify(options) == list.cur[i]) {
			_flag = true;
		}
	}

	if (_flag) {
		console.warn('http重复请求，已忽略', options.url);
	} else {
		list.cur.push(JSON.stringify(options))
		if (list.count < 10) {
			list.count++;
			uni.request(options);
		} else {
			list.wait.push(options)
		}
	}
}
const service = {
	request: (options) => {
		return new Promise((resolve, reject) => {
			options.success = res => {
				if (res.statusCode == 200) {
					uni.getSetting({
						success(result) {
							if (!result.authSetting['scope.userInfo']) {
								uni.setStorageSync('isLogin', false)
							} else {
								if (res.data.status == 410000) {
									uni.setStorageSync('isExpire', true)
								} else {
									uni.setStorageSync('isExpire', false)
									resolve(res.data)
								}
							}
						}
					})

				} else {
					reject({
						url: options.url,
						err: res,
						text: '网络环境差，请稍后重试'
					});
				}
			};
			const token = uni.getStorageSync('token');
			options.method = options.method || 'GET';
			options.url = baseUrl +
				options.url;
			if (token) {
				options.header = {
					'Authori-zation': 'Bearer ' + token
				};
			}
			options.fail = (err) => {
				reject({
					url: options.url,
					err: err,
					text: '网络环境差，请稍后重试'
				});
			};
			request(options);
		})
	},
	http: (options) => {
		return new Promise((resolve, reject) => {
			options.success = res => {
				if (res.statusCode == 200) {
					resolve(res.data)
				} else {
					reject({
						url: options.url,
						err: res,
						text: '网络环境差，请稍后重试'
					});
				}
			};
			options.method = 'POST';
			options.url = prefixUrl + options.url;
			options.fail = (err) => {
				reject({
					url: options.url,
					err: err,
					text: '网络环境差，请稍后重试'
				});
			};
			request(options);
		})
	},
	http_: (options) => {
		return new Promise((resolve, reject) => {
			const user_id = uni.getStorageSync('user_id');
			options.data = {
				user_id,
				...options.data
			};
			service.http(options).then((result) => {
				resolve(result)
			}, reject);
		})
	}
}

module.exports = service;
