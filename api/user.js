const service = require('@/utils/http');

const api = {
	getUser: '/user',
	getScore: '/index/index',
	getStep: '/wechat/wxDecode',
	getRisk: '/risk/get_risk_info',
	getScoreList: '/log/measure_calbe_list',
	getAddress: '/address/list',
}

const getUser = data => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.getUser,
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

const getScore = () => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getScore
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

const getScoreList = () => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getScoreList
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

const getRisk = () => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getRisk
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

module.exports = {
	getUser,
	getScore,
	getScoreList,
	getStep,
	getRisk,
	getAddress
}
