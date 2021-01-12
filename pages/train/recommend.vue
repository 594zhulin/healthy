<template>
	<view class="page-recommend">
		<view class="title">根据您的身体素质分布情况，为您推荐课程，时间有限的情况下请优先完成前面的训练</view>
		<view class="list-content">
			<view class="list-item" v-for="(item,index) in items" :key="item.type" @click="navigateTo('/pages/train/list?type='+item.type+'&score='+item.score)">
				<view class="order">0{{index+1}}</view>
				<view class="name">{{item.name}}</view>
				<view class="level">level {{item.level}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getFitnessData
	} from '@/api/train.js';
	export default {
		data() {
			return {
				items: [{
					type: 'grip_num',
					name: '力量提升训练',
					level: 1,
					score: 0
				}, {
					type: 'bodily_type',
					name: '体型提升训练',
					level: 2,
					score: 0
				}, {
					type: 'foot_closed',
					name: '平衡力提升训练',
					level: 3,
					score: 0
				}, {
					type: 'sit_reach',
					name: '柔韧提升训练',
					level: 4,
					score: 0
				}, {
					type: 'response_at',
					name: '反应提升训练',
					level: 5,
					score: 0
				}]
			};
		},
		onLoad() {
			getFitnessData().then(
				result => {
					const {
						lately_data
					} = result;
					this.items.map(item => {
						item.score = lately_data[item.type]
					})
					this.items.sort((a, b) => {
						return lately_data[a.type] - lately_data[b.type]
					})
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

	.page-recommend {
		margin: 4vw;
		background: #ffffff;
		border-radius: 16rpx;
		padding: 40rpx 0 48rpx 0;

		.title {
			padding: 0 30rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 40rpx;
		}

		.list-content {
			margin: 30rpx;

			.list-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 140rpx;
				padding-right: 30rpx;
				border: 2rpx solid #97bcff;
				border-radius: 12rpx;
				margin-bottom: 30rpx;

				.order {
					width: 140rpx;
					height: 140rpx;
					line-height: 140rpx;
					background-color: #2975ff;
					border-radius: 12rpx;
					font-size: 36rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #fff;
					text-align: center;
				}

				.name {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 40rpx;
				}

				.level {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #2975ff;
					line-height: 40rpx;
				}
			}
		}
	}
</style>
