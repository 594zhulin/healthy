const service = require('@/utils/http');

const api = {
	getProduct: '/products',
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

const getProductDetail = (id, data) => {
	return new Promise((resolve, reject) => {
		service.http({
			url: '/product/detail/' + id,
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
	getProduct,
	getProductDetail
}
