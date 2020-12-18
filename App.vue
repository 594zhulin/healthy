<script>
export default {
	globalData: {
		isLogin: false,
		isIphoneX: false,
		paddingBottom: ''
	},
	onLaunch: function() {
		let _this = this;
		uni.hideTabBar();
		uni.getSystemInfo({
			success: res => {
				console.log(res)
				let screenHeight = res.screenHeight;
				let bottom = res.safeArea.bottom;
				if (res.safeArea.top > 20) {
					_this.globalData.isIphoneX = true;
					_this.globalData.paddingBottom = '34px';
				}
			}
		});
		const token = uni.getStorageSync('token');
		if (token) {
			_this.globalData.isLogin = true;
		}
	}
};
</script>

<style>
/*每个页面公共css */
</style>
