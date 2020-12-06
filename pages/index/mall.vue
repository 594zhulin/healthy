<template>
	<view class="component-mall">
		<view class="search-content">
			<view class="content">
				<image class="icon" src="../../static/mall/mall-icon-01.svg" mode="aspectFit"></image>
				<input class="input" type="text" value="" />
			</view>
			<view class="btn">搜索</view>
		</view>
		<view class="user-content">
			<view class="user">
				<view class="avatar"></view>
				<view class="text">朱琳</view>
			</view>
			<view class="circle-deep"></view>
			<view class="circle-shallow"></view>
			<view class="overview">
				<view class="balance">
					<view class="text">余额</view>
					<view class="step">25,588万</view>
					<view class="text">步</view>
				</view>
				<view class="exchange">已兑换书籍：30本</view>
			</view>
		</view>
		<view class="menu-content">
			<view class="menu-list">
				<view class="menu-item active">
					<view class="text">猜你喜欢</view>
					<image class="icon" src="../../static/mall/mall-icon-02.svg" mode="aspectFit"></image>
				</view>
				<view class="menu-item">
					<view class="text">传统美食</view>
					<image class="icon" src="../../static/mall/mall-icon-02.svg" mode="aspectFit"></image>
				</view>
				<view class="menu-item">
					<view class="text">家居生活</view>
					<image class="icon" src="../../static/mall/mall-icon-02.svg" mode="aspectFit"></image>
				</view>
				<view class="menu-item">
					<view class="text">电子电器</view>
					<image class="icon" src="../../static/mall/mall-icon-02.svg" mode="aspectFit"></image>
				</view>
				<view class="menu-item">
					<view class="text">佳节礼品</view>
					<image class="icon" src="../../static/mall/mall-icon-02.svg" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<custom-pull-refresh ref="customPullrefresh" @pulldownRefresh="pulldownRefresh" @pullupRefresh="pullupRefresh">
			<view class="list-content">
				<view class="list-item">
					<view class="pic"></view>
					<view class="name">商品名称</view>
					<view class="content">
						<view class="step">
							<view class="text">3万步</view>
							<view class="price">¥ 499</view>
						</view>
						<view class="btn">去兑换</view>
						<!-- <view class="status">已售罄</view> -->
					</view>
				</view>
				<view class="list-item">
					<view class="pic"></view>
					<view class="name">商品名称</view>
					<view class="content">
						<view class="step">
							<view class="text">3万步</view>
							<view class="price">¥ 499</view>
						</view>
						<view class="btn">去兑换</view>
						<!-- <view class="status">已售罄</view> -->
					</view>
				</view>
				<view class="list-item">
					<view class="pic"></view>
					<view class="name">商品名称</view>
					<view class="content">
						<view class="step">
							<view class="text">3万步</view>
							<view class="price">¥ 499</view>
						</view>
						<view class="btn">去兑换</view>
						<!-- <view class="status">已售罄</view> -->
					</view>
				</view>
				<view class="list-item">
					<view class="pic"></view>
					<view class="name">商品名称</view>
					<view class="content">
						<view class="step">
							<view class="text">3万步</view>
							<view class="price">¥ 499</view>
						</view>
						<view class="btn">去兑换</view>
						<!-- <view class="status">已售罄</view> -->
					</view>
				</view>
			</view>
		</custom-pull-refresh>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	mounted() {
		this.$emit('onChangeHeaderBg', true);
	},
	destroyed() {
		this.$emit('onChangeHeaderBg', false);
	},
	methods: {
		pulldownRefresh() {
			console.log('下拉请求数据');
			uni.request({
				url: 'https://stamina.yulongtianzi.com/api/login/is_check',
				method: 'POST',
				data: {
					user_id: 2316
				},
				success: res => {
					this.$refs['customPullrefresh'].endPulldown();
					this.text += res.data.data;
				}
			});
		},
		pullupRefresh() {
			uni.request({
				url: 'https://stamina.yulongtianzi.com/api/login/is_check',
				method: 'POST',
				data: {
					user_id: 2316
				},
				success: res => {}
			});
		}
	}
};
</script>

<style lang="less">
page {
	padding-bottom: 128rpx;
	background-color: #f7f6f9;
}
.component-mall {
	&::after {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		content: '';
		height: 212rpx;
		background-color: #0056ff;
		z-index: -1;
	}
	.search-content {
		display: flex;
		align-items: center;
		height: 60rpx;
		margin: 20rpx 0 42rpx 24rpx;
		.content {
			flex: 1;
			display: flex;
			align-items: center;
			height: 60rpx;
			background: #ffffff;
			border-radius: 12rpx;
			.icon {
				width: 32rpx;
				height: 32rpx;
				margin: 0 12rpx 0 26rpx;
			}
			.input {
				flex: 1;
				padding-right: 30rpx;
			}
		}
		.btn {
			width: 116rpx;
			padding: 0 24rpx 0 32rpx;
			font-size: 30rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #ffffff;
			line-height: 42rpx;
			box-sizing: border-box;
		}
	}
	.user-content {
		position: relative;
		height: 182rpx;
		margin: 0 60rpx;
		background: #ffffff;
		box-shadow: 0px 10rpx 10rpx 0px rgba(0, 0, 0, 0.08);
		border-radius: 16rpx;
		.user {
			position: relative;
			display: flex;
			align-items: center;
			&::after {
				content: '';
				position: absolute;
				left: 22rpx;
				right: 18rpx;
				bottom: 0;
				height: 2rpx;
				background-color: #e8e8e8;
			}
			.avatar {
				width: 84rpx;
				height: 84rpx;
				margin: 16rpx 26rpx 10rpx 32rpx;
				border: 2rpx solid #e0e0e0;
				box-sizing: border-box;
				border-radius: 50%;
				background-color: #eee;
			}
			.text {
				font-size: 30rpx;
				font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
				font-weight: 400;
				color: #373d52;
				line-height: 42rpx;
			}
		}
		.circle-deep {
			position: absolute;
			top: 40rpx;
			right: 56rpx;
			width: 42rpx;
			height: 42rpx;
			background: rgba(17, 100, 254, 0.6);
			border-radius: 50%;
		}
		.circle-shallow {
			position: absolute;
			top: 40rpx;
			right: 26rpx;
			width: 42rpx;
			height: 42rpx;
			background: rgba(17, 100, 255, 0.2);
			border-radius: 50%;
		}
		.overview {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 22rpx 18rpx 0 22rpx;
			.balance {
				display: flex;
				align-items: center;
				.text {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 30rpx;
					letter-spacing: 4rpx;
				}
				.step {
					margin: 0 4rpx 0 6rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #000000;
					line-height: 34rpx;
				}
			}
			.exchange {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 30rpx;
			}
		}
	}
	.menu-content {
		margin: 50rpx 0 44rpx 28rpx;
		.menu-list {
			white-space: nowrap;
			.menu-item {
				position: relative;
				display: inline-block;
				margin-right: 46rpx;
				.text {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #a3a7b9;
					line-height: 34rpx;
				}
				.icon {
					display: none;
					position: absolute;
					left: 0;
					right: 0;
					margin: 0 auto;
					width: 32rpx;
					height: 6rpx;
				}
			}
			.menu-item.active {
				.text {
					font-size: 30rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					line-height: 42rpx;
				}
				.icon {
					display: block;
				}
			}
		}
	}
	.list-content {
		display: flex;
		flex-wrap: wrap;
		padding: 46rpx 14rpx 0 14rpx;
		background: #ffffff;
		border-radius: 48rpx 48rpx 0px 0px;
		.list-item {
			width: 42.4vw;
			height: 404rpx;
			margin-left: 4vw;
			margin-bottom: 4vw;
			.pic {
				height: 280rpx;
				background: #d8d8d8;
				border-radius: 12rpx;
			}
			.name {
				margin: 16rpx 20rpx 22rpx 20rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 34rpx;
			}
			.content {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.step {
					display: flex;
					align-items: flex-end;
					.text {
						margin: 0 16rpx 0 22rpx;
						font-size: 24rpx;
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 600;
						color: #cd1f1f;
						line-height: 34rpx;
					}
					.price {
						font-size: 20rpx;
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 600;
						color: #d8d8d8;
						line-height: 28rpx;
						text-decoration: line-through;
					}
				}
				.btn {
					width: 112rpx;
					height: 36rpx;
					margin-right: 12rpx;
					background: #fff0e2;
					border-radius: 26rpx;
					border: 2rpx solid #ffa428;
					font-size: 20rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #e9921b;
					line-height: 32rpx;
					box-sizing: border-box;
					text-align: center;
				}
				.status {
					margin-right: 18rpx;
					font-size: 20rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #d8d8d8;
					line-height: 28rpx;
				}
			}
		}
	}
}
</style>
