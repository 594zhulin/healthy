<template>
	<view class="component-mall">
		<view class="search-content"></view>
		<view class="user-content"></view>
		<view class="menu-content"></view>
		<custom-pull-refresh ref="customPullrefresh" @pulldownRefresh="pulldownRefresh" @pullupRefresh="pullupRefresh">
			<view class="list-content">
				<view class="list-item"></view>
				<view class="list-item"></view>
				<view class="list-item"></view>
				<view class="list-item"></view>
			</view>
		</custom-pull-refresh>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	mounted() {
		uni.connectSocket({
			url: 'ws://swoole.yulongtianzi.com:9501?device_id=650qv646lx3z',
			success() {
				console.log('连接成功');
			}
		});
		uni.onSocketOpen(function(res) {
			console.log('WebSocket连接已打开！');
		});
		uni.onSocketMessage(function(res) {
			console.log(res.data);
			// uni.showToast({
			// 	title: '收到服务器内容：' + res.data
			// });
		});
		uni.onSocketClose(function(res) {
			console.log('WebSocket 已关闭！');
		});
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
.component-mall {
	padding-bottom: 128rpx;
	.search-content {
		height: 60rpx;
		margin: 40rpx 20rpx;
		background-color: #eee;
	}
	.user-content {
		height: 180rpx;
		margin: 0 60rpx;
		padding: 20rpx;
		background-color: #eee;
	}
	.menu-content {
		height: 86rpx;
		margin: 25rpx 30rpx;
		background-color: #eee;
	}
	.list-content {
		display: flex;
		flex-wrap: wrap;
		.list-item {
			width: 44vw;
			height: 376rpx;
			margin-left: 4vw;
			margin-bottom: 4vw;
			background-color: #eee;
		}
	}
}
</style>
