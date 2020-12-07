const service = require('@/utils/http');

const api = {
	getBanner: '/index/get_banner',
}

const getBanner = () => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.getBanner
		}).then(result => {
			if (result.code === 0) {
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
	getBanner
}
