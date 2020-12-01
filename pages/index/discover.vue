<template>
	<custom-pull-refresh ref="customPullrefresh" @pulldownRefresh="pulldownRefresh" @pullupRefresh="pullupRefresh">
		<view class="list-content">
			<view class="list-item"></view>
			<view class="list-item"></view>
		</view>
	</custom-pull-refresh>
</template>
<script>
export default {
	data() {
		return {
			lower: '',
			upper: '',
			text: ''
		};
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
.list-content {
	margin: 4vw;
	.list-item {
		height: 220rpx;
		margin-bottom: 4vw;
		background-color: #eee;
	}
}
</style>
