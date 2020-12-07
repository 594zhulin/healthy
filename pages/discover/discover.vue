<template>
	<view class="page-discover">
		<view class="device-content">
			<view class="device-item">
				<view class="point"><image class="icon" src="../../static/discover/discover-icon-01.svg" mode="aspectFit"></image></view>
				<view class="content">
					<view class="name">安公广场</view>
					<view class="text">安公广场体育锻炼设施处</view>
				</view>
				<view class="distance">4.6km</view>
			</view>
			<view class="device-item">
				<view class="point"><image class="icon" src="../../static/discover/discover-icon-01.svg" mode="aspectFit"></image></view>
				<view class="content">
					<view class="name">安公广场</view>
					<view class="text">安公广场体育锻炼设施处</view>
				</view>
				<view class="distance">4.6km</view>
			</view>
		</view>
		<custom-tabbar :currentId="1"></custom-tabbar>
	</view>
</template>
<script>
export default {
	data() {
		return {
			lower: '',
			upper: '',
			text: ''
		};
	},
	methods: {}
};
</script>

<style lang="less">
page {
	background-color: #f7f6f9;
	padding-bottom: 128rpx;
}
.page-discover {
	.device-content {
		margin: 4vw;
		.device-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 164rpx;
			padding: 0 36rpx;
			margin-bottom: 4vw;
			background: #ffffff;
			border-radius: 16rpx;
			.point {
				width: 86rpx;
				height: 86rpx;
				margin-right: 56rpx;
				background: #2975ff;
				border-radius: 50%;
				.icon {
					display: block;
					width: 38rpx;
					height: 48rpx;
					margin: 20rpx auto;
				}
			}
			.content {
				flex: 1;
				.name {
					margin-bottom: 10rpx;
					font-size: 30rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #333333;
					line-height: 42rpx;
				}
				.text {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
					line-height: 34rpx;
				}
			}
			.distance {
				font-size: 30rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 42rpx;
			}
		}
	}
}
</style>
