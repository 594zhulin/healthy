const service = require('@/utils/http');

const api = {
	getDevice: '/ad/device_list'
}

const getDevice = data => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.getDevice,
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
	getDevice
}
