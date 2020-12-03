<template>
	<view class="page-bank">
		<view class="user-content">
			<view class="name">朱琳</view>
			<view class="avatar"></view>
		</view>
		<view class="overview-content">
			<image class="background" src="../../static/bank/bank-bg-01.svg" mode="scaleToFill"></image>
			<view class="title">余额</view>
			<view class="step">76.8万</view>
			<view class="text">待存步数：12.2万步</view>
			<view class="tip">未存入的步数，7天后自动过期</view>
			<image class="btn" src="../../static/bank/bank-img-01.svg" mode="aspectFit"></image>
		</view>
		<view class="chart-content">
			<view class="title">近七日步数</view>
			<view class="chart-list">
				<view class="chart-item">
					<view class="text">1.2w</view>
					<view class="bar" style="height:45px"></view>
					<view class="date">11.13</view>
				</view>
				<view class="chart-item">
					<view class="text">0.8w</view>
					<view class="bar" style="height:30px"></view>
					<view class="date">11.14</view>
				</view>
				<view class="chart-item">
					<view class="text">0.9w</view>
					<view class="bar" style="height:34px"></view>
					<view class="date">11.15</view>
				</view>
				<view class="chart-item">
					<view class="text">1.0w</view>
					<view class="bar" style="height:38px"></view>
					<view class="date">11.16</view>
				</view>
				<view class="chart-item">
					<view class="text">0.9w</view>
					<view class="bar" style="height:34px"></view>
					<view class="date">11.17</view>
				</view>
				<view class="chart-item">
					<view class="text">1.3w</view>
					<view class="bar" style="height:49px"></view>
					<view class="date">11.18</view>
				</view>
				<view class="chart-item">
					<view class="text">1.0w</view>
					<view class="bar" style="height:38px"></view>
					<view class="date">11.19</view>
				</view>
			</view>
		</view>
		<view class="desc-content"></view>
		<view class="banner-content"></view>
		<view class="grid-content">
			<view class="grid-item"></view>
			<view class="grid-item"></view>
		</view>
		<view class="list-content"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="less" scoped>
.page-bank {
	margin: 0 5.6vw;
	.user-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 184rpx;
		margin: 0 16rpx 0 28rpx;
		.name {
			font-size: 50rpx;
			font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
			font-weight: bold;
			color: #373d52;
			line-height: 70rpx;
		}
		.avatar {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			background-color: #eee;
		}
	}
	.overview-content {
		position: relative;
		width: 88.8vw;
		height: 382rpx;
		box-shadow: 0px 10rpx 20rpx 0px rgba(64, 38, 2, 0.2);
		border-radius: 12rpx;
		.background {
			position: absolute;
			top: 0;
			left: 0;
			width: 88.8vw;
			height: 384rpx;
			z-index: -1;
		}
		.title {
			padding: 56rpx 0 24rpx 0;
			font-size: 36rpx;
			font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
			font-weight: 400;
			color: #ffffff;
			line-height: 50rpx;
			text-align: center;
		}
		.step {
			margin-left: 256rpx;
			font-size: 54rpx;
			font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
			font-weight: bold;
			color: #ffffff;
			line-height: 74rpx;
			&::after {
				content: '步';
				font-size: 36rpx;
				font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
				font-weight: 400;
				color: #ffffff;
				line-height: 50rpx;
			}
		}
		.text {
			margin-top: 2rpx;
			font-size: 30rpx;
			font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
			font-weight: 400;
			color: #ffffff;
			line-height: 42rpx;
			text-align: center;
		}
		.tip {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 18rpx;
			font-size: 24rpx;
			font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
			font-weight: 400;
			color: rgba(255, 255, 255, 0.4);
			line-height: 34rpx;
			text-align: center;
		}
		.btn {
			position: absolute;
			right: -26rpx;
			bottom: -38rpx;
			width: 126rpx;
			height: 130rpx;
			animation: twinkling 2.1s infinite ease-in-out;
		}
		@keyframes twinkling {
			0% {
				transform: scale(1);
			}
			50% {
				transform: scale(1.12);
			}
			100% {
				transform: scale(1);
			}
		}
	}
	.chart-content {
		margin: 68rpx 26rpx 60rpx 18rpx;
		.title {
			font-size: 24rpx;
			font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
			font-weight: bold;
			color: #373d52;
			line-height: 34rpx;
		}
		.chart-list {
			display: flex;
			align-items: flex-end;
		}
		.chart-item {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			.text {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #a3a7b9;
				line-height: 34rpx;
			}
			.bar {
				margin: 4rpx 0 14rpx 0;
				width: 22rpx;
				background: linear-gradient(360deg, #5dd7fb 0%, #736fff 100%);
				border-radius: 10rpx;
			}
			.date {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 30rpx;
				letter-spacing: 4rpx;
			}
		}
	}
}
</style>
