<template>
	<view class="page-plan">
		<view class="radar-content">
			<image class="background" src="../../static/train/train-bg-01.svg" mode="scaleToFill"></image>
			<view class="chart"></view>
		</view>
		<view class="train-content">
			<view class="today-item">
				<view class="title">今日</view>
				<view class="step">11,245</view>
				<view class="text">训练记录</view>
				<view class="record">
					<view class="fire">
						<image class="icon" src="../../static/train/train-icon-01.svg" mode="aspectFit"></image>
						<view class="count"></view>
					</view>
					<view class="training">
						<image class="icon" src="../../static/train/train-icon-02.svg" mode="aspectFit"></image>
						<view class="count"></view>
					</view>
					<view class="diet">
						<image class="icon" src="../../static/train/train-icon-03.svg" mode="aspectFit"></image>
						<view class="count"></view>
					</view>
				</view>
				<view class="btn">立即训练</view>
			</view>
			<view class="week-item">
				<view class="title">近七天运动量统计</view>
				<view class="record">
					<view class="label">活动量：</view>
					<view class="value">
						<view class="count">8,000</view>
						<view class="unit">步</view>
					</view>
				</view>
				<view class="record">
					<view class="label">有氧运动：</view>
					<view class="value">
						<view class="count">3</view>
						<view class="unit">次</view>
					</view>
				</view>
				<view class="record">
					<view class="label">休闲运动：</view>
					<view class="value">
						<view class="count">0</view>
						<view class="unit">次</view>
					</view>
				</view>
				<view class="record">
					<view class="label">力量训练：</view>
					<view class="value">
						<view class="count">5</view>
						<view class="unit">次</view>
					</view>
				</view>
				<view class="record">
					<view class="label">柔韧训练：</view>
					<view class="value">
						<view class="count">3</view>
						<view class="unit">次</view>
					</view>
				</view>
				<view class="btn">休闲组队</view>
				<view class="link">组队记录</view>
			</view>
		</view>
		<view class="trend-content">
			<view class="title">您的身体素质趋势</view>
			<view class="date">2020/11/11 20:00</view>
		</view>
		<view class="desc-content"><view class="title">AI智能训练简介</view></view>
		<view class="list-content">
			<view class="title">动作库</view>
			<view class="list-item">
				<view class="video"></view>
				<view class="content">
					<view class="title">俯卧撑</view>
					<view class="text">目标：手臂肌肉群，背部肌肉群</view>
					<view class="text">好处：改善肩颈问题，增强手臂美…</view>
				</view>
			</view>
			<view class="list-item">
				<view class="video"></view>
				<view class="content">
					<view class="title">俯卧撑</view>
					<view class="text">目标：手臂肌肉群，背部肌肉群</view>
					<view class="text">好处：改善肩颈问题，增强手臂美…</view>
				</view>
			</view>
			<view class="list-item">
				<view class="video"></view>
				<view class="content">
					<view class="title">俯卧撑</view>
					<view class="text">目标：手臂肌肉群，背部肌肉群</view>
					<view class="text">好处：改善肩颈问题，增强手臂美…</view>
				</view>
			</view>
			<view class="list-item">
				<view class="video"></view>
				<view class="content">
					<view class="title">俯卧撑</view>
					<view class="text">目标：手臂肌肉群，背部肌肉群</view>
					<view class="text">好处：改善肩颈问题，增强手臂美…</view>
				</view>
			</view>
			<view class="list-item">
				<view class="video"></view>
				<view class="content">
					<view class="title">俯卧撑</view>
					<view class="text">目标：手臂肌肉群，背部肌肉群</view>
					<view class="text">好处：改善肩颈问题，增强手臂美…</view>
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
.page-plan {
	.radar-content {
		position: relative;
		height: 600rpx;
		margin-bottom: 50rpx;
		.background {
			position: absolute;
			top: -2rpx;
			left: 0;
			width: 100%;
			height: 600rpx;
			z-index: -1;
		}
	}
	.train-content {
		display: flex;
		align-items: flex-end;
		height: 420rpx;
		margin: 0 4vw;
		.today-item {
			position: relative;
			width: 326rpx;
			height: 420rpx;
			background-color: #fff;
			box-shadow: 0px 0px 12rpx 0px rgba(0, 0, 0, 0.06);
			border-radius: 16rpx;
			z-index: 1;
			.title {
				margin: 32rpx 0 28rpx 36rpx;
				font-size: 24rpx;
				font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
				font-weight: bold;
				color: #373d52;
				line-height: 34rpx;
			}
			.step {
				margin-left: 98rpx;
				font-size: 42rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #000000;
				line-height: 60rpx;
				&::after {
					content: '步';
					margin-left: 14rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 30rpx;
					letter-spacing: 4rpx;
				}
			}
			.text {
				margin: 43rpx 0 34rpx 36rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(0, 0, 0, 0.5);
				line-height: 34rpx;
			}
			.record {
				display: flex;
				align-items: center;
				margin: 0 16rpx 40rpx 54rpx;
				.fire,
				.training,
				.diet {
					flex: 1;
					display: flex;
					align-items: center;
				}
				.fire .icon,
				.training .icon {
					width: 30rpx;
				}
				.diet .icon {
					width: 40rpx;
				}
				.icon {
					height: 36rpx;
				}
				.count {
					margin-left: 8rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
					line-height: 34rpx;
				}
			}
			.btn {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 82rpx;
				background: #2975ff;
				border-radius: 16rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #ffffff;
				line-height: 82rpx;
				text-align: center;
			}
		}
		.week-item {
			position: relative;
			width: 380rpx;
			height: 390rpx;
			margin-left: -2vw;
			background: #ffffff;
			border-radius: 16rpx;
			.title {
				margin: 18rpx 0 12rpx 44rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #000000;
				line-height: 34rpx;
			}
			.record {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 0 38rpx 18rpx 44rpx;
				.label {
					min-width: 102rpx;
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(0, 0, 0, 0.5);
					line-height: 28rpx;
					text-align: right;
				}
				.value {
					display: flex;
					align-items: center;
				}
				.count {
					font-size: 24rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #000000;
					line-height: 34rpx;
				}
				.unit {
					margin-left: 10rpx;
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 30rpx;
					letter-spacing: 2rpx;
				}
			}
			.btn {
				position: absolute;
				bottom: 18rpx;
				left: 118rpx;
				width: 160rpx;
				height: 50rpx;
				background: #cfe0ff;
				border-radius: 26rpx;
				border: 2rpx solid #74a5ff;
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #7291de;
				line-height: 46rpx;
				text-align: center;
				box-sizing: border-box;
			}
			.link {
				position: absolute;
				right: 26rpx;
				bottom: 16rpx;
				width: 40rpx;
				height: 56rpx;
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #2975ff;
				line-height: 28rpx;
			}
		}
	}
	.trend-content {
		position: relative;
		height: 410rpx;
		margin: 4vw;
		background-color: #fff;
		border-radius: 10rpx;
		.title {
			padding: 26rpx 0 10rpx 18rpx;
			font-size: 24rpx;
			font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
			font-weight: bold;
			color: #373d52;
			line-height: 34rpx;
		}
		.date {
			position: absolute;
			top: 26rpx;
			right: 12rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #a3a7b9;
			line-height: 34rpx;
		}
	}
	.desc-content {
		height: 906rpx;
		margin: 4vw;
		background: #ffffff;
		border-radius: 10rpx;
		.title {
			padding: 26rpx 0 10rpx 18rpx;
			font-size: 24rpx;
			font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
			font-weight: bold;
			color: #373d52;
			line-height: 34rpx;
		}
	}
	.list-content {
		height: 940rpx;
		margin: 4vw;
		background: #ffffff;
		border-radius: 10rpx;
		& > .title {
			padding: 26rpx 0 12rpx 18rpx;
			font-size: 24rpx;
			font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
			font-weight: bold;
			color: #373d52;
			line-height: 34rpx;
		}
		.list-item {
			position: relative;
			display: flex;
			align-items: center;
			padding: 20rpx 26rpx 20rpx 34rpx;
			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 28rpx;
				right: 26rpx;
				height: 2rpx;
				background-color: #e0e0e0;
			}
			&:last-child::after {
				display: none;
			}
			.video {
				width: 216rpx;
				height: 130rpx;
				margin-right: 30rpx;
				background: #d8d8d8;
				border-radius: 8rpx;
				border: 2rpx solid #979797;
				box-sizing: border-box;
			}
			.title {
				margin-bottom: 22rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 34rpx;
			}
			.text {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(0, 0, 0, 0.5);
				line-height: 34rpx;
			}
		}
	}
}
</style>
