<template>
	<custom-pull-refresh ref="customPullrefresh" @pulldownRefresh="pulldownRefresh" @pullupRefresh="pullupRefresh">
		<view class="overview-content"></view>
		<view class="grid-content">
			<view class="grid-item"></view>
			<view class="grid-item"></view>
			<view class="grid-item"></view>
			<view class="grid-item"></view>
			<view class="grid-item ranking"></view>
			<view class="grid-item ranking"></view>
		</view>
		<view class="list-content">
			<view class="list-title">推荐兑换</view>
			<view class="list-item"></view>
			<view class="list-item"></view>
			<view class="list-item"></view>
		</view>
	</custom-pull-refresh>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		pulldownRefresh() {
			console.log('下拉请求数据');
			uni.request({
				url: 'https://stamina.yulongtianzi.com/api/login/is_check',
				method: 'POST',
				data: {
					user_id: 2316
				},
				success: res => {
					this.$refs['customPullrefresh'].endPulldown();
					this.text += res.data.data;
				}
			});
		},
		pullupRefresh() {
			uni.request({
				url: 'https://stamina.yulongtianzi.com/api/login/is_check',
				method: 'POST',
				data: {
					user_id: 2316
				},
				success: res => {}
			});
		}
	}
};
</script>

<style lang="less" scoped>
.overview-content {
	width: 90.4vw;
	height: 420rpx;
	margin: 4vw 4.8vw;
}
.grid-content {
	display: flex;
	flex-wrap: wrap;
	.grid-item {
		width: 44vw;
		height: 320rpx;
		margin-left: 4vw;
		margin-bottom: 4vw;
		background-color: #eee;
		vertical-align: top;
	}
	.grid-item.ranking {
		height: 130rpx;
		margin-bottom: 0;
	}
}
.list-content {
	margin: 4vw;
	.list-title {
		margin-bottom: 2vw;
		padding-left: 4vw;
		font-size: 28rpx;
		font-weight: 700;
	}
	.list-item {
		height: 210rpx;
		padding: 4vw;
		background-color: #eee;
	}
}
// .flex-content {
// 	display: flex;
// 	margin-bottom: 4vw;
// 	.flex-item {
// 		width: 44vw;
// 		height: 130rpx;
// 		margin-left: 4vw;
// 		background-color: #eee;
// 	}
// }
</style>
