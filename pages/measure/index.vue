<template>
	<view class="page-measure">
		<view class="user-content">
			<image class="avatar" :src="avatar" mode="aspectFit"></image>
			<view class="content">
				<view class="text">ID：{{ userId }}</view>
				<view class="text">{{ nickName }}</view>
			</view>
			<view class="date">{{ measureData.create_at }}</view>
			<view class="link" @click="navigateTo('/pages/measure/history')">
				<image class="icon" src="../../static/measure/measure-icon-01.png" mode="aspectFit"></image>
				<view class="text">历史数据</view>
			</view>
		</view>
		<view class="echarts-content">
			<view class="echarts">
				<mpvue-echarts ref="gaugeChart" :echarts="echarts" @onInit="initGaugeChart" />
				<view class="score">
					<view class="text">{{ measureData.score ? measureData.score : '0' }}</view>
					<view class="level" v-if="measureData.synthesis_lable">{{ measureData.synthesis_lable }}</view>
				</view>
			</view>
			<button class="btn-share" v-if="measureData.score" open-type="share">炫耀一下</button>
		</view>
		<view class="fix-content">
			<view class="ranking-item" @click="navigateTo('/pages/measure/rank')">
				<image class="icon rank" src="../../static/measure/measure-icon-12.svg" mode="aspectFit"></image>
				<view class="text">体能排行榜</view>
				<image class="icon arrow" src="../../static/measure/measure-icon-11.svg" mode="aspectFit"></image>
			</view>
			<view class="customer-item">
				<image class="icon" src="../../static/measure/measure-icon-10.svg" mode="aspectFit"></image>
				<view class="text">客服</view>
				<button class="btn" type="default" open-type="contact"></button>
			</view>
		</view>
		<view class="data-content">
			<view class="data-title">数据指标</view>
			<view class="btn-delete" @click="onDelete" v-if="userId !== ''">
				<view class="icon"><image class="image" src="../../static/measure/measure-icon-20.svg" mode="aspectFit"></image></view>
				<view class="text">删除本条</view>
			</view>
			<view class="tip">{{ measureData.statement }}</view>
			<view class="data-item">
				<view class="flex-horizontal">
					<view class="flex">
						<image class="weight" src="../../static/measure/measure-icon-03.png" mode="aspectFit"></image>
						<view class="name">体重：</view>
						<view class="value">{{ measureData.weight }}kg</view>
					</view>
					<view class="percent">{{ measureData.weight_differ }}</view>
				</view>
				<view class="desc">体重可以反映一个人的营养状况，保持合理与稳定的体重有益健康。</view>
			</view>
			<view class="data-item">
				<view class="flex-horizontal">
					<view class="flex">
						<image class="height" src="../../static/measure/measure-icon-02.png" mode="aspectFit"></image>
						<view class="name">身高：</view>
						<view class="value">{{ measureData.height }}cm</view>
					</view>
				</view>
				<view class="desc">身高可以体现一个人的发育水平，成年后身高会因为骨骼姿态，关节健康有轻微变化。</view>
			</view>
			<view class="data-item">
				<view class="flex-horizontal">
					<view class="flex">
						<image class="bmi" src="../../static/measure/measure-icon-04.png" mode="aspectFit"></image>
						<view class="name">BMI指数：</view>
						<view class="value">{{ measureData.bmi }}</view>
					</view>
				</view>
				<view class="standard bmi-standard">
					<view class="flex inherit">
						<view class="value" v-for="item in measureData.bmi_segment_num" :key="item">{{ item }}</view>
					</view>
					<view class="flex">
						<view class="scale purple"></view>
						<view class="scale green"></view>
						<view class="scale blue"></view>
						<view class="scale yellow"></view>
						<view class="scale red"></view>
					</view>
					<view class="flex">
						<view class="text" v-for="item in measureData.bmi_segment_lable" :key="item">{{ item }}</view>
					</view>
				</view>
			</view>
			<view class="data-item">
				<view class="flex-horizontal">
					<view class="flex">
						<image class="action" src="../../static/measure/measure-icon-05.png" mode="aspectFit"></image>
						<view class="name">反应时间：</view>
						<view class="value">{{ measureData.response_speed }}s</view>
					</view>
					<view class="percent">{{ measureData.formula_differ }}</view>
				</view>
				<view class="standard action-standard">
					<view class="flex inherit">
						<view class="value" v-for="item in measureData.formula_segment_num" :key="item">{{ item }}</view>
					</view>
					<view class="flex">
						<view class="scale green"></view>
						<view class="scale purple"></view>
						<view class="scale yellow"></view>
					</view>
					<view class="flex inherit">
						<view class="text" v-for="item in measureData.formula_segment_lable" :key="item">{{ item }}</view>
					</view>
				</view>
			</view>
			<view class="data-item">
				<view class="flex-horizontal">
					<view class="flex">
						<image class="grip" src="../../static/measure/measure-icon-06.png" mode="aspectFit"></image>
						<view class="name">握力：</view>
						<view class="value">{{ measureData.force }}kg</view>
					</view>
					<view class="percent">{{ measureData.force_differ }}</view>
				</view>
				<view class="standard action-standard grip-standard">
					<view class="flex inherit">
						<view class="value" v-for="item in measureData.force_segment_num" :key="item">{{ item }}</view>
					</view>
					<view class="flex">
						<view class="scale green"></view>
						<view class="scale purple"></view>
						<view class="scale yellow"></view>
					</view>
					<view class="flex inherit">
						<view class="text" v-for="item in measureData.force_segment_lable" :key="item">{{ item }}</view>
					</view>
				</view>
			</view>
			<view class="data-item">
				<view class="flex-horizontal">
					<view class="flex">
						<image class="single" src="../../static/measure/measure-icon-07.png" mode="aspectFit"></image>
						<view class="name">单脚闭眼站立时间：</view>
						<view class="value">{{ measureData.poise }}s</view>
					</view>
					<view class="percent">{{ measureData.poise_differ }}</view>
				</view>
				<view class="standard action-standard single-standard">
					<view class="flex inherit">
						<view class="value" v-for="item in measureData.poise_segment_num" :key="item">{{ item }}</view>
					</view>
					<view class="flex">
						<view class="scale yellow"></view>
						<view class="scale purple"></view>
						<view class="scale green"></view>
					</view>
					<view class="flex inherit">
						<view class="text" v-for="item in measureData.poise_segment_lable" :key="item">{{ item }}</view>
					</view>
				</view>
			</view>
			<view class="data-item">
				<view class="flex-horizontal">
					<view class="flex">
						<image class="bend" src="../../static/measure/measure-icon-08.png" mode="aspectFit"></image>
						<view class="name">体下曲：</view>
						<view class="value">{{ measureData.flexility }}cm</view>
					</view>
					<view class="percent">{{ measureData.flexility_differ }}</view>
				</view>
				<view class="standard action-standard bend-standard">
					<view class="flex inherit">
						<view class="value" v-for="item in measureData.flexility_segment_num" :key="item">{{ item }}</view>
					</view>
					<view class="flex">
						<view class="scale yellow"></view>
						<view class="scale purple"></view>
						<view class="scale green"></view>
					</view>
					<view class="flex inherit">
						<view class="text" v-for="item in measureData.flexility_segment_lable" :key="item">{{ item }}</view>
					</view>
				</view>
			</view>
			<view class="data-title">体能总览</view>
			<view class="echarts-content"><mpvue-echarts ref="barChart" :echarts="echarts" @onInit="initBarChart" /></view>
		</view>
		<view class="risk-content">
			<view class="title">主流健康风险</view>
			<view class="risk-item" v-for="item in risk" :key="item.risk_report_id">
				<view class="risk-title">
					<view class="name">
						<view class="tag">{{ item.score_label }}</view>
						<view class="text">{{ item.name }}</view>
					</view>
					<view class="score">{{ item.score }}分</view>
				</view>
				<view class="content">{{ item.descr }}</view>
			</view>
		</view>
		<view class="btn-content">
			<view class="btn" @click="navigateTo('/pages/train/list')">
				<view class="text">立即制定</view>
				<view class="text">AI体能增强计划</view>
			</view>
			<view class="btn-delete" @click="onDelete" v-if="userId !== ''">
				<view class="text">数据有误</view>
				<view class="text">删除重测</view>
			</view>
		</view>
	</view>
</template>

<script>
import * as echarts from 'echarts/echarts.min.js'; /*chart.min.js为在线定制*/
import mpvueEcharts from 'mpvue-echarts/src/echarts.vue';
import { getUser, getData, getRisk, deleteMeasure } from '@/api/measure.js';
export default {
	components: {
		mpvueEcharts
	},
	data() {
		return {
			echarts,
			gagugeOption: null,
			barOption: null,
			userId: '',
			avatar: '',
			nickName: '',
			measureData: '',
			risk: []
		};
	},
	onLoad(option) {
		getUser().then(
			result => {
				this.userId = result.uid;
				this.avatar = result.avatar;
				this.nickName = result.nickname;
				if (option.user_id) {
					this.getMeasureData(option.user_id);
				} else {
					this.getMeasureData(result.uid);
				}
				this.getRisk();
			},
			err => {
				uni.showToast({
					icon: 'none',
					title: err.text
				});
			}
		);
	},
	onShareAppMessage() {
		return {
			title: '我的数据',
			path: 'pages/measure/index?user_id=' + this.userId
		};
	},
	methods: {
		getMeasureData(user_id) {
			getData({ user_id }).then(
				result => {
					this.measureData = result;
					this.initGaugeChartOption(result);
					this.initBarChartOption(result);
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
		},
		getRisk() {
			getRisk().then(
				result => {
					this.risk = result;
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
		},
		onDelete() {
			deleteMeasure({ calbe_id: this.measureData.calbe_id }).then(
				result => {
					this.getMeasureData(this.userId);
					this.getRisk();
				},
				err => {
					uni.showToast({
						icon: 'none',
						title: err.text
					});
				}
			);
		},
		initGaugeChartOption(data) {
			this.gagugeOption = {
				series: [
					{
						type: 'gauge',
						radius: '100%',
						startAngle: 90,
						endAngle: -3.6 * data.score + 90,
						splitNumber: 1,
						axisLine: {
							show: false,
							lineStyle: {
								width: 1,
								opacity: 0
							}
						},
						title: { show: false },
						detail: { show: false },
						splitLine: { show: false },
						axisTick: {
							length: 10,
							splitNumber: Math.ceil(data.score),
							lineStyle: {
								color: 'rgba(255,255,255,0.6)',
								width: 1
							}
						},
						axisLabel: { show: false },
						pointer: { show: false }
					},
					{
						type: 'gauge',
						radius: '100%',
						startAngle: -3.6 * data.score + 86.4,
						endAngle: -266.4,
						splitNumber: 1,
						axisLine: {
							show: false,
							lineStyle: {
								width: 1,
								opacity: 0
							}
						},
						title: { show: false },
						detail: { show: false },
						splitLine: { show: false },
						axisTick: {
							length: 5,
							splitNumber: Math.ceil(100 - data.score),
							lineStyle: {
								color: 'rgba(255,255,255,0.3)',
								width: 1
							}
						},
						axisLabel: { show: false },
						pointer: { show: false }
					}
				]
			};
			this.$refs.gaugeChart.init();
		},
		initGaugeChart(e) {
			let { canvas, width, height } = e;
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
		initBarChartOption(data) {
			this.barOption = {
				grid: {
					top: 30,
					right: 23,
					bottom: 23,
					left: 23
				},
				xAxis: {
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						margin: 10,
						color: '#666666',
						fontSize: 12
					},
					data: ['体型', '力量', '柔韧性', '反应速度', '平衡能力']
				},
				yAxis: {
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						inside: true,
						verticalAlign: 'bottom',
						align: 'right',
						color: '#B2B2B2',
						fontSize: 8
					},
					splitLine: {
						lineStyle: {
							color: '#E8E8E8'
						}
					}
				},
				series: [
					{
						data: [
							{
								value: data.bodily_type,
								label: {
									show: true,
									position: 'top',
									distance: 13,
									height: 20,
									lineHeight: 20,
									padding: [3, 17, 0, 17],
									color: '#21B7EC',
									fontSize: 10,
									align: 'center',
									borderRadius: 10,
									backgroundColor: 'rgba(33,183,236,0.1)',
									formatter: [data.bodily_type_lable].join('/n')
								}
							},
							{
								value: data.grip_num,
								label: {
									show: true,
									position: 'top',
									height: 20,
									lineHeight: 20,
									padding: [3, 17, 0, 17],
									color: '#FCDC2C',
									fontSize: 10,
									align: 'center',
									borderRadius: 10,
									backgroundColor: 'rgba(252,220,44,0.1)',
									formatter: [data.force_lable].join('/n')
								}
							},
							{
								value: data.sit_reach,
								label: {
									show: true,
									position: 'top',
									height: 20,
									lineHeight: 20,
									padding: [3, 17, 0, 17],
									color: '#FB677B',
									fontSize: 10,
									align: 'center',
									borderRadius: 10,
									backgroundColor: 'rgba(251,103,123,0.1)',
									formatter: [data.flexility_lable].join('/n')
								}
							},
							{
								value: data.response_at,
								label: {
									show: true,
									position: 'top',
									height: 20,
									lineHeight: 20,
									padding: [3, 17, 0, 17],
									color: '#7439F0',
									fontSize: 10,
									align: 'center',
									borderRadius: 10,
									backgroundColor: 'rgba(116,57,240,0.1)',
									formatter: [data.response_speed_lable].join('/n')
								}
							},
							{
								value: data.foot_closed,
								label: {
									show: true,
									position: 'top',
									height: 20,
									lineHeight: 20,
									padding: [3, 17, 0, 17],
									color: '#3089FF',
									fontSize: 10,
									align: 'center',
									borderRadius: 10,
									backgroundColor: 'rgba(48,137,255,0.1)',
									formatter: [data.poise_lable].join('/n')
								}
							}
						],
						type: 'bar',
						barWidth: 15,
						itemStyle: {
							normal: {
								barBorderRadius: [25, 25, 0, 0],
								color: function(params) {
									var colorList = [
										['rgba(33,183,236,0.7)', 'rgba(33,183,236,0.3)'],
										['rgba(252,220,44,0.7)', 'rgba(252,220,44,0.3)'],
										['rgba(251,103,123,0.7)', 'rgba(251,103,123,0.3)'],
										['rgba(116,57,240,0.7)', 'rgba(116,57,240,0.3)'],
										['rgba(48,137,255,0.7)', 'rgba(48,137,255,0.3)']
									];
									if (colorList[params.dataIndex]) {
										return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
											{ offset: 0, color: colorList[params.dataIndex][0] },
											{ offset: 1, color: colorList[params.dataIndex][1] }
										]);
									}
								}
							}
						}
					}
				]
			};
			this.$refs.barChart.init();
		},
		initBarChart(e) {
			let { canvas, width, height } = e;
			echarts.setCanvasCreator(() => canvas);
			const chart = echarts.init(canvas, null, {
				width: width,
				height: height
			});
			canvas.setChart(chart);
			if (this.barOption) {
				chart.setOption(this.barOption);
			}
			return chart;
		},
		navigateTo(url) {
			uni.navigateTo({
				url
			});
		}
	}
};
</script>

<style lang="less" scoped>
.page-measure {
	&::after {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		content: '';
		height: 1052rpx;
		background-color: #0056ff;
		// background-image: radial-gradient(circle, #80b7ff, #0056ff);
		z-index: -1;
	}
	.flex {
		display: flex;
		align-items: center;
	}
	.flex-vertical {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}
	.flex-horizontal {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.user-content {
		position: relative;
		display: flex;
		align-items: center;
		padding: 34rpx 0 0 30rpx;
		.avatar {
			width: 120rpx;
			height: 120rpx;
			margin-right: 20rpx;
			background-color: #eee;
			border-radius: 50%;
		}
		.content {
			.text {
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #ffffff;
				line-height: 46rpx;
				&:first-child {
					margin-bottom: 26rpx;
				}
			}
		}
		.date {
			position: absolute;
			top: 82rpx;
			right: 140rpx;
			font-size: 28rpx;
			font-family: AlibabaPuHuiTi-Regular, AlibabaPuHuiTi;
			font-weight: 400;
			color: #ffffff;
			line-height: 38rpx;
			&::after {
				display: inline-block;
				content: '';
				width: 2rpx;
				height: 18rpx;
				margin-left: 16rpx;
				background-color: #fff;
			}
		}
		.link {
			display: flex;
			align-items: center;
			position: absolute;
			top: 88rpx;
			right: 16rpx;
			.icon {
				width: 26rpx;
				height: 24rpx;
			}
			.text {
				margin-left: 10rpx;
				font-size: 18rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #ffffff;
				line-height: 26rpx;
			}
		}
	}
	& > .echarts-content {
		height: 468rpx;
		padding-top: 33rpx;
		box-sizing: border-box;
		.echarts {
			position: relative;
			width: 334rpx;
			height: 334rpx;
			margin: 0 auto;
			border-radius: 50%;
			.score {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
			}
			.text {
				margin: 74rpx 0 8rpx 0;
				font-size: 128rpx;
				font-family: STHeitiSC-Medium, STHeitiSC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				line-height: 128rpx;
				text-shadow: 0 6rpx 8rpx rgba(17, 0, 177, 0.1);
				text-align: center;
			}
			.level {
				width: 156rpx;
				height: 54rpx;
				line-height: 54rpx;
				margin: 0 auto;
				background: rgba(255, 255, 255, 0.19);
				border-radius: 12rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				text-align: center;
			}
		}
		.btn-share {
			width: 140rpx;
			margin: 22rpx auto 0 auto;
			padding: 0;
			background: none;
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			&::after {
				display: none;
			}
		}
	}
	.fix-content {
		position: relative;
		height: 60rpx;
		margin-bottom: 50rpx;
		.ranking-item {
			position: absolute;
			top: 0;
			left: 0;
			display: flex;
			align-items: center;
			height: 60rpx;
			background: #ffffff;
			border-radius: 0px 30rpx 30rpx 0px;
			.rank {
				width: 44rpx;
				height: 44rpx;
				margin: 0 20rpx 0 24rpx;
			}
			.text {
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 40rpx;
			}
			.arrow {
				width: 10rpx;
				height: 15rpx;
				margin: 0 22rpx 0 14rpx;
			}
		}
		.customer-item {
			position: absolute;
			right: 16rpx;
			top: 0;
			display: flex;
			align-items: center;
			width: 180rpx;
			height: 60rpx;
			background: rgba(255, 255, 255, 0.19);
			border-radius: 30rpx;
			.icon {
				width: 40rpx;
				height: 40rpx;
				margin: 0 12rpx 0 32rpx;
			}
			.text {
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #ffffff;
				line-height: 40rpx;
			}
			.btn {
				position: absolute;
				top: 0;
				right: 0;
				width: 180rpx;
				height: 60rpx;
				opacity: 0;
			}
		}
	}
	.data-content {
		position: relative;
		padding: 0 60rpx 0 40rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 48rpx 48rpx 0 0;
		.data-title {
			padding: 60rpx 0 22rpx 2rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(102, 102, 102, 1);
		}
		.btn-delete {
			position: absolute;
			top: 54rpx;
			right: 36rpx;
			display: flex;
			align-items: center;
			.icon {
				width: 50rpx;
				height: 36rpx;
				background: #f8f8f8;
				border-radius: 11rpx;
				.image {
					display: block;
					width: 18rpx;
					height: 18rpx;
					margin: 9rpx auto;
				}
			}
			.text {
				margin-left: 10rpx;
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #f8a6a6;
				line-height: 28rpx;
			}
		}
		.tip {
			margin-bottom: -6rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(102, 102, 102, 1);
		}
		.data-item {
			position: relative;
			padding: 40rpx 0;
			&::after {
				position: absolute;
				left: 2rpx;
				bottom: 0;
				right: -60rpx;
				content: '';
				height: 2rpx;
				background-color: #e8e8e8;
			}
			.weight {
				width: 60rpx;
				height: 58rpx;
				margin: 0 22rpx 0 2rpx;
			}
			.height {
				width: 49rpx;
				height: 61rpx;
				margin: 0 30rpx 0 6rpx;
			}
			.bmi {
				width: 62rpx;
				height: 62rpx;
				margin-right: 24rpx;
			}
			.action {
				width: 52rpx;
				height: 54rpx;
				margin: 0 20rpx 0 14rpx;
			}
			.grip {
				width: 58rpx;
				height: 57rpx;
				margin: 0 18rpx 0 8rpx;
			}
			.single {
				width: 57rpx;
				height: 66rpx;
				margin: 0 18rpx 0 20rpx;
			}
			.bend {
				width: 49rpx;
				height: 68rpx;
				margin: 0 18rpx 0 20rpx;
			}
			.name {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(102, 102, 102, 1);
				white-space: nowrap;
			}
			.value {
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(48, 137, 255, 1);
				white-space: nowrap;
			}
			.percent {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				white-space: nowrap;
			}
			.desc {
				margin-top: 34rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
			}
			.standard {
				.flex {
					justify-content: space-around;
				}
				.inherit {
					justify-content: inherit;
				}
				.value {
					margin-left: 0;
					font-size: 16rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
					text-align: right;
					&:first-child {
						margin-left: 36rpx;
					}
				}
				.scale {
					flex: 1;
					height: 10rpx;
					margin: 10rpx 0 14rpx 0;
				}
				.text {
					flex: 1;
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
				}
				.purple {
					background: rgba(116, 57, 240, 1);
				}
				.green {
					background: rgba(7, 201, 105, 1);
				}
				.blue {
					background: rgba(33, 183, 236, 1);
				}
				.yellow {
					background: rgba(252, 220, 44, 1);
				}
				.red {
					background: rgba(251, 103, 123, 1);
				}
			}
			.bmi-standard {
				margin: 20rpx 0 -8rpx 0;
				.value {
					width: 124rpx;
				}
				.scale {
					margin-left: 4rpx;
					&:first-child {
						margin-left: 16rpx;
					}
				}
				.text {
					margin-left: 4rpx;
					text-align: center;
					&:first-child {
						margin-left: 16rpx;
					}
				}
			}
			.action-standard,
			.grip-standard {
				margin: 30rpx 0 -8rpx 0;
				.value {
					width: 206rpx;
				}
				.scale {
					margin-left: 10rpx;
					&:first-child {
						margin-left: 16rpx;
					}
				}
				.text {
					flex: none;
					width: 206rpx;
					text-align: right;
					&:first-child {
						margin-left: 56rpx;
					}
				}
			}
			.grip-standard,
			.single-standard {
				margin-top: 22rpx;
			}
			.bend-standard {
				margin-top: 28rpx;
			}
		}
		.echarts-content {
			height: 430rpx;
			margin: 0 -60rpx 0 -40rpx;
			.charts-img {
				width: 750rpx;
				height: 430rpx;
			}
			.charts {
				position: absolute;
				width: 750rpx;
				height: 430rpx;
				visibility: hidden;
			}
		}
	}
	.risk-content {
		padding: 34rpx 37rpx 33rpx 37rpx;
		.title {
			margin: 0 0 24rpx 20rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #666666;
			line-height: 42rpx;
		}
		.risk-item {
			padding: 18rpx 27rpx 25rpx 28rpx;
			margin-bottom: 24rpx;
			background: #f7f7f7;
			border-radius: 12rpx;
			.risk-title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 21rpx;
				.name {
					display: flex;
					align-items: center;
					.tag {
						padding: 0 10rpx;
						height: 30rpx;
						background: #ff8484;
						border-radius: 4rpx;
						font-size: 20rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #ffffff;
						line-height: 28rpx;
						text-align: center;
					}
					.text {
						margin-left: 10rpx;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #000000;
						line-height: 33rpx;
					}
				}
				.score {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
					line-height: 33rpx;
				}
			}
			.content {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #bebebe;
				line-height: 30rpx;
				letter-spacing: 3rpx;
				text-align: justify;
			}
		}
	}
	.btn-content {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 72rpx;
		.btn {
			width: 256rpx;
			height: 82rpx;
			padding: 8rpx 0;
			margin-right: 50rpx;
			background: #2975ff;
			border-radius: 16rpx;
			box-sizing: border-box;
			.text {
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #ffffff;
				line-height: 33rpx;
				text-align: center;
			}
		}
		.btn-delete {
			width: 256rpx;
			height: 82rpx;
			padding: 8rpx 0;
			background: #cfe0ff;
			border-radius: 16rpx;
			border: 1rpx solid #74a5ff;
			box-sizing: border-box;
			.text {
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #7291de;
				line-height: 33rpx;
				text-align: center;
			}
		}
	}
}
</style>
