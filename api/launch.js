const service = require('@/utils/http');

const api = {
	login: '/wechat/mp_auth',
	getBanner: '/index/get_banner',
}

const login = data => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.login,
			data,
			method: 'POST'
		}).then(result => {
			if (result.status === 200) {
				resolve(result.data)
			} else {
				reject({
					text: result.msg
				})
			}
		}, reject)
	})
}

const getBanner = () => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.getBanner
		}).then(result => {
			if (result.code === 0) {
				resolve(result.data)
			} else {
				reject({
					text: result.msg
				})
			}
		}, reject)
	})
}

module.exports = {
	login,
	getBanner
}
