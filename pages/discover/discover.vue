<template>
	<view class="page-discover">
		<view class="device-content">
			<view class="device-item" v-for="item in device" :key="item.device_id" @click="handleOpen(item)">
				<view class="point"><image class="icon" src="../../static/discover/discover-icon-01.svg" mode="aspectFit"></image></view>
				<view class="content">
					<view class="name">{{ item.community_plot_name }}</view>
					<view class="text">{{ item.address }}</view>
				</view>
				<view class="distance">{{ (item.distance / 1000).toFixed(2) }}km</view>
			</view>
		</view>
		<custom-tabbar :currentId="1"></custom-tabbar>
	</view>
</template>
<script>
import { getDevice } from '@/api/discover.js';
export default {
	data() {
		return {
			device: []
		};
	},
	onShow() {
		const _this = this;
		uni.getLocation({
			type: 'wgs84',
			success: function(res) {
				getDevice({ longitude: res.longitude, latitude: res.latitude }).then(
					result => {
						_this.device = result.device_list;
					},
					err => {}
				);
			},
			fail(err) {
				uni.getSetting({
					success(result) {
						if (!result.authSetting['scope.userLocation']) {
							_this.openConfirm();
						} else {
						}
					}
				});
			}
		});
	},
	methods: {
		openConfirm() {
			wx.showModal({
				content: '检测到您没打开体能观测的定位权限，是否去设置打开？',
				confirmText: '确认',
				cancelText: '取消',
				success: function(res) {
					console.log(res);
					//点击“确认”时打开设置页面
					if (res.confirm) {
						console.log('用户点击确认');
						wx.openSetting({
							success: res => {}
						});
					} else {
						return false;
						console.log('用户点击取消');
					}
				}
			});
		},
		handleOpen(address) {
			uni.openLocation({
				latitude: address.latitude,
				longitude: address.longitude,
				name: address.community_plot_name,
				address: address.address,
				success: function() {
					console.log('success');
				}
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
.page-discover {
	.device-content {
		margin: 4vw;
		.device-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 164rpx;
			padding: 0 36rpx;
			margin-bottom: 4vw;
			background: #ffffff;
			border-radius: 16rpx;
			.point {
				width: 86rpx;
				height: 86rpx;
				margin-right: 56rpx;
				background: #2975ff;
				border-radius: 50%;
				.icon {
					display: block;
					width: 38rpx;
					height: 48rpx;
					margin: 20rpx auto;
				}
			}
			.content {
				flex: 1;
				.name {
					margin-bottom: 10rpx;
					font-size: 30rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #333333;
					line-height: 42rpx;
				}
				.text {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
					line-height: 34rpx;
				}
			}
			.distance {
				font-size: 30rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 42rpx;
			}
		}
	}
}
</style>
