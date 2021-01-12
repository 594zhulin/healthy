<template>
	<view class="page-detail" :style="{ paddingBottom: bottom + 'px' }">
		<view class="status-content">
			<view class="text" v-if="orderDetail._status._type == 0">待付款</view>
			<view class="text" v-if="orderDetail._status._type == 1">待发货</view>
			<view class="text" v-if="orderDetail._status._type == 2">待收货</view>
			<view class="text" v-if="orderDetail._status._type == 3">已签收</view>
			<view class="tip">{{ orderDetail._status._msg }}</view>
			<image v-if="orderDetail._status._type == 0" class="icon" src="../../static/order/order-icon-01.svg" mode="aspectFit"></image>
			<image v-if="orderDetail._status._type == 1" class="icon" src="../../static/order/order-icon-02.svg" mode="aspectFit"></image>
			<image v-if="orderDetail._status._type == 2" class="icon" src="../../static/order/order-icon-03.svg" mode="aspectFit"></image>
			<image v-if="orderDetail._status._type == 3" class="icon" src="../../static/order/order-icon-04.svg" mode="aspectFit"></image>
			<image v-if="orderDetail._status._type == -3" class="icon" src="../../static/order/order-icon-05.svg" mode="aspectFit"></image>
		</view>
		<view class="address-content">
			<view class="logistics" v-if="orderDetail._status._type == 2" @click="navigateTo('/pages/order/logistics?id='+orderDetail.order_id)">
				<image class="icon" src="../../static/order/order-icon-06.svg" mode="aspectFit"></image>
				<view class="content">
					<view class="text">包裹正在等待揽收</view>
					<view class="date">2020-12-11 11:47:28</view>
				</view>
				<image class="icon arrow" src="../../static/order/order-icon-08.png" mode="aspectFit"></image>
			</view>
			<view class="address">
				<image class="icon" src="../../static/order/order-icon-07.svg" mode="aspectFit"></image>
				<view class="content">
					<view class="user">
						<view class="name">{{ orderDetail.real_name }}</view>
						<view class="phone">{{ orderDetail.user_phone }}</view>
					</view>
					<view class="address">{{ orderDetail.user_address }}</view>
				</view>
			</view>
		</view>
		<view class="product-content">
			<view class="product" v-for="item in orderDetail.cartInfo" :key="item.id">
				<image class="pic" :src="item.productInfo.image" mode="aspectFit"></image>
				<view class="detail">
					<view class="name">{{ item.productInfo.store_name }}</view>
					<view class="specs">{{ item.productInfo.attrInfo.suk }}</view>
					<view class="count">×{{ item.cart_num }}</view>
					<view class="step" v-if="item.productInfo.is_model == 1">{{ item.productInfo.buy_credits }}</view>
					<view class="price" v-else>{{ item.productInfo.attrInfo.price }}</view>
				</view>
			</view>
			<view class="order">
				<view class="row">
					<view class="label">商品总价</view>
					<view class="text">￥{{ orderDetail.total_price }}</view>
				</view>
				<view class="row">
					<view class="label">快递运费</view>
					<view class="text">￥{{ orderDetail.total_postage }}</view>
				</view>
				<!-- <view class="row">
					<view class="label">扣除步数</view>
					<view class="text step">-3万</view>
				</view> -->
			</view>
			<view class="price">
				<view class="label">{{ orderDetail._status._type == 0 ? '待付金额' : '实付金额' }}</view>
				<view class="text">{{ orderDetail.pay_price }}</view>
			</view>
		</view>
		<view class="order-content">
			<view class="row">
				<view class="label">订单编号：</view>
				<view class="text">{{ orderDetail.order_id }}</view>
				<view class="btn-copy" @click="handleCopy">复制</view>
			</view>
			<view class="row">
				<view class="label">下单时间：</view>
				<view class="text">{{ orderDetail._add_time }}</view>
			</view>
			<template v-if="orderDetail._status._type != 0">
				<view class="row">
					<view class="label">付款方式：</view>
					<view class="text">{{ orderDetail._status._payType }}</view>
				</view>
				<view class="row">
					<view class="label">付款时间：</view>
					<view class="text">{{ orderDetail._pay_time }}</view>
				</view>
			</template>
			<view class="row">
				<view class="label">订单备注：</view>
				<view class="text">{{ orderDetail.mark || '无' }}</view>
			</view>
			<view class="btn-customer">
				<image class="icon" src="../../static/order/order-icon-09.svg" mode="aspectFit"></image>
				<view class="text">联系客服</view>
				<button class="btn" open-type="contact" type="default"></button>
			</view>
		</view>
		<view v-if="status != 5" id="bottom" class="btn-content" :style="{ paddingBottom: isIphoneX ? paddingBottom : '20rpx' }">
			<template v-if="orderDetail._status._type == 0">
				<view class="btn" @click="cancelOrder(orderDetail.order_id)">取消订单</view>
				<view class="btn" @click="payOrder(orderDetail.order_id)">去付款</view>
			</template>
			<template v-if="orderDetail._status._type == 1">
				<view class="btn" @click="alertOrder(orderDetail.order_id)">提醒发货</view>
				<view class="btn" @click="navigateTo('/pages/order/refund?id=' + orderDetail.order_id)">申请退款</view>
			</template>
			<template v-if="orderDetail._status._type == 2">
				<view class="btn" @click="navigateTo('/pages/order/logistics?id=' + orderDetail.order_id)">查看物流</view>
				<view class="btn" @click="confirmOrder(orderDetail.order_id)">确认收货</view>
			</template>
			<template v-if="orderDetail._status._type == 3">
				<view class="btn" @click="navigateTo('/pages/order/refund?id=' + orderDetail.order_id)">申请售后</view>
				<view class="btn" @click="navigateTo('/pages/order/logistics?id=' + orderDetail.order_id)">查看物流</view>
				<view class="btn" @click="deleteOrder(orderDetail.order_id)">删除订单</view>
			</template>
		</view>
	</view>
</template>

<script>
	import {
		getOrderDetail,
		cancelOrder,
		payOrder,
		alertOrder,
		confirmOrder,
		deleteOrder,
		payOrderCallback
	} from '@/api/order.js';
	export default {
		data() {
			return {
				isIphoneX: false,
				paddingBottom: 0,
				bottom: 0,
				orderDetail: null
			};
		},
		onLoad(option) {
			this.isIphoneX = getApp().globalData.isIphoneX;
			this.paddingBottom = getApp().globalData.paddingBottom;
			const query = uni.createSelectorQuery().in(this);
			query
				.select('#bottom')
				.boundingClientRect(data => {
					this.bottom = data.height;
				})
				.exec();
			this.getOrderDetail(option.id);
		},
		methods: {
			getOrderDetail(id) {
				getOrderDetail(id).then(
					result => {
						this.orderDetail = result;
					},
					err => {
						uni.showToast({
							icon: 'none',
							title: err.text
						});
					}
				);
			},
			cancelOrder(id) {
				const _this = this;
				uni.showModal({
					content: '确定取消该订单？',
					success: function(res) {
						if (res.confirm) {
							cancelOrder({
								id
							}).then(
								result => {
									uni.navigateBack({
										delta: 1
									})
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
			payOrder(id) {
				payOrder({
					uni: id,
					paytype: 'weixin',
					from: 'routine'
				}).then(
					result => {
						console.log(result);
						this.wxpay(result.jsConfig, result.order_id);
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
				alertOrder({
					id
				}).then(
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
			confirmOrder(id) {
				const _this = this;
				uni.showModal({
					content: '确认收到商品？',
					success: function(res) {
						if (res.confirm) {
							confirmOrder({
								uni: id
							}).then(
								result => {
									_this.getOrderDetail(id);
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
			deleteOrder(id) {
				const _this = this;
				uni.showModal({
					content: '确定删除该订单？',
					success: function(res) {
						if (res.confirm) {
							deleteOrder({
								uni: id
							}).then(
								result => {
									uni.navigateBack({
										delta: 1
									});
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
			wxpay(params, id) {
				const _this = this;
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: params.timestamp,
					nonceStr: params.nonceStr,
					package: params.package,
					signType: params.signType,
					paySign: params.paySign,
					success: function(res) {
						if (res.errMsg == 'requestPayment:ok') {
							payOrderCallback(orderId).then(result => {}, err => {})
							_this.getOrderDetail(id);
						}
					},
					fail: function(err) {
						console.log('fail:' + JSON.stringify(err));
					}
				});
			},
			handleCopy() {
				uni.setClipboardData({
					data: this.orderDetail.order_id,
					success: () => {
						uni.showToast({
							icon: 'none',
							title: '复制成功'
						});
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

	.page-detail {
		.status-content {
			position: relative;
			padding: 44rpx 0 44rpx 84rpx;
			box-sizing: border-box;

			&::after {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				content: '';
				height: 200rpx;
				background: linear-gradient(right, #52adff 0%, #2975ff 100%);
				z-index: -1;
			}

			.icon {
				position: absolute;
				right: 84rpx;
				width: 160rpx;
				height: 160rpx;
				top: 8rpx;
				margin: auto;
			}

			.text {
				margin-bottom: 10rpx;
				font-size: 36rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #ffffff;
				line-height: 40rpx;
			}

			.tip {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #fff;
				line-height: 34rpx;
			}
		}

		.address-content {
			margin: 0 30rpx;
			padding: 30rpx;
			background: #ffffff;
			border-radius: 16rpx;
			box-shadow: 0px 0px 12rpx 0px rgba(0, 0, 0, 0.06);

			.logistics,
			.address {
				display: flex;
				align-items: center;
				justify-content: space-between;

				&>.icon {
					width: 60rpx;
					height: 60rpx;
					flex-shrink: 0;
					margin-right: 20rpx;
				}

				.content {
					flex: 1;

					.user {
						display: flex;
						align-items: center;

						.name {
							margin-right: 20rpx;
						}
					}

					.text,
					.name,
					.phone {
						margin-bottom: 10rpx;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #333;
						line-height: 40rpx;
					}

					.date,
					.address {
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999;
						line-height: 34rpx;
					}
				}

				.icon.arrow {
					width: 19rpx;
					height: 30rpx;
					flex-shrink: 0;
				}
			}

			.logistics {
				position: relative;
				padding-bottom: 30rpx;
				margin-bottom: 30rpx;

				&::after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 0;
					right: 0;
					height: 1rpx;
					background-color: #e8e8e8;
				}

				.content {
					.text {
						color: #2975ff;
					}
				}
			}
		}

		.product-content {
			padding: 30rpx 30rpx 0 30rpx;
			margin: 30rpx;
			background: #ffffff;
			border-radius: 16rpx;

			.product {
				position: relative;
				display: flex;
				align-items: center;

				.pic {
					width: 120rpx;
					height: 120rpx;
					margin-right: 30rpx;
					border-radius: 16rpx;
					flex-shrink: 0;
				}

				.detail {
					position: relative;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					flex: 1;
					height: 120rpx;
					padding-right: 40rpx;

					.name {
						width: 90%;
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

					.price {
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

			.order {
				padding: 30rpx 0;

				.row {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 10rpx;

					&:last-child {
						margin-bottom: 0;
					}

					.label,
					.text {
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999;
						line-height: 34rpx;
					}

					.text.step {
						font-size: 28rpx;
						line-height: 40rpx;
						color: #fc6262;

						&::after {
							content: '步';
							font-size: 20rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #fc6262;
							line-height: 28rpx;
						}
					}
				}
			}

			&>.price {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				height: 100rpx;

				&::before {
					position: absolute;
					top: 0;
					left: 0;
					content: '';
					right: 0;
					height: 2rpx;
					background-color: #e8e8e8;
				}

				.label {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333;
					line-height: 40rpx;
				}

				.text {
					font-size: 32rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #fc6262;
					line-height: 46rpx;

					&::before {
						content: '￥';
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #fc6262;
						line-height: 34rpx;
					}
				}
			}
		}

		.order-content {
			padding: 30rpx 30rpx 0 30rpx;
			margin: 30rpx;
			background: #ffffff;
			border-radius: 16rpx;

			.row {
				position: relative;
				display: flex;
				align-items: center;
				padding-bottom: 30rpx;

				&:last-child {
					padding-bottom: 0;
				}

				.label,
				.text {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333;
					line-height: 40rpx;
				}

				.btn-copy {
					position: absolute;
					right: 0;
					top: 0;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #fc6262;
					line-height: 40rpx;
				}
			}

			.btn-customer {
				position: relative;
				height: 100rpx;
				padding: 30rpx 0;
				box-sizing: border-box;
				text-align: center;

				&::after {
					position: absolute;
					top: 0;
					left: -30rpx;
					right: -30rpx;
					content: '';
					height: 2rpx;
					background-color: #e8e8e8;
				}

				.icon {
					width: 40rpx;
					height: 40rpx;
					margin-right: 10rpx;
					vertical-align: middle;
				}

				.text {
					display: inline-block;
					vertical-align: middle;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #2975ff;
					line-height: 40rpx;
				}

				.btn {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					opacity: 0;
				}
			}
		}

		.btn-content {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			min-height: 100rpx;
			padding: 20rpx 30rpx 0 30rpx;
			background-color: #fff;
			text-align: right;

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
</style>
