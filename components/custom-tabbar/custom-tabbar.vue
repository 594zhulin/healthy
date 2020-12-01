<template>
	<cover-view class="custom-tabbar">
		<cover-image class="custom-tabbar__bg" src="../../static/tabbar/bg.png"></cover-image>
		<cover-view class="custom-tabbar__container">
			<cover-view class="custom-tabbar__item" :class="item.id === currentId ? ' active' : ''" v-for="item in tabbar" :key="item.id" @click="switchTab(item.id)">
				<cover-view class="custom-tabbar__text">{{ item.text }}</cover-view>
				<cover-view class="custom-tabbar__border" v-show="item.id === currentId"></cover-view>
			</cover-view>
			<cover-view class="custom-tabbar__middle" @click="onScan"><cover-image src="../../static/tabbar/middle.png"></cover-image></cover-view>
		</cover-view>
	</cover-view>
</template>

<script>
export default {
	props: {
		currentId: Number
	},
	data() {
		return {
			tabbar: [
				{
					id: 0,
					text: '首页'
				},
				{
					id: 1,
					text: '找黑石'
				},
				{
					id: 2,
					text: ''
				},
				{
					id: 3,
					text: '步数书城'
				},
				{
					id: 4,
					text: '我的'
				}
			]
		};
	},
	methods: {
		switchTab(id) {
			this.$emit('switchTab', id);
		},
		onScan() {
			const this_ = this;
			uni.scanCode({
				success: function(res) {
					if (res.errMsg == 'scanCode:ok') {
						console.log(res.path);
						if (res.path[0] == '/') {
							uni.reLaunch({
								url: res.path
							});
						} else {
							uni.reLaunch({
								url: '/' + res.path
							});
						}
					}
				}
			});
		}
	}
};
</script>

<style lang="less">
.custom-tabbar {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	height: 128rpx;
	z-index: 98;
	&__bg {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 128rpx;
		z-index: -1;
	}
	&__container {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		height: 128rpx;
	}
	&__item {
		position: relative;
		flex: 1;
		height: 100rpx;
		line-height: 100rpx;
		margin-top: 28rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		text-align: center;
	}
	&__text {
		height: 100rpx;
		line-height: 100rpx;
	}
	.active {
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: rgba(51, 51, 51, 1);
	}
	&__border {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 24rpx;
		width: 28rpx;
		height: 6rpx;
		margin: auto;
		border-radius: 4rpx;
		background: rgba(42, 118, 255, 1);
	}
	&__middle {
		position: absolute;
		top: -24rpx;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		width: 114rpx;
		height: 114rpx;
		z-index: 100;
		.middle-bg {
			width: 114rpx;
			height: 114rpx;
		}
	}
}
</style>
