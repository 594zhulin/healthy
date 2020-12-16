<template>
	<view class="page-category">
		<view class="list-content">
			<view class="list-item" v-for="item in category" :key="item.id" @click="navigateTo('/pages/diet/list?category=' + JSON.stringify(item))">
				<image class="pic" :src="item.image" mode="aspectFit"></image>
				<view class="name">{{ item.title }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getCategory } from '@/api/diet.js';
export default {
	data() {
		return {
			category: []
		};
	},
	onLoad() {
		getCategory().then(
			result => {
				this.category = result;
			},
			err => {}
		);
	},
	methods: {
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
	background-color: #f7f6f9;
}
.page-category {
	.list-content {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin: 36rpx;
		.list-item {
			width: 320rpx;
			height: 376rpx;
			margin-bottom: 40rpx;
			padding: 22rpx 22rpx 0 24rpx;
			background: #ffffff;
			border-radius: 16rpx;
			box-sizing: border-box;
			.pic {
				width: 276rpx;
				height: 276rpx;
				margin-bottom: 12rpx;
				border-radius: 12rpx;
			}
			.name {
				font-size: 28rpx;
				font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
				font-weight: 400;
				color: #000000;
				line-height: 38rpx;
				text-align: center;
			}
		}
	}
}
</style>
