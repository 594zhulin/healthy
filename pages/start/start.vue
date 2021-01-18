<template>
	<view class="page-launch">
		<view class="btn-home" @click="switchTab"><image class="icon" src="../../static/home/home.svg" mode="aspectFit"></image></view>
		<swiper class="swiper" :autoplay="true" interval="5000">
			<swiper-item class="swiper-item" v-for="(item, index) in banner" :key="index"><image class="banner" :src="item.ad_pic" mode="widthFix"></image></swiper-item>
		</swiper>
		<view class="login-content">
			<block v-if="!auth">
				<view class="flex-vertical no-login">
					<view class="flex-item"><button class="avatar" open-type="getUserInfo" @getuserinfo="getUserInfo">点击登录</button></view>
					<view class="flex-item">
						<view class="text">请登录后</view>
						<view class="text">启动设备</view>
					</view>
				</view>
			</block>
			<block v-if="auth">
				<block v-if="!boot">
					<view class="flex-vertical has-login">
						<view class="flex-item">
							<open-data type="userAvatarUrl" class="avatar"></open-data>
							<view class="text">您好</view>
							<open-data type="userNickName" class="name"></open-data>
							<view class="flex-horizontal">
								<view class="flex-item flex">
									<view class="gender" :class="{ girl: gender == 1, boy: gender == 0 }"></view>
									<view class="age">{{ age }}</view>
								</view>
								<view class="flex-item btn-item"><view class="btn-modify" @click="modify"></view></view>
							</view>
						</view>
						<view class="flex-item"><view class="btn-start" @click="start">启动设备</view></view>
					</view>
				</block>
				<block v-else>
					<view class="flex-vertical has-start">
						<view class="flex-item">
							<open-data type="userAvatarUrl" class="avatar"></open-data>
							<view class="welcome">您好</view>
							<open-data type="userNickName" class="name"></open-data>
							<view class="tip">指令已发送</view>
							<view class="tip">请根据提示测量</view>
						</view>
						<view class="flex-item">
							<view class="progress">
								<canvas class="progress-bar" canvas-id="canvas">
									<view class="time">
										<view class="count">{{ countdown }}</view>
										<view class="text">剩余时间</view>
									</view>
								</canvas>
							</view>
						</view>
					</view>
				</block>
			</block>
		</view>
		<view class="repair-content" v-if="boot">
			<view class="text">设备故障</view>
			<view class="btn-repair" @click="openRepairModal">去报修</view>
		</view>
		<custom-modal ref="userInfoModal" direction="bottom" maskClick>
			<view class="user-info-modal">
				<view class="title">{{ !auth ? '登录' : '编辑信息' }}</view>
				<view class="row">
					<view class="label">性别</view>
					<picker class="picker" mode="selector" v-model="sex" :range="items" id="sex" @change="select">
						<view class="text">{{ sex == 0 ? '男' : '女' }}</view>
					</picker>
				</view>
				<view class="row">
					<view class="label">出生日期</view>
					<picker class="picker" mode="date" v-model="birthday" id="birthday" @change="select" :end="end">
						<view class="text">{{ birthday }}</view>
					</picker>
				</view>
				<block v-if="!auth">
					<view class="btn-auth" @click="checkInfo" v-if="birthday === '请选择出生日期'">授权手机号并登录</view>
					<button class="btn-auth" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" v-else>授权手机号并登录</button>
				</block>
				<block v-else>
					<view class="btn-row">
						<view class="btn-cancel" @click="cancel">取消</view>
						<view class="btn-save" @click="save">保存</view>
					</view>
				</block>
			</view>
		</custom-modal>
		<custom-modal ref="repairModal" direction="bottom">
			<view class="repair-modal">
				<view class="title">设备报修</view>
				<view class="content">
					<view class="row" :class="{ first: index === 0 }" v-for="(item, index) in faultList" :key="item.id" @click="check(item.id)">
						<view class="radio" :class="{ active: faultcause_id === item.id }"></view>
						<view class="label">{{ item.name }}</view>
					</view>
				</view>
				<view class="btn-row">
					<view class="btn-cancel" @click="closeRepairModal">取消</view>
					<view class="btn-submit" @click="submit">提交</view>
				</view>
			</view>
		</custom-modal>
		<custom-modal ref="couponModal" direction="none">
			<view class="coupon-modal">
				<view class="title">有一份健康关怀from</view>
				<view class="community">{{ coupon.coupon_title }}</view>
				<view class="coupon-content">
					<image src="../../static/launch/coupon.png" mode="aspectFit" class="bg"></image>
					<view class="top-text">恭喜您获得</view>
					<view class="flex money">
						<view class="number">{{ coupon.coupon_money }}</view>
						<view class="unit">元</view>
					</view>
					<view class="middle-text">单次体能观测</view>
					<view class="name">全额代金券</view>
					<view class="bottom-text">领取后，您本次可免费测量并获得数据报告</view>
					<view class="btn" @click="closeCouponModal">欣然笑纳</view>
				</view>
				<view class="btn-close" @click="closeCouponModal"></view>
			</view>
		</custom-modal>
	</view>
</template>

<script>
import { getBanner, login, loginAuth, setUserInfo, getLoginInfo, getPhone, start, getFaultList, repair, getCoupon, loginCheck } from '@/api/launch.js';
export default {
	data() {
		return {
			device_id: '',
			banner: [],
			auth: false,
			boot: false,
			phone: '',
			items: ['男', '女'],
			gender: '',
			birth_at: '',
			sex: '',
			birthday: '请选择出生日期',
			end: '',
			age: '',
			faultList: [],
			faultcause_id: '',
			step: 1,
			count: 0,
			origin: 1.5 * Math.PI,
			finish: -0.5 * Math.PI,
			timer: null,
			seconds: 120,
			countdown: 120,
			coupon: ''
		};
	},
	onLoad(option) {
		const this_ = this;
		if (option.device_id) {
			this_.device_id = option.device_id;
			this_.end = this_.getCurrentDate();
			this_.ringMove(this_.origin, this_.finish);
			uni.login({
				provider: 'weixin',
				success: function(res) {
					login({
						code: res.code
					}).then(
						result => {
							uni.setStorageSync('user_id', result.user_id);
							uni.setStorageSync('is_admin', result.is_admin);
							uni.setStorageSync('is_open', result.is_open);
							uni.setStorageSync('is_perfect', result.is_perfect);
							uni.setStorageSync('is_default', result.is_default);
							this_.auth = result.is_perfect == 1;
							if (result.is_perfect == 1) {
								this_.getLoginInfo();
							}
							this_.getBanner();
							// this_.loginCheck();
						},
						err => {
							uni.showToast({
								icon: 'none',
								title: err.text
							});
						}
					);
				}
			});
			getCoupon({
				device_id: this_.device_id
			}).then(
				result => {
					this.coupon = result;
				},
				err => {
					console.log(err);
				}
			);
			setTimeout(function() {
				this_.$refs['couponModal'].open();
			}, 1000);
		}
	},
	methods: {
		getCurrentDate() {
			const date = new Date();
			const YYYY = date.getFullYear();
			const MM = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
			const DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
			return YYYY + '-' + MM + '-' + DD;
		},
		loginCheck() {
			loginCheck().then(
				result => {
					this.auth = result;
					if (result) {
						this.getLoginInfo();
					}
				},
				err => {
					console.log(err);
				}
			);
		},
		getBanner() {
			getBanner().then(
				result => {
					this.banner = result;
				},
				err => {
					// uni.showToast({
					// 	icon: 'none',
					// 	title: err.text
					// });
				}
			);
		},
		getUserInfo() {
			const this_ = this;
			uni.getUserInfo({
				provider: 'weixin',
				success: function(res) {
					console.log(res.userInfo.gender);
					const params = {
						nickName: res.userInfo.nickName,
						gender: res.userInfo.gender,
						avatarUrl: res.userInfo.avatarUrl
					};
					this_.loginAuth(params);
					this_.gender = res.userInfo.gender == 2 ? 1 : 0;
					this_.sex = res.userInfo.gender == 2 ? 1 : 0;
					this_.$refs['userInfoModal'].open();
				}
			});
		},
		loginAuth(params) {
			loginAuth({ ...params }).then(
				result => {
					console.log(result);
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
		},
		getLoginInfo() {
			getLoginInfo().then(
				result => {
					this.age = new Date().getFullYear() - result.birth_at.slice(0, 4) + '岁';
					this.gender = result.gender == 2 ? 1 : 0;
					this.sex = result.gender == 2 ? 1 : 0;
					this.birth_at = result.birth_at;
					this.birthday = result.birth_at;
					this.phone = result.phone;
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
		},
		getPhone(session_key, encryptedData, iv) {
			getPhone({
				session_key,
				encryptedData,
				iv
			}).then(
				result => {
					this.phone = result.phoneNumber;
					this.setUserInfo(result.phoneNumber);
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
		},
		setUserInfo(phone) {
			setUserInfo({
				birth_at: this.birthday,
				phone,
				gender: this.sex == 0 ? 1 : 2
			}).then(
				result => {
					this.auth = true;
					this.gender = this.sex;
					this.birth_at = this.birthday;
					this.age = new Date().getFullYear() - this.birthday.slice(0, 4) + '岁';
					this.$refs['userInfoModal'].close();
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
		},
		getPhoneNumber(e) {
			const this_ = this;
			if (e.detail.errMsg === 'getPhoneNumber:ok') {
				uni.login({
					provider: 'weixin',
					success: function(res) {
						login({
							code: res.code
						}).then(
							result => {
								uni.setStorageSync('user_id', result.user_id);
								uni.setStorageSync('is_admin', result.is_admin);
								uni.setStorageSync('is_open', result.is_open);
								uni.setStorageSync('is_perfect', result.is_perfect);
								uni.setStorageSync('is_default', result.is_default);
								this_.getPhone(result.session_key, e.detail.encryptedData, e.detail.iv);
							},
							err => {
								uni.showToast({
									icon: 'none',
									title: err.text
								});
							}
						);
					}
				});
			}
		},
		checkInfo() {
			if (this.birthday === '请选择出生日期') {
				uni.showToast({
					icon: 'none',
					title: '请选择出生日期'
				});
			}
		},
		select(e) {
			this[e.target.id] = e.detail.value;
		},
		cancel() {
			this.$refs['userInfoModal'].close();
		},
		modify() {
			this.sex = this.gender;
			this.birthday = this.birth_at;
			this.$refs['userInfoModal'].open();
		},
		save() {
			if (this.sex === this.gender && this.birth_at === this.birthday) {
				this.$refs['userInfoModal'].close();
			} else {
				this.setUserInfo(this.phone);
			}
		},
		start() {
			start({
				device_id: this.device_id
			}).then(
				result => {
					this.boot = true;
					this.timer = setInterval(this.animation, 1000);
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
		},
		openRepairModal() {
			this.$refs['repairModal'].open();
			getFaultList().then(
				result => {
					this.faultList = result;
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
		},
		check(id) {
			this.faultcause_id = id;
		},
		closeRepairModal() {
			this.$refs['repairModal'].close();
		},
		closeCouponModal() {
			this.$refs['couponModal'].close();
		},
		submit() {
			repair({
				device_id: this.device_id,
				faultcause_id: this.faultcause_id
			}).then(
				result => {
					this.$refs['repairModal'].close();
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
		},
		animation() {
			if (this.step <= this.seconds) {
				this.finish = this.finish + (2 * Math.PI) / this.seconds;
				this.ringMove(this.origin, this.finish);
				this.step = this.step + 1;
				this.countdown = this.countdown - 1;
			} else {
				clearInterval(this.timer);
				uni.switchTab({
					url: '/pages/home/home'
				});
			}
		},
		ringMove(s, e) {
			const context = uni.createCanvasContext('canvas', this);
			context.setStrokeStyle('#2975FF');
			context.beginPath();
			context.setLineCap('round');
			context.setLineWidth(6);
			context.arc(39, 39, 36, s, e, true);
			context.stroke();
			context.closePath();
			context.draw();
			this.count = this.count + 1;
		},
		switchTab(url) {
			uni.switchTab({
				url: '/pages/home/home'
			});
		}
	}
};
</script>

<style lang="less" scoped>
.page-launch {
	height: 100vh;
	.btn-home {
		position: fixed;
		top: 100rpx;
		left: 40rpx;
		width: 70rpx;
		height: 70rpx;
		background-color: rgba(0, 0, 0, 0.5);
		border-radius: 50%;
		z-index: 9999;
		.icon {
			display: block;
			width: 40rpx;
			height: 40rpx;
			margin: 15rpx auto;
		}
	}

	.swiper,
	.swiper-item {
		height: 100vh;

		.banner {
			width: 100vw;
			height: 100vh;
		}
	}

	.login-content {
		position: fixed;
		right: 60rpx;
		bottom: 348rpx;
		width: 176rpx;
		height: 532rpx;
		background: rgba(0, 0, 0, 0.7);
		border-radius: 88rpx;

		&::before {
			display: block;
			content: '';
			position: absolute;
			right: -20rpx;
			bottom: -20rpx;
			width: 176rpx;
			height: 532rpx;
			border-radius: 88px;
			border: 20rpx solid rgba(255, 255, 255, 1);
			opacity: 0.7;
		}

		.no-login {
			.avatar {
				width: 120rpx;
				height: 120rpx;
				line-height: 120rpx;
				margin: 28rpx;
				background: url(../../static/launch/avatar.png) no-repeat center;
				background-size: 120rpx 120rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				text-align: center;
				letter-spacing: 0.34rpx;
				text-indent: 0.34rpx;
			}

			.text {
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(204, 204, 204, 1);
				line-height: 40rpx;
				text-align: center;
				letter-spacing: 0.34rpx;
				text-indent: 0.34rpx;

				&:last-child {
					margin-bottom: 54rpx;
				}
			}
		}

		.has-login {
			.avatar {
				width: 120rpx;
				height: 120rpx;
				margin: 28rpx;
				border-radius: 50%;
				overflow: hidden;
			}

			.flex-item .text {
				padding-left: 18rpx;
				height: 28rpx;
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				line-height: 28rpx;
				letter-spacing: 0.24rpx;
				text-indent: 0.24rpx;
			}

			.name {
				padding-left: 18rpx;
				margin: 16rpx 0 12rpx 0;
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: rgba(255, 255, 255, 1);
				line-height: 40rpx;
				overflow: hidden;
			}

			.gender {
				width: 21rpx;
				height: 20rpx;
				margin: 0 5rpx 0 18rpx;
			}

			.girl {
				background: url(../../static/launch/girl.png) no-repeat center;
				background-size: 21rpx 20rpx;
			}

			.boy {
				background: url(../../static/launch/boy.png) no-repeat center;
				background-size: 21rpx 21rpx;
			}

			.age {
				height: 28rpx;
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				line-height: 28rpx;
				letter-spacing: 0.24rpx;
				text-indent: 0.24rpx;
			}

			.btn-item {
				position: absolute;
				right: 0;
			}

			.btn-modify {
				position: relative;
				width: 72rpx;
				height: 80rpx;
				background: url(../../static/launch/modify.png) no-repeat center;
				background-size: 20rpx 20rpx;
			}

			.btn-start {
				position: relative;
				height: 112rpx;
				padding-top: 72rpx;
				margin-bottom: 40rpx;
				background: url(../../static/launch/boot.png) no-repeat center top;
				background-size: 58rpx 61rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				letter-spacing: 0.34rpx;
				text-indent: 0.34rpx;
				text-align: center;
			}
		}

		.has-start {
			.avatar {
				width: 156rpx;
				height: 156rpx;
				margin: 10rpx;
				border-radius: 50%;
				overflow: hidden;
				border: 8rpx solid #ffffff;
				box-sizing: border-box;
			}

			.welcome {
				padding-left: 18rpx;
				margin-bottom: 16rpx;
				height: 28rpx;
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				line-height: 28rpx;
				letter-spacing: 0.24rpx;
				text-indent: 0.24rpx;
			}

			.name {
				padding-left: 18rpx;
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: rgba(255, 255, 255, 1);
				line-height: 40rpx;
				overflow: hidden;
			}

			.tip {
				padding-left: 18rpx;
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 0.5);
				line-height: 28rpx;
				letter-spacing: 0.24rpx;
				text-indent: 0.24rpx;
			}

			.progress {
				position: relative;
				width: 78px;
				height: 78px;
				margin: 10rpx auto;
				background-color: rgba(255, 255, 255, 1);
				border-radius: 50%;
			}

			.progress-bar {
				width: 78px;
				height: 78px;
			}

			.time {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 84rpx;
				margin-top: 36rpx;

				.count {
					display: flex;
					align-items: flex-end;
					justify-content: center;
					height: 56rpx;
					line-height: 56rpx;
					margin-left: 13rpx;
					font-size: 40rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: rgba(41, 117, 255, 1);

					&::after {
						display: block;
						margin-left: 13rpx;
						content: 's';
						height: 28rpx;
						line-height: 28rpx;
						font-size: 20rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: rgba(41, 117, 255, 1);
					}
				}

				.text {
					height: 28rpx;
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(117, 150, 190, 1);
					line-height: 28rpx;
					text-align: center;
				}

				.margin {
					margin-left: 13rpx;
				}
			}
		}
	}

	.repair-content {
		position: absolute;
		bottom: 226rpx;
		right: 60rpx;
		width: 176rpx;
		height: 209rpx;
		background: url(../../static/launch/repair-bg.png) no-repeat center;
		background-size: 176rpx 209rpx;
		z-index: 98;
		text-align: center;

		.text {
			display: flex;
			align-items: center;
			margin-left: 24rpx;
			margin-bottom: 7rpx;
			margin-top: 116rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(230, 85, 85, 1);
			line-height: 33rpx;

			&::before {
				content: '';
				display: block;
				width: 26rpx;
				height: 24rpx;
				margin-right: 7rpx;
				background: url(../../static/launch/warn.png) no-repeat center;
				background-size: 26rpx 24rpx;
			}
		}

		.btn-repair {
			font-size: 20rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(230, 85, 85, 1);
			line-height: 22rpx;
			text-decoration: underline;
		}
	}

	.user-info-modal {
		height: 566rpx;
		border-radius: 48rpx 48rpx 0px 0px;

		.title {
			position: relative;
			display: flex;
			align-items: center;
			height: 114rpx;
			padding-left: 40rpx;
			font-size: 34rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);

			&::after {
				position: absolute;
				left: 19rpx;
				right: 18rpx;
				bottom: 0;
				content: '';
				height: 2rpx;
				background-color: rgba(232, 232, 232, 1);
			}
		}

		.row {
			display: flex;
			align-items: center;
			position: relative;
			height: 126rpx;
			margin: 0 32rpx 0 74rpx;
			background: url(../../static/launch/arrow.png) no-repeat center right;
			background-size: 19rpx 30rpx;

			&::after {
				position: absolute;
				left: -55rpx;
				right: -14rpx;
				bottom: 0;
				content: '';
				height: 2rpx;
				background-color: rgba(232, 232, 232, 1);
			}

			.label {
				font-size: 34rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
			}

			.picker {
				flex: 1;
				padding-right: 46rpx;
				text-align: right;
				font-size: 34rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
			}
		}

		.btn-auth {
			width: 300rpx;
			height: 72rpx;
			line-height: 72rpx;
			margin: 42rpx auto;
			background: rgba(41, 117, 255, 1);
			border-radius: 4rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: rgba(255, 255, 255, 1);
			text-align: center;
		}

		.btn-row {
			display: flex;
			justify-content: space-between;
			padding: 42rpx 130rpx 0 132rpx;
		}

		.btn-cancel,
		.btn-save {
			width: 226rpx;
			height: 72rpx;
			line-height: 72rpx;
			border-radius: 4rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			text-align: center;
		}

		.btn-cancel {
			background: rgba(231, 231, 231, 1);
			color: rgba(116, 161, 243, 1);
		}

		.btn-save {
			background: rgba(41, 117, 255, 1);
			color: rgba(255, 255, 255, 1);
		}
	}

	.repair-modal {
		height: 690rpx;
		border-radius: 48rpx 48rpx 0px 0px;

		.title {
			position: relative;
			display: flex;
			align-items: center;
			height: 112rpx;
			padding-left: 40rpx;
			font-size: 34rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);

			&::after {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				content: '';
				height: 2rpx;
				background-color: rgba(232, 232, 232, 1);
			}
		}

		.content {
			height: 422rpx;
		}

		.row {
			display: flex;
			align-items: center;
			width: 50%;
			height: 98rpx;
			margin-left: 76rpx;

			.radio {
				width: 36rpx;
				height: 36rpx;
				margin-right: 49rpx;
				background: rgba(255, 255, 255, 1);
				border: 2rpx solid rgba(208, 208, 208, 1);
				border-radius: 50%;
			}

			.label {
				width: 204rpx;
				height: 48rpx;
				font-size: 34rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				line-height: 48rpx;
			}

			.active {
				border: 2rpx solid rgba(41, 117, 255, 1);

				&::before {
					display: block;
					content: '';
					width: 16rpx;
					height: 16rpx;
					margin: 8rpx auto;
					background: rgba(41, 117, 255, 1);
					border-radius: 50%;
				}
			}
		}

		.first {
			margin-top: 14rpx;
		}

		.btn-row {
			display: flex;
			justify-content: space-between;
			padding: 0 128rpx 0 131rpx;
		}

		.btn-cancel,
		.btn-submit {
			width: 225rpx;
			height: 72rpx;
			line-height: 72rpx;
			border-radius: 4px;
			font-size: 28rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			text-align: center;
		}

		.btn-cancel {
			background: rgba(231, 231, 231, 1);
			color: rgba(116, 161, 243, 1);
		}

		.btn-submit {
			background: rgba(41, 117, 255, 1);
			color: rgba(255, 255, 255, 1);
		}
	}

	.coupon-modal {
		text-align: center;

		.title {
			margin-bottom: 12rpx;
			font-size: 30rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(252, 223, 192, 1);
		}

		.community {
			margin-bottom: 62rpx;
			font-size: 60rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(255, 171, 81, 1);
		}

		.coupon-content {
			position: relative;
			width: 704rpx;
			height: 689rpx;
		}

		.bg {
			position: absolute;
			left: 0;
			width: 704rpx;
			height: 689rpx;
			z-index: -1;
		}

		.top-text {
			padding-top: 70rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(245, 94, 62, 1);
		}

		.money {
			margin: 14rpx 0 0 0;
			justify-content: center;
		}

		.number {
			height: 63px;
			line-height: 63px;
			font-size: 90rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(255, 120, 92, 1);
		}

		.unit {
			margin-top: 20px;
			margin-left: 16rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(255, 120, 92, 1);
		}

		.middle-text {
			position: absolute;
			top: 250rpx;
			left: 0;
			right: 0;
			margin: auto;
			font-size: 22rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(255, 120, 92, 1);
		}

		.name {
			position: absolute;
			top: 294rpx;
			left: 0;
			right: 0;
			margin: auto;
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(255, 116, 43, 1);
		}

		.bottom-text {
			position: absolute;
			left: 0;
			right: 0;
			margin: auto;
			bottom: 254rpx;
			font-size: 20rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
		}

		.btn {
			position: absolute;
			left: 0;
			right: 0;
			margin: auto;
			bottom: 168rpx;
			font-size: 40rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(194, 104, 9, 1);
		}

		.btn-close {
			position: absolute;
			left: 0;
			right: 0;
			bottom: -6rpx;
			width: 60rpx;
			height: 60rpx;
			margin: 0 auto;
			background: url(../../static/launch/close.png) no-repeat center;
			background-size: 60rpx 60rpx;
		}
	}
}
</style>
