<template>
	<view class="page-launch">
		<swiper class="swiper" :autoplay="true">
			<swiper-item class="swiper-item" v-for="item in banner" :key="item.events_id"><image class="banner" :src="item.slide_url"></image></swiper-item>
		</swiper>
		<view class="login-content">
			<block v-if="auth">
				<view class="flex-vertical no-login">
					<view class="flex-item"><button class="avatar" open-type="getUserInfo" @getuserinfo="getUserInfo">点击登录</button></view>
					<view class="flex-item">
						<view class="text">请登录后</view>
						<view class="text">开始比赛</view>
					</view>
				</view>
			</block>
			<block v-if="!auth">
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
							<view class="flex-item"><view class="btn-modify" @click="modify"></view></view>
						</view>
					</view>
					<block v-if="!run">
						<view class="flex-item"><view class="btn-start" @click="start">开始比赛</view></view>
					</block>
					<block v-else>
						<view class="flex-item">
							<view class="tip" v-if="origin">计时开始</view>
							<view class="time-text" v-if="!origin">请慢步热身</view>
							<view class="time" v-else>
								{{ hours < 10 ? '0' + hours : hours }}:{{ minute < 10 ? '0' + minute : minute }}:{{ second < 10 ? '0' + second : second }}
							</view>
							<view class="tip">注意请勿关闭程序，如果感应失败，则成绩作废</view>
						</view>
					</block>
				</view>
			</block>
		</view>
		<view class="finish-content" v-if="run"><view class="btn-finish" @click="finish">结束比赛</view></view>
		<view class="race-content">
			<view class="flex race-name">
				<view class="label">您所在的赛场：</view>
				<view class="text">{{ raceDetail.track_name }}</view>
			</view>
			<view class="flex race-order">
				<view class="label">赛道编号：</view>
				<view class="text">{{ raceDetail.track_num }}</view>
			</view>
			<view class="tab-container">
				<view class="desc" v-if="currentTabId === 3">
					<view class="text">{{ raceDetail.statement }}</view>
				</view>
				<swiper class="prize" :autoplay="true" v-if="currentTabId === 1">
					<swiper-item class="swiper-item" v-for="(item, index) in raceDetail.img_url" :key="index">
						<image class="banner" :src="item" mode="aspectFit"></image>
					</swiper-item>
				</swiper>
				<view class="map" v-if="currentTabId === 2">
					<view class="pic" v-if="raceDetail.map_img" :style="{ background: 'url(' + raceDetail.map_img + ') no-repeat center', backgroundSize: '100% auto' }"></view>
					<view class="site-list">
						<view class="flex site-item" v-for="(item, index) in coordinate" :key="index">
							<view class="icon" :class="{ checked: longitude == item.lng_num && latitude == item.lat_num }"></view>
							<view class="name">监测点{{ index }}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="flex tab">
				<view class="tab-item" :class="{ active: currentTabId === item.id }" v-for="item in tabs" :key="item.id" @click="toggleTab(item.id)">{{ item.text }}</view>
			</view>
		</view>
		<custom-modal ref="userInfoModal" direction="bottom">
			<view class="user-info-modal">
				<view class="title">{{ auth ? '登录' : '编辑信息' }}</view>
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
				<block v-if="auth">
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
		<custom-modal ref="raceModal" direction="bottom">
			<view class="race-modal">
				<view class="title">选择比赛组</view>
				<view class="content">
					<view class="row" :class="{ first: index === 0 }" v-for="(item, index) in raceGroup" :key="item.spec_id" @click="check(item)">
						<view class="radio" :class="{ active: currentRaceGroup.spec_id === item.spec_id }"></view>
						<view class="label">{{ item.spec_name }}{{ item.descr }}</view>
					</view>
				</view>
				<view class="btn-row">
					<view class="btn-cancel" @click="closeRaceModal">取消</view>
					<view class="btn-submit" @click="submit">提交</view>
				</view>
			</view>
		</custom-modal>
		<custom-modal ref="finishModal">
			<view class="finish-modal">
				<view class="title">恭喜，完成比赛</view>
				<view class="rank">
					<view class="score">{{ raceResult.ranking }}</view>
					<!-- <view class="btn-share">
						<view class="icon"></view>
						<view class="text">分享</view>
					</view> -->
				</view>
				<view class="race-detail">
					<view class="flex-horizontal">
						<view class="flex info">
							<view class="label">您所在的赛场：</view>
							<view class="text">{{ raceResult.track_name }}</view>
						</view>
						<view class="flex info">
							<view class="label">比赛用时：</view>
							<view class="text">{{ raceResult.when_num }}</view>
						</view>
					</view>
					<view class="flex-horizontal">
						<view class="flex info">
							<view class="label">赛道编号：</view>
							<view class="text">{{ raceResult.track_num }}</view>
						</view>
						<view class="flex info">
							<view class="label">获得积分：</view>
							<view class="text">{{ raceResult.obtain_integral_num }}分</view>
						</view>
					</view>
					<view class="flex-horizontal">
						<view class="flex info">
							<view class="label">完成比赛：</view>
							<view class="text">{{ raceResult.events_name }}</view>
						</view>
						<view class="flex info">
							<view class="label">奖励积分：</view>
							<view class="text">{{ raceResult.award_integral_num }}分</view>
						</view>
					</view>
				</view>
				<view class="map" v-if="raceResult.map_img" :style="{ background: 'url(' + raceResult.map_img + ') no-repeat center', backgroundSize: '100% auto' }"></view>
				<view class="btn-subscribe" @click="closeFinishModal">订阅赛事动态</view>
				<view class="tip">赛事设有幸运跑步者，最强跑步者，请订阅赛事动态，及时获悉赛事获奖信息等。</view>
				<view class="btn-close" @click="closeFinishModal"></view>
			</view>
		</custom-modal>
	</view>
</template>

<script>
import { login, loginAuth, setUserInfo, getLoginInfo, getPhone, start, getFaultList, repair } from '@/api/launch.js';
import { getActivityBanner, getRaceDetail, getRaceInfo, finishRace, finishResult, startRace, getRaceGroup, submitRaceGroup } from '@/api/race.js';
export default {
	props: {
		events_id: String,
		events_racetrack_id: String,
		events_track_id: String
	},
	data() {
		return {
			auth: false,
			run: false,
			phone: '',
			items: ['男', '女'],
			gender: '',
			birth_at: '',
			sex: '',
			birthday: '请选择出生日期',
			end: '',
			age: '',
			time: '请慢步热身',
			timer: null,
			hours: 0, // 时
			minute: 0, // 分
			second: 0, // 秒
			coordinate: [],
			lng_num: '',
			lat_num: '',
			longitude: '',
			latitude: '',
			tabs: [
				{
					id: 1,
					text: '奖品展示'
				},
				{
					id: 2,
					text: '跑道地图'
				},
				{
					id: 3,
					text: '赛事声明'
				}
			],
			currentTabId: 3,
			raceDetail: null,
			banner: [],
			raceInfo: null,
			raceResult: null,
			raceGroup: [],
			currentRaceGroup: '',
			origin: false
		};
	},
	mounted() {
		const this_ = this;
		//#ifdef MP-WEIXIN
		wx.onLocationChange(function(res) {
			console.log(res)
			this_.longitude = this_.formatDecimal(res.longitude, 5);
			this_.latitude = this_.formatDecimal(res.latitude, 5);
		});
		//#endif
		if (this_.device_id) {
			// this_.end = moment().format('YYYY-MM-DD');
			uni.login({
				provider: 'weixin',
				success: function(res) {
					login({ code: res.code }).then(
						result => {
							uni.setStorageSync('user_id', result.user_id);
							this_.auth = result.is_news;
							if (!result.is_news) {
								this_.getLoginInfo();
							}
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
		getRaceDetail({ events_id: this.events_id || 1, track_id: this.events_track_id || 1 }).then(
			result => {
				this.raceDetail = result;
			},
			err => {
				uni.showToast({
					icon: 'none',
					title: err.text
				});
			}
		);
		this.getActivityBanner();
		this.getRaceInfo();
	},
	methods: {
		toggleTab(tabId) {
			this.currentTabId = tabId;
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
					this.sex = res.userInfo.gender == 2 ? 1 : 0;
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
			getPhone({ session_key, encryptedData, iv }).then(
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
			setUserInfo({ birth_at: this.birthday, phone, gender: this.sex == 0 ? 1 : 2 }).then(
				result => {
					this.auth = false;
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
						login({ code: res.code }).then(
							result => {
								uni.setStorageSync('user_id', result.user_id);
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
		getActivityBanner() {
			getActivityBanner().then(
				result => {
					this.banner = result;
				},
				err => {
					console.log(err);
				}
			);
		},
		getRaceInfo() {
			getRaceInfo({ events_id: this.events_id || 1, racetrack_id: this.events_racetrack_id || 1, track_id: this.events_track_id || 1 }).then(
				result => {
					this.raceInfo = result;
					this.coordinate = result.coordinate;
					this.lng_num = result.coordinate.length && result.coordinate[0].lng_num;
					this.lat_num = result.coordinate.length && result.coordinate[0].lat_num;
					this.currentRaceGroup = {
						matching_id: result.matching_id,
						events_id: result.events_id,
						spec_id: result.spec_id,
						spec_name: '',
						descr: '',
						racetrack_id: result.racetrack_id,
						track_id: result.track_id
					};
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
		},
		start() {
			if (this.raceInfo.is_join == 0) {
				this.$refs['raceModal'].open();
				getRaceGroup({
					events_id: this.events_id || 1,
					racetrack_id: this.events_racetrack_id || 1,
					track_id: this.events_track_id || 1
				}).then(
					result => {
						this.raceGroup = result;
					},
					err => {
						uni.showToast({
							icon: 'none',
							title: err.text
						});
					}
				);
			} else {
				if (this.raceInfo.is_join != 1) {
					startRace({
						users_events_id: this.raceInfo.users_events_id,
						matching_id: this.currentRaceGroup.matching_id,
						events_id: this.events_id || 1,
						racetrack_id: this.events_racetrack_id || 1,
						track_id: this.events_track_id || 1,
						spec_id: this.currentRaceGroup.spec_id
					}).then(
						result => {
							this.run = true;
							if (this.longitude == this.lat_num && this.latitude == this.lng_num) {
								this.origin = true;
								this.timer = setInterval(() => {
									this.second = this.second + 1;
									if (this.second >= 60) {
										this.second = 0;
										this.minute = this.minute + 1;
										if (this.minute >= 60) {
											this.minute = 0;
											this.hours = this.hours + 1;
										}
									}
								}, 1000);
							}
						},
						err => {
							console.log(err);
							uni.showToast({
								icon: 'none',
								title: err.text
							});
						}
					);
				} else {
					this.run = true;
					if (this.longitude == this.lat_num && this.latitude == this.lng_num) {
						this.origin = true;
						this.timer = setInterval(() => {
							this.second = this.second + 1;
							if (this.second >= 60) {
								this.second = 0;
								this.minute = this.minute + 1;
								if (this.minute >= 60) {
									this.minute = 0;
									this.hours = this.hours + 1;
								}
							}
						}, 1000);
					}
				}
			}
		},
		check(group) {
			this.currentRaceGroup = group;
		},
		closeRaceModal() {
			this.$refs['raceModal'].close();
		},
		formatDecimal(num, decimal) {
			num = num.toString();
			let index = num.indexOf('.');
			if (index !== -1) {
				num = num.substring(0, decimal + index + 1);
			} else {
				num = num.substring(0);
			}
			return parseFloat(num).toFixed(decimal);
		},
		submit() {
			const this_ = this;
			this_.$refs['raceModal'].close();
			this_.run = true;
			//#ifdef MP-WEIXIN
			wx.getSetting({
				success(res) {
					if (!res.authSetting['scope.userLocationBackground']) {
						wx.authorize({
							scope: 'scope.userLocationBackground',
							success() {
								wx.startLocationUpdateBackground({
									success: res => {
										console.log('后台授权-success-res:', res);
									},
									fail: res => {
										console.log('后台授权====fail失败--res:', res);
									}
								});
							},
							fail(res) {
								// 授权失败
								wx.showModal({
									title: '授权失败，点击右上角设置位置为使用时和离开后!',
									icon: 'none',
									duration: 5000,
									mask: true,
									success: result => {
										if (result.confirm) {
											wx.openSetting({
												complete: res => {
													res.authSetting = {
														'scope.userLocation': true,
														'scope.userLocationBackground': true
													};
													wx.startLocationUpdateBackground({
														success: res => {
															console.log('后台授权-success-res:', res);
														},
														fail: res => {
															console.log('后台授权====fail失败--res:', res);
														}
													});
												}
											});
										}
									}
								});
							}
						});
					} else {
						wx.startLocationUpdateBackground({
							success: res => {
								console.log('后台授权-success-res:', res);
							},
							fail: res => {
								console.log('后台授权====fail失败--res:', res);
							}
						});

						wx.onLocationChange(function(res) {
							this_.longitude = this_.formatDecimal(res.longitude, 5);
							this_.latitude = this_.formatDecimal(res.latitude, 5);
						});
						if (this_.longitude == this_.lat_num && this_.latitude == this_.lng_num) {
							this_.origin = true;
							this_.timer = setInterval(() => {
								this_.second = this_.second + 1;
								if (this_.second >= 60) {
									this_.second = 0;
									this_.minute = this_.minute + 1;
									if (this_.minute >= 60) {
										this_.minute = 0;
										this_.hours = this_.hours + 1;
									}
								}
							}, 1000);
						}
					}
				}
			});
			//#endif
			submitRaceGroup({
				matching_id: this.currentRaceGroup.matching_id,
				events_id: this.events_id || 1,
				racetrack_id: this.events_racetrack_id || 1,
				track_id: this.events_track_id || 1,
				spec_id: this.currentRaceGroup.spec_id
			}).then(
				result => {
					this.getRaceInfo();
				},
				err => {
					console.log(err);
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
		},
		finish() {
			this.$refs['finishModal'].open();
			finishRace({
				users_events_id: this.raceInfo.users_events_id,
				matching_id: this.currentRaceGroup.matching_id,
				events_id: this.events_id || 1,
				racetrack_id: this.events_racetrack_id || 1,
				track_id: this.events_track_id || 1,
				spec_id: this.currentRaceGroup.spec_id,
				millisecond: this.hours * 60 * 60 * 1000 + this.minute * 60 * 1000 + this.second * 1000
			}).then(
				result => {
					this.finishResult();
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
			clearInterval(this.timer);
		},
		finishResult() {
			finishResult({
				users_events_id: this.raceInfo.users_events_id,
				matching_id: this.currentRaceGroup.matching_id,
				events_id: this.events_id || 1,
				racetrack_id: this.events_racetrack_id || 1,
				track_id: this.events_track_id || 1,
				spec_id: this.currentRaceGroup.spec_id
			}).then(
				result => {
					this.raceResult = result;
					this.run = false;
					this.getRaceInfo();
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
		},
		closeFinishModal() {
			this.$refs['finishModal'].close();
		}
	}
};
</script>

<style lang="less" scoped>
.page-launch {
	height: 100vh;
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
			.btn-modify {
				position: relative;
				width: 72rpx;
				height: 20rpx;
				background: url(../../static/launch/modify.png) no-repeat center;
				background-size: 20rpx 20rpx;
			}
			.btn-start {
				position: relative;
				height: 112rpx;
				padding-top: 74rpx;
				margin-bottom: 40rpx;
				background: url(../../static/race/run.png) no-repeat center top;
				background-size: 86rpx 60rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				letter-spacing: 0.34rpx;
				text-indent: 0.34rpx;
				text-align: center;
			}
			.tip {
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 0.59);
				text-align: center;
				letter-spacing: 0.24rpx;
				text-indent: 0.24rpx;
				&:last-child {
					margin-bottom: 38rpx;
				}
			}
			.time,
			.time-text {
				margin-bottom: 6rpx;
				font-size: 36rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				text-align: center;
				letter-spacing: 0.43rpx;
				text-indent: 0.43rpx;
			}
			.time-text {
				font-size: 28rpx;
			}
		}
	}
	.finish-content {
		position: absolute;
		bottom: 226rpx;
		right: 61rpx;
		width: 176rpx;
		height: 209rpx;
		background: url(../../static/launch/repair-bg.png) no-repeat center;
		background-size: 176rpx 209rpx;
		z-index: 98;
		text-align: center;
		.btn-finish {
			width: 98rpx;
			height: 60rpx;
			margin: 114rpx auto 0 auto;
			padding-left: 50rpx;
			background: url(../../static/race/end.png) no-repeat left center;
			background-size: 40rpx 40rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(230, 85, 85, 1);
			line-height: 30rpx;
		}
	}
	.race-content {
		position: fixed;
		left: 16rpx;
		bottom: 232rpx;
		width: 462rpx;
		height: 760rpx;
		padding: 26rpx 26rpx 34rpx 26rpx;
		background: rgba(0, 0, 0, 0.7);
		border-radius: 48rpx;
		border: 2rpx solid rgba(255, 255, 255, 0.75);
		.race-name,
		.race-order {
			margin-left: 6rpx;
			.label {
				width: 168rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
			}
			.text {
				font-size: 30rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: rgba(255, 255, 255, 1);
			}
		}
		.race-order {
			margin: 12rpx 0 22rpx 0;
		}
		.tab-container {
			position: relative;
			height: 534rpx;
			overflow: auto;
			&::before {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				content: '';
				height: 2rpx;
				background-color: rgba(255, 255, 255, 0.6);
			}
			.desc {
				padding-top: 34rpx;
				line-height: 38rpx;
				font-size: 26rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 0.8);
			}
			.prize {
				margin: 24rpx 0 26rpx 0;
				height: 484rpx;
				.swiper-item {
					.banner {
						width: 412rpx;
						height: 484rpx;
					}
				}
			}
			.map {
				.pic {
					height: 234rpx;
					margin: 22rpx 0;
				}
				.site-item {
					margin-bottom: 28rpx;
					.icon {
						width: 24rpx;
						height: 24rpx;
						margin: 0 16rpx 0 18rpx;
					}
					.icon.checked {
						background: url(../../static/race/check.png) no-repeat center;
						background-size: 24rpx 24rpx;
					}
					.name {
						font-size: 20rpx;
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 600;
						color: rgba(255, 255, 255, 1);
						letter-spacing: 0.24rpx;
						text-indent: 0.24rpx;
					}
					.name.checked {
						color: rgba(255, 255, 255, 0.39);
					}
				}
			}
		}
		.tab-item {
			width: 126rpx;
			height: 54rpx;
			line-height: 54rpx;
			margin-left: 22rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 26rpx;
			border: 2rpx solid rgba(210, 226, 255, 1);
			font-size: 20rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: rgba(107, 160, 255, 1);
			text-align: center;
			&:first-child {
				margin-left: 0;
			}
		}
		.tab-item.active {
			background: rgba(42, 118, 255, 1);
			border: 2rpx solid rgba(42, 118, 255, 1);
			color: rgba(255, 255, 255, 1);
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
	.finish-modal {
		position: relative;
		width: 510rpx;
		height: 450px;
		&::before {
			position: absolute;
			top: -78rpx;
			left: 0;
			right: 0;
			content: '';
			height: 284rpx;
			background: url(../../static/race/header.png) no-repeat center;
			background-size: 510rpx 284rpx;
			z-index: -1;
		}
		.title {
			padding-top: 114rpx;
			font-size: 42rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: rgba(255, 255, 255, 1);
			text-shadow: 0 4rpx 6rpx rgba(21, 82, 192, 0.7);
			text-align: center;
		}
		.rank {
			position: relative;
			margin-bottom: 22rpx;
			.score {
				display: flex;
				align-items: center;
				position: relative;
				width: 154rpx;
				height: 90rpx;
				padding-left: 38rpx;
				margin: 40rpx 12rpx 18rpx 158rpx;
				background: url(../../static/race/medal.png) no-repeat left center;
				background-size: 26rpx 44rpx;
				font-size: 64rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: rgba(255, 83, 17, 1);
				&::after {
					display: inline-block;
					margin: 22rpx 0 0 12rpx;
					content: '名';
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(255, 83, 17, 1);
				}
			}
			.btn-share {
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				right: 64rpx;
				bottom: 12rpx;
				width: 82rpx;
				height: 36rpx;
				line-height: 36rpx;
				background: rgba(42, 118, 255, 1);
				border-radius: 32rpx;
				.icon {
					width: 20rpx;
					height: 20rpx;
					background: url(../../static/race/share.png) no-repeat center;
					background-size: 20rpx 20rpx;
				}
				.text {
					font-size: 16rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					text-align: center;
				}
			}
		}
		.race-detail {
			margin: 0 14rpx 0 22rpx;
		}
		.info {
			flex: 1;
			margin-bottom: 12rpx;
			.label {
				width: 140rpx;
				margin-right: 6rpx;
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				text-align: right;
			}
			.text {
				flex: 1;
				font-size: 20rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: rgba(51, 51, 51, 1);
			}
		}
		.map {
			margin: 8rpx 14rpx 26rpx 34rpx;
			height: 264rpx;
			background-color: #000;
		}
		.btn-subscribe {
			width: 250rpx;
			height: 64rpx;
			line-height: 64rpx;
			margin: 0 auto;
			background: rgba(42, 118, 255, 1);
			border-radius: 32rpx;
			text-align: center;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: rgba(255, 255, 255, 1);
		}
		.tip {
			width: 364rpx;
			margin: 16rpx auto 26rpx auto;
			font-size: 20rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(102, 102, 102, 1);
		}
		.btn-close {
			margin-top: 68rpx;
			height: 60rpx;
			background: url(../../static/race/close.png) no-repeat center;
			background-size: 60rpx 60rpx;
		}
	}
	.race-modal {
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
			margin-right: 44rpx;
			overflow: auto;
		}
		.row {
			display: flex;
			align-items: center;
			height: 98rpx;
			margin-left: 76rpx;
			.radio {
				width: 18px;
				height: 18px;
				margin-right: 49rpx;
				background: rgba(255, 255, 255, 1);
				border: 2rpx solid rgba(208, 208, 208, 1);
				border-radius: 50%;
			}
			.label {
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
					width: 8px;
					height: 8px;
					margin: 4px auto;
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
}
</style>
