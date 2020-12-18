<template>
	<view class="page-search">
		<view class="search-content">
			<view class="content">
				<image class="icon" src="../../static/mall/mall-icon-01.svg" mode="aspectFit"></image>
				<input class="input" type="text" v-model="params.keyword" confirm-type="搜索" @confirm="handleSearch" />
			</view>
			<view class="btn" @click="handleSearch">搜索</view>
		</view>
		<view class="sort-content"></view>
		<view class="list-content">
			<view class="list-item" v-for="item in product" :key="item.id" @click="navigateTo('/pages/order/product?id=' + item.id)">
				<image class="pic" :src="item.image" mode="aspectFit"></image>
				<view class="content">
					<view class="title">{{ item.store_name }}</view>
					<!-- <view class="price">原价：{{ item.ot_price }}元</view> -->
					<view class="step">{{ item.price }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getProduct } from '@/api/order.js';
export default {
	data() {
		return {
			params: {
				keyword: '',
				page: 1,
				limit: 20
			},
			product: []
		};
	},
	onReachBottom() {
		this.getListData('up');
	},
	methods: {
		handleSearch() {
			this.getListData('down');
		},
		getListData(direction) {
			if (direction == 'down') {
				this.params.page = 1;
			} else {
				this.params.page += 1;
			}
			getProduct({ ...this.params }).then(
				result => {
					this.product = direction == 'down' ? result : this.product.concat(result);
				},
				err => {}
			);
		},
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
.page-search {
	.search-content {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		display: flex;
		align-items: center;
		height: 60rpx;
		padding: 20rpx 0 20rpx 24rpx;
		background-color: #fff;
		box-shadow: 0px 0px 12rpx 0px rgba(0, 0, 0, 0.06);
		z-index: 9;
		.content {
			flex: 1;
			display: flex;
			align-items: center;
			height: 60rpx;
			background: #eee;
			border-radius: 12rpx;
			.icon {
				width: 32rpx;
				height: 32rpx;
				margin: 0 12rpx 0 26rpx;
			}
			.input {
				flex: 1;
				padding-right: 30rpx;
			}
		}
		.btn {
			width: 116rpx;
			padding: 0 24rpx 0 32rpx;
			font-size: 30rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #2975ff;
			line-height: 42rpx;
			box-sizing: border-box;
		}
	}
	.list-content {
		padding-top: 100rpx;
		.list-item {
			display: flex;
			align-items: center;
			position: relative;
			height: 210rpx;
			margin: 30rpx;
			padding: 30rpx 40rpx;
			background-color: #fff;
			box-sizing: border-box;
			border-radius: 16rpx;
			.pic {
				flex-shrink: 0;
				width: 150rpx;
				height: 150rpx;
				margin-right: 30rpx;
				background: #d8d8d8;
				border-radius: 20rpx;
			}
			.title {
				font-size: 32rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #000000;
				line-height: 46rpx;
			}
			.price {
				margin: 24rpx 0 4rpx 0;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #92a0b6;
				line-height: 34rpx;
				text-decoration: line-through;
			}
			.step {
				font-size: 32rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #fc6262;
				line-height: 46rpx;
				&::after {
					content: '步';
					font-size: 18rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #fc6262;
					line-height: 26rpx;
				}
			}
		}
	}
}
</style>
