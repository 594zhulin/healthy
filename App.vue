<script>
	import {
		login
	} from '@/api/home.js';
	export default {
		globalData: {
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
			uni.getSetting({
				success(result) {
					if (!result.authSetting['scope.userInfo']) {
						uni.setStorageSync('isAuth', false)
					} else {
						uni.setStorageSync('isAuth', true)
					}
				}
			})
			const isLogin = uni.getStorageSync('isLogin');
			const currentTime = new Date().getTime();
			const expires_time = uni.getStorageSync('expires_time')
			console.log(currentTime)
			if (!isLogin) {
				uni.setStorageSync('isLogin', false)
			} else {
				console.log(111)
				if (currentTime > expires_time * 1000) {
					console.log(222)
					uni.setStorageSync('isLogin', false)
				}
			}
		},
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
