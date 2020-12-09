<template>
	<view class="page-step">
		<view class="overview-content">
			<view class="step">200,0000</view>
			<view class="text">当前步数</view>
			<view class="tip">1000步将于2020-02-29过期</view>
		</view>
		<view class="list-content">
			<view class="list-item">
				<view class="title">做自己的心理医生</view>
				<view class="date">2019-05-16 14:22</view>
				<view class="step">-1000</view>
			</view>
			<view class="list-item">
				<view class="title">做自己的心理医生</view>
				<view class="date">2019-05-16 14:22</view>
				<view class="step">-1000</view>
			</view>
			<view class="list-item">
				<view class="title">做自己的心理医生</view>
				<view class="date">2019-05-16 14:22</view>
				<view class="step">-1000</view>
			</view>
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

<style lang="less">
page {
	background-color: #f7f6f9;
}
.page-step {
	.overview-content {
		padding: 60rpx 0 50rpx 0;
		margin-bottom: 30rpx;
		background-color: #fff;
		text-align: center;
		.step {
			font-size: 42rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #000000;
			line-height: 60rpx;
		}
		.text {
			margin: 11rpx 0 12rpx 0;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 40rpx;
		}
		.tip {
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999;
			line-height: 34rpx;
		}
	}
	.list-content {
		.list-item {
			position: relative;
			height: 164rpx;
			padding: 30rpx;
			box-sizing: border-box;
			background-color: #fff;
			&::after {
				content: '';
				position: absolute;
				left: 30rpx;
				right: 0;
				bottom: 0;
				height: 2rpx;
				background-color: #e8e8e8;
			}
			&:last-child::after {
				display: none;
			}
			.title {
				margin-bottom: 24rpx;
				font-size: 30rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
			}
			.date {
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999;
				line-height: 40rpx;
			}
			.step {
				position: absolute;
				top: 0;
				bottom: 0;
				right: 30rpx;
				margin: auto;
				font-size: 30rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 164rpx;
			}
		}
	}
}
</style>
