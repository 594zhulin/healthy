<template>
	<view class="page-community">
		<view class="top-content flex-horizontal">
			<view class="flex-item">
				<view class="name">
					<image class="icon" src="../../static/measure/measure-icon-15.png" mode="aspectFit"></image>
					<view class="text">{{ communityName }}</view>
				</view>
				<view class="address" v-if="communityAddress">{{ communityAddress }}</view>
			</view>
			<view class="btn-share" @click="openShareModal">
				<image class="icon" src="../../static/measure/measure-icon-16.png" mode="aspectFit"></image>
				<view class="text">邀请邻居</view>
			</view>
		</view>
		<view class="bottom-content">
			<view class="rank-content">
				<view class="flex-horizontal rank-title">
					<view class="flex">
						<image class="icon" src="../../static/measure/measure-icon-17.png" mode="aspectFit"></image>
						<view class="text">我的名次：{{ userRank }}</view>
					</view>
					<view class="score">最近分数：{{ userScore }}分</view>
				</view>
				<view class="rank-list">
					<view class="flex-horizontal rank-item" v-for="(item, index) in rankList" :key="index">
						<view class="flex">
							<view class="order">{{ item.ranking }}</view>
							<view class="avatar" :style="{ background: 'url(' + item.avatarUrl + ') no-repeat center', backgroundSize: '100% auto' }"></view>
							<view class="name">{{ item.nickName }}</view>
						</view>
						<view class="score">{{ item.score }}分</view>
					</view>
				</view>
			</view>
			<custom-modal ref="shareModal">
				<view class="share-modal">
					<view class="title">邀请邻居</view>
					<view class="content"><view class="text">快邀请邻居一起来吧，共同建设健康的生活环境，打造共赢健康氛围</view></view>
					<view class="flex-horizontal">
						<button class="btn-share" open-type="share" id="shareInvite">直接转发邀请</button>
						<view class="btn-invite" @click="createCard">生成邀请卡片</view>
					</view>
					<image class="btn-close" src="../../static/measure/measure-icon-19.png" mode="aspectFit" @click="closeShareModal"></image>
				</view>
			</custom-modal>
			<custom-modal ref="posterModal">
				<view class="poster-modal">
					<image :src="shareImage" class="share-image"></image>
					<view class="btn-row">
						<view class="btn-cancel" @click="closePosterModal">取消</view>
						<view class="btn-save" @click="save">保存到相册</view>
					</view>
				</view>
			</custom-modal>
		</view>
		<view class="user-name" id="userName">{{ userName }}</view>
		<custom-canvas :painting="painting" @getImage="eventGetImage"></custom-canvas>
	</view>
</template>

<script>
import { getCommunityId, getCommunityDetail, getCommunityRankList, getCommunityMineRank, getUserInfo } from '@/api/measure.js';
export default {
	data() {
		return {
			communityName: '',
			communityAddress: '',
			userRank: 0,
			userScore: 0,
			rankList: [],
			userName: '',
			avatarUrl: '',
			painting: {},
			shareImage: '',
			userNameWidth: '',
			plot_id: '',
			is_plot: ''
		};
	},
	onLoad() {
		const this_ = this;
		getCommunityId().then(
			result => {
				this_.getCommunityDetail(result.community_plot_id, result.device_id, result.is_role);
				this_.getCommunityMineRank(result.community_plot_id, result.is_role);
				this_.getCommunityRankList();
			},
			err => {
				uni.showToast({
					icon: 'none',
					title: err.text
				});
			}
		);
		if (this_.userName == '') {
			getUserInfo().then(
				result => {
					this_.userName = result.nickName;
					this_.avatarUrl = result.avatarUrl;
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
		}
	},
	methods: {
		getCommunityDetail(plot_id, device_id, is_plot) {
			getCommunityDetail({ plot_id, device_id, is_plot }).then(
				result => {
					this.communityName = result.community_plot_name;
					this.communityAddress = result.map_addre;
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
		},
		getCommunityMineRank(plot_id, is_plot) {
			getCommunityMineRank({ plot_id, is_plot }).then(
				result => {
					this.userRank = result.ranking;
					this.userScore = result.score;
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
		},
		getCommunityRankList() {
			getCommunityRankList({ plot_id: this.plot_id, is_plot: this.is_plot }).then(
				result => {
					this.rankList = result;
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
		},
		openShareModal() {
			this.$refs['shareModal'].open();
		},
		closeShareModal() {
			this.$refs['shareModal'].close();
		},
		eventGetImage(event) {
			uni.hideLoading();
			const tempFilePath = event.tempFilePath;
			const errMsg = event.errMsg;
			if (errMsg === 'canvasdrawer:ok') {
				this.shareImage = tempFilePath;
				this.$refs['posterModal'].open();
				this.painting = {};
			}
		},
		createCard() {
			let this_ = this;
			const query = uni.createSelectorQuery().in(this_);
			query
				.select('#userName')
				.boundingClientRect(data => {
					console.log(data);
					this_.userNameWidth = data.width;
				})
				.exec();
			uni.showLoading({
				title: '生成邀请卡片中',
				mask: true
			});
			setTimeout(() => {
				this_.painting = {
					width: 375,
					height: 667,
					clear: true,
					views: [
						{
							type: 'image',
							url: '../../static/measure/measure-icon-18.png',
							top: 0,
							left: 0,
							width: 375,
							height: 667
						},
						{
							type: 'image',
							url: this_.avatarUrl,
							top: 205,
							left: 64,
							width: 60,
							height: 60
						},
						{
							type: 'text',
							content: this_.userName,
							fontSize: 15,
							color: '#333',
							textAlign: 'left',
							top: 205,
							left: 140
						},
						{
							type: 'text',
							content: '邀请您进入',
							fontSize: 12,
							color: '#333',
							textAlign: 'left',
							top: 208,
							left: 150 + this_.userNameWidth
						},
						{
							type: 'text',
							content: this_.communityName + '健康促进中心',
							fontSize: 15,
							color: '#333',
							textAlign: 'left',
							top: 250,
							left: 140,
							bolder: true
						},
						// {
						// 	type: 'image',
						// 	url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531385433625.jpeg',
						// 	top: 500,
						// 	left: 60,
						// 	width: 68,
						// 	height: 68
						// },
						{
							type: 'text',
							content: '长按识别图中二维码',
							fontSize: 14,
							color: '#383549',
							textAlign: 'left',
							top: 590,
							left: 50,
							lineHeight: 20,
							MaxLineNumber: 2,
							breakWord: true,
							width: 125
						}
					]
				};
			}, 1000);
		},
		save() {
			uni.saveImageToPhotosAlbum({
				filePath: this.shareImage,
				success(res) {
					uni.showToast({
						title: '保存图片成功',
						icon: 'success',
						duration: 2000
					});
				}
			});
		},
		closePosterModal() {
			this.$refs['posterModal'].close();
		}
	},
	onShareAppMessage(e) {
		console.log(this.userName);
		if (e.target.id == 'shareNeighbor') {
			if (e.target.dataset.item.is_state == 1 || e.target.dataset.item.is_state == 5) {
				return {
					title: this.userName + '通知您社区有活动啦',
					desc: e.target.dataset.item.content,
					path: 'pages/home/pages/community/community'
				};
			}
			if (e.target.dataset.item.is_state == 2) {
				return {
					title: this.userName + '通知您社区有活动啦',
					path: 'pages/home/pages/community/community',
					imageUrl: e.target.dataset.item.gallery[0]
				};
			}
			if (e.target.dataset.item.is_state == 4) {
				return {
					title: this.userName + '通知您社区有活动啦',
					desc: e.target.dataset.item.content,
					path: 'pages/home/pages/community/community',
					imageUrl: e.target.dataset.item.gallery[0]
				};
			}
		} else {
			this.$refs['shareModal'].close();
			return {
				title: this.userName + '邀请您进入' + this.communityName + '健康促进中心',
				path: 'pages/home/pages/community/community'
			};
		}
	}
};
</script>

<style lang="less" scoped>
.page-community {
	&::after {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		height: 200rpx;
		content: '';
		background-color: #0056ff;
		z-index: -1;
	}
	.flex {
		display: flex;
		align-items: center;
	}
	.flex-vertical {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}
	.flex-horizontal {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.top-content {
		height: 168rpx;
		padding: 30rpx 24rpx 34rpx 36rpx;
		box-sizing: border-box;
		.name {
			display: flex;
			align-items: center;
			margin-bottom: 12rpx;
			font-size: 36rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: rgba(255, 255, 255, 1);
			.icon {
				width: 29rpx;
				height: 36rpx;
				margin-right: 27rpx;
			}
		}
		.address {
			display: inline-block;
			height: 36rpx;
			line-height: 36rpx;
			margin-left: 56rpx;
			padding: 0 32rpx 0 20rpx;
			background: rgba(255, 255, 255, 0.19);
			border-radius: 26rpx;
			font-size: 20rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			white-space: nowrap;
		}
		.btn-share {
			display: flex;
			align-items: center;
			padding-top: 52rpx;
			flex-shrink: 0;
			.icon {
				width: 41rpx;
				height: 44rpx;
				margin-right: 20rpx;
			}
			.text {
				font-size: 18rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
			}
		}
	}
	.bottom-content {
		border-radius: 48rpx 48rpx 0 0;
		overflow: auto;
		background-color: #fff;
	}
	.rank-content {
		.rank-title {
			position: relative;
			height: 120rpx;
			padding: 0 30rpx 0 46rpx;
			&::after {
				position: absolute;
				content: '';
				bottom: 0;
				left: 0;
				right: 0;
				height: 2rpx;
				background-color: rgba(232, 232, 232, 1);
			}
			.icon {
				width: 40rpx;
				height: 40rpx;
			}
			.text {
				margin-left: 28rpx;
				font-size: 36rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: rgba(51, 51, 51, 1);
			}
			.score {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
			}
		}
		.rank-item {
			position: relative;
			height: 120rpx;
			padding: 0 30rpx 0 42rpx;
			&::after {
				position: absolute;
				content: '';
				bottom: 0;
				left: 198rpx;
				right: 0;
				height: 2rpx;
				background-color: rgba(232, 232, 232, 1);
			}
			.order {
				font-size: 36rpx;
				font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
				font-weight: bold;
				color: rgba(179, 179, 179, 1);
			}
			.avatar {
				width: 72rpx;
				height: 72rpx;
				margin: 0 24rpx 0 18rpx;
				background: rgba(0, 0, 0, 1);
				border-radius: 50%;
			}
			.name {
				font-size: 30rpx;
				font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}
			.score {
				padding-left: 38rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: rgba(153, 153, 153, 1);
			}
		}
	}
	.share-modal {
		width: 606rpx;
		height: 372rpx;
		padding: 0 42rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0 8rpx 60rpx 0 rgba(0, 0, 0, 0.12);
		border-radius: 40rpx;
		.title {
			padding: 24rpx 0 48rpx 0;
			font-size: 36rpx;
			font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
			text-align: center;
		}
		.text {
			margin: 0 36rpx 72rpx 36rpx;
			font-size: 30rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(102, 102, 102, 1);
		}
		.btn-share {
			width: 236rpx;
			height: 64rpx;
			line-height: 64rpx;
			padding: 0;
			background: rgba(255, 255, 255, 1);
			border-radius: 32rpx;
			border: 2rpx solid rgba(24, 105, 255, 1);
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(36, 114, 255, 1);
			text-align: center;
		}
		.btn-invite {
			width: 236rpx;
			height: 64rpx;
			line-height: 64rpx;
			background: linear-gradient(135deg, rgba(72, 194, 255, 1) 0%, rgba(39, 120, 240, 1) 100%);
			border-radius: 32rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			text-align: center;
		}
		.btn-close {
			display: block;
			width: 60rpx;
			height: 60rpx;
			margin: 92rpx auto 0 auto;
		}
	}
	.poster-modal {
		width: 750rpx;
		height: 1334rpx;
		.share-image {
			width: 750rpx;
			height: 1334rpx;
		}
		.btn-row {
			display: flex;
			justify-content: center;
			padding-top: 40rpx;
		}
		.btn-save {
			width: 236rpx;
			height: 64rpx;
			line-height: 64rpx;
			background: linear-gradient(135deg, rgba(72, 194, 255, 1) 0%, rgba(39, 120, 240, 1) 100%);
			border-radius: 32rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			text-align: center;
		}
		.btn-cancel {
			width: 236rpx;
			height: 64rpx;
			line-height: 64rpx;
			border-radius: 32rpx;
			margin-right: 40rpx;
			border: 2rpx solid rgba(255, 255, 255, 1);
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			text-align: center;
		}
	}
	.user-name {
		display: inline-block;
		opacity: 0;
	}
}
</style>
