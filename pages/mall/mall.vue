<template>
	<view class="page-mall">
		<view class="search-content" @click="navigateTo('/pages/order/search')">
			<view class="content">
				<image class="icon" src="../../static/mall/mall-icon-01.svg" mode="aspectFit"></image>
				<view class="input"></view>
				<!-- <input class="input" type="text" value="" /> -->
			</view>
			<!-- <view class="btn">搜索</view> -->
		</view>
		<view class="user-content">
			<view class="user">
				<image class="avatar" :src="userInfo.avatar" mode="aspectFit"></image>
				<view class="text">{{ userInfo.nickname||'请登录' }}</view>
			</view>
			<view class="circle-deep"></view>
			<view class="circle-shallow"></view>
			<view class="overview">
				<view class="balance">
					<view class="text">余额</view>
					<view class="step">{{ userInfo.integral }}</view>
					<view class="text">万步</view>
				</view>
				<view class="exchange">已兑换书籍：{{ userInfo.complete_count || 0 }}本</view>
			</view>
		</view>
		<view class="menu-content">
			<view class="menu-list">
				<view class="menu-item" :class="{ active: params.cid == '' }" @click="bindCategoryChange(0)">
					<view class="text">猜你喜欢</view>
					<image class="icon" src="../../static/mall/mall-icon-02.svg" mode="aspectFit"></image>
				</view>
				<view class="menu-item" :class="{ active: params.cid == item.id }" v-for="item in category" :key="item.id" @click="bindCategoryChange(item.id)">
					<view class="text">{{ item.cate_name }}</view>
					<image class="icon" src="../../static/mall/mall-icon-02.svg" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<view class="list-content" v-if="product.length > 0">
			<view class="list-item" v-for="item in product" :key="item.id" @click="navigateTo('/pages/order/product?id=' + item.id)">
				<image class="pic" :src="item.image" mode="aspectFit"></image>
				<view class="name">{{ item.store_name }}</view>
				<view class="content">
					<view class="step">
						<view class="text" v-if="item.is_model == 1">{{ item.buy_credits }}万步</view>
						<view class="text" v-else>￥{{ item.price }}</view>
						<!-- <view class="price">¥{{ item.ot_price }}</view> -->
					</view>
					<view class="btn">{{ item.is_model == 1 ? '去兑换' : '去购买' }}</view>
					<!-- <view class="status" v-else>已售罄</view> -->
				</view>
			</view>
		</view>
		<custom-tabbar :currentId="3"></custom-tabbar>
		<button v-if="!isLogin" class="login-btn" type="default" open-type="getUserInfo" @getuserinfo="getUserInfo"></button>
	</view>
</template>

<script>
	import {
		getUser,
		getCategory,
		getProduct,
		getRecommend
	} from '@/api/mall.js';
	import {
		login
	} from '@/api/home.js';
	export default {
		data() {
			return {
				isLogin: false,
				userInfo: {
					avatar: '',
					nickname: '',
					integral: 0,
					complete_count: 0
				},
				category: [],
				params: {
					cid: '',
					page: 1,
					limit: 20
				},
				product: [],
				total: 0
			};
		},
		onShow() {
			this.init()
		},
		onReachBottom() {
			this.getListData('up');
		},
		methods: {
			init() {
				this.isLogin = uni.getStorageSync('isLogin')
				getUser().then(
					result => {
						const {
							avatar,
							nickname,
							integral,
							orderStatusNum
						} = result;
						this.userInfo = { ...this.userInfo,
							avatar,
							nickname,
							integral,
							complete_count: orderStatusNum.evaluated_count
						};
					},
					err => {}
				);
				getCategory().then(
					result => {
						this.category = result;
						this.getListData('down');
					},
					err => {}
				);
			},
			getUserInfo(e) {
				const _this = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes);
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								login({
									code: loginRes.code,
									iv: infoRes.iv,
									encryptedData: infoRes.encryptedData,
									signature: infoRes.signature
								}).then(
									result => {
										uni.setStorageSync('token', result.token);
										uni.setStorageSync('expires_time', result.expires_time);
										uni.setStorageSync('user_id', result.userInfo.uid);
										uni.setStorageSync('isLogin', true)
										_this.isLogin = true;
										_this.init()
									},
									err => {}
								);
							}
						});
					}
				});
			},
			bindCategoryChange(id) {
				this.params.cid = id;
				this.getListData('down');
			},
			getListData(direction) {
				if (direction == 'down') {
					this.params.page = 1;
				} else {
					if (this.product.length >= this.total) {
						return false;
					}
					this.params.page += 1;
				}
				if (this.params.cid == '') {
					getRecommend({
						page: this.params.page,
						limit: this.params.limit
					}).then(
						result => {
							const {
								list,
								total
							} = result;
							this.product = direction == 'down' ? list : this.product.concat(list);
							this.total = total;
						},
						err => {}
					);
				} else {
					getProduct({ ...this.params
					}).then(
						result => {
							const {
								list,
								total
							} = result;
							this.product = direction == 'down' ? list : this.product.concat(list);
							this.total = total;
						},
						err => {}
					);
				}
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
		padding-bottom: 128rpx;
		background-color: #f7f6f9;
	}

	.page-mall {
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
			margin: 20rpx 60rpx 42rpx 60rpx;

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
					width: 100%;
					height: 280rpx;
					border-radius: 12rpx;
				}

				.name {
					margin: 16rpx 20rpx 22rpx 20rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					line-height: 34rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
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

		.login-btn {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			opacity: 0;
			z-index: 9999;
		}
	}
</style>
