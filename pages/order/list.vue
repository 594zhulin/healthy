<template>
	<view class="page-list">
		<view class="tab-content">
			<view class="tab-item" v-for="item in tab" :key="item.id" :class="{ active: currentTabId == item.id }" @click="bindTabChange(item.id)">{{ item.text }}</view>
		</view>
		<view class="list-content">
			<view class="list-item">
				<view class="title">
					<view class="number">订单编号：12345555555555555555</view>
					<view class="status">待付款</view>
				</view>
				<view class="product">
					<view class="pic"></view>
					<view class="detail">
						<view class="name">做自己的心理医生</view>
						<view class="count">×1</view>
					</view>
				</view>
				<view class="step">-3万</view>
				<view class="actionsheet">
					<template v-if="currentTabId == 0">
						<view class="btn">取消订单</view>
						<view class="btn">去付款</view>
					</template>
					<template v-if="currentTabId == 1">
						<view class="btn">提醒发货</view>
						<view class="btn">申请退款</view>
					</template>
					<template v-if="currentTabId == 2">
						<view class="btn">查看物流</view>
						<view class="btn">确认收货</view>
					</template>
					<template v-if="currentTabId == 3">
						<view class="btn">申请售后</view>
						<view class="btn">查看物流</view>
						<view class="btn">删除订单</view>
					</template>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			currentTabId: -1,
			tab: [
				{
					id: -1,
					text: '全部'
				},
				{
					id: 0,
					text: '待付款'
				},
				{
					id: 1,
					text: '待发货'
				},
				{
					id: 2,
					text: '待收货'
				},
				{
					id: 3,
					text: '已签收'
				}
			]
		};
	},
	methods: {
		bindTabChange(id) {
			this.currentTabId = id;
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #f7f6f9;
}
.page-list {
	.tab-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 88rpx;
		padding: 0 30rpx;
		background-color: #fff;
		.tab-item {
			height: 88rpx;
			border-bottom: 6rpx solid #fff;
			font-size: 30rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #a3a7b9;
			line-height: 88rpx;
			box-sizing: border-box;
		}
		.tab-item.active {
			border-bottom: 6rpx solid #000;
			font-size: 30rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
		}
	}
	.list-content {
		.list-item {
			position: relative;
			margin: 30rpx;
			background: #ffffff;
			border-radius: 16rpx;
			.title {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 80rpx;
				padding: 0 30rpx;
				&::after {
					content: '';
					position: absolute;
					left: 0;
					right: 0;
					bottom: 0;
					height: 1rpx;
					background-color: #e8e8e8;
				}
				.number {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333;
					line-height: 40rpx;
				}
				.status {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #2975ff;
					line-height: 40rpx;
				}
			}
			.product {
				display: flex;
				align-items: center;
				padding: 30rpx;
				.pic {
					flex-shrink: 0;
					width: 120rpx;
					height: 120rpx;
					margin-right: 30rpx;
					border-radius: 16rpx;
					background-color: #eee;
				}
				.detail {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					height: 120rpx;
					.name {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #333;
						line-height: 40rpx;
					}
					.count {
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999;
						line-height: 34rpx;
					}
				}
			}
			.step {
				position: absolute;
				bottom: 130rpx;
				right: 30rpx;
				font-size: 36rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #fc6262;
				line-height: 50rpx;
				&::after {
					content: '步';
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #fc6262;
					line-height: 34rpx;
				}
			}
			.actionsheet {
				position: relative;
				padding: 20rpx 30rpx;
				text-align: right;
				&::before {
					content: '';
					position: absolute;
					left: 0;
					right: 0;
					top: 0;
					height: 2rpx;
					background-color: #e8e8e8;
				}
				.btn {
					display: inline-block;
					vertical-align: middle;
					width: 160rpx;
					height: 60rpx;
					margin-left: 20rpx;
					border-radius: 8rpx;
					background-color: #cfe0ff;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #7291de;
					line-height: 60rpx;
					box-sizing: border-box;
					text-align: center;
					&:last-child {
						background-color: #2975ff;
						color: #fff;
					}
				}
			}
		}
	}
}
</style>
