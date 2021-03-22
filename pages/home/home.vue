<template>
	<view class="page-home">
		<template>
			<view class="overview-content">
				<view class="score-item" @click="navigateTo('/pages/measure/index')">
					<image class="background" src="../../static/home/home-bg-01.svg" mode="aspectFit"></image>
					<image class="icon" src="../../static/home/home-icon-01.svg" mode="aspectFit"></image>
					<view class="title">体能评分</view>
					<view class="date">{{ create_at }}</view>
					<view class="chart">
						<mpvue-echarts class="gauge" ref="gaugeChart" :echarts="echarts" @onInit="initGaugeChart" />
						<view class="score">{{ score }}</view>
					</view>
					<view class="tag">{{ synthesis_lable || '无' }}</view>
					<view class="text">超过{{ percent }}%的用户</view>
					<view class="btn">数据报告</view>
				</view>
				<view class="bank-item" @click="navigateTo('/pages/bank/bank?step='+no_deposit_num+'&total='+integral_num)">
					<image class="background" src="../../static/home/home-bg-02.svg" mode="aspectFit"></image>
					<image class="icon" src="../../static/home/home-icon-02.svg" mode="aspectFit"></image>
					<view class="title">步数银行</view>
					<view class="text">待存入</view>
					<view class="step">{{ no_deposit_num }}万步</view>
					<view class="text total">共累计{{ integral_num }}万步</view>
					<view class="btn">点我存入</view>
				</view>
			</view>
			<view class="grid-content">
				<view class="grid-item plan" @click="navigateTo('/pages/train/plan')">
					<image class="icon" src="../../static/home/home-icon-03.svg" mode="aspectFit"></image>
					<view class="title">AI体能训练计划</view>
					<view class="btn" @click.stop="navigateTo('/pages/train/recommend')">立即制定</view>
				</view>
				<view class="grid-item mall" @click="switchTab">
					<image class="icon" src="../../static/home/home-icon-04.svg" mode="aspectFit"></image>
					<view class="title">步数书城</view>
					<view class="text">海量图书</view>
					<view class="text">免费兑换</view>
				</view>
				<view class="grid-item diet" @click="navigateTo('/pages/diet/index')">
					<image class="icon" src="../../static/home/home-icon-05.svg" mode="aspectFit"></image>
					<view class="title">膳食健康管理</view>
					<view class="btn" @click.stop="navigateTo('/pages/diet/one')">开始评测</view>
				</view>
				<view class="grid-item video" @click="navigateTo('/pages/video/list')">
					<image class="icon" src="../../static/home/home-icon-06.svg" mode="aspectFit"></image>
					<view class="title">黑石健康课堂</view>
					<view class="text">轻松学习</view>
					<view class="text">提高健康素养</view>
				</view>
				<view class="grid-item ranking" @click="navigateTo('/pages/ranking/ranking')">
					<image class="icon" src="../../static/home/home-icon-07.svg" mode="aspectFit"></image>
					<view class="content">
						<view class="title">排行榜</view>
						<view class="text">体能排行榜&步数银行排行榜</view>
					</view>
				</view>
			</view>
			<view class="list-content">
				<view class="title">推荐兑换</view>
				<view class="list-item" v-for="item in product" :key="item.id" @click="navigateTo('/pages/order/product?id=' + item.id)">
					<image class="pic" :src="item.image" mode="aspectFit"></image>
					<view class="content">
						<view class="title">{{ item.store_name }}</view>
						<!-- <view class="price">原价：{{ item.ot_price }}元</view> -->
						<view class="step" v-if="item.is_model == 1">{{ item.buy_credits }}万</view>
						<view class="text" v-else>￥{{ item.price }}</view>
					</view>
				</view>
			</view>
			<custom-tabbar :currentId="0"></custom-tabbar>
		</template>
		<auth-modal ref="authModal" @refresh="refresh"></auth-modal>
	</view>
</template>

<script>
	import * as echarts from 'echarts/echarts.min.js'; /*chart.min.js为在线定制*/
	import mpvueEcharts from 'mpvue-echarts/src/echarts.vue';
	import {
		login,
		signIn,
		getScore,
		getUserStep,
		getStep,
		getProduct,
		getLastTime,
		cacheStep
	} from '@/api/home.js';
	export default {
		components: {
			mpvueEcharts
		},
		data() {
			return {
				isLogin: false,
				echarts,
				gagugeOption: null,
				score: 0,
				percent: 0,
				synthesis_lable: '',
				create_at: '',
				no_deposit_num: 0,
				integral_num: 0,
				integral_num_str: '0万步',
				no_deposit_str: '0万步',
				params: {
					page: 1,
					limit: 20
				},
				product: [],
				total: 0,
				isNew: false,
				step: [],
				lastTime: ''
			};
		},
		onLoad(option) {
			uni.hideTabBar();
			if (option.user_id) {
				this.signIn(option.user_id);
			}
		},
		onShow() {
			const _this = this;
			_this.isLogin = uni.getStorageSync('isLogin')
			const isAuth = uni.getStorageSync('isAuth')
			console.log(_this.isLogin)
			_this.initGaugeChartOption();
			_this.getListData('down');
			// 登录未过期
			if (_this.isLogin) {
				_this.getWeRunData()
				_this.getScore();
				_this.getLastTime();
				_this.getUserStep();
				return
			}
			// 是否授权
			if (!isAuth) {
				//_this.$refs['authModal'].open()
				return
			}

			// 登录已过期
			uni.showLoading({
				title: '登录中...'
			})
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
									uni.hideLoading()
									uni.setStorageSync('token', result.token);
									uni.setStorageSync('expires_time', result.expires_time);
									uni.setStorageSync('user_id', result.userInfo.uid);
									uni.setStorageSync('isLogin', true)
									uni.setStorageSync('isAuth', true)
									_this.isLogin = true;
									_this.getScore();
									_this.getLastTime();
									_this.getUserStep();
									if (_this.isNew) {
										uni.showToast({
											icon: 'none',
											title: '非常感谢，我已经点亮一个小火苗，你也快来吧，存步数兑礼品，还可以让身体更健康哦！'
										});
									}
								},
								err => {}
							);
						}
					});
				}
			});
			_this.getWeRunData()
		},
		onPullDownRefresh() {
			this.getScore();
			this.getLastTime();
			this.getUserStep();
			this.getListData('down');
		},
		onReachBottom() {
			this.getListData('up');
		},
		methods: {
			refresh() {
				const _this = this
				_this.isLogin = true;
				uni.setStorageSync('isAuth', true)
				_this.getScore();
				_this.getLastTime();
				_this.getUserStep();
				if (_this.isNew) {
					uni.showToast({
						icon: 'none',
						title: '非常感谢，我已经点亮一个小火苗，你也快来吧，存步数兑礼品，还可以让身体更健康哦！'
					});
				}
				_this.getWeRunData()
			},
			getWeRunData() {
				const _this = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes);
						wx.getWeRunData({
							success(infoRes) {
								console.log(infoRes);
								getStep({
									code: loginRes.code,
									iv: infoRes.iv,
									encryptedData: infoRes.encryptedData
								}).then(
									result => {
										const arr = result.stepInfoList.slice(23, 30);
										_this.step = arr;
										_this.getCacheStep();
									},
									err => {}
								);
							}
						});
					}
				});
			},
			signIn(user_id) {
				const _this = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						signIn({
							code: loginRes.code,
							trans_pond_user_id: user_id
						}).then(
							result => {
								_this.isNew = result.is_news;
								if (!result.is_news) {
									uni.showToast({
										icon: 'none',
										title: '您已经不是新用户了，无法帮Ta点亮，请督促Ta多多观测自己的身体素质吧！',
										duration: 2000
									});
								}
							},
							err => {}
						);
					}
				});
			},
			getScore() {
				getScore().then(
					result => {
						const {
							score,
							synthesis_lable,
							create_at
						} = result;
						this.score = score;
						this.synthesis_lable = synthesis_lable;
						this.create_at = create_at;
						this.percent = (parseFloat(score) + 0.2 * (100 - parseFloat(score))).toFixed(1);
					},
					err => {}
				);
			},
			getUserStep() {
				getUserStep().then(
					result => {
						const {
							integral
						} = result;
						// this.integral_num_str = integral_num_str;
						// this.no_deposit_str = no_deposit_str;
						// // this.no_deposit_num = no_deposit_num;
						this.integral_num = integral;
					},
					err => {}
				);
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
				getProduct({ ...this.params
				}).then(
					result => {
						const {
							list,
							total
						} = result;
						const arr = list.filter(item => item.is_home == 1);
						if (direction == 'down') {
							this.product = arr;
							this.total = arr.length;
						} else {
							this.product = this.product.concat(arr);
							this.total += arr.length;
						}
						uni.stopPullDownRefresh();
					},
					err => {}
				);
			},
			getLastTime() {
				getLastTime({
					pageNo: 1,
					pageSize: 1
				}).then(
					result => {
						if (result.length > 0) {
							this.lastTime = result[0].create_at.slice(0, 10);
							this.getCacheStep()
						}
					},
					err => {}
				);
			},
			getCacheStep() {
				const startDate = this.getCurrentDate(); // 当前时间年-月-日
				const lastTime = this.lastTime; // lastTime是从 https://stamina.yulongtianzi.com/api/pedometer/cache_deposit_list这个接口里面获取的timestamp字段
				if (lastTime == '') {
					// 用户从来没有存过步数，lastTime就是空值，直接取近7天的步数总和
					this.no_deposit_num = this.getSum(this.step); // getSum函数是求和的工具函数
				} else {
					// 用户以前存过步数，就走下面的逻辑
					const day = 24 * 60 * 60 * 1000;
					let diff = (new Date(startDate).getTime() - new Date(lastTime).getTime()) / day; // diff就是相差天数
					if (diff > 7) {
						// diff大于7,比如今天19号，上一次是1号，那就只存【12，13，14，15，16，17，18】这几天步数的总和
						this.no_deposit_num = this.getSum(this.step);
					}
					if (diff > 0 && diff < 7) {
						//diff小于7，比如今天19号，上一次是18号，diff就等于1，那就只存18号的步数
						const arr = JSON.parse(JSON.stringify(this.step))
							.reverse()
							.slice(0, diff);
						this.no_deposit_num = this.getSum(arr);
					}
					if (diff == 0) {
						this.no_deposit_num = 0
						//diff等于0，比如今天19号，上一次是19号，那就是已经存过了，就不会再存了
						// uni.showToast({
						// 	icon: 'none',
						// 	title: '可存步数为0'
						// });
					}
				}
			},
			getCurrentDate() {
				const date = new Date();
				const YYYY = date.getFullYear();
				const MM = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
				const DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
				return YYYY + '-' + MM + '-' + DD;
			},
			getSum(arr) {
				let sum = 0;
				arr.map(item => {
					sum += item.step;
				});
				return this.formatStep(sum);
			},
			formatStep(count) {
				let step = JSON.stringify(count / 10000);
				//没有小数补齐这个0
				if (step.indexOf('.') == '-1') {
					step = step + '.00';
				} else {
					//有小数截取前二位小数
					step = step.substring(0, step.indexOf('.') + 3);
				}
				return step;
			},
			initGaugeChartOption() {
				this.gagugeOption = {
					series: [{
						name: '',
						type: 'gauge',
						radius: '140%',
						center: ['50%', '80%'],
						splitNumber: 4, //刻度数量
						startAngle: 190,
						endAngle: -10,
						axisLine: {
							show: true,
							lineStyle: {
								width: 0,
								shadowBlur: 0,
								color: [
									[0.05, '#F63E38'],
									[0.1, '#F45239'],
									[0.15, '#EF7339'],
									[0.2, '#ED843A'],
									[0.25, '#EC8439'],
									[0.3, '#EA953A'],
									[0.35, '#E8A53B'],
									[0.4, '#E6B43B'],
									[0.45, '#E3C93B'],
									[0.5, '#E1D73B'],
									[0.55, '#DBE43D'],
									[0.6, '#BFE546'],
									[0.65, '#B1E44A'],
									[0.7, '#A3E54F'],
									[0.75, '#92E454'],
									[0.8, '#7FE45A'],
									[0.85, '#71E45E'],
									[0.9, '#60E464'],
									[0.95, '#4FE469'],
									[1, '#42E46D']
								]
							}
						},
						axisTick: {
							show: true,
							lineStyle: {
								color: 'auto',
								width: 4
							},
							length: 8,
							splitNumber: 4
						},
						splitLine: {
							show: false
						},
						axisLabel: {
							show: false
						},
						pointer: {
							show: false
						},
						detail: {
							show: false
						}
					}]
				};
				if (this.$refs.gaugeChart) {
					this.$refs.gaugeChart.init();
				}
			},
			initGaugeChart(e) {
				let {
					canvas,
					width,
					height
				} = e;
				echarts.setCanvasCreator(() => canvas);
				const chart = echarts.init(canvas, null, {
					width: width,
					height: height
				});
				canvas.setChart(chart);
				if (this.gagugeOption) {
					chart.setOption(this.gagugeOption);
				}
				return chart;
			},
			switchTab() {
				uni.switchTab({
					url: '/pages/mall/mall'
				});
			},
			navigateTo(url) {
				const isAuth = uni.getStorageSync('isAuth')
				if (!isAuth) {
					this.$refs['authModal'].open()
					return
				}
				uni.navigateTo({
					url
				});
			}
		}
	};
</script>

<style lang="less">
	page {
		background-color: #f2f2f7;
		padding-bottom: 128rpx;
	}

	.page-home {
		.overview-content {
			display: flex;
			align-items: flex-end;
			height: 420rpx;
			margin: 4vw 4.8vw;

			.score-item {
				position: relative;
				width: 406rpx;
				height: 420rpx;
				margin-left: -2rpx;
				box-shadow: 0px 10rpx 20rpx 0px rgba(8, 53, 85, 0.2);
				border-radius: 12rpx 50rpx 50rpx 12rpx;
				z-index: 1;

				.background {
					position: absolute;
					top: 0;
					left: 0;
					width: 406rpx;
					height: 420rpx;
					z-index: -1;
				}

				.icon {
					position: absolute;
					top: 40rpx;
					left: 32rpx;
					width: 28rpx;
					height: 30rpx;
				}

				.title {
					padding: 32rpx 0 0 74rpx;
					font-size: 32rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #ffffff;
					line-height: 46rpx;
				}

				.date {
					position: absolute;
					top: 44rpx;
					right: 32rpx;
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 0.7);
					line-height: 28rpx;
				}

				.chart {
					position: relative;
					height: 158rpx;

					.gauge {
						position: absolute;
						top: 20rpx;
						left: 0;
						right: 0;
						height: 158rpx;
					}

					.score {
						position: absolute;
						top: 66rpx;
						left: 0;
						right: 0;
						font-size: 60rpx;
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 600;
						color: #ffffff;
						line-height: 84rpx;
						text-align: center;
					}
				}

				.tag {
					width: 100rpx;
					height: 30rpx;
					margin-left: 158rpx;
					background: rgba(255, 255, 255, 0.15);
					border-radius: 16rpx;
					font-size: 18rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #ffffff;
					line-height: 30rpx;
					text-align: center;
				}

				.text {
					margin: 18rpx 0 20rpx 0;
					font-size: 24rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: rgba(255, 255, 255, 0.4);
					line-height: 34rpx;
					text-align: center;
				}

				.btn {
					position: absolute;
					left: 124rpx;
					bottom: 34rpx;
					width: 160rpx;
					height: 50rpx;
					background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
					box-shadow: 0px 10rpx 10rpx 0px rgba(2, 15, 64, 0.1);
					border-radius: 26rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #2879ea;
					line-height: 50rpx;
					text-align: center;
				}
			}

			.bank-item {
				position: absolute;
				right: 36rpx;
				width: 326rpx;
				height: 330rpx;
				padding-left: 50rpx;
				box-shadow: 0px 10rpx 20rpx 0px rgba(64, 38, 2, 0.2);
				border-radius: 0px 12rpx 12rpx 0px;
				box-sizing: border-box;

				.background {
					position: absolute;
					top: 0;
					left: 0;
					width: 326rpx;
					height: 330rpx;
					z-index: -1;
				}

				.icon {
					position: absolute;
					top: 28rpx;
					left: 88rpx;
					width: 32rpx;
					height: 32rpx;
				}

				.title {
					padding-top: 22rpx;
					margin-bottom: 10rpx;
					font-size: 32rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #ffffff;
					line-height: 46rpx;
					text-align: center;
				}

				.step {
					font-size: 60rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #ffffff;
					line-height: 84rpx;
					text-align: center;
					// &::after {
					// 	content: '步';
					// 	margin-left: 12rpx;
					// 	font-size: 24rpx;
					// 	font-family: PingFangSC-Semibold, PingFang SC;
					// 	font-weight: 600;
					// 	color: rgba(255, 255, 255, 0.5);
					// 	line-height: 34rpx;
					// }
				}

				.text {
					font-size: 24rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: rgba(255, 255, 255, 0.5);
					line-height: 34rpx;
					text-align: center;
				}

				.btn {
					position: absolute;
					left: 50rpx;
					right: 0;
					bottom: 34rpx;
					width: 160rpx;
					height: 50rpx;
					margin: auto;
					background: #ffffff;
					box-shadow: 0px 10rpx 10rpx 0px rgba(64, 2, 2, 0.1);
					border-radius: 26rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #df5420;
					line-height: 50rpx;
					text-align: center;
				}
			}
		}

		.grid-content {
			display: flex;
			flex-wrap: wrap;
			margin: 0 0.8vw;

			.grid-item {
				width: 43.2vw;
				height: 320rpx;
				margin-left: 4vw;
				margin-bottom: 4vw;
				background-color: #fff;
				vertical-align: top;
				border-radius: 12rpx;

				.icon {
					display: block;
				}

				.title {
					font-size: 30rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #000000;
					line-height: 42rpx;
					text-align: center;
				}

				.text {
					font-size: 22rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #92a0b6;
					line-height: 30rpx;
					text-align: center;
				}

				.btn {
					width: 148rpx;
					height: 48rpx;
					margin: 0 auto;
					border-radius: 24rpx;
					border: 2rpx solid #9fc7ff;
					box-sizing: border-box;
					font-size: 22rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #0f72ff;
					line-height: 44rpx;
					text-align: center;
				}
			}

			.grid-item.plan {
				.icon {
					width: 56rpx;
					height: 64rpx;
					margin: 48rpx auto 0 auto;
				}

				.title {
					margin: 34rpx 0 50rpx 0;
				}
			}

			.grid-item.mall {
				.icon {
					width: 48rpx;
					height: 64rpx;
					margin: 48rpx auto 0 auto;
				}

				.title {
					margin: 34rpx 0 40rpx 0;
				}
			}

			.grid-item.diet {
				.icon {
					width: 54rpx;
					height: 64rpx;
					margin: 48rpx auto 0 auto;
				}

				.title {
					margin: 50rpx 0 34rpx 0;
				}
			}

			.grid-item.video {
				.icon {
					width: 64rpx;
					height: 64rpx;
					margin: 48rpx auto 0 auto;
				}

				.title {
					margin: 50rpx 0 24rpx 0;
				}
			}

			.grid-item.ranking {
				display: flex;
				align-items: center;
				width: 90.4vw;
				height: 130rpx;
				margin-bottom: 0;

				.icon {
					width: 80rpx;
					height: 76rpx;
					margin: 28rpx 78rpx 28rpx 70rpx;
				}

				.title {
					margin-bottom: 20rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #000000;
					line-height: 40rpx;
					text-align: left;
				}

				.text {
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #92a0b6;
					line-height: 28rpx;
					text-align: left;
				}
			}
		}

		.list-content {
			margin: 4vw 4.8vw;
			border-radius: 12rpx;

			&>.title {
				margin: 0 0 12rpx 38rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #000000;
				line-height: 40rpx;
			}

			&>.title+.list-item {
				border-radius: 12rpx 12rpx 0 0;
			}

			.list-item {
				display: flex;
				align-items: center;
				position: relative;
				height: 210rpx;
				padding: 30rpx 40rpx;
				background-color: #fff;
				box-sizing: border-box;

				&::after {
					position: absolute;
					left: 40rpx;
					right: 40rpx;
					bottom: 0;
					content: '';
					height: 2rpx;
					background-color: #eeeeee;
				}

				&:last-child {
					border-radius: 0 0 12rpx 12rpx;

					&::after {
						display: none;
					}
				}

				.pic {
					flex-shrink: 0;
					width: 150rpx;
					height: 150rpx;
					margin-right: 30rpx;
					background: #d8d8d8;
					border-radius: 20rpx;
				}

				.content {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					height: 150rpx;
				}

				.title {
					font-size: 32rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #000000;
					line-height: 46rpx;
					word-break: break-all;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}

				.price {
					margin: 24rpx 0 4rpx 0;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #92a0b6;
					line-height: 34rpx;
					text-decoration: line-through;
				}

				.step {
					font-size: 32rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #fc6262;
					line-height: 46rpx;

					&::after {
						content: '步';
						font-size: 18rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #fc6262;
						line-height: 26rpx;
					}
				}

				.text {
					font-size: 32rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #fc6262;
					line-height: 46rpx;
				}
			}
		}

		.login-content {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: #fff;

			.logo {
				display: block;
				margin: 200rpx auto 40rpx auto;
				width: 150rpx;
				height: 150rpx;
			}

			.title {
				font-size: 36rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #000;
				text-align: center;
			}

			.btn {
				position: fixed;
				left: 0;
				right: 0;
				bottom: 450rpx;
				width: 320rpx;
				margin: 0 auto;
				background: linear-gradient(to right, #53a6dc, #05caab);
				border-radius: 50rpx;
				box-shadow: 0px 14rpx 30rpx 0px #7e9da2;
				font-size: 36rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 700;
				color: #fff;

				&::after {
					display: none;
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
