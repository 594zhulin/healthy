<template>
	<view class="page-list" :style="{ paddingBottom: bottom + 'px' }">
		<view class="list-content">
			<view class="list-item" v-for="item in address" :key="item.id" @click="handleClick(item)">
				<view class="user">
					<view class="name">{{ item.real_name }}</view>
					<view class="phone">{{ item.phone }}</view>
				</view>
				<view class="address">{{ item.province }}{{ item.city }}{{ item.district }}{{ item.detail }}</view>
				<view class="actionsheet">
					<label class="label" @click="handleChange(item.id)">
						<radio class="radio" :checked="item.is_default == 1" />
						<text class="text" :class="{ checked: item.is_default == 1 }">{{ item.is_default == 1 ? '已设为默认' : '设为默认' }}</text>
					</label>
					<view class="btn-group">
						<view class="btn-modify" @click.stop="navigateTo('/pages/personal/detail?id=' + item.id)">
							<image class="icon" src="../../static/address/address-icon-01.png" mode="aspectFit"></image>
							<view class="text">编辑</view>
						</view>
						<view class="btn-delete" @click.stop="handleDelete(item.id)">
							<image class="icon" src="../../static/address/address-icon-02.png" mode="aspectFit"></image>
							<view class="text">删除</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view id="bottom" class="btn-content" :style="{ paddingBottom: isIphoneX ? paddingBottom : '20rpx' }">
			<view class="btn" @click="navigateTo('/pages/personal/detail')">添加地址</view>
		</view>
	</view>
</template>

<script>
import { getAddress, setDefaultAddress, delAddress } from '@/api/personal.js';
export default {
	data() {
		return {
			isIphoneX: false,
			paddingBottom: '',
			bottom: '',
			params: {
				page: 1,
				limit: 20
			},
			address: [],
			type: ''
		};
	},
	onLoad(option) {
		this.isIphoneX = getApp().globalData.isIphoneX;
		this.paddingBottom = getApp().globalData.paddingBottom;
		const query = uni.createSelectorQuery().in(this);
		query
			.select('#bottom')
			.boundingClientRect(data => {
				this.bottom = data.height + 15;
			})
			.exec();
		this.type = option.type;
	},
	onShow() {
		this.getListData('down');
	},
	onPullDownRefresh() {
		this.getListData('down');
	},
	onReachBottom() {
		this.getListData('up');
	},
	onUnload() {
		uni.removeStorageSync('tempAddress');
	},
	methods: {
		getListData(direction) {
			if (direction == 'down') {
				this.params.page = 1;
			} else {
				this.params.page += 1;
			}
			getAddress({ ...this.params }).then(
				result => {
					this.address = direction == 'down' ? result : this.address.concat(result);
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
		},
		handleClick(item) {
			if (this.type == 'confirm') {
				uni.setStorageSync('tempAddress', JSON.stringify(item));
				uni.navigateBack({
					delta: 1
				});
			}
		},
		handleChange(id) {
			setDefaultAddress({ id }).then(
				result => {
					this.address.map(item => {
						if (item.id == id) {
							item.is_default = 1;
						} else {
							item.is_default = 0;
						}
					});
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
		},
		handleDelete(id) {
			const _this = this;
			uni.showModal({
				content: '确定删除该地址？',
				success: function(res) {
					if (res.confirm) {
						delAddress({ id }).then(
							result => {
								_this.getListData('down');
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
			});
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
.page-list {
	.list-content {
		.list-item {
			margin: 30rpx;
			background-color: #fff;
			border-radius: 16rpx;
			.user {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 30rpx 30rpx 0 30rpx;
				box-sizing: border-box;
				.name,
				.phone {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 40rpx;
				}
			}
			.address {
				margin: 30rpx 0;
				padding: 0 30rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 40rpx;
				text-align: justify;
			}
			.actionsheet {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 96rpx;
				padding: 0 30rpx;
				&::before {
					content: '';
					position: absolute;
					left: 30rpx;
					right: 30rpx;
					top: 0;
					height: 2rpx;
					background-color: #e8e8e8;
				}
				.label {
					.radio {
						transform: scale(0.7);
					}
					.radio .wx-radio-input.wx-radio-input-checked {
						border: 1px solid #2975ff !important;
						background-color: #2975ff !important;
					}
					.text {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999;
						line-height: 40rpx;
					}
					.text.checked {
						color: #2975ff;
					}
				}
				.btn-group {
					display: flex;
					align-items: center;
					.btn-modify,
					.btn-delete {
						display: flex;
						align-items: center;
						.text {
							margin-left: 20rpx;
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #333333;
							line-height: 30rpx;
						}
					}
					.btn-modify {
						margin-right: 66rpx;
						.icon {
							width: 28rpx;
							height: 27rpx;
						}
					}
					.btn-delete {
						.icon {
							width: 23rpx;
							height: 28rpx;
						}
					}
				}
			}
		}
	}
	.btn-content {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 20rpx 30rpx 0 30rpx;
		background-color: #fff;
		&::before {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			content: '';
			height: 2rpx;
			background-color: #e8e8e8;
		}
		.btn {
			height: 80rpx;
			background: #2975ff;
			border-radius: 8rpx;
			font-size: 30rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #fff;
			line-height: 80rpx;
			text-align: center;
		}
	}
}
</style>
