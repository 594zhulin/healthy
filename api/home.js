const service = require('@/utils/http');

const api = {
	getScore: '/index/index',
	getStep: '/user/getWxInfo',
	getProductList: '/index/msgSecCheck'
}

const getScore = data => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.getScore,
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

const getProductList = data => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.getProductList,
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

module.exports = {
	getScore,
	getStep,
	getProductList
}
