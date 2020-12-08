<template>
	<view class="page-launch">
		<image class="background" :src="banner"></image>
		<button class="btn" type="default" open-type="getUserInfo" @getuserinfo="getUserInfo">立即行动</button>
	</view>
</template>

<script>
import { getBanner } from '@/api/launch.js';
export default {
	data() {
		return {
			banner: ''
		};
	},
	onLoad() {
		getBanner().then(
			result => {
				this.banner = result[0].ad_pic;
			},
			err => {}
		);
	},
	methods: {
		getUserInfo(e) {
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					console.log(loginRes.authResult);
					// 获取用户信息
					uni.getUserInfo({
						provider: 'weixin',
						success: function(infoRes) {
							uni.switchTab({
								url: '/pages/home/home'
							});
							uni.hideTabBar();
						}
					});
				}
			});
		}
	}
};
</script>

<style lang="less">
.page-launch {
	height: 100vh;
	overflow: hidden;
	.background {
		width: 100%;
		height: 100vh;
	}
	.btn {
		position: absolute;
		bottom: 100rpx;
		left: 0;
		right: 0;
		width: 226rpx;
		height: 72rpx;
		padding: 0;
		margin: 0 auto;
		background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
		box-shadow: 0px 10rpx 10rpx 0px rgba(2, 15, 64, 0.1);
		border-radius: 50rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #2879ea;
		line-height: 72rpx;
		text-align: center;
		&::after {
			display: none;
		}
	}
}
</style>
