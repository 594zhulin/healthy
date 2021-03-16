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
