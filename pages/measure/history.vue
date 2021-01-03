<template>
	<view class="page-history">
		<view class="list-content">
			<view class="list-item" v-for="item in history" :key="item.calbe_id" @click="navigateTo('/pages/measure/detail?id=' + item.calbe_id)">
				<view class="score">
					<view class="tag">
						<image class="icon" src="../../static/measure/measure-icon-13.png" mode="aspectFit"></image>
						<view class="text">{{ item.rank_label }}</view>
					</view>
					<view class="text">{{ item.score }}分</view>
				</view>
				<view class="date">
					<view class="text">{{ item.create_at }}</view>
					<image class="icon" src="../../static/measure/measure-icon-14.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getHistory } from '@/api/measure.js';
export default {
	data() {
		return {
			params: {
				pageNo: 1,
				pageSize: 20
			},
			history: []
		};
	},
	onLoad() {
		this.getListData('down');
	},
	onPullDownRefresh() {
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
				if (this.history.length >= this.total) {
					return false;
				}
				this.params.pageNo += 1;
			}
			getHistory({ ...this.params }).then(
				result => {
					const { list, total } = result;
					this.history = direction == 'down' ? list : this.history.concat(list);
					this.total = total;
					uni.stopPullDownRefresh();
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
.page-history {
	.list-content {
		.list-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 164rpx;
			margin: 30rpx;
			padding: 0 36rpx;
			background: #ffffff;
			border-radius: 16rpx;
			.score {
				display: flex;
				align-items: center;
				& > .text {
					margin-left: 14rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #2975ff;
					line-height: 26rpx;
				}
				.tag {
					position: relative;
					width: 72rpx;
					height: 78rpx;
					.icon {
						position: absolute;
						top: 0;
						left: 0;
						width: 72rpx;
						height: 78rpx;
					}
					.text {
						position: relative;
						font-size: 48rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #ffffff;
						line-height: 78rpx;
						text-align: center;
					}
				}
			}
			.date {
				display: flex;
				align-items: center;
				.text {
					margin-right: 52rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 38rpx;
				}
				.icon {
					width: 19rpx;
					height: 30rpx;
				}
			}
		}
	}
}
</style>
