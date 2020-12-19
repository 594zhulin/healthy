const service = require('@/utils/http');

const api = {
	getVideo: '/video/video_list',
	like: '/video/hits',
	view: '/video/likes',
	getVideoCategoryDetail: '/video/get_attention_cate',
	getVideoCategory: '/video/get_attention_video',
	getVideoDetail: '/video/vodeo_details'
}

const getVideo = () => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.getVideo
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

const like = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.like,
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

const view = data => {
	return new Promise((resolve, reject) => {
		service.http_({
			url: api.view,
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

const getVideoCategoryDetail = data => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.getVideoCategoryDetail,
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

const getVideoCategory = data => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.getVideoCategory,
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

const getVideoDetail = data => {
	return new Promise((resolve, reject) => {
		service.http({
			url: api.getVideoDetail,
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
	getVideo,
	like,
	view,
	getVideoCategoryDetail,
	getVideoCategory,
	getVideoDetail
}
