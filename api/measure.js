const service = require('@/utils/http');

const api = {
	getData: '/index/index',
	getHistory: '/log/measure_calbe_list',
	getUser: '/user',
	getCommunityId: '/user/lately_employ',
	getCommunityDetail: '/plot/plot_details',
	getCommunityRankList: '/plot/rank_list',
	getCommunityMineRank: '/user/ranking',
	getUserInfo: '/user/getWxInfo',
	getRisk: '/risk/get_risk_info',
	getMeasureDetail: '/user/measure_calbe_details',
	deleteMeasure: '/log/del_measure_calbe',
	getUserData: '/pedometer/user_info',
}

const getData = data => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.getData,
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

const getUser = () => {
	return new Promise((resolve, reject) => {
		service.request({
			url: api.getUser
		}).then(result => {
			if (result.status === 200) {
				resolve(result.data)
			} else {
				reject({
					code: result.status,
					text: result.msg
				})
			}
		}, reject)
	})
}

const getCommunityId = () => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getCommunityId
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

const getCommunityDetail = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getCommunityDetail,
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

const getCommunityRankList = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getCommunityRankList,
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

const getCommunityMineRank = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getCommunityMineRank,
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

const getUserInfo = () => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getUserInfo
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

const getMeasureDetail = data => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.getMeasureDetail,
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

const deleteMeasure = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.deleteMeasure,
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

const getUserData = () => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getUserData
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
	getData,
	getHistory,
	getUser,
	getCommunityId,
	getCommunityDetail,
	getCommunityRankList,
	getCommunityMineRank,
	getUserInfo,
	getMeasureDetail,
	getRisk,
	deleteMeasure,
	getUserData
}
