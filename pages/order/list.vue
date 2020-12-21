<template>
	<view class="page-list">
		<view class="tab-content">
			<view class="tab-item" v-for="item in tab" :key="item.id" :class="{ active: params.type === item.id }" @click="bindTabChange(item.id)">{{ item.text }}</view>
		</view>
		<view class="list-content">
			<view class="list-item" v-for="item in order" :key="item.id" @click="navigateTo('/pages/order/detail?id=' + item.order_id)">
				<view class="title">
					<view class="number">订单编号：{{ item.order_id }}</view>
					<view class="status" v-if="item.status == 0">待付款</view>
					<view class="status" v-if="item.status == 1">待发货</view>
					<view class="status" v-if="item.status == 2">待收货</view>
					<view class="status" v-if="item.status == 4">已签收</view>
				</view>
				<view class="product" v-for="cart in item.cartInfo" :key="cart.id">
					<image class="pic" :src="cart.productInfo.image" mode="aspectFit"></image>
					<view class="detail">
						<view class="name">{{ cart.productInfo.store_name }}</view>
						<view class="specs">{{ cart.productInfo.attrInfo.suk }}</view>
						<view class="count">×{{ cart.cart_num }}</view>
						<view class="step" v-if="cart.productInfo.is_model == 1">{{ cart.productInfo.buy_credits }}</view>
						<view class="text" v-else>{{ cart.productInfo.attrInfo.price }}</view>
					</view>
				</view>
				<view class="price">
					<view class="total">
						<view class="label">总价</view>
						<view class="text">{{ item.total_price }}</view>
					</view>
					<view class="pay">
						<view class="label">{{ item.status == 0 ? '需付款' : '实付款' }}</view>
						<view class="text">{{ item.pay_price }}</view>
					</view>
				</view>
				<view class="actionsheet">
					<template v-if="item.status == 0">
						<view class="btn" @click.stop="cancelOrder(item.order_id)">取消订单</view>
						<view class="btn" @click.stop="payOrder(item.order_id)">去付款</view>
					</template>
					<template v-if="item.status == 1">
						<view class="btn" @click.stop="alertOrder(item.order_id)">提醒发货</view>
						<view class="btn" @click.stop="navigateTo('/pages/order/refund?id=' + item.order_id)">申请退款</view>
					</template>
					<template v-if="item.status == 2">
						<view class="btn" @click.stop="navigateTo('/pages/order/logistics?id=' + item.order_id)">查看物流</view>
						<view class="btn" @click.stop="confirmOrder(item.order_id)">确认收货</view>
					</template>
					<template v-if="item.status == 4">
						<view class="btn" @click.stop="navigateTo('/pages/order/refund?id=' + item.order_id)">申请售后</view>
						<view class="btn" @click.stop="navigateTo('/pages/order/logistics?id=' + item.order_id)">查看物流</view>
						<view class="btn" @click.stop="deleteOrder(item.order_id)">删除订单</view>
					</template>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getOrder, cancelOrder, payOrder, alertOrder, confirmOrder, deleteOrder } from '@/api/order.js';
export default {
	data() {
		return {
			tab: [
				{
					id: '',
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
					id: 4,
					text: '已签收'
				}
			],
			params: {
				type: '',
				page: 1,
				limit: 20
			},
			order: [],
			total: 0
		};
	},
	onLoad(option) {
		if (option.id) {
			this.params.type = option.id;
		}
	},
	onShow() {
		this.getListData('down');
	},
	onReachBottom() {
		this.getListData('up');
	},
	methods: {
		getListData(direction) {
			if (direction == 'down') {
				this.params.page = 1;
			} else {
				if (this.order.length >= this.total) {
					return false;
				}
				this.params.page += 1;
			}
			getOrder({ ...this.params }).then(
				result => {
					// const { list, total } = result;
					this.order = direction == 'down' ? result : this.order.concat(result);
					//this.total = total;
				},
				err => {}
			);
		},
		cancelOrder(id) {
			const _this = this;
			uni.showModal({
				content: '确定取消该订单？',
				success: function(res) {
					if (res.confirm) {
						cancelOrder({ id }).then(
							result => {
								_this.getListData('down');
							},
							err => {
								uni.showToast({
									icon: 'none',
									title: err.text
								});
							}
						);
					}
				}
			});
		},
		payOrder(uni) {
			payOrder({ uni, paytype: 'weixin', from: 'routine' }).then(
				result => {
					console.log(result);
					this.wxpay(result.jsConfig, result.orderId);
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
		},
		alertOrder(id) {
			alertOrder({ id }).then(
				result => {
					uni.showToast({
						icon: 'none',
						title: '已提醒商家发货'
					});
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
		},
		confirmOrder(uni) {
			const _this = this;
			uni.showModal({
				content: '确认收到商品？',
				success: function(res) {
					if (res.confirm) {
						confirmOrder({ uni }).then(
							result => {
								_this.getListData('down');
							},
							err => {
								uni.showToast({
									icon: 'none',
									title: err.text
								});
							}
						);
					}
				}
			});
		},
		deleteOrder(uni) {
			const _this = this;
			uni.showModal({
				content: '确定删除该订单？',
				success: function(res) {
					if (res.confirm) {
						deleteOrder({ uni }).then(
							result => {
								_this.getListData('down');
							},
							err => {
								uni.showToast({
									icon: 'none',
									title: err.text
								});
							}
						);
					}
				}
			});
		},
		bindTabChange(id) {
			this.params.type = id;
			this.getListData('down');
		},
		wxpay(params, orderId) {
			const this_ = this;
			uni.requestPayment({
				provider: 'wxpay',
				timeStamp: params.timestamp,
				nonceStr: params.nonceStr,
				package: params.package,
				signType: params.signType,
				paySign: params.paySign,
				success: function(res) {
					if (res.errMsg == 'requestPayment:ok') {
						uni.redirectTo({
							url: '/pages/order/detail?orderId=' + orderId
						});
					}
				},
				fail: function(err) {
					console.log('fail:' + JSON.stringify(err));
				}
			});
		},
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
					position: relative;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					flex: 1;
					height: 120rpx;
					.name {
						width: 70%;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #333;
						line-height: 40rpx;
						word-break: break-all;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					.specs {
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999;
						line-height: 34rpx;
					}
					.count {
						position: absolute;
						bottom: 0;
						right: 0;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999;
						line-height: 34rpx;
					}
					.step {
						position: absolute;
						top: 0;
						right: 0;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999;
						line-height: 40rpx;
						&::after {
							content: '步';
							font-size: 18rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #999;
							line-height: 26rpx;
						}
					}
					.text {
						position: absolute;
						top: 0;
						right: 0;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999;
						line-height: 40rpx;
						&::before {
							content: '￥';
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #999;
							line-height: 34rpx;
						}
					}
				}
			}
			.price {
				display: flex;
				align-items: center;
				padding: 0 30rpx 20rpx 0;
				justify-content: flex-end;
				.total {
					display: flex;
					align-items: center;
					margin-right: 20rpx;
					font-size: 32rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999;
					line-height: 46rpx;
					.text::before {
						content: '￥';
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999;
						line-height: 34rpx;
					}
				}
				.pay {
					display: flex;
					align-items: center;
					font-size: 32rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #fc6262;
					line-height: 46rpx;
					.text::before {
						content: '￥';
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #fc6262;
						line-height: 34rpx;
					}
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
