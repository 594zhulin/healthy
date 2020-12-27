<template>
	<view class="page-share">
		<view class="user-content">
			<image class="img" src="../../static/share/share-img-01.svg" mode="aspectFit"></image>
			<image class="avatar" :src="activity.avatarUrl" mode="aspectFit"></image>
			<view class="text">{{ activity.nickName }}</view>
			<view class="line"></view>
		</view>
		<view class="activity-content">
			<view class="title">
				<view class="text">活动项目</view>
				<view class="name">{{ activity.title }}</view>
			</view>
			<view class="date">
				<view class="text">活动时间</view>
				<view class="day">{{ activity.date }} {{ activity.week }}</view>
				<view class="time">{{ activity.time_quantum }}</view>
			</view>
			<view class="status">{{ activity.day }}</view>
		</view>
		<view class="map-content">
			<view class="title">活动地点</view>
			<map class="map" :latitude="activity.latitude" :longitude="activity.longitude"></map>
		</view>
		<view class="detail-content">
			<view class="name">
				<image class="icon" src="../../static/share/share-icon-01.svg" mode="aspectFit"></image>
				<view class="text">{{ activity.address }}</view>
			</view>
			<button class="btn share" type="default" open-type="share"></button>
			<view class="btn">
				<image class="icon" src="../../static/share/share-icon-02.svg" mode="aspectFit"></image>
				<view class="text">转发邀约</view>
			</view>
			<view class="text">已参与</view>
			<view class="member-list">
				<view class="member-item" v-for="item in activity.join" :key="item.nickName"><image class="avatar" :src="item.avatarUrl" mode="aspectFit"></image></view>
				<!-- <view class="member-item">
					<view class="more">
						<view class="dot"></view>
						<view class="dot"></view>
						<view class="dot"></view>
					</view>
				</view> -->
			</view>
			<view class="total">{{ activity.join_num }}人</view>
		</view>
		<view class="btn" @click="handleClick">立即参与</view>
	</view>
</template>

<script>
import { getActivityDetail, joinActivity } from '@/api/train.js';
export default {
	data() {
		return {
			activity: null
		};
	},
	onLoad(option) {
		getActivityDetail({ activity_id: option.id }).then(
			result => {
				this.activity = result;
			},
			err => {}
		);
	},
	onShareAppMessage() {
		return {
			title: '快来跟我一起组队运动吧',
			path: '/pages/train/share?id=' + this.activity.id,
			imageUrl: '../../static/share/share-img-01.svg'
		};
	},
	methods: {
		handleClick() {
			const user_id = uni.getStorageSync('user_id');
			joinActivity({ participator_user_id: user_id, activity_id: this.activity.id }).then(
				result => {
					uni.showToast({
						icon: 'none',
						title: '参与成功'
					});
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #f7f6f9;
}
.page-share {
	margin: 20rpx 32rpx;
	padding-bottom: 54rpx;
	background: #ffffff;
	border-radius: 16rpx;
	& > .btn {
		width: 226rpx;
		height: 72rpx;
		margin: 0 auto;
		background: #2975ff;
		border-radius: 4rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #ffffff;
		line-height: 72rpx;
		text-align: center;
	}
	.user-content {
		position: relative;
		height: 218rpx;
		margin-bottom: 34rpx;
		.img {
			position: absolute;
			top: 18rpx;
			right: 42rpx;
			width: 262rpx;
			height: 198rpx;
		}
		.avatar {
			position: absolute;
			top: 54rpx;
			left: 52rpx;
			width: 84rpx;
			height: 84rpx;
			border: 2rpx solid #e0e0e0;
			background-color: #eee;
			border-radius: 50%;
			box-sizing: border-box;
		}
		.text {
			padding: 72rpx 0 0 162rpx;
			font-size: 18px;
			font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
			font-weight: 400;
			color: #373d52;
			line-height: 25px;
		}
		.line {
			position: absolute;
			left: 70rpx;
			bottom: 34rpx;
			width: 40rpx;
			height: 10rpx;
		}
	}
	.activity-content {
		position: relative;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		.title {
			margin-left: 60rpx;
			.text {
				font-size: 24rpx;
				font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
				font-weight: 400;
				color: #a3a7b9;
				line-height: 34rpx;
			}
			.name {
				margin-top: 22rpx;
				font-size: 25px;
				font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
				font-weight: bold;
				color: #373d52;
				line-height: 35px;
			}
		}
		.date {
			flex-shrink: 0;
			margin: 0 40rpx;
			.text {
				font-size: 24rpx;
				font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
				font-weight: 400;
				color: #a3a7b9;
				line-height: 34rpx;
			}
			.day {
				margin: 20rpx 0 10rpx 0;
			}
			.day,
			.time {
				font-size: 24rpx;
				font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
				font-weight: bold;
				color: #373d52;
				line-height: 34rpx;
			}
		}
		.status {
			flex-shrink: 0;
			margin: 56rpx 56rpx 0 0;
			font-size: 24rpx;
			font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
			font-weight: bold;
			color: #bfbfbf;
			line-height: 34rpx;
		}
	}
	.map-content {
		margin: 36rpx 28rpx 42rpx 40rpx;
		.title {
			margin: 0 0 18rpx 20rpx;
			font-size: 12px;
			font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
			font-weight: 400;
			color: #a3a7b9;
			line-height: 34rpx;
		}
		.map {
			width: 100%;
			height: 226rpx;
		}
	}
	.detail-content {
		position: relative;
		margin: 0 26rpx 76rpx 42rpx;
		& > .text {
			margin: 24rpx 0 18rpx 24rpx;
			font-size: 12px;
			font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
			font-weight: 400;
			color: #a3a7b9;
			line-height: 17px;
		}
		.name {
			display: flex;
			align-items: center;
			padding-right: 200rpx;
			.icon {
				width: 32rpx;
				height: 32rpx;
				flex-shrink: 0;
			}
			.text {
				margin-left: 18rpx;
				font-size: 24rpx;
				font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
				font-weight: bold;
				color: #373d52;
				line-height: 34rpx;
			}
		}
		.btn {
			position: absolute;
			top: 0;
			right: 0;
			display: flex;
			align-items: center;
			width: 180rpx;
			height: 60rpx;
			padding: 0;
			background: #ffffff;
			border-radius: 8rpx;
			border: 2rpx solid #8cb5ff;
			box-sizing: border-box;
			&::after {
				display: none;
			}
			.icon {
				width: 24rpx;
				height: 24rpx;
				margin: 0 16rpx 0 24rpx;
			}
			.text {
				font-size: 24rpx;
				font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
				font-weight: 400;
				color: #2975ff;
				line-height: 34rpx;
			}
		}
		.btn.share {
			z-index: 1;
			background: none;
			padding: 0;
			&::after {
				display: none;
			}
		}
		.member-list {
			display: flex;
			align-items: center;
			margin-left: 54rpx;

			.member-item {
				margin-left: -30rpx;
				.avatar,
				.more {
					width: 84rpx;
					height: 84rpx;
					border: 2rpx solid #e0e0e0;
					background-color: #eee;
					border-radius: 50%;
					box-sizing: border-box;
				}
				.more {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 14rpx;
					background-color: #fff;
					.dot {
						width: 12rpx;
						height: 12rpx;
						background: #d8d8d8;
						border-radius: 50%;
					}
				}
			}
		}
		.total {
			position: absolute;
			right: 22rpx;
			bottom: 24rpx;
			font-size: 24rpx;
			font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
			font-weight: 400;
			color: #000000;
			line-height: 34rpx;
		}
	}
}
</style>
