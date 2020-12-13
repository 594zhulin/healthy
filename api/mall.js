const service = require('@/utils/http');

const api = {
	getUser: '/user',
	getCategory: '/category',
	getProduct: '/products',
	getRecommend: '/related'
}

const getUser = () => {
	return new Promise((resolve, reject) => {
		service.http({
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

const getCategory = () => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.getCategory
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

const getProduct = data => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.getProduct,
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

const getRecommend = data => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.getRecommend,
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
	getCategory,
	getProduct,
	getRecommend
}
