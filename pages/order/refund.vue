<template>
	<view class="page-refund">
		<view class="product-content">
			<view class="pic"></view>
			<view class="detail">
				<view class="title">热量仅150kcal的魔芋粉 好吃轻“腹”担</view>
				<view class="row">
					<view class="count">×1</view>
					<view class="price">￥40.00</view>
				</view>
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
			<textarea class="text" value="xxxxxxxxxxxxxxxxxx" placeholder="" />
		</view>
		<view class="pic-content">
			<view class="label">上传凭证（限3张）</view>
			<view class="btn">
				<image class="icon" src="../../static/order/order-icon-10.svg" mode="aspectFit"></image>
				<view class="text">添加照片</view>
			</view>
		</view>
		<view class="btn">提交申请</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			array: ['中国', '美国', '巴西', '日本'],
			index: 0
		};
	},
	methods: {
		bindPickerChange: function(e) {
			this.index = e.target.value;
		}
	}
};
</script>

<style lang="less">
.page-refund {
	padding-top: 30rpx;
	background-color: #f7f6f9;
	.product-content {
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
			background-color: #eee;
			flex-shrink: 0;
		}
		.detail {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex: 1;
			height: 160rpx;
			.title {
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333;
				line-height: 40rpx;
			}
			.row {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.count {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999;
					line-height: 34rpx;
				}
				.price {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333;
					line-height: 40rpx;
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
		.btn {
			width: 156rpx;
			height: 156rpx;
			padding: 30rpx 0;
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
