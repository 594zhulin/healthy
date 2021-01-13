<template>
	<view class="page-product" :style="{ paddingBottom: bottom + 'px' }">
		<view class="pic-content">
			<swiper class="swiper" :autoplay="true" :circular="true">
				<swiper-item class="swiper-item" v-for="(item, index) in product.slider_image" :key="index"><image class="image" :src="item" mode="widthFix"></image></swiper-item>
			</swiper>
		</view>
		<view class="detail-content">
			<view class="name">{{ product.store_name }}</view>
			<view class="step" v-if="product.is_model == 1">{{ product.buy_credits }}万</view>
			<view class="text" v-else>￥{{ product.price }}</view>
		</view>
		<view class="title-content"><view class="text">商品详情</view></view>
		<view class="desc-content"><rich-text :nodes="product.description"></rich-text></view>
		<view id="bottom" class="btn-content" :style="{ paddingBottom: isIphoneX ? paddingBottom : '20rpx' }">
			<view class="btn" v-if="product.stock > 0" @click="handleOpen">{{ product.is_model == 1 ? '立即兑换' : '立即购买' }}</view>
			<view class="btn disabled" v-else>库存不足</view>
		</view>
		<custom-modal ref="specsModal" direction="bottom" maskClick>
			<view class="specs-modal">
				<view class="product">
					<image class="pic" :src="sku.image" mode="aspectFit"></image>
					<view class="content">
						<view class="name">{{ product.store_name }}</view>
						<view class="step" v-if="product.is_model == 1">{{ product.buy_credits }}万</view>
						<view class="text" v-else>￥{{ sku.price }}</view>
					</view>
				</view>
				<view class="specs" v-for="item in product.productAttr" :key="item.attr_name">
					<view class="text">{{ item.attr_name }}</view>
					<view class="list-content">
						<view class="list-item" :class="{ active: attr.check }" :key="index" v-for="(attr, index) in item.attr_value" @click="bindAttrChange(item, attr.attr)">
							{{ attr.attr }}
						</view>
					</view>
				</view>
				<view class="count">
					<view class="text">数量</view>
					<view class="input-number">
						<view class="btn-minus" @click="onDecrease"></view>
						<view class="input">{{ cartNum }}</view>
						<view class="btn-plus" @click="onIncrease">+</view>
					</view>
				</view>
				<view class="btn-confirm" @click="handleConfirm">确认</view>
			</view>
		</custom-modal>
	</view>
</template>

<script>
import { getProductDetail, addCart } from '@/api/order.js';
import { formatRichText } from '@/utils/utils.js';
export default {
	data() {
		return {
			isIphoneX: false,
			paddingBottom: '',
			bottom: '',
			product: {
				id: '',
				store_name: '',
				price: '￥0.00',
				stock: 0,
				slider_image: [],
				description: '',
				image: '',
				is_model: 0,
				buy_credits: 0,
				productAttr: [],
				productValue: []
			},
			sku: null,
			cartNum: 1
		};
	},
	onLoad(option) {
		this.isIphoneX = getApp().globalData.isIphoneX;
		this.paddingBottom = getApp().globalData.paddingBottom;
		const query = uni.createSelectorQuery().in(this);
		query
			.select('#bottom')
			.boundingClientRect(data => {
				this.bottom = data.height + 15;
			})
			.exec();
		getProductDetail(option.id, { user_type: 'routine' }).then(
			result => {
				const { id, store_name, price, stock, slider_image, description, image, is_model, buy_credits } = result.storeInfo;
				const { productAttr, productValue } = result;
				this.product = {
					...this.product,
					id,
					store_name,
					price,
					stock,
					slider_image,
					image,
					is_model,
					buy_credits,
					stock,
					productAttr,
					productValue,
					description: formatRichText(description)
				};
				this.product.productAttr.map(item => {
					if (item.attr_value[0]) {
						item.attr_value[0].check = true;
					}
				});
				this.getSku();
			},
			err => {}
		);
	},
	methods: {
		getSku() {
			const sku = [];
			this.product.productAttr.map(item => {
				item.attr_value.map(i => {
					if (i.check) {
						sku.push(i.attr);
					}
				});
			});
			this.sku = this.product.productValue[sku];
		},
		bindAttrChange(item, attr) {
			item.attr_value.map(i => {
				if (i.attr == attr) {
					i.check = true;
				} else {
					i.check = false;
				}
			});
			this.getSku();
		},
		handleOpen() {
			this.$refs['specsModal'].open();
		},
		onDecrease() {
			if (this.cartNum > 1) {
				this.cartNum--;
			}
		},
		onIncrease() {
			if (this.product.stock > this.cartNum) {
				this.cartNum++;
			}
		},
		handleConfirm() {
			console.log(this.sku);
			addCart({ productId: this.product.id, cartNum: this.cartNum, uniqueId: this.sku.unique, new: 1 }).then(
				result => {
					this.$refs['specsModal'].close();
					uni.navigateTo({
						url: '/pages/order/confirm?cartId=' + result.cartId
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
};
</script>

<style lang="less">
page {
	background-color: #f7f6f9;
}
.page-product {
	.pic-content {
		height: 750rpx;
		background-color: #eee;
		.swiper {
			height: 750rpx;
			.image {
				width: 100%;
				height: auto;
			}
		}
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
		.text {
			font-size: 40rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #fc6262;
			line-height: 46rpx;
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
		padding: 60rpx 0;
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
		.btn.disabled {
			background: #eee;
			color: #a3a7b9;
		}
	}
	.specs-modal {
		padding: 0 36rpx 36rpx 36rpx;
		.product {
			display: flex;
			align-items: center;
			padding: 40rpx 0;
			margin-bottom: 60rpx;
			.pic {
				width: 160rpx;
				height: 160rpx;
				flex-shrink: 0;
				margin-right: 30rpx;
				border-radius: 16rpx;
			}
			.content {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 160rpx;
				.name {
					margin-bottom: 20rpx;
					font-size: 28rpx;
					font-family: Alibaba;
					font-weight: normal;
					color: #000;
					line-height: 40rpx;
				}
				.step {
					font-size: 32rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #fc6262;
					line-height: 46rpx;
					&::after {
						content: '步';
						font-size: 18rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #fc6262;
						line-height: 26rpx;
					}
				}
				.text {
					font-size: 32rpx;
					font-family: Alibaba;
					font-weight: normal;
					color: #fc6262;
					line-height: 46rpx;
				}
			}
		}
		.specs {
			margin-top: 52rpx;
			margin-bottom: 56rpx;
			.text {
				font-size: 28rpx;
				font-family: Alibaba;
				font-weight: normal;
				color: rgba(165, 165, 165, 1);
				line-height: 40rpx;
			}
			.list-content {
				display: flex;
				flex-wrap: wrap;
			}
			.list-item {
				width: 178rpx;
				height: 38rpx;
				line-height: 38rpx;
				margin-right: 48rpx;
				margin-top: 30rpx;
				background: rgba(229, 229, 229, 1);
				border-radius: 6rpx;
				font-size: 28rpx;
				font-family: Alibaba;
				font-weight: normal;
				color: rgba(165, 165, 165, 1);
				text-align: center;
			}
			.list-item.active {
				background-color: #fe7910;
				color: #fff;
			}
		}
		.count {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.text {
				font-size: 28rpx;
				font-family: Alibaba;
				font-weight: normal;
				color: rgba(165, 165, 165, 1);
			}
		}
		.input-number {
			display: flex;
			align-items: center;
			border: 2rpx solid #e5e5e5;
			border-radius: 36rpx;
			.input {
				width: 48rpx;
				height: 28rpx;
				line-height: 28rpx;
				margin: 8rpx 0;
				border-left: 2rpx solid #e5e5e5;
				border-right: 2rpx solid #e5e5e5;
				font-size: 28rpx;
				font-family: Alibaba;
				font-weight: normal;
				color: #aeaeae;
				text-align: center;
			}
			.btn-minus,
			.btn-plus {
				position: relative;
				width: 60rpx;
				height: 50rpx;
				line-height: 50rpx;
				font-size: 36rpx;
				font-family: Alibaba;
				font-weight: normal;
				color: #aeaeae;
				text-align: center;
			}
			.btn-minus::after {
				position: absolute;
				top: 0;
				right: 0;
				left: 0;
				bottom: 0;
				margin: auto;
				content: '';
				display: block;
				width: 20rpx;
				height: 4rpx;
				background-color: #aeaeae;
			}
		}
		.btn-confirm {
			height: 70rpx;
			line-height: 70rpx;
			margin: 40rpx 0;
			border-radius: 45rpx;
			background-color: #fe7910;
			font-size: 28rpx;
			font-family: Alibaba;
			font-weight: normal;
			color: #fff;
			text-align: center;
		}
	}
}
</style>
