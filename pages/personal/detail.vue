<template>
	<view class="page-detail">
		<view class="name-content">
			<view class="label">姓名</view>
			<input class="input" type="text" v-model="real_name" />
		</view>
		<view class="phone-contnet">
			<view class="label">联系电话</view>
			<input class="input" type="number" v-model="phone" />
		</view>
		<view class="address-content">
			<view class="label">省市区</view>
			<picker class="picker" mode="region" :range="region" @change="bindRegionChange" v-model="items">
				<view class="text">{{ address }}</view>
			</picker>
			<image class="icon" src="../../static/train/train-icon-05.png" mode="aspectFit"></image>
		</view>
		<view class="street-content">
			<view class="label">详细地址</view>
			<input class="input" type="text" v-model="detail" />
		</view>
		<view class="tag-content">
			<view class="label">快捷标记</view>
			<picker class="picker" @change="bindTagChange" :value="index" :range="array">
				<view class="text">{{ array[index] }}</view>
			</picker>
			<image class="icon" src="../../static/train/train-icon-05.png" mode="aspectFit"></image>
		</view>
		<view class="default-content">
			<view class="label">设为默认地址</view>
			<switch class="switch" color="#2975FF" :checked="is_default == 1" @change="bindSwitchChange" />
		</view>
		<view class="btn-content">
			<view class="del-btn" v-if="id !== ''" @click="handleDelete">删除</view>
			<view class="submit-btn" @click="handleSubmit">提交</view>
		</view>
	</view>
</template>

<script>
import { getAddressDetail, editAddress, delAddress } from '@/api/personal.js';
export default {
	data() {
		return {
			id: '',
			real_name: '',
			phone: '',
			address: '',
			detail: '',
			array: ['家', '学校', '公司'],
			index: -1,
			province: '',
			city: '',
			district: '',
			is_default: 0,
			items: []
		};
	},
	onLoad(option) {
		if (option.id) {
			this.id = option.id;
			getAddressDetail(option.id).then(
				result => {
					this.real_name = result.real_name;
					this.phone = result.phone;
					this.province = result.province;
					this.city = result.city;
					this.district = result.district;
					this.detail = result.detail;
					this.is_default = result.is_default;
					this.items = [result.province, result.city, result.district];
					this.address = result.province + result.city + result.district;
					this.index = this.array.indexOf(result.addr_name);
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
		}
	},
	methods: {
		bindRegionChange(e) {
			this.province = e.detail.value[0];
			this.city = e.detail.value[1];
			this.district = e.detail.value[2];
			this.address = e.detail.value[0] + e.detail.value[1] + e.detail.value[2];
		},
		bindTagChange(e) {
			this.index = e.target.value;
		},
		bindSwitchChange(e) {
			this.is_default = e.detail.value ? 1 : 0;
		},
		handleDelete() {
			const _this = this;
			uni.showModal({
				content: '确定删除该地址？',
				success: function(res) {
					if (res.confirm) {
						delAddress({ id: _this.id }).then(
							result => {
								uni.navigateBack({
									delta: 1
								});
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
		handleSubmit() {
			const rePhone = /^(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
			if (this.real_name == '') {
				uni.showToast({
					icon: 'none',
					title: '请填写姓名'
				});
				return false;
			}
			if (this.phone == '') {
				uni.showToast({
					icon: 'none',
					title: '请填写联系电话'
				});
				return false;
			} else {
				if (!rePhone.test(this.phone)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号'
					});
					return false;
				}
			}
			if (this.address == '') {
				uni.showToast({
					icon: 'none',
					title: '请选择省市区'
				});
				return false;
			}
			if (this.detail == '') {
				uni.showToast({
					icon: 'none',
					title: '请填写详细地址'
				});
				return false;
			}
			editAddress({
				address: {
					province: this.province,
					city: this.city,
					district: this.district
				},
				addr_name: this.array[this.index],
				is_default: this.is_default,
				real_name: this.real_name,
				phone: this.phone,
				detail: this.detail,
				id: this.id
			}).then(
				result => {
					uni.navigateBack({
						delta: 1
					});
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
};
</script>

<style lang="less">
.page-detail {
	padding-top: 30rpx;
	background-color: #f7f6f9;
	.name-content,
	.phone-contnet,
	.address-content,
	.street-content,
	.tag-content,
	.default-content {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 96rpx;
		margin: 0 0 30rpx 0;
		padding: 0 32rpx 0 60rpx;
		background-color: #ffffff;
		.label {
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 40rpx;
		}
		.picker {
			flex: 1;
			height: 96rpx;
			line-height: 96rpx;
		}
		.text,
		.input {
			flex: 1;
			height: 96rpx;
			line-height: 96rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
			text-align: right;
		}
		.icon {
			width: 19rpx;
			height: 30rpx;
			margin-left: 26rpx;
		}
		.switch {
			position: absolute;
			top: 18rpx;
			right: 0;
			transform: scale(0.7);
		}
	}
	.default-content::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 2rpx;
		background-color: #e8e8e8;
	}
	.btn-content {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 102rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		.del-btn {
			width: 226rpx;
			height: 72rpx;
			margin-right: 50rpx;
			background: #ffffff;
			border-radius: 4rpx;
			border: 2rpx solid #2975ff;
			font-size: 28rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #2975ff;
			line-height: 68rpx;
			text-align: center;
			box-sizing: border-box;
		}
		.submit-btn {
			width: 226rpx;
			height: 72rpx;
			background: #2975ff;
			border-radius: 4rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #ffffff;
			line-height: 72rpx;
			text-align: center;
		}
	}
}
</style>
