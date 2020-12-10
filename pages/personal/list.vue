<template>
	<view class="page-list" :style="{ paddingBottom: bottom + 'px' }">
		<view class="list-content">
			<view class="list-item">
				<view class="user">
					<view class="name">朱琳</view>
					<view class="phone">18737474753</view>
				</view>
				<view class="address">湖南省长沙市爱德华镇保德花园小区38号停车场 B区1楼</view>
				<view class="actionsheet">
					<label class="label">
						<radio class="radio" color="#2975FF" value="" />
						<text class="text">设为默认地址</text>
					</label>
					<view class="btn-group">
						<view class="btn-modify">
							<image class="icon" src="../../static/address/address-icon-01.png" mode="aspectFit"></image>
							<view class="text">编辑</view>
						</view>
						<view class="btn-delete">
							<image class="icon" src="../../static/address/address-icon-02.png" mode="aspectFit"></image>
							<view class="text">删除</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view id="bottom" class="btn-content" :style="{ paddingBottom: isIphoneX ? paddingBottom : '20rpx' }"><view class="btn">添加地址</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isIphoneX: false,
			paddingBottom: '',
			bottom: ''
		};
	},
	onLoad() {
		this.isIphoneX = getApp().globalData.isIphoneX;
		this.paddingBottom = getApp().globalData.paddingBottom;
		const query = uni.createSelectorQuery().in(this);
		query
			.select('#bottom')
			.boundingClientRect(data => {
				this.bottom = data.height + 15;
			})
			.exec();
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
			margin: 30rpx 0;
			background-color: #fff;
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
					.text {
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #2975ff;
						line-height: 40rpx;
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
