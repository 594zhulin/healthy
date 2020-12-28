const service = require('@/utils/http');

const api = {
	getActivity: '/invite/activity_list',
	getActivityDetail: '/invite/activity_info',
	addActivity: '/invite/create_invite',
	joinActivity: '/invite/join_activity',
	getTrainList: '/motion/drill_list',
	getTrainDetail: '/motion/info',
	clocked: '/motion/immediately',
	getTrainData: '/motion/drill_plan_stat',
	getTrainPlanList: '/motion/drill_plan_list'
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
					text: result.message
				})
			}
		}, reject)
	})
}

const getTrainList = data => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.getTrainList,
			data
		}).then(result => {
			if (result.status === 200) {
				resolve({
					list: result.data,
					total: result.total
				})
			} else {
				reject({
					text: result.message
				})
			}
		}, reject)
	})
}

const getTrainDetail = data => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.getTrainDetail,
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

const clocked = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.clocked,
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

const getTrainData = () => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getTrainData
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

const getTrainPlanList = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getTrainPlanList,
			data
		}).then(result => {
			if (result.status === 200) {
				resolve({
					list: result.data,
					total: result.total
				})
			} else {
				reject({
					text: result.message
				})
			}
		}, reject)
	})
}

module.exports = {
	getActivity,
	getActivityDetail,
	addActivity,
	joinActivity,
	getTrainList,
	getTrainDetail,
	clocked,
	getTrainData,
	getTrainPlanList
}
