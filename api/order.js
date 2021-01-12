const service = require('@/utils/http');

const api = {
	getProduct: '/products',
	addCart: '/cart/add',
	getAddress: '/address/list',
	confirmOrder: '/order/confirm',
	getOrderPrice: '/order/computed',
	createOrder: '/order/create',
	getOrder: '/order/list',
	payOrder: '/order/pay',
	cancelOrder: '/order/cancel',
	delOrder: '/order/del',
	takeOrder: '/order/take',
	remindOrder: '/order/remind',
	getRefundReason: '/order/refund/reason',
	refundOrder: '/order/refund/verify'
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

const getOrderPrice = (data, key) => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.getOrderPrice + '/' + key,
			data,
			method: 'POST'
		}).then(result => {
			if (result.status === 200) {
				resolve(result.data)
			} else {
				reject({
					text: result.msg,
					code: result.status
				})
			}
		}, reject)
	})
}

const createOrder = (data, key) => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.createOrder + '/' + key,
			data,
			method: 'POST'
		}).then(result => {
			if (result.status === 200) {
				resolve(result.data.result)
			} else {
				reject({
					text: result.msg,
					code: result.status
				})
			}
		}, reject)
	})
}

const getOrder = data => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.getOrder,
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

const getOrderDetail = id => {
	return new Promise((resolve, reject) => {
		service.request({
			url: '/order/detail/' + id
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

const payOrder = data => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.payOrder,
			data,
			method: 'POST'
		}).then(result => {
			if (result.status === 200) {
				resolve(result.data.result)
			} else {
				reject({
					text: result.msg,
					code: result.status
				})
			}
		}, reject)
	})
}

const cancelOrder = data => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.cancelOrder,
			data,
			method: 'POST'
		}).then(result => {
			if (result.status === 200) {
				resolve(result.data)
			} else {
				reject({
					text: result.msg,
					code: result.status
				})
			}
		}, reject)
	})
}

const delOrder = data => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.delOrder,
			data,
			method: 'POST'
		}).then(result => {
			if (result.status === 200) {
				resolve(result.data)
			} else {
				reject({
					text: result.msg,
					code: result.status
				})
			}
		}, reject)
	})
}

const takeOrder = data => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.takeOrder,
			data,
			method: 'POST'
		}).then(result => {
			if (result.status === 200) {
				resolve(result.data)
			} else {
				reject({
					text: result.msg,
					code: result.status
				})
			}
		}, reject)
	})
}

const remindOrder = data => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.remindOrder,
			data,
			method: 'POST'
		}).then(result => {
			if (result.status === 200) {
				resolve(result.data)
			} else {
				reject({
					text: result.msg,
					code: result.status
				})
			}
		}, reject)
	})
}

const payOrderCallback = (id) => {
	return new Promise((resolve, reject) => {
		service.request({
			url: '/order/notify/' + id,
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

const getRefundReason = () => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.getRefundReason
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

const getExpress = (id) => {
	return new Promise((resolve, reject) => {
		service.request({
			url: '/order/express/' + id
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

const refundOrder = data => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.refundOrder,
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
	confirmOrder,
	getOrderPrice,
	createOrder,
	getOrder,
	getOrderDetail,
	payOrder,
	cancelOrder,
	delOrder,
	takeOrder,
	remindOrder,
	payOrderCallback,
	getRefundReason,
	refundOrder,
	getExpress
}
