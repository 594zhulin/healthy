<template>
	<view class="page-bank">
		<view class="user-content">
			<view class="name">{{ nickName }}</view>
			<image class="avatar" :src="avatarUrl" mode="aspectFit"></image>
		</view>
		<view class="overview-content">
			<image class="background" src="../../static/bank/bank-bg-01.svg" mode="scaleToFill"></image>
			<view class="title">余额</view>
			<view class="step">{{ integral_num }}</view>
			<view class="text">待存步数：{{ no_deposit_str }}步</view>
			<view class="tip">未存入的步数，7天后自动过期</view>
			<image class="btn" src="../../static/bank/bank-img-01.svg" mode="aspectFit"></image>
		</view>
		<view class="chart-content">
			<view class="title">近七日步数</view>
			<view class="chart-list">
				<view class="chart-item" v-for="item in step" :key="item.date">
					<view class="text">{{ item.step }}</view>
					<view class="bar" :style="{ height: item.height }"></view>
					<view class="date">{{ item.date }}</view>
				</view>
			</view>
		</view>
		<view class="desc-content">
			<image class="icon" src="../../static/bank/bank-icon-01.svg" mode="aspectFit"></image>
			<view class="title">如何激活步数</view>
			<view class="btn">订阅提醒</view>
			<view class="text">
				年太清重当队王动快切府队物者叫多养时六火清第断内热识片照素据西识一象活连结如众以则看酸派办化易分术出布布它。花历建身适经需等快白发合便没复增影便
			</view>
		</view>
		<view class="banner-content" @click="switchTab">
			<view class="title">步数商城</view>
			<view class="text">行万步，破万卷 身心得健康</view>
			<image class="background" src="../../static/bank/bank-img-03.png" mode="aspectFit"></image>
			<image class="icon" src="../../static/bank/bank-img-02.png" mode="aspectFit"></image>
		</view>
		<view class="grid-content">
			<view class="grid-item" @click="navigateTo('/pages/ranking/ranking')">
				<image class="icon" src="../../static/bank/bank-icon-02.svg" mode="aspectFit"></image>
				<view class="text">排行榜</view>
			</view>
			<view class="grid-item">
				<image class="icon" src="../../static/bank/bank-icon-03.svg" mode="aspectFit"></image>
				<view class="text">蹭火苗</view>
				<button class="btn" type="default" open-type="share"></button>
			</view>
		</view>
		<view class="list-content">
			<view class="title">我的火苗明细</view>
			<view class="total">
				<view class="fire">
					<image class="icon" src="../../static/bank/bank-icon-04.svg" mode="aspectFit"></image>
					<view class="text">我的火苗（X{{ flame_num }}）</view>
				</view>
				<view class="step">
					<image class="icon" src="../../static/bank/bank-icon-05.svg" mode="aspectFit"></image>
					<view class="text">可存步数（X{{ flame_num }}）</view>
				</view>
			</view>
			<view class="list-item" v-for="item in fire" :key="item.create_at">
				<view class="border"></view>
				<view class="text">{{ item.explain }}</view>
				<view class="date">{{ item.create_at }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getUser, getStep, getFire } from '@/api/bank.js';
import { timestampToTime } from '@/utils/utils.js';
export default {
	data() {
		return {
			avatarUrl: '',
			nickName: '',
			integral_num: 0,
			no_deposit_str: 0,
			flame_num: 0,
			step: [],
			params: {
				pageNo: 1,
				pageSize: 20
			},
			fire: [],
			total: 0
		};
	},
	onLoad() {
		const _this = this;
		uni.login({
			provider: 'weixin',
			success: function(loginRes) {
				console.log(loginRes);
				wx.getWeRunData({
					success(infoRes) {
						console.log(infoRes);
						getStep({ code: loginRes.code, iv: infoRes.iv, encryptedData: infoRes.encryptedData }).then(
							result => {
								const arr = result.stepInfoList.slice(24);
								const maxStep = Math.max.apply(
									Math,
									arr.map(item => {
										return item.step;
									})
								);
								arr.map(item => {
									let obj = {
										step: item.step,
										height: parseInt((item.step / maxStep) * 57) + 'px',
										date: timestampToTime(item.timestamp, 'short')
									};
									_this.step.push(obj);
								});
							},
							err => {}
						);
					}
				});
			}
		});
		getUser().then(
			result => {
				const { avatarUrl, nickName, integral_num, no_deposit_str, flame_num } = result;
				_this.avatarUrl = avatarUrl;
				_this.nickName = nickName;
				_this.integral_num = integral_num;
				_this.no_deposit_str = no_deposit_str;
				_this.flame_num = flame_num;
			},
			err => {}
		);
		this.getListData('down');
	},
	onReachBottom() {
		this.getListData('up');
	},
	onShareAppMessage() {
		const user_id = uni.getStorageSync('user_id');
		return {
			title: this.nickName + '邀请您使用体能观测',
			path: '/pages/home/home?user_id=' + user_id
		};
	},
	methods: {
		getListData(direction) {
			if (direction == 'down') {
				this.params.pageNo = 1;
			} else {
				if (this.fire.length >= this.total) {
					return false;
				}
				this.params.pageNo += 1;
			}
			getFire({ ...this.params }).then(
				result => {
					const { list, total } = result;
					this.fire = direction == 'down' ? list : this.fire.concat(list);
					this.total = total;
				},
				err => {}
			);
		},
		switchTab() {
			uni.switchTab({
				url: '/pages/mall/mall'
			});
		},
		navigateTo(url) {
			uni.navigateTo({
				url
			});
		}
	}
};
</script>

<style lang="less" scoped>
.page-bank {
	margin: 0 42rpx;
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
		height: 382rpx;
		border-radius: 12rpx;
		box-shadow: 0px 0px 12rpx 0px rgba(0, 0, 0, 0.06);
		.background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 382rpx;
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
			font-size: 54rpx;
			font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
			font-weight: bold;
			color: #ffffff;
			line-height: 74rpx;
			text-align: center;
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
		margin: 68rpx 26rpx 70rpx 18rpx;
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
			}
		}
	}
	.desc-content {
		position: relative;
		margin: 0 20rpx 34rpx 20rpx;
		.icon {
			position: absolute;
			top: 6rpx;
			left: 14rpx;
			width: 24rpx;
			height: 24rpx;
		}
		.title {
			margin-left: 54rpx;
			font-size: 24rpx;
			font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
			font-weight: bold;
			color: #373d52;
			line-height: 34rpx;
		}
		.btn {
			position: absolute;
			top: -16rpx;
			right: 8rpx;
			width: 160rpx;
			height: 50rpx;
			background: #2975ff;
			border-radius: 26rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #ffffff;
			line-height: 50rpx;
			text-align: center;
		}
		.text {
			height: 150rpx;
			padding: 16rpx 16rpx 16rpx 14rpx;
			margin-top: 24rpx;
			background: #f7f7f7;
			border-radius: 12rpx;
			box-sizing: border-box;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #bebebe;
			line-height: 30rpx;
			letter-spacing: 4rpx;
			text-align: justify;
		}
	}
	.banner-content {
		position: relative;
		.title {
			margin: 0 0 16rpx 14rpx;
			font-size: 24rpx;
			font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
			font-weight: bold;
			color: #373d52;
			line-height: 34rpx;
		}
		.text {
			font-size: 36rpx;
			font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
			font-weight: 400;
			color: #ffffff;
			line-height: 50rpx;
			text-shadow: 0px 2rpx 4rpx rgba(0, 0, 0, 0.1);
		}
		.background {
			width: 100%;
			height: 176rpx;
		}
		.icon {
			position: absolute;
			right: 16rpx;
			bottom: 12rpx;
			width: 206rpx;
			height: 200rpx;
		}
		.text {
			position: absolute;
			bottom: 44rpx;
			left: 72rpx;
			width: 252rpx;
			height: 100rpx;
			font-size: 36rpx;
			font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
			font-weight: 400;
			color: #ffffff;
			line-height: 50rpx;
			text-shadow: 0px 2rpx 4rpx rgba(0, 0, 0, 0.1);
		}
	}
	.grid-content {
		display: flex;
		align-items: center;
		margin-top: 20rpx;
		.grid-item {
			position: relative;
			width: 318rpx;
			height: 200rpx;
			background: #ffffff;
			border-radius: 12rpx;
			border: 2rpx solid #e4e4e4;
			box-sizing: border-box;
			.icon {
				display: block;
				width: 68rpx;
				height: 68rpx;
				margin: 46rpx auto 20rpx auto;
			}
			&:last-child {
				margin-left: 30rpx;
				.icon {
					width: 44rpx;
					height: 62rpx;
					margin-top: 50rpx;
				}
			}
			.text {
				font-size: 30rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #000000;
				line-height: 42rpx;
				text-align: center;
			}
			.btn {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				opacity: 0;
			}
		}
	}
	.list-content {
		margin-top: 34rpx;
		.title {
			margin-left: 14rpx;
			font-size: 24rpx;
			font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
			font-weight: bold;
			color: #373d52;
			line-height: 34rpx;
		}
		.total {
			display: flex;
			align-items: center;
			margin: 24rpx 0 40rpx 14rpx;
			.fire {
				display: flex;
				align-items: center;
				margin-right: 64rpx;
				.icon {
					width: 26rpx;
					height: 34rpx;
				}
				.text {
					margin-left: 14rpx;
					font-size: 22rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 30rpx;
				}
			}
			.step {
				display: flex;
				align-items: center;
				.icon {
					width: 30rpx;
					height: 30rpx;
				}
			}
			.text {
				margin-left: 6rpx;
				font-size: 22rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 30rpx;
			}
		}
		.list-item {
			position: relative;
			height: 114rpx;
			padding: 18rpx 32rpx 14rpx 32rpx;
			margin-bottom: 20rpx;
			background: #ffffff;
			border-radius: 16rpx;
			border: 2rpx solid #e4e4e4;
			box-sizing: border-box;
			&:nth-child(2n) {
				.border {
					background: #ef5959;
				}
			}
			.border {
				position: absolute;
				top: -2rpx;
				left: -2rpx;
				width: 14rpx;
				height: 112rpx;
				background: #0075ff;
				border-radius: 46rpx 0px 0px 46rpx;
			}
			.text {
				margin-bottom: 12rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 34rpx;
			}
			.date {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 34rpx;
			}
		}
	}
}
</style>
