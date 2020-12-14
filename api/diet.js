const service = require('@/utils/http');

const api = {
	getSurvey: '/survey/index',
}

const getSurvey = () => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.getSurvey,
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
	getSurvey
}
