const service = require('@/utils/http');

const api = {
	login: '/wechat/mp_auth',
	getScore: '/index/index',
	getStep: '/user/getWxInfo',
	getProduct: '/related'
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

const getScore = () => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getScore
		}).then(result => {
			if (result.state === 1) {
				resolve(result.data)
			} else {
				reject({
					text: result.msg
				})
			}
		}, reject)
	})
}

const getStep = data => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.getStep,
			data
		}).then(result => {
			if (result.state === 1) {
				resolve(result.data)
			} else {
				reject({
					text: result.msg
				})
			}
		}, reject)
	})
}

const getProduct = data => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.getProduct,
			data
		}).then(result => {
			if (result.status === 200) {
				resolve({
					list: result.data,
					total: result.total
				})
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
	getScore,
	getStep,
	getProduct
}
