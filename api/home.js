const service = require('@/utils/http');

const api = {
	getScore: '/index/index',
	getStep: '/user/getWxInfo',
	getProduct: '/related'
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
	getScore,
	getStep,
	getProduct
}
