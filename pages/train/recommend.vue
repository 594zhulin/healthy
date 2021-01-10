<template>
	<view class="page-recommend">
		<view class="title">根据您的身体素质分布情况，为您推荐课程，时间有限的情况下请优先完成前面的训练</view>
		<view class="list-content">
			<view class="list-item">
				<view class="order">01</view>
				<view class="name">力量提升训练</view>
				<view class="level">level 1</view>
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
.page-recommend {
	margin: 4vw;
	background: #ffffff;
	border-radius: 16rpx;
	padding: 40rpx 0 48rpx 0;
	.title {
		padding: 0 30rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 40rpx;
	}
	.list-content {
		margin: 30rpx;
		.list-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 140rpx;
			padding-right: 30rpx;
			border: 2rpx solid #97bcff;
			border-radius: 12rpx;
			.order {
				width: 140rpx;
				height: 140rpx;
				line-height: 140rpx;
				background-color: #2975ff;
				border-radius: 12rpx;
				font-size: 36rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #fff;
				text-align: center;
			}
			.name {
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 40rpx;
			}
			.level {
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #2975ff;
				line-height: 40rpx;
			}
		}
	}
}
</style>
