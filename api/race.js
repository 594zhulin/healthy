const service = require('@/utils/http');

const api = {
	getActivityBanner: '/contest/get_slide_url',
	getRaceDetail: '/contest/get_detection',
	getRaceGroup: '/contest/get_events_matchings',
	getRaceInfo: '/contest/get_user_events_info',
	submitRaceGroup: '/contest/matching_submit',
	startRace: '/contest/events_state',
	finishRace: '/contest/finish_submit',
	finishResult: '/contest/finish_events'
}

const getActivityBanner = () => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getActivityBanner
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

const getRaceDetail = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getRaceDetail,
			data
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

const getRaceInfo = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getRaceInfo,
			data
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

const getRaceGroup = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getRaceGroup,
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

const submitRaceGroup = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.submitRaceGroup,
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

const startRace = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.startRace,
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

const finishRace = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.finishRace,
			data
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

const finishResult = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.finishResult,
			data
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
	getActivityBanner,
	getRaceDetail,
	getRaceGroup,
	submitRaceGroup,
	getRaceInfo,
	startRace,
	finishRace,
	finishResult
}
