<template>
	<view class="page-product" :style="{ paddingBottom: bottom + 'px' }">
		<view class="pic-content"></view>
		<view class="detail-content">
			<view class="name">做自己的心理医生</view>
			<view class="step">3万</view>
		</view>
		<view class="title-content"><view class="text">商品详情</view></view>
		<view class="desc-content"></view>
		<view id="bottom" class="btn-content" :style="{ paddingBottom: isIphoneX ? paddingBottom : '20rpx' }"><view class="btn">立即兑换</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isIphoneX: false,
			paddingBottom: '',
			bottom: ''
		};
	},
	onLoad() {
		this.isIphoneX = getApp().globalData.isIphoneX;
		this.paddingBottom = getApp().globalData.paddingBottom;
		const query = uni.createSelectorQuery().in(this);
		query
			.select('#bottom')
			.boundingClientRect(data => {
				this.bottom = data.height + 15;
			})
			.exec();
	}
};
</script>

<style lang="less">
page {
	background-color: #f7f6f9;
}
.page-product {
	.pic-content {
		height: 412rpx;
		background-color: #eee;
	}
	.detail-content {
		padding: 40rpx 30rpx 48rpx 30rpx;
		background-color: #fff;
		.name {
			margin-bottom: 10rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #000000;
			line-height: 46rpx;
		}
		.step {
			font-size: 40rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #fc6262;
			line-height: 46rpx;
			&::after {
				content: '步';
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #fc6262;
				line-height: 26rpx;
			}
		}
	}
	.title-content {
		height: 72rpx;
		.text {
			display: flex;
			align-items: center;
			white-space: nowrap;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #000000;
			line-height: 72rpx;
			&::before {
				display: inline-block;
				content: '';
				margin: 0 4vw;
				width: 49.92vw;
				height: 2rpx;
				background-color: #e0e0e0;
			}
			&::after {
				display: inline-block;
				content: '';
				margin: 0 4vw;
				width: 49.92vw;
				height: 2rpx;
				background-color: #e8e8e8;
			}
		}
	}
	.desc-content {
		height: 600rpx;
		padding: 60rpx 30rpx;
		background-color: #fff;
	}
	.btn-content {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 20rpx 30rpx 0 30rpx;
		background-color: #fff;
		&::before {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			content: '';
			height: 2rpx;
			background-color: #e8e8e8;
		}
		.btn {
			height: 80rpx;
			background: #2975ff;
			border-radius: 8rpx;
			font-size: 30rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #fff;
			line-height: 80rpx;
			text-align: center;
		}
	}
}
</style>
