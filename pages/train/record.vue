<template>
	<view class="page-record">
		<view class="list-content">
			<view class="list-item">
				<view class="title">
					<view class="text">足球</view>
					<view class="date">2020/11/11 15:30</view>
				</view>
				<view class="content join">
					<image class="icon" src="../../static/record/record-icon-01.svg" mode="aspectFit"></image>
					<view class="text">参与人数：2人</view>
				</view>
				<view class="content status">
					<image class="icon" src="../../static/record/record-icon-02.svg" mode="aspectFit"></image>
					<view class="text">成功打卡休闲运动</view>
				</view>
			</view>
			<view class="list-item">
				<view class="title">
					<view class="text">足球</view>
					<view class="date">2020/11/11 15:30</view>
				</view>
				<view class="content join">
					<image class="icon" src="../../static/record/record-icon-01.svg" mode="aspectFit"></image>
					<view class="text">参与人数：2人</view>
				</view>
				<view class="content status">
					<image class="icon" src="../../static/record/record-icon-02.svg" mode="aspectFit"></image>
					<view class="text">成功打卡休闲运动</view>
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
.page-record {
	.list-content {
		.list-item {
			height: 224rpx;
			margin: 4vw;
			background: #ffffff;
			border-radius: 16rpx;
			.title {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 80rpx;
				padding: 0 32rpx;
				&::after {
					content: '';
					position: absolute;
					left: 32rpx;
					right: 32rpx;
					bottom: 0;
					height: 2rpx;
					background-color: #e8e8e8;
				}
				.text {
					font-size: 30rpx;
					font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
					font-weight: bold;
					color: #000000;
					line-height: 42rpx;
				}
				.date {
					font-size: 30rpx;
					font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
					font-weight: 400;
					color: #666666;
					line-height: 42rpx;
				}
			}
			.content {
				display: flex;
				align-items: center;
				margin-left: 44rpx;
				.text {
					margin-left: 16rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 34rpx;
				}
			}
			.content.join {
				margin-top: 32rpx;
				.icon {
					width: 24rpx;
					height: 24rpx;
				}
			}
			.content.status {
				margin-top: 18rpx;
				.icon {
					width: 30rpx;
					height: 22rpx;
				}
			}
		}
	}
}
</style>
