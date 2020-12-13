<template>
	<view class="page-index">
		<view class="avatar-content" @click="bindAvatarChange">
			<view class="label">头像</view>
			<image class="avatar" :src="avatar" mode="aspectFit"></image>
			<image class="icon" src="../../static/train/train-icon-05.png" mode="aspectFit"></image>
		</view>
		<view class="name-content">
			<view class="label">姓名</view>
			<input class="text" type="text" v-model="name" />
		</view>
		<view class="sex-content">
			<view class="label">性别</view>
			<picker class="picker" @change="bindTagChange" :value="index" :range="array">
				<view class="text">{{ array[index] }}</view>
			</picker>
			<image class="icon" src="../../static/train/train-icon-05.png" mode="aspectFit"></image>
		</view>
		<view class="birthday-content">
			<view class="label">出生日期</view>
			<picker class="picker" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="text">{{ date }}</view>
			</picker>
			<image class="icon" src="../../static/train/train-icon-05.png" mode="aspectFit"></image>
		</view>
		<view class="btn">确认修改</view>
	</view>
</template>

<script>
import { getUser } from '@/api/personal.js';
export default {
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			avatar: '',
			name: '',
			array: ['男', '女'],
			index: 0,
			date: currentDate
		};
	},
	onLoad() {
		getUser().then(
			result => {
				const { avatar, nickname, integral, complete_count } = result;
				this.userInfo = { ...this.userInfo, avatar, nickname, integral, complete_count };
			},
			err => {}
		);
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	methods: {
		bindAvatarChange() {
			const _this = this;
			uni.chooseImage({
				count: 1,
				success: function(res) {
					const token = uni.getStorageSync('token');
					uni.uploadFile({
						url: 'https://shop.healthmach.com/api/upload/image',
						filePath: res.tempFilePaths[0],
						name: 'pics',
						formData: {
							filename: 'pics'
						},
						header: {
							'Content-Type': 'multipart/form-data',
							'Authori-zation': 'Bearer ' + token
						},
						success: function(res) {
							const data = JSON.parse(res.data);
							if (data.status == 200) {
								_this.avatar = data.data.url;
							}
						}
					});
				}
			});
		},
		bindDateChange(e) {
			this.date = e.target.value;
		},
		bindPickerChange(e) {
			this.index = e.target.value;
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		}
	}
};
</script>

<style lang="less">
.page-index {
	padding-top: 30rpx;
	background-color: #f7f6f9;
	.avatar-content,
	.name-content,
	.sex-content,
	.birthday-content {
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
		.avatar {
			position: absolute;
			top: 0;
			bottom: 0;
			right: 76rpx;
			width: 80rpx;
			height: 80rpx;
			margin: auto;
			border-radius: 100%;
			background-color: #eee;
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
	}
	.birthday-content::after {
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
