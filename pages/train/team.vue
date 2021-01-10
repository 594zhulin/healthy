<template>
	<view class="page-team">
		<view class="date-content">
			<view class="row">
				<view class="label">时间</view>
				<picker class="picker" mode="date" :value="form.invite_time" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="text">{{ form.invite_time }}</view>
				</picker>
				<image class="icon" src="../../static/train/train-icon-05.png" mode="aspectFit"></image>
			</view>
			<view class="row">
				<view class="label">具体时间</view>
				<picker class="picker" mode="time" :value="form.time_quantum" :start="startTime" @change="bindTimeChange">
					<view class="text">{{ form.time_quantum }}</view>
				</picker>
				<image class="icon" src="../../static/train/train-icon-05.png" mode="aspectFit"></image>
			</view>
		</view>
		<view class="address-content" @click="handleClick">
			<view class="label">地点</view>
			<view class="text">{{ form.address }}</view>
			<image class="icon" src="../../static/train/train-icon-05.png" mode="aspectFit"></image>
		</view>
		<view class="select-content">
			<view class="label">运动类型</view>
			<input class="text" type="text" v-model="form.title" />
			<!-- <picker class="picker" @change="bindPickerChange" :value="index" :range="array">
				<view class="text">{{ array[index] }}</view>
			</picker> -->
			<!-- <image class="icon" src="../../static/train/train-icon-05.png" mode="aspectFit"></image> -->
		</view>
		<view class="desc-content">
			<view class="label">备注</view>
			<input class="text" type="text" v-model="remark" />
		</view>
		<button class="btn" v-if="validate" type="default" open-type="share">邀约好友</button>
		<view class="btn" v-else @click="handleSubmit">邀约好友</view>
		<custom-modal ref="authModal">
			<view class="auth-modal">
				<view class="title">"体能观测站"需要获取您的地理位置</view>
				<view class="btn-group">
					<view class="btn" @click="handleClose">取消</view>
					<button class="btn confirm" type="default" open-type="openSetting" @click="handleClose">确定</button>
				</view>
			</view>
		</custom-modal>
	</view>
</template>

<script>
import { addActivity } from '@/api/train.js';
export default {
	data() {
		const currentDate = this.getDate({
			format: true
		});
		const startTime = new Date().getHours() + ':' + (new Date().getMinutes() > 9 ? new Date().getMinutes() : '0' + new Date().getMinutes());
		return {
			startTime,
			validate: false,
			form: {
				invite_time: currentDate,
				time_quantum: startTime,
				address: '',
				longitude: '',
				latitude: '',
				title: ''
			},
			remark: '',
			id: ''
		};
	},
	onShareAppMessage() {
		return {
			title: '快来跟我一起组队运动吧',
			path: '/pages/train/share?id=' + this.id
		};
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	watch: {
		form: {
			deep: true,
			handler(newForm) {
				console.log(newForm);
				this.validate = Object.values(newForm).every(item => {
					return item != '';
				});
				console.log(this.validate);
				if (this.validate) {
					addActivity({ ...this.form, remark: this.remark }).then(
						result => {
							this.id = result;
						},
						err => {}
					);
				}
			}
		}
	},
	methods: {
		bindDateChange(e) {
			this.form.invite_time = e.target.value;
			if (
				this.getDate({
					format: true
				}) == this.form.invite_time
			) {
				this.startTime = new Date().getHours() + ':' + (new Date().getMinutes() > 9 ? new Date().getMinutes() : '0' + new Date().getMinutes());
				this.form.time_quantum = this.startTime;
			} else {
				this.startTime = '';
				this.form.time_quantum = '';
			}
		},
		bindTimeChange(e) {
			this.form.time_quantum = e.target.value;
		},
		handleClick() {
			const _this = this;
			uni.chooseLocation({
				latitude: _this.form.latitude,
				longitude: _this.form.longitude,
				success(res) {
					const { address, latitude, longitude } = res;
					_this.form = { ..._this.form, address, latitude, longitude };
				},
				fail(err) {
					if (err.errMsg == 'chooseLocation:fail auth deny') {
						_this.$refs['authModal'].open();
					}
				}
			});
		},
		handleClose() {
			this.$refs['authModal'].close();
		},
		handleSubmit() {
			if (this.form.address == '') {
				uni.showToast({
					icon: 'none',
					title: '请选择地点'
				});
				return false;
			}
			if (this.form.title == '') {
				uni.showToast({
					icon: 'none',
					title: '请填写运动类型'
				});
				return false;
			}
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year;
			} else if (type === 'end') {
				year = year + 5;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		}
	}
};
</script>

<style lang="less" scoped>
.page-team {
	padding-top: 30rpx;
	background-color: #f7f6f9;
	.date-content {
		margin: 0 0 30rpx 0;
		background-color: #ffffff;
		.row {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 0 32rpx 0 60rpx;
			&::after {
				content: '';
				position: absolute;
				left: -40rpx;
				right: -12rpx;
				bottom: 0;
				height: 2rpx;
				background-color: #e8e8e8;
			}
			&:last-child::after {
				display: none;
			}
			.label {
				width: 112rpx;
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
			.text {
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
	}
	.address-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 30rpx 0;
		padding: 0 32rpx 0 60rpx;
		background-color: #ffffff;
		.label {
			flex-shrink: 0;
			width: 112rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 40rpx;
		}
		.text {
			flex: 1;
			height: 96rpx;
			line-height: 96rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
			text-align: right;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.icon {
			width: 19rpx;
			height: 30rpx;
			margin-left: 26rpx;
		}
	}
	.select-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 32rpx 0 60rpx;
		margin: 30rpx 0;
		background-color: #ffffff;
		.label {
			width: 112rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 40rpx;
		}
		.text {
			flex: 1;
			height: 96rpx;
			line-height: 96rpx;
			padding-left: 40rpx;
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
	.desc-content {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 32rpx 0 60rpx;
		background-color: #fff;
		&::after {
			content: '';
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			height: 2rpx;
			background-color: #e8e8e8;
		}
		.label {
			width: 112rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 40rpx;
		}
		.text {
			flex: 1;
			height: 96rpx;
			line-height: 96rpx;
			padding-left: 40rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
			text-align: right;
		}
	}
	& > .btn {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 102rpx;
		width: 226rpx;
		height: 72rpx;
		margin: 0 auto;
		padding: 0;
		background: #2975ff;
		border-radius: 4rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #ffffff;
		line-height: 72rpx;
		text-align: center;
		&::after {
			display: none;
		}
	}
	.auth-modal {
		width: 600rpx;
		.title {
			height: 250rpx;
			padding: 70rpx 40rpx 0 40rpx;
			box-sizing: border-box;
			font-size: 36rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #333;
			text-align: center;
		}
		.btn-group {
			position: relative;
			display: flex;
			align-items: center;
			height: 110rpx;
			&::before {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				content: '';
				height: 2rpx;
				background-color: #eee;
			}
			.btn {
				flex: 1;
				height: 110rpx;
				line-height: 110rpx;
				font-size: 36rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #000;
				text-align: center;
			}
			.btn.confirm {
				position: relative;
				padding: 0;
				color: #3cc51f;
				background: none;
				&::before {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					content: '';
					width: 2rpx;
					height: 110rpx;
					background-color: #eee;
				}
				&::after {
					display: none;
				}
			}
		}
	}
}
</style>
