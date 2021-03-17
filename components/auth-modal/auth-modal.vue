<template>
	<custom-modal ref="authModal">
		<view class="auth-modal">
			<view class="title">登录提示</view>
			<image class="logo" src="../../static/home/home-image-01.png" mode="aspectFit"></image>
			<view class="content">体能观测站 邀请您登录体验完整功能</view>
			<view class="btn-group">
				<view class="btn-refuse" @click="close">随便逛逛</view>
				<button class="btn-allow" type="default" open-type="getUserInfo" @getuserinfo="getUserInfo">微信一键登录</button>
			</view>
		</view>
	</custom-modal>
</template>

<script>
	import {
		login
	} from '@/api/home.js';
	export default {
		data() {
			return {

			};
		},
		methods: {
			open() {
				this.$refs['authModal'].open()
			},
			close() {
				this.$refs['authModal'].close()
			},
			getUserInfo(e) {
				const _this = this;
				uni.showLoading({
					title: '登录中...'
				})
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes);
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								login({
									code: loginRes.code,
									iv: infoRes.iv,
									encryptedData: infoRes.encryptedData,
									signature: infoRes.signature
								}).then(
									result => {
										uni.setStorageSync('token', result.token);
										uni.setStorageSync('expires_time', result.expires_time);
										uni.setStorageSync('user_id', result.userInfo.uid);
										uni.setStorageSync('isLogin', true);
										_this.$emit('refresh')
									},
									err => {}
								);
							}
						});
					},
					complete() {
						_this.$refs['authModal'].close()
						uni.hideLoading()
					}
				});
			},
		}
	}
</script>

<style lang="less">
	.auth-modal {
		width: 620rpx;
		padding: 40rpx 0 0 0;

		.title {
			position: relative;
			height: 100rpx;
			font-size: 34rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: rgba(0, 0, 0, 1);
			line-height: 100rpx;
			text-align: center;

			&::after {
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				content: '';
				height: 2rpx;
				background-color: #eee;
			}
		}

		.logo {
			display: block;
			width: 60rpx;
			height: 60rpx;
			margin: 20rpx auto;
		}

		.content {
			padding: 0 50rpx;
			margin-bottom: 30rpx;
			font-size: 34rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(0, 0, 0, 1);
		}

		.text {
			padding: 0 50rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999;
		}

		.btn-group {
			position: relative;
			display: flex;
			align-items: center;
			margin-top: 110rpx;

			&::after {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				height: 2rpx;
				background-color: #eee;
			}

			.btn-refuse,
			.btn-allow {
				position: relative;
				flex: 1;
				background: none;
				height: 120rpx;
				font-size: 34rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: rgba(0, 0, 0, 1);
				line-height: 120rpx;
				text-align: center;
			}

			.btn-allow {
				color: #576B95;

				&::before {
					content: '';
					position: absolute;
					left: 0;
					top: 0;
					bottom: 0;
					width: 2rpx;
					background-color: #eee;
				}
			}
		}
	}
</style>
