const service = require('@/utils/http');

const api = {
	getSurvey: '/survey/index',
	getCategory: '/article/category/list'
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
	getCategory,
	getCookbook,
	getCookbookDetail
}
