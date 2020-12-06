<template>
	<view class="page-detail">
		<view class="title">#养胃</view>
		<view class="desc-content">
			简介：年太清重当队王动快切府队物者叫多养时六火清第断内热识片照素据西识一象活连结如众以则看酸派办化易分术出布布它。花历建身适经需等快白发合便没复增影便
		</view>
		<view class="list-content">
			<view class="list-item">
				<view class="pic"></view>
				<view class="name">八宝粥</view>
			</view>
			<view class="list-item">
				<view class="pic"></view>
				<view class="name">小米粥</view>
			</view>
			<view class="list-item">
				<view class="pic"></view>
				<view class="name">八宝粥</view>
			</view>
			<view class="list-item">
				<view class="pic"></view>
				<view class="name">小米粥</view>
			</view>
			<view class="list-item">
				<view class="pic"></view>
				<view class="name">八宝粥</view>
			</view>
			<view class="list-item">
				<view class="pic"></view>
				<view class="name">小米粥</view>
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
.page-detail {
	margin: 4vw;
	padding: 40rpx 0;
	background: #ffffff;
	border-radius: 16rpx;
	.title {
		margin: 0 0 24rpx 64rpx;
		font-size: 36rpx;
		font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
		font-weight: bold;
		color: #000000;
		line-height: 50rpx;
	}
	.desc-content {
		margin: 0 64rpx 60rpx 64rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 30rpx;
		letter-spacing: 4rpx;
		text-align: justify;
	}
	.list-content {
		display: flex;
		flex-wrap: wrap;
		.list-item {
			margin-left: 42rpx;
			margin-bottom: 20rpx;
			.pic {
				width: 278rpx;
				height: 278rpx;
				background: #d8d8d8;
				border-radius: 12rpx;
			}
			.name {
				margin: 20rpx 0 20rpx 16rpx;
				font-size: 24rpx;
				font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
				font-weight: bold;
				color: #000000;
				line-height: 34rpx;
			}
		}
	}
}
</style>
