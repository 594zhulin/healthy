<template>
	<view class="component-user">
		<view class="user-content"></view>
		<view class="chart-content"></view>
		<view class="risk-content"></view>
		<view class="step-content"></view>
		<view class="address-content"></view>
		<view class="order-content"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="less" scoped>
.component-user {
	padding-bottom: 128rpx;
	.user-content {
		height: 210rpx;
		background-color: #eee;
	}
	.chart-content {
		height: 260rpx;
		margin: 4vw;
		background-color: #eee;
	}
	.risk-content {
		height: 210rpx;
		margin: 4vw;
		background-color: #eee;
	}
	.step-content {
		height: 210rpx;
		margin: 4vw;
		background-color: #eee;
	}
	.address-content {
		height: 210rpx;
		margin: 4vw;
		background-color: #eee;
	}
	.order-content {
		height: 210rpx;
		margin: 4vw;
		background-color: #eee;
	}
}
</style>
