<template>
	<view class="page-home">
		<view class="overview-content">
			<view class="score-item">
				<image class="background" src="../../static/home/home-bg-01.svg" mode="aspectFit"></image>
				<image class="icon" src="../../static/home/home-icon-01.svg" mode="aspectFit"></image>
				<view class="title">体能评分</view>
				<view class="date">今日 13:04</view>
				<view class="chart"></view>
				<view class="tag">非常优秀</view>
				<view class="text">超过89%的用户</view>
				<view class="btn">数据报告</view>
			</view>
			<view class="bank-item">
				<image class="background" src="../../static/home/home-bg-02.svg" mode="aspectFit"></image>
				<image class="icon" src="../../static/home/home-icon-02.svg" mode="aspectFit"></image>
				<view class="title">步数银行</view>
				<view class="text">待存入</view>
				<view class="step">5.7万</view>
				<view class="text total">共累计1000万步</view>
				<view class="btn">点我存入</view>
			</view>
		</view>
		<view class="grid-content">
			<view class="grid-item plan">
				<image class="icon" src="../../static/home/home-icon-03.svg" mode="aspectFit"></image>
				<view class="title">AI体能训练计划</view>
				<view class="btn">立即制定</view>
			</view>
			<view class="grid-item mall">
				<image class="icon" src="../../static/home/home-icon-04.svg" mode="aspectFit"></image>
				<view class="title">步数书城</view>
				<view class="text">海量图书</view>
				<view class="text">免费兑换</view>
			</view>
			<view class="grid-item diet">
				<image class="icon" src="../../static/home/home-icon-05.svg" mode="aspectFit"></image>
				<view class="title">膳食健康管理</view>
				<view class="btn">开始评测</view>
			</view>
			<view class="grid-item video">
				<image class="icon" src="../../static/home/home-icon-06.svg" mode="aspectFit"></image>
				<view class="title">黑石健康课堂</view>
				<view class="text">轻松学习</view>
				<view class="text">提高健康素养</view>
			</view>
			<view class="grid-item ranking">
				<image class="icon" src="../../static/home/home-icon-07.svg" mode="aspectFit"></image>
				<view class="content">
					<view class="title">排行榜</view>
					<view class="text">体能排行榜&步数银行排行榜</view>
				</view>
			</view>
		</view>
		<view class="list-content">
			<view class="title">推荐兑换</view>
			<view class="list-item">
				<view class="pic"></view>
				<view class="content">
					<view class="title">做自己的心理医生</view>
					<view class="price">原价：39.9元</view>
					<view class="step">3万</view>
				</view>
			</view>
			<view class="list-item">
				<view class="pic"></view>
				<view class="content">
					<view class="title">做自己的心理医生</view>
					<view class="price">原价：39.9元</view>
					<view class="step">3万</view>
				</view>
			</view>
			<view class="list-item">
				<view class="pic"></view>
				<view class="content">
					<view class="title">做自己的心理医生</view>
					<view class="price">原价：39.9元</view>
					<view class="step">3万</view>
				</view>
			</view>
		</view>
		<custom-tabbar :currentId="0"></custom-tabbar>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onPullDownRefresh() {},
	onReachBottom() {},
	methods: {}
};
</script>

<style lang="less">
page {
	background-color: #f2f2f7;
	padding-bottom: 128rpx;
}
.page-home {
	.overview-content {
		display: flex;
		align-items: flex-end;
		height: 420rpx;
		margin: 4vw 4.8vw;
		.score-item {
			position: relative;
			width: 406rpx;
			height: 420rpx;
			margin-left: -2rpx;
			box-shadow: 0px 10rpx 20rpx 0px rgba(8, 53, 85, 0.2);
			border-radius: 12rpx 50rpx 50rpx 12rpx;
			z-index: 1;
			.background {
				position: absolute;
				top: 0;
				left: 0;
				width: 406rpx;
				height: 420rpx;
				z-index: -1;
			}
			.icon {
				position: absolute;
				top: 40rpx;
				left: 32rpx;
				width: 28rpx;
				height: 30rpx;
			}
			.title {
				padding: 32rpx 0 0 74rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #ffffff;
				line-height: 46rpx;
			}
			.date {
				position: absolute;
				top: 44rpx;
				right: 32rpx;
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 0.7);
				line-height: 28rpx;
			}
			.chart {
				height: 158rpx;
			}
			.tag {
				width: 100rpx;
				height: 30rpx;
				margin-left: 158rpx;
				background: rgba(255, 255, 255, 0.15);
				border-radius: 16rpx;
				font-size: 18rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #ffffff;
				line-height: 30rpx;
				text-align: center;
			}
			.text {
				margin: 18rpx 0 20rpx 0;
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: rgba(255, 255, 255, 0.4);
				line-height: 34rpx;
				text-align: center;
			}
			.btn {
				position: absolute;
				left: 124rpx;
				bottom: 34rpx;
				width: 160rpx;
				height: 50rpx;
				background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
				box-shadow: 0px 10rpx 10rpx 0px rgba(2, 15, 64, 0.1);
				border-radius: 26rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #2879ea;
				line-height: 50rpx;
				text-align: center;
			}
		}
		.bank-item {
			position: relative;
			width: 326rpx;
			height: 330rpx;
			margin-left: -52rpx;
			box-shadow: 0px 10rpx 20rpx 0px rgba(64, 38, 2, 0.2);
			border-radius: 0px 12rpx 12rpx 0px;
			.background {
				position: absolute;
				top: 0;
				left: 0;
				width: 326rpx;
				height: 330rpx;
				z-index: -1;
			}
			.icon {
				position: absolute;
				top: 28rpx;
				left: 88rpx;
				width: 32rpx;
				height: 32rpx;
			}
			.title {
				padding-top: 22rpx;
				margin-left: 134rpx;
				margin-bottom: 10rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #ffffff;
				line-height: 46rpx;
			}
			.step {
				margin-left: 110rpx;
				font-size: 60rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #ffffff;
				line-height: 84rpx;
				&::after {
					content: '步';
					margin-left: 12rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: rgba(255, 255, 255, 0.5);
					line-height: 34rpx;
				}
			}
			.text {
				margin-left: 146rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: rgba(255, 255, 255, 0.5);
				line-height: 34rpx;
			}
			.text.total {
				margin-left: 96rpx;
			}
			.btn {
				position: absolute;
				right: 62rpx;
				bottom: 34rpx;
				width: 160rpx;
				height: 50rpx;
				background: #ffffff;
				box-shadow: 0px 10rpx 10rpx 0px rgba(64, 2, 2, 0.1);
				border-radius: 26rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #df5420;
				line-height: 50rpx;
				text-align: center;
			}
		}
	}
	.grid-content {
		display: flex;
		flex-wrap: wrap;
		margin: 0 0.8vw;
		.grid-item {
			width: 43.2vw;
			height: 320rpx;
			margin-left: 4vw;
			margin-bottom: 4vw;
			background-color: #fff;
			vertical-align: top;
			border-radius: 12rpx;
			.icon {
				display: block;
			}
			.title {
				font-size: 30rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #000000;
				line-height: 42rpx;
				text-align: center;
			}
			.text {
				font-size: 22rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #92a0b6;
				line-height: 30rpx;
				text-align: center;
			}
			.btn {
				width: 148rpx;
				height: 48rpx;
				margin: 0 auto;
				border-radius: 24rpx;
				border: 2rpx solid #9fc7ff;
				box-sizing: border-box;
				font-size: 22rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #0f72ff;
				line-height: 44rpx;
				text-align: center;
			}
		}
		.grid-item.plan {
			.icon {
				width: 56rpx;
				height: 64rpx;
				margin: 48rpx auto 0 auto;
			}
			.title {
				margin: 34rpx 0 50rpx 0;
			}
		}
		.grid-item.mall {
			.icon {
				width: 48rpx;
				height: 64rpx;
				margin: 48rpx auto 0 auto;
			}
			.title {
				margin: 34rpx 0 40rpx 0;
			}
		}
		.grid-item.diet {
			.icon {
				width: 54rpx;
				height: 64rpx;
				margin: 48rpx auto 0 auto;
			}
			.title {
				margin: 50rpx 0 34rpx 0;
			}
		}
		.grid-item.video {
			.icon {
				width: 64rpx;
				height: 64rpx;
				margin: 48rpx auto 0 auto;
			}
			.title {
				margin: 50rpx 0 24rpx 0;
			}
		}
		.grid-item.ranking {
			display: flex;
			align-items: center;
			width: 90.4vw;
			height: 130rpx;
			margin-bottom: 0;
			.icon {
				width: 80rpx;
				height: 76rpx;
				margin: 28rpx 78rpx 28rpx 70rpx;
			}
			.title {
				margin-bottom: 20rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #000000;
				line-height: 40rpx;
				text-align: left;
			}
			.text {
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #92a0b6;
				line-height: 28rpx;
				text-align: left;
			}
		}
	}
	.list-content {
		margin: 4vw 4.8vw;
		border-radius: 12rpx;
		& > .title {
			margin: 0 0 12rpx 38rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #000000;
			line-height: 40rpx;
		}
		& > .title + .list-item {
			border-radius: 12rpx 12rpx 0 0;
		}
		.list-item {
			display: flex;
			align-items: center;
			position: relative;
			height: 210rpx;
			padding: 30rpx 40rpx;
			background-color: #fff;
			box-sizing: border-box;
			&::after {
				position: absolute;
				left: 40rpx;
				right: 40rpx;
				bottom: 0;
				content: '';
				height: 2rpx;
				background-color: #eeeeee;
			}
			&:last-child {
				border-radius: 0 0 12rpx 12rpx;
				&::after {
					display: none;
				}
			}
			.pic {
				flex-shrink: 0;
				width: 150rpx;
				height: 150rpx;
				margin-right: 30rpx;
				background: #d8d8d8;
				border-radius: 20rpx;
			}
			.title {
				font-size: 32rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #000000;
				line-height: 46rpx;
			}
			.price {
				margin: 24rpx 0 4rpx 0;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #92a0b6;
				line-height: 34rpx;
				text-decoration: line-through;
			}
			.step {
				font-size: 32rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #fc6262;
				line-height: 46rpx;
				&::after {
					content: '步';
					font-size: 18rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #fc6262;
					line-height: 26rpx;
				}
			}
		}
	}
}
</style>
