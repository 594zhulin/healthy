const service = require('@/utils/http');

const api = {
	getBanner: '/contest/get_slide_url',
	login: '/login/getOpenid',
	loginAuth: '/login/access',
	setUserInfo: '/operate/user_perfect',
	getLoginInfo: '/user/perfect',
	getPhone: '/wx/wxDecode',
	start: '/Operate/device_open',
	getFaultList: '/index/fault_cause',
	repair: '/Operate/fault_cause'
}

const getBanner = data => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.getBanner,
			data
		}).then(result => {
			if (result.code === 0) {
				resolve(result.data)
			} else {
				reject({
					text: result.message
				})
			}
		}, reject)
	})
}

const login = data => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.login,
			data
		}).then(result => {
			if (result.state === 1) {
				resolve(result.data)
			} else {
				reject({
					text: result.msg
				})
			}
		}, reject)
	})
}

const loginAuth = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.loginAuth,
			data
		}).then(result => {
			if (result.state === 1) {
				resolve(result.data)
			} else {
				reject({
					text: result.msg
				})
			}
		}, reject)
	})
}

const setUserInfo = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.setUserInfo,
			data
		}).then(result => {
			if (result.state === 1) {
				resolve(result.data)
			} else {
				reject({
					text: result.msg
				})
			}
		}, reject)
	})
}

const getLoginInfo = () => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getLoginInfo
		}).then(result => {
			if (result.state === 1) {
				resolve(result.data)
			} else {
				reject({
					text: result.msg
				})
			}
		}, reject)
	})
}

const getPhone = data => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.getPhone,
			data
		}).then(result => {
			if (result.state === 1) {
				resolve(result.data)
			} else {
				reject({
					text: result.msg
				})
			}
		}, reject)
	})
}

const start = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.start,
			data
		}).then(result => {
			if (result.state === 1) {
				resolve(result.data)
			} else {
				reject({
					text: result.msg
				})
			}
		}, reject)
	})
}

const getFaultList = () => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.getFaultList
		}).then(result => {
			if (result.state === 1) {
				resolve(result.data)
			} else {
				reject({
					text: result.msg
				})
			}
		}, reject)
	})
}

const repair = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.repair,
			data
		}).then(result => {
			if (result.state === 1) {
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
	getBanner,
	login,
	loginAuth,
	setUserInfo,
	getLoginInfo,
	getPhone,
	start,
	getFaultList,
	repair
}
