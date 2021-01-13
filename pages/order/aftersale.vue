<template>
	<view class="page-aftersale">
		<view class="list-content">
			<view class="list-item" v-for="item in order" :key="item.id" @click="navigateTo('/pages/order/detail?id=' + item.order_id)">
				<view class="title">
					<view class="number">订单编号：{{ item.order_id }}</view>
					<view class="status" v-if="item.status == -3">退款中</view>
				</view>
				<view class="product" v-for="cart in item.cartInfo" :key="cart.id">
					<image class="pic" :src="cart.productInfo.image" mode="aspectFit"></image>
					<view class="detail">
						<view class="name">{{ cart.productInfo.store_name }}</view>
						<view class="specs">{{ cart.productInfo.attrInfo.suk }}</view>
						<view class="count">×{{ cart.cart_num }}</view>
						<view class="step" v-if="cart.productInfo.is_model == 1">{{ cart.productInfo.buy_credits }}万</view>
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
			</view>
		</view>
	</view>
</template>

<script>
import { getOrder } from '@/api/order.js';
export default {
	data() {
		return {
			params: {
				type: '-3',
				page: 1,
				limit: 20
			},
			order: [],
			total: 0
		};
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
					const { list, total } = result;
					this.order = direction == 'down' ? list : this.order.concat(list);
					this.total = total;
				},
				err => {}
			);
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
.page-aftersale {
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
		}
	}
}
</style>
