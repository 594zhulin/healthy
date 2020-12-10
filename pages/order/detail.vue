<template>
	<view class="page-detail">
		<view class="status-content">
			<view class="text">待付款</view>
			<image class="icon" src="../../static/order/order-icon-02.svg" mode="aspectFit"></image>
		</view>
		<view class="address-content"></view>
		<view class="order-content"></view>
		<view class="delivery-content"></view>
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
.page-detail {
	.status-content {
		position: relative;
		height: 320rpx;
		padding: 44rpx 0 0 84rpx;
		background: linear-gradient(right, #52adff 0%, #2975ff 100%);
		box-sizing: border-box;
		.icon {
			position: absolute;
			right: 84rpx;
			width: 160rpx;
			height: 160rpx;
			top: 8rpx;
			margin: auto;
		}
		.text {
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #ffffff;
			line-height: 40rpx;
		}
	}
}
</style>
