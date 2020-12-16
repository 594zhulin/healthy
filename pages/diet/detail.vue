<template>
	<view class="page-detail">
		<view class="title">{{ detail.title }}</view>
		<view class="row">
			<view class="category">{{ detail.cart_name }}</view>
			<view class="date">{{ detail.add_time }}</view>
		</view>
		<view class="content"><rich-text :nodes="detail.content"></rich-text></view>
	</view>
</template>

<script>
import { getCookbookDetail } from '@/api/diet.js';
import { formatRichText } from '@/utils/utils.js';
export default {
	data() {
		return {
			detail: {
				title: '',
				add_time: '',
				cart_name: '',
				content: ''
			}
		};
	},
	onLoad(option) {
		getCookbookDetail(option.id).then(
			result => {
				const { title, add_time, cart_name, content } = result;
				this.detail = { ...this.detail, title, add_time, cart_name, content: formatRichText(content) };
			},
			err => {}
		);
	}
};
</script>

<style lang="less">
.page-detail {
	padding-bottom: 60rpx;
	.title {
		padding: 0 30rpx;
		font-size: 44rpx;
		color: #282828;
		font-weight: bold;
		margin: 45rpx 0 30rpx 0;
		line-height: 1.5;
	}
	.row {
		display: flex;
		align-items: center;
		margin: 0 30rpx;
		padding-bottom: 30rpx;
		.category {
			font-size: 30rpx;
			color: #b1b2b3;
		}
		.date {
			margin-left: 27rpx;
			font-size: 30rpx;
			color: #b1b2b3;
		}
	}
	.content {
		padding: 0 30rpx;
		font-size: 32rpx;
		color: #8a8b8c;
		line-height: 1.7;
		word-wrap: break-word;
		word-break: normal;
	}
}
</style>
