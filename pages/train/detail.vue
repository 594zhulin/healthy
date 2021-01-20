<template>
	<view class="page-detail">
		<view class="video-content">
			<video :src="detail.video_url_clouds" :poster="detail.video_content_clouds" :show-center-play-btn="true"
			 :show-play-btn="true" controls></video>
			<player appid="1256411062" fileid="5285890782826011810" playerid="video" :src="src" controls :title="title"></player>
		</view>
		<view class="detail-content">
			<view class="title">{{ detail.motion_name }}</view>
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
		<view class="btn" @click="clocked">下一个动作</view>
	</view>
</template>

<script>
	import {
		getTrainDetail,
		clocked
	} from '@/api/train.js';
	export default {
		data() {
			return {
				detail: null,
				items: []
			};
		},
		onLoad(option) {
			this.items = JSON.parse(option.items);
			this.getTrainDetail(option.id);
		},
		methods: {
			getTrainDetail(motion_id) {
				getTrainDetail({
					motion_id
				}).then(
					result => {
						this.detail = result;
					},
					err => {}
				);
			},
			clocked() {
				clocked({
					motion_id: this.detail.id,
					cat_id: this.detail.cat_id
				}).then(
					result => {
						uni.showToast({
							icon: 'none',
							title: '打卡成功'
						});
						this.getNextVideo();
					},
					err => {
						this.getNextVideo();
					}
				);
			},
			getNextVideo() {
				let index = this.items.findIndex(item => item.id == this.detail.id);
				let nextId = '';
				if (index < this.items.length - 1) {
					nextId = this.items[index + 1].id;
				}
				if (nextId != '') {
					this.getTrainDetail(nextId);
				} else {
					uni.showToast({
						icon: 'none',
						title: '您已完成所有动作'
					});
					setTimeout(function() {
						uni.navigateBack({
							delta: 1
						});
					}, 1600);
				}
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
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			height: 100rpx;
			line-height: 100rpx;
			margin: 60rpx auto 0 auto;
			background: #2975ff;
			font-size: 28rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #ffffff;
			text-align: center;
		}
	}
</style>
