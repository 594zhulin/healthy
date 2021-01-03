<template>
	<view class="page-result">
		<template v-if="type == 'success'">
			<image class="icon" src="../../static/order/order-icon-11.png" mode="aspectFit"></image>
			<view class="text">支付成功</view>
		</template>
		<template v-else>
			<image class="icon" src="../../static/order/order-icon-12.png" mode="aspectFit"></image>
			<view class="text">支付失败</view>
		</template>
		<view class="btn-content">
			<view class="btn" @click="redirectTo('/pages/order/detail?id=' + id)">查看订单</view>
			<view class="btn-back" @click="switchTab">返回首页</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: '',
			type: ''
		};
	},
	onLoad(option) {
		this.type = option.type;
		this.id = option.id;
	},
	methods: {
		switchTab() {
			uni.switchTab({
				url: '/pages/home/home'
			});
		},
		redirectTo(url) {
			uni.redirectTo({
				url
			});
		}
	}
};
</script>

<style lang="less">
.page-result {
	padding-top: 200rpx;
	.icon {
		display: block;
		width: 60rpx;
		height: 60rpx;
		margin: 60rpx auto 20rpx auto;
	}
	.text {
		font-size: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
		line-height: 42rpx;
		text-align: center;
	}
	.btn-content {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 60rpx auto 0 auto;
		.btn-back {
			width: 226rpx;
			height: 72rpx;
			margin-left: 50rpx;
			background: #ffffff;
			border-radius: 4rpx;
			border: 2rpx solid #2975ff;
			font-size: 28rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #2975ff;
			line-height: 68rpx;
			text-align: center;
			box-sizing: border-box;
		}
		.btn {
			width: 226rpx;
			height: 72rpx;
			background: #2975ff;
			border-radius: 4rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #ffffff;
			line-height: 72rpx;
			text-align: center;
		}
	}
}
</style>
