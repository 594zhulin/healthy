<template>
	<view class="page-plan">
		<view class="radar-content">
			<image class="background" src="../../static/train/train-bg-01.svg" mode="scaleToFill"></image>
			<view class="echarts"><mpvue-echarts ref="radarChart" :echarts="echarts" @onInit="initRadarChart" /></view>
		</view>
		<view class="train-content">
			<view class="today-item">
				<view class="title">今日</view>
				<view class="step">11,245</view>
				<view class="text">训练记录</view>
				<view class="record">
					<view class="fire">
						<image class="icon" src="../../static/train/train-icon-01.svg" mode="aspectFit"></image>
						<view class="count"></view>
					</view>
					<view class="training">
						<image class="icon" src="../../static/train/train-icon-02.svg" mode="aspectFit"></image>
						<view class="count"></view>
					</view>
					<view class="diet">
						<image class="icon" src="../../static/train/train-icon-03.svg" mode="aspectFit"></image>
						<view class="count"></view>
					</view>
				</view>
				<view class="btn" @click="navigateTo('/pages/train/list')">立即训练</view>
			</view>
			<view class="week-item">
				<view class="title">近七天运动量统计</view>
				<view class="record">
					<view class="label">活动量：</view>
					<view class="value">
						<view class="count">{{ deposit_num }}</view>
						<view class="unit">步</view>
					</view>
				</view>
				<view class="record">
					<view class="label">有氧运动：</view>
					<view class="value">
						<view class="count">{{ aerobics }}</view>
						<view class="unit">次</view>
					</view>
				</view>
				<view class="record">
					<view class="label">休闲运动：</view>
					<view class="value">
						<view class="count">{{ leisure }}</view>
						<view class="unit">次</view>
					</view>
				</view>
				<view class="record">
					<view class="label">力量训练：</view>
					<view class="value">
						<view class="count">{{ force }}</view>
						<view class="unit">次</view>
					</view>
				</view>
				<view class="record">
					<view class="label">柔韧训练：</view>
					<view class="value">
						<view class="count">{{ pliable }}</view>
						<view class="unit">次</view>
					</view>
				</view>
				<view class="btn" @click="navigateTo('/pages/train/team')">休闲组队</view>
				<view class="link" @click="navigateTo('/pages/train/record')">组队记录</view>
			</view>
		</view>
		<view class="trend-content">
			<view class="title">您的身体素质趋势</view>
			<view class="date">{{ create_at }}</view>
			<view class="echarts"><mpvue-echarts ref="lineChart" :echarts="echarts" @onInit="initLineChart" /></view>
		</view>
		<view class="desc-content">
			<view class="title">AI智能训练简介</view>
			<image class="image" src="../../static/train/train-img-02.png" mode="widthFix"></image>
			<view class="text">
				黑石AI智能训练体系，结合运动金字塔建议，专业医生研究，运动学，行为学，以身体素质水平为数据基础，制作一整套针对于公众健康促进的体能训练系统，让不同身体素质的人能轻松上手，易于长期坚持，并且高效率的改善体能，并且结合我们的体能测量系统，数字化的看到自己身体素质的增强。
			</view>
		</view>
		<view class="list-content">
			<view class="title">动作库</view>
			<view class="list-item" v-for="item in items" :key="item.id" @click="navigateTo('/pages/train/detail?id=' + item.id)">
				<image class="video" :src="item.video_content_clouds" mode="aspectFit"></image>
				<view class="content">
					<view class="title">{{ item.motion_name }}</view>
					<view class="text">目标：{{ item.cate_name }}</view>
					<view class="text">好处：{{ item.advantage }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import * as echarts from 'echarts/echarts.min.js'; /*chart.min.js为在线定制*/
import mpvueEcharts from 'mpvue-echarts/src/echarts.vue';
import { getTrainData, getTrainList, getFitnessData } from '@/api/train.js';
export default {
	components: {
		mpvueEcharts
	},
	data() {
		return {
			echarts,
			lineOption: null,
			radarOption: null,
			deposit_num: 0,
			pliable: 0,
			force: 0,
			aerobics: 0,
			leisure: 0,
			create_at: '',
			params: {
				pageNo: 1,
				pageSize: 20
			},
			items: [],
			total: 0
		};
	},
	onLoad() {
		getTrainData().then(
			result => {
				const { deposit_num, pliable, force, aerobics, leisure } = result;
				this.deposit_num = deposit_num || 0;
				this.pliable = pliable;
				this.force = force;
				this.aerobics = aerobics;
				this.leisure = leisure;
			},
			err => {}
		);
		getFitnessData().then(
			result => {
				this.initLineChartOption(result.sheet);
				const { bodily_type, grip_num, sit_reach, foot_closed, response_at } = result.lately_data;
				this.initRadarChartOption([bodily_type, grip_num, sit_reach, foot_closed, response_at]);
				this.create_at = result.lately_data.create_at;
			},
			err => {
				uni.showToast({
					icon: 'none',
					title: err.text
				});
			}
		);
		this.getListData('down');
	},
	onReachBottom() {
		this.getListData('up');
	},
	methods: {
		getListData(direction) {
			if (direction == 'down') {
				this.params.pageNo = 1;
			} else {
				if (this.items.length >= this.total) {
					return false;
				}
				this.params.pageNo += 1;
			}
			getTrainList({ ...this.params }).then(
				result => {
					const { list, total } = result;
					this.items = direction == 'down' ? list : this.items.concat(list);
					this.total = total;
				},
				err => {}
			);
		},
		initRadarChartOption(data) {
			const _this = this;
			const data_1 = [
				{
					name: '体型',
					max: 100
				},
				{
					name: '力量',
					max: 100
				},
				{
					name: '柔韧性',
					max: 100
				},
				{
					name: '平衡能力',
					max: 100
				},
				{
					name: '反应能力',
					max: 100
				}
			];
			this.radarOption = {
				radar: {
					radius: '50%',
					splitNumber: 6,
					name: {
						formatter: function(value) {
							var i = _this.contains(data_1, value);
							var percent = data[i];
							return '{a|' + value + '}\n' + '{b|' + percent + '′' + '}';
						},
						textStyle: {
							rich: {
								b: {
									height: 15,
									color: '#2975FF',
									fontSize: 12,
									padding: [0, 3, 3, 3],
									align: 'center',
									backgroundColor: '#fff',
									borderRadius: 10,
									verticalAlign: 'middle'
								},
								a: {
									color: '#CAEEFF',
									fontSize: 12,
									fontWeight: 'bold',
									padding: 0,
									lineHeight: 20,
									align: 'center'
								}
							}
						}
					},
					nameGap: '10',
					indicator: data_1, // 数据的数量代表展示什么形状的图形
					splitArea: {
						areaStyle: {
							color: [
								'rgba(255, 255, 255, 1)',
								'rgba(255, 255, 255, 1)',
								'rgba(255, 255, 255, 1)',
								'rgba(255, 255, 255, 1)',
								'rgba(255, 255, 255, 1)',
								'rgba(60, 183, 255, 1)'
							],
							shadowColor: 'rgba(0, 95, 255, 0.36)',
							shadowBlur: 10,
							opacity: 0.19
						}
					},
					axisLine: {
						//指向外圈文本的分隔线样式
						lineStyle: {
							color: 'rgba(255,255,255,0.25)'
						}
					},
					splitLine: {
						lineStyle: {
							width: 1,
							color: [
								'rgba(255, 255, 255, 1)',
								'rgba(255, 255, 255, 1)',
								'rgba(255, 255, 255, 1)',
								'rgba(255, 255, 255,1)',
								'rgba(255, 255, 255, 1)',
								'rgba(60, 183, 255, 1)'
							],
							shadowColor: 'rgba(0, 95, 255, 0.36)',
							shadowBlur: 10,

							opacity: 0.19
						}
					}
				},
				series: [
					{
						type: 'radar',
						areaStyle: {
							normal: {
								color: 'rgba(255, 211, 45, 0.15)'
							}
						},
						symbol: 'circle',
						symbolSize: 6,
						itemStyle: {
							color: '#FFDD00',
							borderColor: '#fff',
							borderWidth: 1
						},
						lineStyle: {
							normal: {
								color: 'rgba(255, 221, 0, 1)',
								width: 2
							}
						},
						data: [
							{
								value: data
							}
						]
					}
				]
			};
			this.$refs.radarChart.init();
		},
		initRadarChart(e) {
			let { canvas, width, height } = e;
			echarts.setCanvasCreator(() => canvas);
			const chart = echarts.init(canvas, null, {
				width: width,
				height: height
			});
			canvas.setChart(chart);
			if (this.radarOption) {
				chart.setOption(this.radarOption);
			}
			return chart;
		},
		initLineChartOption(data) {
			this.lineOption = {
				grid: {
					top: 20,
					right: 10,
					bottom: 20,
					left: 33
				},
				xAxis: {
					type: 'category',
					show: false
				},
				yAxis: {
					type: 'value',
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						verticalAlign: 'middle',
						color: '#666666',
						fontSize: 12
					},
					splitLine: {
						lineStyle: {
							color: '#E8E8E8'
						}
					}
				},
				series: [
					{
						type: 'line',
						smooth: true,
						showSymbol: false,
						itemStyle: {
							normal: {
								lineStyle: {
									width: 2,
									type: 'solid',
									color: '#FFBF00'
								}
							}
						},
						areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{
										offset: 0,
										color: 'rgba(255, 191, 0, 0.39)'
									},
									{
										offset: 1,
										color: 'rgba(255, 191, 0, 0)'
									}
								])
							}
						},
						data: data
					}
				]
			};
			this.$refs.lineChart.init();
		},
		initLineChart(e) {
			let { canvas, width, height } = e;
			echarts.setCanvasCreator(() => canvas);
			const chart = echarts.init(canvas, null, {
				width: width,
				height: height
			});
			canvas.setChart(chart);
			if (this.lineOption) {
				chart.setOption(this.lineOption);
			}
			return chart;
		},
		contains(arrays, obj) {
			var i = arrays.length;
			while (i--) {
				if (arrays[i].name === obj) {
					return i;
				}
			}
			return false;
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
	background-color: #f7f6f9;
}
.page-plan {
	.radar-content {
		position: relative;
		height: 600rpx;
		margin-bottom: 50rpx;
		.background {
			position: absolute;
			top: -2rpx;
			left: 0;
			width: 100%;
			height: 600rpx;
			z-index: -1;
		}
		.echarts {
			height: 600rpx;
		}
	}
	.train-content {
		display: flex;
		align-items: flex-end;
		height: 420rpx;
		margin: 0 4vw;
		.today-item {
			position: relative;
			width: 326rpx;
			height: 420rpx;
			background-color: #fff;
			box-shadow: 0px 0px 12rpx 0px rgba(0, 0, 0, 0.06);
			border-radius: 16rpx;
			z-index: 1;
			.title {
				margin: 32rpx 0 28rpx 36rpx;
				font-size: 24rpx;
				font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
				font-weight: bold;
				color: #373d52;
				line-height: 34rpx;
			}
			.step {
				margin-left: 98rpx;
				font-size: 42rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #000000;
				line-height: 60rpx;
				&::after {
					content: '步';
					margin-left: 14rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 30rpx;
					letter-spacing: 4rpx;
				}
			}
			.text {
				margin: 43rpx 0 34rpx 36rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(0, 0, 0, 0.5);
				line-height: 34rpx;
			}
			.record {
				display: flex;
				align-items: center;
				margin: 0 16rpx 40rpx 54rpx;
				.fire,
				.training,
				.diet {
					flex: 1;
					display: flex;
					align-items: center;
				}
				.fire .icon,
				.training .icon {
					width: 30rpx;
				}
				.diet .icon {
					width: 40rpx;
				}
				.icon {
					height: 36rpx;
				}
				.count {
					margin-left: 8rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
					line-height: 34rpx;
				}
			}
			.btn {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 82rpx;
				background: #2975ff;
				border-radius: 16rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #ffffff;
				line-height: 82rpx;
				text-align: center;
			}
		}
		.week-item {
			position: relative;
			width: 380rpx;
			height: 390rpx;
			margin-left: -2vw;
			background: #ffffff;
			border-radius: 16rpx;
			.title {
				margin: 18rpx 0 12rpx 44rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #000000;
				line-height: 34rpx;
			}
			.record {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 0 38rpx 18rpx 44rpx;
				.label {
					min-width: 102rpx;
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(0, 0, 0, 0.5);
					line-height: 28rpx;
					text-align: right;
				}
				.value {
					display: flex;
					align-items: center;
				}
				.count {
					font-size: 24rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #000000;
					line-height: 34rpx;
				}
				.unit {
					margin-left: 10rpx;
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 30rpx;
					letter-spacing: 2rpx;
				}
			}
			.btn {
				position: absolute;
				bottom: 18rpx;
				left: 118rpx;
				width: 160rpx;
				height: 50rpx;
				background: #cfe0ff;
				border-radius: 26rpx;
				border: 2rpx solid #74a5ff;
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #7291de;
				line-height: 46rpx;
				text-align: center;
				box-sizing: border-box;
			}
			.link {
				position: absolute;
				right: 26rpx;
				bottom: 16rpx;
				width: 40rpx;
				height: 56rpx;
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #2975ff;
				line-height: 28rpx;
			}
		}
	}
	.trend-content {
		position: relative;
		height: 410rpx;
		margin: 4vw;
		background-color: #fff;
		border-radius: 10rpx;
		.title {
			padding: 26rpx 0 10rpx 18rpx;
			font-size: 24rpx;
			font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
			font-weight: bold;
			color: #373d52;
			line-height: 34rpx;
		}
		.date {
			position: absolute;
			top: 26rpx;
			right: 12rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #a3a7b9;
			line-height: 34rpx;
		}
		.echarts {
			width: 100%;
			height: 330rpx;
			margin-top: 10rpx;
		}
	}
	.desc-content {
		padding-bottom: 24rpx;
		margin: 4vw;
		background: #ffffff;
		border-radius: 10rpx;
		.title {
			padding: 26rpx 0 10rpx 18rpx;
			font-size: 24rpx;
			font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
			font-weight: bold;
			color: #373d52;
			line-height: 34rpx;
		}
		.image {
			width: 600rpx;
		}
		.text {
			padding: 0 20rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(0, 0, 0, 0.5);
			line-height: 33rpx;
		}
	}
	.list-content {
		height: 940rpx;
		margin: 4vw;
		background: #ffffff;
		border-radius: 10rpx;
		& > .title {
			padding: 26rpx 0 12rpx 18rpx;
			font-size: 24rpx;
			font-family: AlibabaPuHuiTi-Bold, AlibabaPuHuiTi;
			font-weight: bold;
			color: #373d52;
			line-height: 34rpx;
		}
		.list-item {
			position: relative;
			display: flex;
			align-items: center;
			padding: 20rpx 26rpx 20rpx 34rpx;
			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 28rpx;
				right: 26rpx;
				height: 2rpx;
				background-color: #e0e0e0;
			}
			&:last-child::after {
				display: none;
			}
			.video {
				width: 216rpx;
				height: 130rpx;
				margin-right: 30rpx;
				background: #d8d8d8;
				border-radius: 8rpx;
				border: 2rpx solid #979797;
				box-sizing: border-box;
			}
			.title {
				margin-bottom: 22rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 34rpx;
			}
			.text {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(0, 0, 0, 0.5);
				line-height: 34rpx;
			}
		}
	}
}
</style>
