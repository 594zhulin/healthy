<template>
	<view class="page-detail">
		<view class="detail-content">
			<view class="user-row">
				<view class="user-info">
					<view class="avatar"></view>
					<view class="name">{{ video.name }}</view>
				</view>
			</view>
			<view class="title">{{ video.descr }}</view>
			<view class="data-row">
				<view class="data-item view">{{ video.like_num }}</view>
				<view class="data-item support">{{ video.hits }}</view>
				<view class="data-item add">{{ video.measure_num }}</view>
			</view>
		</view>
		<view class="list-content">
			<view class="title">知识体系</view>
			<view class="list-item" v-for="item in items" :key="item.id">{{ item.video_name }}</view>
		</view>
	</view>
</template>

<script>
import { getVideoCategoryDetail, getVideoCategory, follow } from '@/api/video.js';
export default {
	data() {
		return {
			video: null,
			items: [],
			isFollow: false,
			cat_id: ''
		};
	},
	onLoad(option) {
		this.cat_id = option.cat_id;
		getVideoCategoryDetail({ cat_id: option.cat_id }).then(
			result => {
				this.video = result;
			},
			err => {
				uni.showToast({
					icon: 'none',
					title: err.text
				});
			}
		);
		getVideoCategory({ cat_id: option.cat_id, pageNo: 1, pageSize: 10 }).then(
			result => {
				this.items = result;
			},
			err => {
				uni.showToast({
					icon: 'none',
					title: err.text
				});
			}
		);
	}
};
</script>

<style lang="less">
page {
	background: linear-gradient(270deg, rgba(128, 183, 255, 1) 0%, rgba(0, 86, 255, 1) 100%);
}
.page-detail {
	.detail-content {
		.user-row {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 55rpx 16rpx 55rpx 45rpx;
		}
		.user-info {
			display: flex;
			align-items: center;
			.avatar {
				position: relative;
				top: -18rpx;
				width: 80rpx;
				height: 80rpx;
				margin-right: 14rpx;
				border-radius: 72rpx;
				background-color: rgba(255, 255, 255, 1);
			}
			.name {
				font-size: 30rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: rgba(255, 255, 255, 1);
				line-height: 42rpx;
			}
		}
		.title {
			width: 689rpx;
			margin: 0 16rpx 0 45rpx;
			font-size: 30rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			line-height: 42rpx;
		}
		.data-row {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 48rpx 60rpx 32rpx 45rpx;
		}
		.data-item {
			height: 60rpx;
			padding-left: 78rpx;
			font-size: 30rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: rgba(255, 255, 255, 1);
			line-height: 60rpx;
		}
		.data-item.view {
			background: url(../../static/video/view-light.png) no-repeat center left;
			background-size: 60rpx 60rpx;
		}
		.data-item.support {
			background: url(../../static/video/support-light.png) no-repeat center left;
			background-size: 60rpx 60rpx;
		}
		.data-item.add {
			background: url(../../static/video/add-light.png) no-repeat center left;
			background-size: 60rpx 60rpx;
		}
	}
	.list-content {
		position: fixed;
		top: 368rpx;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px -4rpx 20rpx 0px rgba(17, 0, 177, 0.16);
		border-radius: 48rpx 48rpx 0px 0px;
		overflow-y: auto;
		.title {
			position: relative;
			display: flex;
			align-items: center;
			height: 110rpx;
			padding-left: 39rpx;
			font-size: 36rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: rgba(51, 51, 51, 1);
			&::after {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				content: '';
				height: 2rpx;
				background-color: rgba(232, 232, 232, 1);
			}
		}
		.list-item {
			display: flex;
			align-items: center;
			position: relative;
			height: 119rpx;
			padding-left: 55rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(86, 106, 175, 1);
			&::after {
				position: absolute;
				left: 39rpx;
				right: 0;
				bottom: 0;
				content: '';
				height: 2rpx;
				background-color: rgba(232, 232, 232, 1);
			}
		}
	}
}
</style>
