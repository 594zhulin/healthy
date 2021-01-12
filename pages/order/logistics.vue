<template>
	<view class="page-logistics">
		<view class="logistics-content">
			<view class="row">
				<view class="label">
					物流公司：
				</view>
				<view class="value">
					{{delivery_name}}
				</view>
			</view>
			<view class="row">
				<view class="label">
					运单编号：
				</view>
				<view class="value">
					{{delivery_id}}
				</view>
				<view class="link">复制</view>
			</view>
		</view>
		<view class="list-content" v-if="express.length>0">
			<view class="list-item" v-for="(item,index) in express" :key="index">

			</view>
		</view>
	</view>
</template>

<script>
	import {
		getExpress
	} from '@/api/order.js';
	export default {
		data() {
			return {
				express: [],
				delivery_id: '',
				delivery_name: ''
			};
		},
		onLoad(option) {
			getExpress(option.id).then(
				result => {
					const {
						delivery_id,
						delivery_name
					} = result.order
					this.express = result.express;
					this.delivery_id = delivery_id
					this.delivery_name = delivery_name
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f7f6f9;
	}

	.page-logistics {
		.logistics-content {
			padding: 30rpx;
			margin-bottom: 30rpx;
			background-color: #fff;

			.row {
				display: flex;
				align-items: center;
				margin-top: 20rpx;

				&:first-child {
					margin-top: 0;
				}

				.label {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #666666;
				}

				.value {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #222222;
				}

				.link {
					margin-left: 50rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #fc6262;
					line-height: 40rpx;
				}
			}
		}

		.list-content {
			padding: 30px;
			background-color: #fff;
		}
	}
</style>
