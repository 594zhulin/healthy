<template>
	<view class="page-list">
		<view class="list-content">
			<view class="list-item">
				<view class="pic"></view>
				<view class="name">养胃</view>
			</view>
			<view class="list-item">
				<view class="pic"></view>
				<view class="name">防三高</view>
			</view>
			<view class="list-item">
				<view class="pic"></view>
				<view class="name">青少年</view>
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
.page-list {
	.list-content {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin: 36rpx;
		.list-item {
			width: 320rpx;
			height: 290rpx;
			margin-bottom: 40rpx;
			padding: 22rpx 22rpx 0 24rpx;
			background: #ffffff;
			border-radius: 16rpx;
			box-sizing: border-box;
			.pic {
				width: 276rpx;
				height: 190rpx;
				margin-bottom: 22rpx;
				background: #d8d8d8;
				border-radius: 12rpx;
			}
			.name {
				font-size: 28rpx;
				font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
				font-weight: 400;
				color: #000000;
				line-height: 38rpx;
				text-align: center;
			}
		}
	}
}
</style>
