<template>
	<view class="page-video">
		<view class="list-content">
			<view class="list-item" v-for="item in video" :key="item.id">
				<video class="video" :direction="0" :id="item.id" :ref="item.id" :src="item.video_url_clouds" :autoplay="true"
				 :loop="true" :controls="false" :show-play-btn="false" :show-fullscreen-btn="false" :show-center-play-btn="true"
				 object-fit="fill"></video>
				<player appid="1256411062" fileid="5285890782826011810" playerid="video" :src="src" controls :title="title"></player>
				<view class="content" @touchend="getListData">
					<view class="row">
						<view class="category" @click.stop="navigateTo('/pages/video/detail?cat_id=' + item.cat_id)">
							<view class="logo" v-if="item.logo!=''" :style="{ background: 'url(' + item.logo + ') no-repeat center', backgroundSize: '100% auto' }"></view>
							<view class="name">{{ item.video_name }}</view>
						</view>
						<!-- <view class="follow-btn" @click="follow(item)">{{ followId.includes(item.id) ? '已关注' : '关注' }}</view> -->
					</view>
					<view class="title">{{ item.descr }}</view>
				</view>
				<view class="btn-group">
					<!-- <view class="view-btn">{{ item.like_num }}</view> -->
					<view class="support-btn" @click="support(item)">{{ item.hits }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getVideo,
		like,
		view
	} from '@/api/video.js';
	export default {
		data() {
			return {
				video: []
			};
		},
		onLoad() {
			this.getListData();
		},
		onPullDownRefresh() {
			this.getListData();
		},
		methods: {
			getListData() {
				getVideo().then(
					result => {
						this.video = result;
					},
					err => {}
				);
			},
			support(item) {
				item.hits += 1;
				like({
					video_id: item.id,
					cat_id: item.cat_id,
					hits: item.hits + 1
				}).then(
					result => {},
					err => {
						uni.showToast({
							icon: 'none',
							title: err.text
						});
					}
				);
			},
			navigateTo(url) {
				uni.navigateTo({
					url
				});
			}
		}
	};
</script>

<style lang="less">
	page {
		background-color: #000;
	}

	.page-video {
		.list-item {
			width: 100vw;
			height: 100vh;

			.video {
				position: absolute;
				top: 0;
				bottom: 0;
				width: 100vw;
				margin: auto;
			}

			.content {
				position: fixed;
				left: 0;
				right: 0;
				bottom: 0;
				height: 311rpx;
				padding: 0 36rpx 0 45rpx;
				background: rgba(0, 0, 0, 0.29);
				border-radius: 48rpx 48rpx 0px 0px;

				.row {
					display: flex;
					align-items: center;
					justify-content: space-between;
				}

				.category {
					display: flex;
					align-items: center;
				}

				.logo {
					position: relative;
					top: -21rpx;
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

				.title {
					font-size: 30rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					line-height: 42rpx;
				}
			}

			.btn-group {
				position: fixed;
				right: 9rpx;
				bottom: 416rpx;
				width: 104rpx;

				.view-btn,
				.support-btn {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					line-height: 33rpx;
					text-align: center;
				}

				.view-btn {
					margin: 26rpx 0 35rpx 0;
					padding-top: 63rpx;
					// background: url(../../static/video/view.png) no-repeat center top;
					// background-size: 67rpx 50rpx;
				}

				.support-btn {
					padding-top: 62rpx;
					background: url(../../static/video/support.png) no-repeat center top;
					background-size: 50rpx 54rpx;
				}
			}
		}
	}
</style>
