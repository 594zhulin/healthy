const service = require('@/utils/http');

const api = {
	getUser: '/user',
	getAddress: '/address/list',
	editAddress: '/address/edit',
	delAddress: '/address/del',
	setDefaultAddress: '/address/default/set',
	getStep: '/integral/list'

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
					text: result.msg
				})
			}
		}, reject)
	})
}

const getAddress = data => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.getAddress,
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

const getAddressDetail = id => {
	return new Promise((resolve, reject) => {
		service.request({
			url: '/address/detail/' + id,
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

const editAddress = data => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.editAddress,
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

const delAddress = data => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.delAddress,
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

const setDefaultAddress = data => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.setDefaultAddress,
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

const getStep = data => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.getStep,
			data,
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
	getUser,
	getAddress,
	getAddressDetail,
	editAddress,
	delAddress,
	setDefaultAddress,
	getStep
}
