const service = require('@/utils/http');

const api = {
	getSurvey: '/survey/index',
	submitSurvey: '/survey/submit',
	getSurveyResult: '/survey/return_report',
	getCategory: '/article/category/list'
}

const getSurvey = data => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.getSurvey,
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

const submitSurvey = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.submitSurvey,
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

const getSurveyResult = () => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getSurveyResult,
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
		service.request({
			url: api.getCategory,
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

const getCookbook = id => {
	return new Promise((resolve, reject) => {
		service.request({
			url: '/article/list/' + id,
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

const getCookbookDetail = id => {
	return new Promise((resolve, reject) => {
		service.request({
			url: '/article/details/' + id,
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
	getSurvey,
	submitSurvey,
	getSurveyResult,
	getCategory,
	getCookbook,
	getCookbookDetail
}
