const service = require('@/utils/http');

const api = {
	getHistory: '/log/measure_calbe_list',
}

const getHistory = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getHistory,
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
	getHistory
}
