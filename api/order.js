const service = require('@/utils/http');

const api = {
	getProduct: '/products',
	addCart: '/cart/add',
	getAddress: '/address/default',
	confirmOrder: '/order/confirm',
}

const getProduct = data => {
	return new Promise((resolve, reject) => {
		service.request({
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
		service.request({
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

const addCart = data => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.addCart,
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

const getAddress = () => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.getAddress,
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


const confirmOrder = data => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.confirmOrder,
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
	getProduct,
	getProductDetail,
	addCart,
	getAddress,
	confirmOrder
}
