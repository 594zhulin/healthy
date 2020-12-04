<template>
	<view class="page-measure">
		<view class="status-content"></view>
		<view class="navbar-content">
			<view class="btn"><image class="icon" src="../../static/measure/measure-icon-09.png" mode="aspectFit"></image></view>
			<view class="title">体能观测</view>
		</view>
		<view class="user-content">
			<view class="avatar"></view>
			<view class="content">
				<view class="text">ID：1527</view>
				<view class="text">朱琳</view>
			</view>
			<view class="date">2020-02-02</view>
			<view class="link">
				<image class="icon" src="../../static/measure/measure-icon-01.png" mode="aspectFit"></image>
				<view class="text">历史数据</view>
			</view>
		</view>
		<view class="chart-content"></view>
		<view class="fix-content">
			<view class="ranking-item">
				<image class="icon rank" src="../../static/measure/measure-icon-12.svg" mode="aspectFit"></image>
				<view class="text">体能排行榜</view>
				<image class="icon arrow" src="../../static/measure/measure-icon-11.svg" mode="aspectFit"></image>
			</view>
			<view class="customer-item">
				<image class="icon" src="../../static/measure/measure-icon-10.svg" mode="aspectFit"></image>
				<view class="text">客服</view>
			</view>
		</view>
		<view class="result-content"></view>
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
.page-measure {
	&::after {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		content: '';
		height: 1100rpx;
		background-image: radial-gradient(circle, #80b7ff, #0056ff);
		z-index: -1;
	}
	.status-content {
		height: var(--status-bar-height);
	}
	.navbar-content {
		position: relative;
		height: 88rpx;
		line-height: 88rpx;
		.btn {
			position: absolute;
			top: 0;
			left: 0;
			width: 88rpx;
			height: 88rpx;
			.icon {
				display: block;
				width: 12rpx;
				height: 24rpx;
				margin: 32rpx auto;
			}
		}
		.title {
			font-size: 34rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #ffffff;
			line-height: 88rpx;
			text-align: center;
		}
	}
	.user-content {
		position: relative;
		display: flex;
		align-items: center;
		.avatar {
			width: 120rpx;
			height: 120rpx;
			margin-right: 20rpx;
			background-color: #eee;
			border-radius: 50%;
		}
		.content {
			.text {
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #ffffff;
				line-height: 46rpx;
				&:first-child {
					margin-bottom: 26rpx;
				}
			}
		}
		.date {
			position: absolute;
			top: 82rpx;
			right: 140rpx;
			font-size: 28rpx;
			font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
			font-weight: 400;
			color: #ffffff;
			line-height: 38rpx;
			&::after {
				display: inline-block;
				content: '';
				width: 2rpx;
				height: 18rpx;
				margin-left: 16rpx;
				background-color: #fff;
			}
		}
		.link {
			display: flex;
			align-items: center;
			position: absolute;
			top: 88rpx;
			right: 16rpx;
			.icon {
				width: 26rpx;
				height: 24rpx;
			}
			.text {
				margin-left: 10rpx;
				font-size: 18rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #ffffff;
				line-height: 26rpx;
			}
		}
	}
	.chart-content {
		height: 468rpx;
	}
	.fix-content {
		position: relative;
		height: 60rpx;
		margin-bottom: 50rpx;
		.ranking-item {
			position: absolute;
			top: 0;
			left: 0;
			display: flex;
			align-items: center;
			height: 60rpx;
			background: #ffffff;
			border-radius: 0px 30rpx 30rpx 0px;
			.rank {
				width: 44rpx;
				height: 44rpx;
				margin: 0 20rpx 0 24rpx;
			}
			.text {
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 40rpx;
			}
			.arrow {
				width: 10rpx;
				height: 15rpx;
				margin: 0 22rpx 0 14rpx;
			}
		}
		.customer-item {
			position: absolute;
			right: 16rpx;
			top: 0;
			display: flex;
			align-items: center;
			width: 180rpx;
			height: 60rpx;
			background: rgba(255, 255, 255, 0.19);
			border-radius: 30rpx;
			.icon {
				width: 40rpx;
				height: 40rpx;
				margin: 0 12rpx 0 32rpx;
			}
			.text {
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #ffffff;
				line-height: 40rpx;
			}
		}
	}
}
</style>
