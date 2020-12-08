<template>
	<view class="page-history">
		<view class="list-content">
			<view class="list-item">
				<view class="score">
					<view class="tag">
						<image class="icon" src="../../static/measure/measure-icon-13.png" mode="aspectFit"></image>
						<view class="text">优</view>
					</view>
					<view class="text">93.2分</view>
				</view>
				<view class="date">
					<view class="text">2019.06.02 12:00</view>
					<image class="icon" src="../../static/measure/measure-icon-14.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="less">
page {
	background-color: #f7f6f9;
}
.page-history {
	.list-content {
		.list-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 164rpx;
			margin: 30rpx;
			padding: 0 36rpx;
			background: #ffffff;
			border-radius: 16rpx;
			.score {
				display: flex;
				align-items: center;
				& > .text {
					margin-left: 14rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #2975ff;
					line-height: 26rpx;
				}
				.tag {
					position: relative;
					width: 72rpx;
					height: 78rpx;
					.icon {
						position: absolute;
						top: 0;
						left: 0;
						width: 72rpx;
						height: 78rpx;
					}
					.text {
						position: relative;
						font-size: 48rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #ffffff;
						line-height: 78rpx;
						text-align: center;
					}
				}
			}
			.date {
				display: flex;
				align-items: center;
				.text {
					margin-right: 52rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 38rpx;
				}
				.icon {
					width: 19rpx;
					height: 30rpx;
				}
			}
		}
	}
}
</style>
