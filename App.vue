<script>
	import {
		login
	} from '@/api/home.js';
	export default {
		globalData: {
			isLogin: false,
			isIphoneX: false,
			paddingBottom: 0
		},
		onShow() {
			let _this = this;
			uni.hideTabBar();
			uni.getSystemInfo({
				success: res => {
					console.log(res);
					let screenHeight = res.screenHeight;
					let bottom = res.safeArea.bottom;
					if (res.safeArea.top > 20 && res.system.indexOf('iOS') > -1) {
						_this.globalData.isIphoneX = true;
						_this.globalData.paddingBottom = 34;
					}
				}
			});
			const token = uni.getStorageSync('token');
			const expiresTime = uni.getStorageSync('expires_time');
			const currentTime = new Date().getTime();
			if (token) {
				_this.globalData.isLogin = true;
			}
			if (expiresTime * 1000 < currentTime) {
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
										_this.globalData.isLogin = true;
									},
									err => {}
								);
							}
						});
					}
				});
			}
		}
	};
</script>

<style>
	/*每个页面公共css */
	button {
		padding: 0;
	}

	button::after {
		display: none;
	}

	view {
		box-sizing: border-box;
	}

	open-data {
		display: block;
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
</style>
