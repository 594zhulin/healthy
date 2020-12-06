<template>
	<view class="page-team">
		<view class="date-content">
			<view class="flex">
				<view class="label">时间</view>
				<picker class="picker" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="text">{{ date }}</view>
				</picker>
				<image class="icon" src="../../static/train/train-icon-05.png" mode="aspectFit"></image>
			</view>
			<view class="flex">
				<view class="label">具体时间</view>
				<picker class="picker" mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
					<view class="text">{{ time }}</view>
				</picker>
				<image class="icon" src="../../static/train/train-icon-05.png" mode="aspectFit"></image>
			</view>
		</view>
		<view class="address-content">
			<view class="label">地点</view>
			<view class="text">成都市,天府一街01号</view>
			<image class="icon" src="../../static/train/train-icon-05.png" mode="aspectFit"></image>
		</view>
		<view class="select-content">
			<view class="label">运动类型</view>
			<picker class="picker" @change="bindPickerChange" :value="index" :range="array">
				<view class="text">{{ array[index] }}</view>
			</picker>
			<image class="icon" src="../../static/train/train-icon-05.png" mode="aspectFit"></image>
		</view>
		<view class="desc-content">
			<view class="label">备注</view>
			<textarea class="text" value="xxxxxxxxxxxxxxxxxx" placeholder="" />
		</view>
		<view class="btn">邀约好友</view>
	</view>
</template>

<script>
export default {
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			date: currentDate,
			time: '12:01',
			array: ['中国', '美国', '巴西', '日本'],
			index: 0
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
	methods: {
		bindDateChange: function(e) {
			this.date = e.target.value;
		},
		bindTimeChange: function(e) {
			this.time = e.target.value;
		},
		bindPickerChange: function(e) {
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

<style lang="less" scoped>
.page-team {
	background-color: #f7f6f9;
	.date-content {
		margin: 30rpx 0;
		background-color: #ffffff;
		.flex {
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
	.desc-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 32rpx 0 60rpx;
		background-color: #fff;
		.label {
			width: 112rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 40rpx;
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
