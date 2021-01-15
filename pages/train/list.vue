<template>
	<view class="page-list">
		<view class="banner-content">
			<view class="content">
				<view class="title">AI训练计划</view>
				<view class="title last">轻松安排，全面不偏科</view>
				<view class="text">科学训练系统</view>
				<view class="text">体能观测记录/分析效能</view>
			</view>
			<image class="image" src="../../static/train/train-img-01.png" mode="aspectFit"></image>
		</view>
		<view class="list-content">
			<view class="list-item" v-for="item in items" :key="item.id" @click="handleClick(item.id)">
				<view class="background"></view>
				<image class="background" :src="item.video_content_clouds" mode="aspectFit"></image>
				<view class="title">{{ item.motion_name }}</view>
				<view class="title">{{ item.duration }}分钟</view>
				<view class="text">LEVEL {{ item.rating }} ·{{ item.cate_name }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getTrainPlanList } from '@/api/train.js';
export default {
	data() {
		return {
			params: {
				type: '',
				score: '',
				pageNo: 1,
				pageSize: 20
			},
			items: [],
			total: 0
		};
	},
	onLoad(option) {
		this.params.type = option.type;
		this.params.score = option.score;
		this.getListData('down');
	},
	onReachBottom() {
		this.getListData('up');
	},
	methods: {
		getListData(direction) {
			if (direction == 'down') {
				this.params.pageNo = 1;
			} else {
				if (this.items.length >= this.total) {
					return false;
				}
				this.params.pageNo += 1;
			}
			getTrainPlanList({ ...this.params }).then(
				result => {
					const { list, total } = result;
					this.items = direction == 'down' ? list : this.items.concat(list);
					this.total = total;
				},
				err => {}
			);
		},
		handleClick(id) {
			uni.redirectTo({
				url: '/pages/train/detail?id=' + id + '&items=' + JSON.stringify(this.items)
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
	.banner-content {
		position: relative;
		height: 338rpx;
		padding-top: 74rpx;
		box-sizing: border-box;

		.title {
			margin-left: 56rpx;
			font-size: 30rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
			line-height: 42rpx;
		}

		.title.last {
			margin-bottom: 30rpx;
		}

		.text {
			display: flex;
			align-items: center;
			margin-left: 64rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
			line-height: 34rpx;

			&::before {
				display: block;
				content: '';
				width: 8rpx;
				height: 8rpx;
				margin-right: 10rpx;
				background: #2975ff;
			}
		}

		.image {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 338rpx;
			z-index: -1;
		}
	}

	.list-content {
		margin: 0 16rpx;

		.list-item {
			position: relative;
			height: 284rpx;
			margin: 24rpx 0;
			padding-top: 92rpx;
			background: #01081b;
			border-radius: 16rpx;
			box-sizing: border-box;

			.background {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 284rpx;
				border-radius: 16rpx;
			}

			.title {
				position: relative;
				margin-left: 36rpx;
				font-size: 36rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #ffffff;
				line-height: 50rpx;
			}

			.text {
				position: relative;
				margin: 14rpx 0 0 36rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #ffffff;
				line-height: 34rpx;
			}
		}
	}
}
</style>
