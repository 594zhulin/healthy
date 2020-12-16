<template>
	<view class="page-list">
		<view class="title">#{{ title }}</view>
		<view class="desc-content">简介：{{ desc }}</view>
		<view class="list-content">
			<view class="list-item" v-for="item in list" :key="item.id" @click="navigateTo('/pages/diet/detail?id=' + item.id)">
				<image class="pic" :src="item.image_input[0]" mode="aspectFit"></image>
				<view class="name">{{ item.title }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getCookbook } from '@/api/diet.js';
export default {
	data() {
		return {
			title: '',
			desc: '',
			list: []
		};
	},
	onLoad(option) {
		const category = JSON.parse(option.category);
		this.title = category.title;
		this.desc = category.intr;
		getCookbook(category.id).then(
			result => {
				this.list = result;
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
.page-list {
	margin: 4vw;
	padding: 40rpx 0;
	background: #ffffff;
	border-radius: 16rpx;
	.title {
		margin: 0 0 24rpx 64rpx;
		font-size: 36rpx;
		font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
		font-weight: bold;
		color: #000000;
		line-height: 50rpx;
	}
	.desc-content {
		margin: 0 64rpx 60rpx 64rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 30rpx;
		letter-spacing: 4rpx;
		text-align: justify;
	}
	.list-content {
		display: flex;
		flex-wrap: wrap;
		.list-item {
			margin-left: 42rpx;
			margin-bottom: 20rpx;
			.pic {
				width: 278rpx;
				height: 278rpx;
				background: #d8d8d8;
				border-radius: 12rpx;
			}
			.name {
				margin: 20rpx 0 20rpx 16rpx;
				font-size: 24rpx;
				font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
				font-weight: bold;
				color: #000000;
				line-height: 34rpx;
			}
		}
	}
}
</style>
