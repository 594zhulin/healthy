<template>
	<view class="page-confirm" :style="{ paddingBottom: bottom + 'px' }">
		<view class="address-content" @click="navigateTo(address ? '/pages/personal/list?type=confirm' : '/pages/personal/detail?type=confirm')">
			<template v-if="address">
				<image class="icon" src="../../static/order/order-icon-07.svg" mode="aspectFit"></image>
				<view class="content">
					<view class="user">
						<view class="name">{{ address.real_name }}</view>
						<view class="phone">{{ address.phone }}</view>
					</view>
					<view class="address">{{ address.province }}{{ address.city }}{{ address.district }}{{ address.detail }}</view>
				</view>
			</template>
			<template v-else>
				<image class="icon" src="../../static/order/order-icon-07.svg" mode="aspectFit"></image>
				<view class="content">添加地址</view>
			</template>
			<image class="icon arrow" src="../../static/order/order-icon-08.png" mode="aspectFit"></image>
		</view>
		<view class="product-content" v-if="order">
			<view class="product" v-for="item in order.cartInfo" :key="item.id">
				<image class="pic" :src="item.productInfo.image" mode="aspectFit"></image>
				<view class="detail">
					<view class="name">{{ item.productInfo.store_name }}</view>
					<view class="specs">{{ item.productInfo.attrInfo.suk }}</view>
					<view class="count">×{{ item.cart_num }}</view>
					<view class="step" v-if="item.productInfo.is_model == 1">{{ item.productInfo.buy_credits }}万</view>
					<view class="price" v-else>{{ item.productInfo.attrInfo.price }}</view>
				</view>
			</view>
			<view class="order" v-if="order">
				<view class="row">
					<view class="label">商品总价</view>
					<view class="text">￥{{ order.priceGroup.totalPrice }}</view>
				</view>
				<view class="row">
					<view class="label">快递运费</view>
					<view class="text" v-if="order.priceGroup.storeFreePostage < parseFloat(order.priceGroup.totalPrice)">包邮</view>
					<view class="text" v-else>￥{{ order.priceGroup.storePostage }}</view>
				</view>
				<!-- <view class="row">
					<view class="label">扣除步数</view>
					<view class="text step">-3万</view>
				</view> -->
			</view>
			<view class="desc">
				<view class="text">备注信息</view>
				<textarea class="textarea" v-model="desc" placeholder="请添加备注(150字以内)" />
			</view>
		</view>
		<view id="bottom" class="btn-content" :style="{ paddingBottom: isIphoneX ? paddingBottom : '20rpx' }">
			<view class="price">
				<view class="text">合计:</view>
				<view class="value">￥{{ price || '0.00' }}</view>
			</view>
			<view class="btn" @click="handleSubmit">提交订单</view>
		</view>
	</view>
</template>

<script>
import { getAddress, confirmOrder, getOrderPrice, createOrder, payOrderCallback } from '@/api/order.js';
export default {
	data() {
		return {
			desc: '',
			isIphoneX: false,
			paddingBottom: '',
			bottom: '',
			address: null,
			order: null,
			price: ''
		};
	},
	onLoad(option) {
		this.cartId = option.cartId;
		this.isIphoneX = getApp().globalData.isIphoneX;
		this.paddingBottom = getApp().globalData.paddingBottom;
		const query = uni.createSelectorQuery().in(this);
		query
			.select('#bottom')
			.boundingClientRect(data => {
				this.bottom = data.height + 15;
			})
			.exec();
	},
	onShow() {
		const address = uni.getStorageSync('tempAddress');
		confirmOrder({ cartId: this.cartId }).then(
			result => {
				this.order = result;
				if (result.cartInfo[0].productInfo.is_model == 1) {
					if (result.priceGroup.storeFreePostage > parseFloat(result.priceGroup.totalPrice)) {
						this.price = parseFloat(result.priceGroup.storePostage);
					}
				} else {
					if (result.priceGroup.storeFreePostage > parseFloat(result.priceGroup.totalPrice)) {
						this.price = parseFloat(result.priceGroup.storePostage) + parseFloat(result.priceGroup.totalPrice);
					} else {
						this.price = parseFloat(result.priceGroup.totalPrice);
					}
				}
				console.log(this.price);
				if (address) {
					this.address = JSON.parse(address);
				} else {
					if (result.addressInfo) {
						this.address = result.addressInfo;
					} else {
						this.getAddress();
					}
				}
			},
			err => {}
		);
	},
	methods: {
		getAddress() {
			getAddress().then(
				result => {
					this.address = result[0];
				},
				err => {}
			);
		},
		handleSubmit() {
			this.getOrderPrice();
		},
		getOrderPrice() {
			getOrderPrice(
				{
					addressId: this.address.id,
					couponId: '',
					payType: 'weixin',
					useIntegral: this.order.cartInfo[0].productInfo.is_model,
					integral_num: parseFloat(this.order.cartInfo[0].productInfo.buy_credits) * this.order.cartInfo[0].cartNum,
					deductionPrice: parseFloat(this.order.priceGroup.totalPrice) * this.order.cartInfo[0].cartNum
				},
				this.order.orderKey
			).then(
				result => {
					this.createOrder();
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
		},
		createOrder() {
			createOrder(
				{
					addressId: this.address.id,
					couponId: '',
					payType: 'weixin',
					useIntegral: this.order.cartInfo[0].productInfo.is_model,
					integral_num: parseFloat(this.order.cartInfo[0].productInfo.buy_credits) * this.order.cartInfo[0].cartNum,
					deductionPrice: parseFloat(this.order.priceGroup.totalPrice) * this.order.cartInfo[0].cartNum,
					mark: this.desc,
					from: 'routine'
				},
				this.order.orderKey
			).then(
				result => {
					if (parseFloat(this.price) > 0) {
						this.wxpay(result.jsConfig, result.orderId);
					} else {
						uni.reLaunch({
							url: '/pages/order/result?id=' + result.orderId + '&type=success'
						});
					}
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
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
						payOrderCallback(orderId).then(result => {}, err => {});
						uni.reLaunch({
							url: '/pages/order/result?id=' + orderId + '&type=success'
						});
					}
				},
				fail: function(err) {
					uni.reLaunch({
						url: '/pages/order/result?id=' + orderId + '&type=fail'
					});
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
.page-confirm {
	.address-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 30rpx;
		padding: 30rpx;
		background-color: #fff;
		border-radius: 16rpx;
		& > .icon {
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
			margin-right: 0;
		}
	}
	.product-content {
		padding: 30rpx;
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
				background-color: #eee;
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
					width: 80%;
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
			padding-top: 30rpx;
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
		& > .price {
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
			.label,
			.text {
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333;
				line-height: 44rpx;
			}
			.text {
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
			}
		}
		.desc {
			margin-top: 10rpx;
			.text {
				margin-bottom: 20rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999;
				line-height: 34rpx;
			}
			.textarea {
				width: 100%;
				height: 200rpx;
				padding: 20rpx;
				background-color: #eee;
				box-sizing: border-box;
				border-radius: 8rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999;
				line-height: 34rpx;
			}
		}
	}
	.btn-content {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
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
		.price {
			display: flex;
			align-items: center;
			.text {
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333;
				line-height: 40rpx;
			}
			.value {
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #fc6262;
				line-height: 44rpx;
			}
		}
		.btn {
			display: inline-block;
			vertical-align: middle;
			width: 160rpx;
			height: 60rpx;
			margin-left: 20rpx;
			border-radius: 8rpx;
			background-color: #2975ff;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #fff;
			line-height: 60rpx;
			box-sizing: border-box;
			text-align: center;
		}
	}
}
</style>
