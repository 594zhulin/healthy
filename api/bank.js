const service = require('@/utils/http');

const api = {
	getUser: '/pedometer/user_info',
	getStep: '/wechat/wxDecode',
	getFire: '/pedometer/flame_list'
}

const getUser = () => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getUser
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

const getFire = data => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.getFire,
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

module.exports = {
	getUser,
	getStep,
	getFire
}
