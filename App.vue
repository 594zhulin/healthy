<script>
export default {
	globalData: {
		isIphoneX: false,
		paddingBottom: ''
	},
	onLaunch: function() {
		let _this = this;
		uni.getSystemInfo({
			success: res => {
				let screenHeight = res.screenHeight;
				let bottom = res.safeArea.bottom;
				if (res.safeArea.top > 20) {
					_this.globalData.isIphoneX = true;
				}
				_this.globalData.paddingBottom = screenHeight - bottom + 'px';
				console.log(res.safeArea, _this.globalData.isIphoneX, screenHeight, bottom);
			}
		});
	}
};
</script>

<style>
/*每个页面公共css */
</style>
