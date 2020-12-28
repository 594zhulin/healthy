<template>
	<view class="page-detail">
		<view class="video-content"><video :src="detail.video_url_clouds" :poster="detail.video_content_clouds" controls></video></view>
		<view class="detail-content">
			<view class="title">{{ detail.motion_name }}（不限场地）</view>
			<view class="detail">
				<view class="level">
					<view class="text">LEVEL</view>
					<view class="value">{{ detail.rating }}</view>
				</view>
				<view class="name">{{ detail.cate_name }}</view>
			</view>
			<view class="desc">{{ detail.gist_remark }}</view>
		</view>
		<view class="test-content">
			<view class="title">
				<image class="icon" src="../../static/train/train-icon-04.svg" mode="aspectFit"></image>
				<view class="text">练习频次</view>
			</view>
			<view class="text">{{ detail.exercise_frequency }}</view>
			<!-- <view class="text">30分钟为一组</view> -->
		</view>
		<view class="btn" @click="clocked">免教学打卡</view>
	</view>
</template>

<script>
import { getTrainDetail, clocked } from '@/api/train.js';
export default {
	data() {
		return {
			detail: null
		};
	},
	onLoad(option) {
		getTrainDetail({ motion_id: option.id }).then(
			result => {
				this.detail = result;
			},
			err => {}
		);
	},
	methods: {
		clocked() {
			clocked({ motion_id: this.detail.id, cat_id: this.detail.cat_id }).then(
				result => {
					uni.showToast({
						icon: 'none',
						title: '打卡成功'
					});
				},
				err => {}
			);
		}
	}
};
</script>

<style lang="less" scoped>
.page-detail {
	.video-content {
		height: 376rpx;
		background: rgba(0, 0, 0, 0.4);
		video {
			width: 100%;
			height: 376rpx;
		}
	}
	.detail-content {
		margin: 0 32rpx 0 42rpx;
		.title {
			margin: 30rpx 0 42rpx 0;
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
			line-height: 50rpx;
		}
		.detail {
			display: flex;
			align-items: center;
			.level {
				display: flex;
				align-items: center;
				.text {
					font-size: 24rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #a0a0a0;
					line-height: 34rpx;
				}
				.value {
					margin-left: 12rpx;
					font-size: 36rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #666666;
					line-height: 50rpx;
				}
			}
			.name {
				margin-left: 44rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #a0a0a0;
				line-height: 34rpx;
			}
		}
		.desc {
			margin: 48rpx 0 46rpx 0;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
			line-height: 34rpx;
			letter-spacing: 2rpx;
			text-align: justify;
		}
	}
	.test-content {
		margin-left: 48rpx;
		.title {
			display: flex;
			align-items: center;
			margin-bottom: 40rpx;
			.icon {
				width: 30rpx;
				height: 34rpx;
			}
			.text {
				margin-left: 18rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 40rpx;
			}
		}
		.text {
			margin-bottom: 2rpx;
			margin-left: 38rpx;
			font-size: 20rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
			line-height: 34rpx;
			letter-spacing: 2rpx;
		}
	}
	.btn {
		width: 225rpx;
		height: 72rpx;
		line-height: 72rpx;
		margin: 60rpx auto 0 auto;
		background: #2975ff;
		border-radius: 4rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #ffffff;
		text-align: center;
	}
}
</style>
