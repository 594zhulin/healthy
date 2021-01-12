<template>
	<view class="page-refund" v-if="orderDetail">
		<view class="product-content" v-for="item in orderDetail.cartInfo" :key="item.id">
			<image class="pic" :src="item.productInfo.image" mode="aspectFit"></image>
			<view class="detail">
				<view class="name">{{ item.productInfo.store_name }}</view>
				<view class="specs">{{ item.productInfo.attrInfo.suk }}</view>
				<view class="count">×{{ item.cart_num }}</view>
				<view class="step" v-if="item.productInfo.is_model == 1">
					{{ item.productInfo.buy_credits >= 1000 ? (item.productInfo.buy_credits / 10000).toFixed(2) + '万' : item.productInfo.buy_credits }}
				</view>
				<view class="price" v-else>{{ item.productInfo.attrInfo.price }}</view>
			</view>
		</view>
		<view class="reason-content">
			<view class="label">退款原因</view>
			<picker class="picker" @change="bindPickerChange" :value="index" :range="array">
				<view class="text">{{ array[index] }}</view>
			</picker>
			<image class="icon" src="../../static/train/train-icon-05.png" mode="aspectFit"></image>
		</view>
		<view class="desc-content">
			<view class="label">备注说明</view>
			<input type="text" class="text" v-model="refund_reason_wap_explain" />
		</view>
		<view class="pic-content">
			<view class="label">上传凭证（限3张）</view>
			<view class="pic-list">
				<view class="btn" @click="upload">
					<image class="icon" src="../../static/order/order-icon-10.svg" mode="aspectFit"></image>
					<view class="text">添加照片</view>
				</view>
				<view class="pic-item" v-for="item in picList" :key="item">
					<view class="btn-delete" @click="deleteImg(item)"></view>
					<image class="pic" :src="item" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<view class="btn" @click="handleClick">提交申请</view>
	</view>
</template>

<script>
import { getOrderDetail, getRefundReason, refundOrder, deleteImg } from '@/api/order.js';
export default {
	data() {
		return {
			orderDetail: null,
			array: [],
			index: 0,
			refund_reason_wap_explain: '',
			picList: []
		};
	},
	onLoad(option) {
		getOrderDetail(option.id).then(
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
		getRefundReason().then(
			result => {
				this.array = result;
			},
			err => {
				uni.showToast({
					icon: 'none',
					title: err.text
				});
			}
		);
	},
	methods: {
		bindPickerChange: function(e) {
			this.index = e.target.value;
		},
		upload() {
			const this_ = this;
			uni.chooseImage({
				count: 3,
				success: function(res) {
					// this_.picList = this_.picList.concat(res.tempFilePaths);
					// console.log(JSON.stringify(res.tempFilePaths));
					const token = uni.getStorageSync('token');
					for (let i = 0; i < res.tempFilePaths.length; i++) {
						uni.uploadFile({
							url: 'https://shops.yulongtianzi.com/api/upload/image',
							filePath: res.tempFilePaths[i],
							name: 'pics',
							formData: {
								filename: 'pics'
							},
							header: {
								'Content-Type': 'multipart/form-data',
								'Authori-zation': 'Bearer ' + token
							},
							success: function(res) {
								const data = JSON.parse(res.data);
								if (data.status == 200) {
									this_.picList.push(data.data.url);
								}
							}
						});
					}
				}
			});
		},
		deleteImg(item) {
			let index = this.picList.indexOf(item);
			this.picList.splice(index, 1);
		},
		handleClick() {
			refundOrder({
				text: this.array[this.index],
				uni: this.orderDetail.order_id,
				refund_reason_wap_img: this.picList.join(','),
				refund_reason_wap_explain: this.refund_reason_wap_explain,
				order_status: '-1'
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
};
</script>

<style lang="less">
.page-refund {
	padding-top: 30rpx;
	background-color: #f7f6f9;

	.product-content {
		position: relative;
		display: flex;
		align-items: center;
		padding: 32rpx;
		margin-bottom: 30rpx;
		background-color: #fff;

		.pic {
			width: 160rpx;
			height: 160rpx;
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
			height: 160rpx;

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

	.reason-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 32rpx 0 60rpx;
		margin: 30rpx 0;
		background-color: #ffffff;

		.label {
			width: 112rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 40rpx;
		}

		.picker {
			flex: 1;
			height: 96rpx;
			line-height: 96rpx;
		}

		.text {
			height: 96rpx;
			line-height: 96rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
			text-align: right;
		}

		.icon {
			width: 19rpx;
			height: 30rpx;
			margin-left: 26rpx;
		}
	}

	.desc-content {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 32rpx 0 60rpx;
		background-color: #fff;

		.label {
			white-space: nowrap;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 40rpx;
		}

		.text {
			height: 96rpx;
			line-height: 96rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
			text-align: right;
		}
	}

	.pic-content {
		padding: 30rpx 32rpx 30rpx 60rpx;
		margin: 30rpx 0;
		background-color: #ffffff;

		.label {
			margin-bottom: 20rpx;
			white-space: nowrap;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 40rpx;
		}

		.pic-list {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
		}

		.pic-item {
			position: relative;
			width: 156rpx;
			height: 156rpx;
			margin-right: 14rpx;
			margin-bottom: 14rpx;
			border: 2rpx solid #ddd;
			box-sizing: border-box;

			.pic {
				width: 156rpx;
				height: 156rpx;
				border-radius: 20rpx;
			}
		}

		.btn-delete {
			position: absolute;
			top: -20rpx;
			right: -20rpx;
			width: 40rpx;
			height: 40rpx;
			background: url(../../static/order/order-icon-13.png) no-repeat center;
			background-size: 40rpx 40rpx;
		}

		.btn {
			width: 156rpx;
			height: 156rpx;
			padding: 30rpx 0;
			margin-right: 14rpx;
			margin-bottom: 14rpx;
			border: 2rpx solid #ddd;
			box-sizing: border-box;
			text-align: center;

			.icon {
				width: 50rpx;
				height: 50rpx;
			}

			.text {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999;
				line-height: 34rpx;
			}
		}
	}

	& > .btn {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 102rpx;
		width: 226rpx;
		height: 72rpx;
		margin: 0 auto;
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
</style>
