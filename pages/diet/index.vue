<template>
	<view class="page-index">
		<view class="banner-content"></view>
		<view class="test-content" @click="navigateTo('/pages/diet/one')">
			<view class="pic"></view>
			<view class="content">
				<view class="title">膳食测评</view>
				<view class="text">3分钟测试您吃的是否健康</view>
			</view>
			<image class="icon" src="../../static/train/train-icon-05.png" mode="aspectFit"></image>
		</view>
		<view class="cookbook-content">
			<view class="pic"></view>
			<view class="content">
				<view class="title">健康食谱</view>
				<view class="text">教您如何安排健康膳食</view>
			</view>
			<image class="icon" src="../../static/train/train-icon-05.png" mode="aspectFit"></image>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		navigateTo(url) {
			uni.navigateTo({
				url
			});
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #f7f6f9;
}
.page-index {
	.banner-content {
		height: 700rpx;
		margin: 30rpx 32rpx;
		background: #ffffff;
		border-radius: 16rpx;
	}
	.test-content,
	.cookbook-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 172rpx;
		margin: 30rpx 32rpx;
		padding: 24rpx 44rpx 30rpx 22rpx;
		background: #ffffff;
		border-radius: 16rpx;
		box-sizing: border-box;
		.pic {
			width: 120rpx;
			height: 120rpx;
			border-radius: 16rpx;
			background-color: #eee;
		}
		.content {
			flex: 1;
			margin-left: 36rpx;
			.title {
				margin-bottom: 24rpx;
				font-size: 36rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #333333;
				line-height: 50rpx;
			}
			.text {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #666666;
				line-height: 34rpx;
			}
		}
		.icon {
			width: 19rpx;
			height: 30rpx;
		}
	}
}
</style>
