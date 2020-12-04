<template>
	<view class="page-result">
		<view class="score-content">
			<image class="background" src="../../static/diet/diet-bg-01.svg" mode="aspectFit"></image>
			<view class="score">60′</view>
			<view class="title">
				<image src="../../static/diet/diet-icon-01.svg" mode="aspectFit"></image>
				<view class="text">膳食评分</view>
			</view>
			<view class="tag"></view>
		</view>
		<view class="problem-content"></view>
		<view class="advice-content"></view>
		<view class="desc-content"></view>
		<view class="btn">我要重测</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="less">
page {
	background-color: #f7f6f9;
}
.page-result {
	.score-content {
		position: relative;
		height: 396rpx;
		margin: 4vw;
		.background {
			width: 100%;
			height: 396rpx;
		}
		.score {
			margin-left: 68rpx;
			font-size: 120rpx;
			font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
			font-weight: bold;
			color: #ffffff;
			line-height: 166rpx;
		}
		.title {
			position: absolute;
			left: 64rpx;
			top: 228rpx;
			display: flex;
			align-items: center;
			.icon {
				width: 38rpx;
				height: 36rpx;
				margin-right: 18rpx;
			}
			.text {
				font-size: 24rpx;
				font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
				font-weight: bold;
				color: #ffffff;
				line-height: 34rpx;
			}
		}
		.tag {
			position: absolute;
			left: 60rpx;
			bottom: 26rpx;
			width: 176rpx;
			height: 64rpx;
			background: rgba(255, 255, 255, 0.22);
			font-size: 24rpx;
			font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
			font-weight: bold;
			color: #ffffff;
			line-height: 64rpx;
			text-align: center;
		}
	}
}
</style>
