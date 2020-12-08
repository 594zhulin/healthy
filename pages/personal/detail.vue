<template>
	<view class="page-detail">
		<view class="name-content">
			<view class="label">姓名</view>
			<input class="input" type="text" v-model="name" />
		</view>
		<view class="phone-contnet">
			<view class="label">联系电话</view>
			<input class="input" type="number" v-model="mobile" />
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
			<switch class="switch" color="#2975FF" checked="true" @change="bindSwitchChange" />
		</view>
		<view class="btn">提交</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			name: '',
			mobile: '',
			address: '',
			detail: '',
			array: ['家', '学校', '公司'],
			index: 0,
			province: '',
			city: '',
			district: '',
			items: []
		};
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
		bindSwitchChange(e) {}
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
	.btn {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 102rpx;
		width: 226rpx;
		height: 72rpx;
		margin: 0 auto;
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
</style>
