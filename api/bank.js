const service = require('@/utils/http');

const api = {
	register: '/login/getOpenid',
	login: '/wechat/mp_auth',
	getUser: '/pedometer/user_info',
	getStep: '/wechat/wxDecode',
	getFire: '/pedometer/flame_list',
	getRanking: '/pedometer/integral_ranking',
	getLastTime: '/pedometer/integral_list',
	cacheStep: '/pedometer/cache_step_num',
	setStep: '/pedometer/deposit_step_num'
}

const register = data => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.register,
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

const login = data => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.login,
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

const getUser = () => {
	return new Promise((resolve, reject) => {
		service.http_({
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

const getFire = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getFire,
			data
		}).then(result => {
			if (result.status === 200) {
				resolve({
					list: result.data,
					total: result.total || 0
				})
			} else {
				reject({
					text: result.msg
				})
			}
		}, reject)
	})
}

const getRanking = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getRanking,
			data
		}).then(result => {
			if (result.status === 200) {
				resolve({
					data: result.data,
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

const getLastTime = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getLastTime,
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

const cacheStep = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.cacheStep,
			data
		}).then(result => {
			if (result.status === 200) {
				resolve(result.data)
			} else {
				reject({
					text: result.message
				})
			}
		}, reject)
	})
}

const setStep = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.setStep,
			data
		}).then(result => {
			if (result.status === 200) {
				resolve(result.data)
			} else {
				reject({
					text: result.message
				})
			}
		}, reject)
	})
}


module.exports = {
	register,
	login,
	getUser,
	getStep,
	getFire,
	getRanking,
	getLastTime,
	cacheStep,
	setStep
}
