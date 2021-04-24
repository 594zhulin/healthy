const service = require('@/utils/http');

const api = {
	getUser: '/user',
	getCategory: '/category',
	getProduct: '/products',
	getRecommend: '/related',
	getUserInfo: '/pedometer/user_info',
}

const getUser = () => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.getUser
		}).then(result => {
			if (result.status === 200) {
				resolve(result.data)
			} else {
				reject({
					code: result.status,
					text: result.msg
				})
			}
		}, reject)
	})
}

const getCategory = () => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.getCategory
		}).then(result => {
			if (result.status === 200) {
				resolve(result.data)
			} else {
				reject({
					code: result.status,
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
					code: result.status,
					text: result.msg
				})
			}
		}, reject)
	})
}

const getRecommend = data => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.getRecommend,
			data
		}).then(result => {
			if (result.status === 200) {
				resolve({
					list: result.data,
					total: result.total
				})
			} else {
				reject({
					code: result.status,
					text: result.msg
				})
			}
		}, reject)
	})
}

const getUserInfo = () => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getUserInfo
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
	getCategory,
	getProduct,
	getRecommend,
	getUserInfo
}
