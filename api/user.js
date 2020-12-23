const service = require('@/utils/http');

const api = {
	getUser: '/user',
	getScore: '/index/index',
	getStep: '/wechat/wxDecode',
}

const getUser = data => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.getUser,
			data
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

const getStep = data => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.getStep,
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

module.exports = {
	getUser,
	getScore,
	getStep
}
