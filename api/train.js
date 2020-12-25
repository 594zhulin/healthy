const service = require('@/utils/http');

const api = {
	getActivity: '/invite/activity_list',
	getActivityDetail: '/invite/activity_info',
	addActivity: '/invite/create_invite',
	joinActivity: '/invite/join_activity'

}

const getActivity = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getActivity,
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

const getActivityDetail = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getActivityDetail,
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

const addActivity = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.addActivity,
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

const joinActivity = data => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.joinActivity,
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
	getActivity,
	getActivityDetail,
	addActivity,
	joinActivity
}
