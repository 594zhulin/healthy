<template>
	<view class="page-ranking">
		<!-- <view class="tab-content"><view class="tab-item" :class="{ active: tabId == 0 }" @click="bindTabChange(0)">总步数排行</view></view> -->
		<view class="list-content">
			<view class="list-item" v-for="item in ranking" :key="item.id">
				<view class="order">{{ item.ranking_num > 9 ? item.ranking_num : '0' + item.ranking_num }}</view>
				<image class="avatar" :src="item.avatarUrl" mode="aspectFit"></image>
				<view class="name">{{ item.nickName }}</view>
				<view class="step">{{ item.step_num }}万步</view>
			</view>
		</view>
		<view class="fix-content">
			<view class="order">我</view>
			<image class="avatar" :src="avatarUrl" mode="aspectFit"></image>
			<view class="content">
				<view class="name">{{ nickName }}</view>
				<view class="order">第{{ ranking_num }}名</view>
			</view>
			<view class="step">{{ step_num }}万步</view>
		</view>
	</view>
</template>

<script>
import { getRanking } from '@/api/bank.js';
export default {
	data() {
		return {
			tabId: 0,
			params: {
				pageNo: 1,
				pageSize: 20
			},
			ranking_num: 0,
			step_num: 0,
			avatarUrl: '',
			nickName: '',
			ranking: [],
			total: 0
		};
	},
	onLoad() {
		this.getListData('down');
	},
	onPullDownRefresh() {
		this.getListData('down');
	},
	onReachBottom() {
		this.getListData('up');
	},
	methods: {
		getListData(direction) {
			uni.showLoading();
			if (direction == 'down') {
				this.params.pageNo = 1;
			} else {
				if (this.ranking.length >= this.total) {
					return false;
				}
				this.params.pageNo += 1;
			}
			getRanking({ ...this.params }).then(
				result => {
					const { data, total } = result;
					this.ranking = direction == 'down' ? data.list : this.ranking.concat(data.list);
					this.total = total;
					this.ranking_num = data.user.ranking_num;
					this.step_num = data.user.step_num;
					this.avatarUrl = data.user.avatarUrl;
					this.nickName = data.user.nickName;
					uni.stopPullDownRefresh();
					uni.hideLoading();
				},
				err => {
					uni.hideLoading();
				}
			);
		},
		bindTabChange(id) {
			this.tabId = id;
		}
	}
};
</script>

<style lang="less">
.page-ranking {
	// .tab-content {
	// 	display: flex;
	// 	align-items: center;
	// 	justify-content: center;
	// 	height: 116rpx;
	// 	&::after {
	// 		position: absolute;
	// 		top: 0;
	// 		left: 0;
	// 		right: 0;
	// 		content: '';
	// 		height: 232rpx;
	// 		background-color: #0056ff;
	// 		z-index: -1;
	// 	}
	// 	.tab-item {
	// 		position: relative;
	// 		font-size: 36rpx;
	// 		font-family: PingFangSC-Semibold, PingFang SC;
	// 		font-weight: 600;
	// 		color: rgba(255, 255, 255, 0.7);
	// 		line-height: 50rpx;
	// 		&::after {
	// 			content: '';
	// 			position: absolute;
	// 			left: 0;
	// 			right: 0;
	// 			bottom: -10rpx;
	// 			width: 32rpx;
	// 			height: 8rpx;
	// 			margin: auto;
	// 			background: #0056ff;
	// 			border-radius: 4rpx;
	// 		}
	// 		&:first-child {
	// 			margin-right: 84rpx;
	// 		}
	// 	}
	// 	.tab-item.active {
	// 		color: #fff;
	// 		&::after {
	// 			background-color: #fff;
	// 		}
	// 	}
	// }
	.list-content {
		// position: absolute;
		// top: 116rpx;
		// left: 0;
		// right: 0;
		// background: #ffffff;
		// border-radius: 48rpx 48rpx 0px 0px;
		.list-item {
			position: relative;
			display: flex;
			align-items: center;
			height: 120rpx;
			padding: 0 52rpx 0 24rpx;
			&::after {
				content: '';
				position: absolute;
				right: 16rpx;
				bottom: 0;
				width: 558rpx;
				height: 2rpx;
				background-color: #e8e8e8;
			}
			& > .order {
				font-size: 36rpx;
				font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
				font-weight: bold;
				color: #b3b3b3;
				line-height: 50rpx;
			}
			.avatar {
				width: 72rpx;
				height: 72rpx;
				background-color: #eee;
				margin: 0 24rpx 0 16rpx;
				border-radius: 50%;
			}
			.name {
				font-size: 30rpx;
				font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
				font-weight: 400;
				color: #333333;
				line-height: 42rpx;
			}
			.step {
				position: absolute;
				right: 52rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #999999;
				line-height: 34rpx;
			}
		}
	}
	.fix-content {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		height: 122rpx;
		padding: 0 52rpx 0 24rpx;
		background: #fafafa;
		box-shadow: 0px -10rpx 32rpx 0px rgba(0, 0, 0, 0.1);
		& > .order {
			font-size: 36rpx;
			font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
			font-weight: bold;
			color: #000000;
			line-height: 50rpx;
		}
		.avatar {
			width: 72rpx;
			height: 72rpx;
			margin: 0 22rpx;
			border-radius: 50%;
		}
		.content {
			.name {
				margin-bottom: 6rpx;
				font-size: 30rpx;
				font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
				font-weight: 400;
				color: #333333;
				line-height: 42rpx;
			}
			.order {
				font-size: 24rpx;
				font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
				font-weight: bold;
				color: #b3b3b3;
				line-height: 34rpx;
			}
		}
		.step {
			position: absolute;
			right: 52rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #999999;
			line-height: 34rpx;
		}
	}
}
</style>
