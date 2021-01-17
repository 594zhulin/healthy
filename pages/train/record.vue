<template>
	<view class="page-record">
		<view class="list-content">
			<view class="list-item" v-for="item in activity" :key="item.id" @click="navigateTo('/pages/train/share?id=' + item.id+'&user_id='+item.user_id)">
				<view class="title">
					<view class="text">{{ item.title }}</view>
					<view class="date">{{ item.create_at }}</view>
				</view>
				<view class="content join">
					<image class="icon" src="../../static/record/record-icon-01.svg" mode="aspectFit"></image>
					<view class="text">参与人数：{{ item.join_num }}人</view>
				</view>
				<view class="content status" v-if="item.is_sign == 1">
					<image class="icon" src="../../static/record/record-icon-02.svg" mode="aspectFit"></image>
					<view class="text">成功打卡休闲运动</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getActivity } from '@/api/train.js';
import { timestampToTime } from '@/utils/utils.js';
export default {
	data() {
		return {
			params: {
				pageNo: 1,
				pageSize: 20
			},
			activity: [],
			total: 0
		};
	},
	onLoad() {
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
				if (this.activity.length >= this.total) {
					return false;
				}
				this.params.pageNo += 1;
			}
			getActivity({ ...this.params }).then(
				result => {
					const { list, total } = result;
					list.map(item => {
						item.create_at = timestampToTime(item.create_at, 'long');
					});
					this.activity = direction == 'down' ? list : this.activity.concat(list);
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
.page-record {
	.list-content {
		.list-item {
			height: 224rpx;
			margin: 4vw;
			background: #ffffff;
			border-radius: 16rpx;
			.title {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 80rpx;
				padding: 0 32rpx;
				&::after {
					content: '';
					position: absolute;
					left: 32rpx;
					right: 32rpx;
					bottom: 0;
					height: 2rpx;
					background-color: #e8e8e8;
				}
				.text {
					font-size: 30rpx;
					font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
					font-weight: bold;
					color: #000000;
					line-height: 42rpx;
				}
				.date {
					font-size: 30rpx;
					font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
					font-weight: 400;
					color: #666666;
					line-height: 42rpx;
				}
			}
			.content {
				display: flex;
				align-items: center;
				margin-left: 44rpx;
				.text {
					margin-left: 16rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 34rpx;
				}
			}
			.content.join {
				margin-top: 32rpx;
				.icon {
					width: 24rpx;
					height: 24rpx;
				}
			}
			.content.status {
				margin-top: 18rpx;
				.icon {
					width: 30rpx;
					height: 22rpx;
				}
			}
		}
	}
}
</style>
