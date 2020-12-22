const service = require('@/utils/http');

const api = {
	getStep: '/pedometer/user_info',
	getListData: '/wechat/wxDecode',
	getFire: '/pedometer/flame_list'
}

const getStep = () => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getStep
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

const getListData = data => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.getListData,
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
	getStep,
	getListData,
	getFire
}
