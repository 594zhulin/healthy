<template>
	<view class="page-detail">
		<view class="video-content"><video src="" controls></video></view>
		<view class="detail-content">
			<view class="title">9分钟柔韧性练习（不限场地）</view>
			<view class="detail">
				<view class="level">
					<view class="text">LEVEL</view>
					<view class="value">10</view>
				</view>
				<view class="name">一字马</view>
			</view>
			<view class="desc">年太清重当队王动快切府队物者叫多养时六火清第断内热识片照素据西识一象活连结如众以则看酸派办化易分术出布布它。</view>
		</view>
		<view class="test-content">
			<view class="title">
				<image class="icon" src="../../static/train/train-icon-04.svg" mode="aspectFit"></image>
				<view class="text">练习频次</view>
			</view>
			<view class="text">每周至少5次</view>
			<view class="text">30分钟为一组</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="less" scoped>
.page-detail {
	.video-content {
		height: 376rpx;
		background: rgba(0, 0, 0, 0.4);
		video {
			width: 100%;
			height: 376rpx;
		}
	}
	.detail-content {
		margin: 0 32rpx 0 42rpx;
		.title {
			margin: 30rpx 0 42rpx 0;
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
			line-height: 50rpx;
		}
		.detail {
			display: flex;
			align-items: center;
			.level {
				display: flex;
				align-items: center;
				.text {
					font-size: 24rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #a0a0a0;
					line-height: 34rpx;
				}
				.value {
					margin-left: 12rpx;
					font-size: 36rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #666666;
					line-height: 50rpx;
				}
			}
			.name {
				margin-left: 44rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #a0a0a0;
				line-height: 34rpx;
			}
		}
		.desc {
			margin: 48rpx 0 46rpx 0;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
			line-height: 34rpx;
			letter-spacing: 2rpx;
			text-align: justify;
		}
	}
	.test-content {
		margin-left: 48rpx;
		.title {
			display: flex;
			align-items: center;
			margin-bottom: 40rpx;
			.icon {
				width: 30rpx;
				height: 34rpx;
			}
			.text {
				margin-left: 18rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 40rpx;
			}
		}
		.text {
			margin-bottom: 2rpx;
			margin-left: 38rpx;
			font-size: 20rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
			line-height: 34rpx;
			letter-spacing: 2rpx;
		}
	}
}
</style>
