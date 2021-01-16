<template>
	<view class="page-user">
		<view class="user-content">
			<view class="customer-item">
				<button class="btn" type="default" open-type="contact"></button>
				<image class="icon" src="../../static/user/user-icon-01.svg" mode="aspectFit"></image>
				<view class="text">联系客服</view>
			</view>
			<view class="user-item">
				<image class="avatar" :src="user.avatar" mode="aspectFit"></image>
				<view class="name">
					<view class="text">{{ user.nickname }}</view>
					<image class="icon" src="../../static/user/user-icon-08.png" mode="aspectFit"></image>
				</view>
				<view class="score">
					<image class="icon" src="../../static/user/user-icon-02.svg" mode="aspectFit"></image>
					<view class="text">{{ user.score }}分</view>
				</view>
			</view>
		</view>
		<view class="chart-content">
			<view class="title">体能数据</view>
			<view class="chart-list">
				<view class="chart-item" v-for="item in user.items" :key="item.calbe_id">
					<view class="text">{{ item.score }}′</view>
					<view class="bar" :style="{ height: item.height }"></view>
					<view class="date">{{ item.create_at }}</view>
				</view>
			</view>
		</view>
		<view class="risk-content">
			<view class="title">主流健康风险指数</view>
			<view class="risk-list">
				<view class="risk-item" v-for="item in user.risk" :key="item.risk_report_id">
					<view
						class="tag"
						:class="{ perfect: item.score_label == '健康', good: item.score_label == '低风险', bad: item.score_label == '中风险' || item.score_label == '高风险' }"
					>
						{{ item.score_label }}
					</view>
					<view class="text">{{ item.name }}</view>
				</view>
			</view>
		</view>
		<view class="balance-content">
			<view class="title">我的余额</view>
			<view class="link" @click="navigateTo('/pages/personal/step?integral=' + user.integral)">余额明细></view>
			<view class="step">{{ user.integral }}</view>
			<view class="btn" @click="switchTab">去使用</view>
		</view>
		<view class="address-content">
			<view class="title">地址管理</view>
			<view class="link" @click="navigateTo('/pages/personal/list')">管理></view>
			<view class="address-list">
				<view class="address-item" @click="navigateTo('/pages/personal/detail?id=' + homeAddressId)">家</view>
				<view class="address-item" @click="navigateTo('/pages/personal/detail?id=' + companyAddressId)">公司</view>
				<view class="address-item" @click="navigateTo('/pages/personal/detail?id=' + schoolAddressId)">学校</view>
				<view class="address-item" @click="navigateTo('/pages/personal/detail')"></view>
			</view>
		</view>
		<view class="order-content">
			<view class="title">我的订单</view>
			<view class="link" @click="navigateTo('/pages/order/list')">查看全部></view>
			<view class="order-list">
				<view class="order-item" @click="navigateTo('/pages/order/list?id=0')">
					<image class="icon wait" src="../../static/user/user-icon-03.svg" mode="aspectFit"></image>
					<view class="text">待付款</view>
					<view class="count" v-if="user.orderStatusNum.unpaid_count > 0">{{ user.orderStatusNum.unpaid_count }}</view>
				</view>
				<view class="order-item" @click="navigateTo('/pages/order/list?id=1')">
					<image class="icon pay" src="../../static/user/user-icon-04.svg" mode="aspectFit"></image>
					<view class="text">待发货</view>
					<view class="count" v-if="user.orderStatusNum.unshipped_count > 0">{{ user.orderStatusNum.unshipped_count }}</view>
				</view>
				<view class="order-item" @click="navigateTo('/pages/order/list?id=2')">
					<image class="icon delivery" src="../../static/user/user-icon-05.svg" mode="aspectFit"></image>
					<view class="text">待收货</view>
					<view class="count" v-if="user.orderStatusNum.received_count > 0">{{ user.orderStatusNum.received_count }}</view>
				</view>
				<view class="order-item" @click="navigateTo('/pages/order/list?id=3')">
					<image class="icon signed" src="../../static/user/user-icon-06.svg" mode="aspectFit"></image>
					<view class="text">已签收</view>
					<view class="count" v-if="user.orderStatusNum.evaluated_count > 0">{{ user.orderStatusNum.evaluated_count }}</view>
				</view>
				<view class="order-item" @click="navigateTo('/pages/order/aftersale')">
					<image class="icon aftersale" src="../../static/user/user-icon-07.svg" mode="aspectFit"></image>
					<view class="text">退换/售后</view>
				</view>
			</view>
		</view>
		<custom-tabbar :currentId="4"></custom-tabbar>
	</view>
</template>

<script>
import { getUser, getScore, getRisk, getScoreList, getAddress } from '@/api/user.js';
export default {
	data() {
		return {
			user: {
				avatar: '',
				nickname: '',
				items: [],
				risk: [],
				integral: 0,
				score: 0,
				orderStatusNum: {
					evaluated_count: 0,
					received_count: 0,
					unpaid_count: 10,
					unshipped_count: 0
				}
			},
			homeAddressId: '',
			schoolAddressId: '',
			companyAddressId: ''
		};
	},
	onShow() {
		const _this = this;
		getUser().then(
			result => {
				const { avatar, nickname, integral, orderStatusNum } = result;
				_this.user = { ..._this.user, avatar, nickname, integral, orderStatusNum };
			},
			err => {}
		);
		getScore().then(
			result => {
				const { score } = result;
				_this.user.score = score;
			},
			err => {}
		);
		getScoreList().then(
			result => {
				const arr = result.slice(0, 7).reverse();
				console.log(arr);
				const maxScore = Math.max.apply(
					Math,
					arr.map(item => {
						return item.score;
					})
				);
				_this.user.items = [];
				arr.map(item => {
					let obj = {
						score: item.score,
						height: parseInt((item.score / maxScore) * 57) + 'px',
						create_at: item.create_at.slice(5, 10)
					};
					_this.user.items.push(obj);
				});
			},
			err => {}
		);
		getRisk().then(
			result => {
				_this.user.risk = result;
			},
			err => {}
		);
		getAddress().then(
			result => {
				const homeAddress = result.find(item => item.addr_name == '家');
				const companyAddress = result.find(item => item.addr_name == '公司');
				const schoolAddress = result.find(item => item.addr_name == '学校');
				if (homeAddress) {
					_this.homeAddressId = homeAddress.id;
				}
				if (companyAddress) {
					_this.companyAddressId = companyAddress.id;
				}
				if (schoolAddress) {
					_this.schoolAddressId = schoolAddress.id;
				}
			},
			err => {}
		);
	},
	methods: {
		navigateTo(url) {
			uni.navigateTo({
				url
			});
		},
		switchTab() {
			uni.switchTab({
				url: '/pages/mall/mall'
			});
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #f7f6f9;
	padding-bottom: 128rpx;
}

.page-user {
	.user-content {
		position: relative;
		height: 196rpx;
		margin-bottom: 34rpx;
		background-color: #0056ff;

		.customer-item {
			position: relative;
			display: flex;
			align-items: center;
			float: right;
			padding-right: 48rpx;

			.btn {
				position: absolute;
				right: 48rpx;
				top: 0;
				width: 180rpx;
				height: 42rpx;
				padding: 0;
				opacity: 0;
				z-index: 1;

				&::after {
					display: none;
				}
			}

			.icon {
				width: 30rpx;
				height: 32rpx;
			}

			.text {
				margin-left: 20rpx;
				font-size: 30rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #ffffff;
				line-height: 42rpx;
			}
		}

		.user-item {
			position: absolute;
			left: 60rpx;
			right: 60rpx;
			bottom: 0;
			height: 128rpx;
			margin: 0 auto;
			background: #ffffff;
			box-shadow: 0px -14rpx 12rpx 0px rgba(0, 0, 0, 0.08);
			border-radius: 16rpx 16rpx 0px 0px;

			.avatar {
				position: absolute;
				top: -16rpx;
				left: 32rpx;
				width: 120rpx;
				height: 120rpx;
				border: 2rpx solid #e0e0e0;
				border-radius: 50%;
				background-color: #eee;
			}

			.name {
				display: flex;
				align-items: center;
				margin-left: 176rpx;

				.text {
					margin: 22rpx 14rpx 12rpx 0;
					font-size: 32rpx;
					font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
					font-weight: bold;
					color: #373d52;
					line-height: 44rpx;
				}

				.icon {
					width: 19rpx;
					height: 30rpx;
					margin-top: 12rpx;
				}
			}

			.score {
				display: flex;
				align-items: center;
				margin-left: 176rpx;

				.icon {
					width: 32rpx;
					height: 32rpx;
				}

				.text {
					height: 24rpx;
					padding: 0 10rpx;
					background: #ffd6cb;
					border-radius: 0 4rpx 4rpx 0;
					font-size: 20rpx;
					font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
					font-weight: bold;
					color: #c0806e;
					line-height: 26rpx;
					text-align: center;
				}
			}
		}
	}

	.chart-content {
		height: 268rpx;
		margin: 4vw;
		background-color: #fff;
		border-radius: 10rpx;

		.title {
			padding: 16rpx 0 0 32rpx;
			font-size: 24rpx;
			font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
			font-weight: bold;
			color: #373d52;
			line-height: 34rpx;
		}

		.chart-list {
			display: flex;
			align-items: flex-end;
			margin: 0 18rpx 0 24rpx;
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

	.risk-content {
		height: 210rpx;
		margin: 4vw;
		background: #ffffff;
		border-radius: 10rpx;

		.title {
			padding: 16rpx 0 26rpx 32rpx;
			font-size: 24rpx;
			font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
			font-weight: bold;
			color: #373d52;
			line-height: 34rpx;
		}

		.risk-list {
			display: flex;
			margin: 0 12rpx 0 14rpx;

			.risk-item {
				flex: 1;
				overflow: hidden;

				.tag {
					width: 130rpx;
					height: 48rpx;
					margin: 0 auto 28rpx auto;
					border-radius: 24rpx;
					font-size: 30rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #ffffff;
					line-height: 48rpx;
					text-align: center;
				}

				.tag.perfect {
					background-color: #93bf64;
				}

				.tag.good {
					background-color: #ffc24b;
				}

				.tag.bad {
					background-color: #ff4848;
				}

				.text {
					font-size: 24rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #666666;
					line-height: 30rpx;
					text-align: center;
				}
			}
		}
	}

	.balance-content {
		position: relative;
		height: 210rpx;
		margin: 4vw;
		background: #ffffff;
		border-radius: 10rpx;

		.title {
			padding: 16rpx 0 0 32rpx;
			font-size: 24rpx;
			font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
			font-weight: bold;
			color: #373d52;
			line-height: 34rpx;
		}

		.link {
			position: absolute;
			right: 34rpx;
			top: 16rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #a3a7b9;
			line-height: 34rpx;
		}

		.step {
			margin: 46rpx 0 0 28rpx;
			font-size: 42rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #000000;
			line-height: 60rpx;

			&::after {
				content: '万步';
				margin-left: 4rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 30rpx;
				letter-spacing: 4rpx;
			}
		}

		.btn {
			position: absolute;
			right: 38rpx;
			bottom: 62rpx;
			width: 130rpx;
			height: 48rpx;
			background: #eaf2ff;
			border-radius: 24rpx;
			border: 2rpx solid #a7b7ce;
			box-sizing: border-box;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #7291de;
			line-height: 44rpx;
			text-align: center;
		}
	}

	.address-content {
		position: relative;
		height: 210rpx;
		margin: 4vw;
		background: #ffffff;
		border-radius: 10rpx;

		.title {
			padding: 16rpx 0 0 32rpx;
			font-size: 24rpx;
			font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
			font-weight: bold;
			color: #373d52;
			line-height: 34rpx;
		}

		.link {
			position: absolute;
			top: 16rpx;
			right: 36rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #a3a7b9;
			line-height: 34rpx;
		}

		.address-list {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 30rpx 42rpx 30rpx 32rpx;

			.address-item {
				width: 100rpx;
				height: 100rpx;
				background: #ffffff;
				border: 2rpx solid #a7b7ce;
				border-radius: 50%;
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #7277ff;
				line-height: 96rpx;
				box-sizing: border-box;
				text-align: center;

				&:last-child {
					position: relative;

					&::before {
						display: block;
						content: '';
						position: absolute;
						left: 0;
						top: 0;
						right: 0;
						bottom: 0;
						width: 44rpx;
						height: 8rpx;
						margin: auto;
						background-color: #7291de;
					}

					&::after {
						display: block;
						content: '';
						position: absolute;
						left: 0;
						top: 0;
						right: 0;
						bottom: 0;
						width: 8rpx;
						height: 44rpx;
						margin: auto;
						background-color: #7291de;
					}
				}
			}
		}
	}

	.order-content {
		position: relative;
		height: 210rpx;
		margin: 4vw;
		background: #ffffff;
		border-radius: 10rpx;

		&::after {
			position: absolute;
			top: 84rpx;
			right: 154rpx;
			display: block;
			content: '';
			width: 2rpx;
			height: 66rpx;
			background-color: #e1e1e1;
		}

		.title {
			padding: 16rpx 0 0 32rpx;
			font-size: 24rpx;
			font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
			font-weight: bold;
			color: #373d52;
			line-height: 34rpx;
		}

		.link {
			position: absolute;
			top: 16rpx;
			right: 38rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #a3a7b9;
			line-height: 34rpx;
		}

		.order-list {
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			margin: 40rpx 26rpx 0 54rpx;

			.order-item {
				position: relative;

				.icon {
					display: block;
					margin: 0 auto;
				}

				.icon.wait {
					width: 60rpx;
					height: 42rpx;
					margin-bottom: 22rpx;
				}

				.icon.pay {
					width: 52rpx;
					height: 50rpx;
					margin-bottom: 18rpx;
				}

				.icon.delivery {
					width: 50rpx;
					height: 50rpx;
					margin-bottom: 18rpx;
				}

				.icon.signed {
					width: 52rpx;
					height: 50rpx;
					margin-bottom: 18rpx;
				}

				.icon.aftersale {
					width: 52rpx;
					height: 50rpx;
					margin-bottom: 18rpx;
				}

				.text {
					font-size: 24rpx;
					font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
					font-weight: 400;
					color: #373d52;
					line-height: 34rpx;
				}

				.count {
					position: absolute;
					top: -20rpx;
					right: -10rpx;
					width: 40rpx;
					height: 40rpx;
					line-height: 40rpx;
					background-color: #ff0000;
					border-radius: 50%;
					font-size: 24rpx;
					font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
					font-weight: 400;
					color: #fff;
					text-align: center;
				}
			}
		}
	}
}
</style>
yle>
