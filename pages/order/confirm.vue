<template>
	<view class="page-confirm" :style="{ paddingBottom: bottom + 'px' }">
		<view class="address-content" @click="navigateTo(order.addressInfo ? '/pages/personal/list' : '/pages/personal/detail')">
			<template v-if="order.addressInfo">
				<image class="icon" src="../../static/order/order-icon-07.svg" mode="aspectFit"></image>
				<view class="content">
					<view class="user">
						<view class="name">{{ order.addressInfo.real_name }}</view>
						<view class="phone">{{ order.addressInfo.phone }}</view>
					</view>
					<view class="address">{{ order.addressInfo.province }}{{ order.addressInfo.city }}{{ order.addressInfo.district }}{{ order.addressInfo.detail }}</view>
				</view>
			</template>
			<template v-else>
				<view class="btn">添加地址</view>
			</template>
			<image class="icon arrow" src="../../static/order/order-icon-08.png" mode="aspectFit"></image>
		</view>
		<view class="product-content">
			<view class="product" v-for="item in order.cartInfo" :key="item.id">
				<image class="pic" :src="item.productInfo.image" mode="aspectFit"></image>
				<view class="detail">
					<view class="name">{{ item.productInfo.store_name }}</view>
					<view class="count">×{{ item.cart_num }}</view>
				</view>
				<image class="icon" src="../../static/order/order-icon-08.png" mode="aspectFit"></image>
			</view>
			<view class="order">
				<view class="row">
					<view class="label">商品总价</view>
					<view class="text">￥{{ order.priceGroup.totalPrice }}</view>
				</view>
				<view class="row">
					<view class="label">快递运费</view>
					<view class="text">￥{{ order.priceGroup.storeFreePostage < parseFloat(order.priceGroup.totalPrice) ? '包邮' : order.priceGroup.storePostage }}</view>
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
				<view class="value">￥{{ order.priceGroup.totalPrice }}</view>
			</view>
			<view class="btn" @click="handleSubmit">提交订单</view>
		</view>
	</view>
</template>

<script>
import { getAddress, confirmOrder, createOrder } from '@/api/order.js';
export default {
	data() {
		return {
			desc: '',
			isIphoneX: false,
			paddingBottom: '',
			bottom: '',
			address: null,
			order: null
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
		getAddress().then(
			result => {
				this.address = result;
			},
			err => {}
		);
	},
	onShow() {
		confirmOrder({ cartId: this.cartId }).then(
			result => {
				this.order = result;
			},
			err => {}
		);
	},
	methods: {
		handleSubmit() {
			createOrder(
				{
					addressId: this.address.id,
					couponId: '',
					payType: 'weixin',
					useIntegral: 0,
					integral_num: 0,
					deductionPrice: 0,
					mark: this.desc,
					from: 'routine'
				},
				this.order.orderKey
			).then(
				result => {
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
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 120rpx;
				padding-right: 40rpx;
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
			.icon {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				width: 19rpx;
				height: 30rpx;
				margin: auto;
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
