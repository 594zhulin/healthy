<template>
	<view class="page-five">
		<view class="desc-content">
			年太清重当队王动快切府队物者叫多养时六火清第断内热识片照素据西识一象活连结如众以则看酸派办化易分术出布布它。花历建身适经需等快白发合便没复增影便
		</view>
		<view class="form-content">
			<view class="title">请按照大多数情况下，进行选择</view>
			<view class="form-list">
				<view class="form-item">
					<view class="question">1、口味咸淡</view>
					<radio-group class="answer-list" @change="radioChange">
						<label class="answer-item" v-for="(item, index) in items1" :key="item.value">
							<view class="radio"><radio color="#2975FF" :value="item.value" :checked="index === current" /></view>
							<view class="text">{{ item.name }}</view>
						</label>
					</radio-group>
				</view>
				<view class="form-item">
					<view class="question">2、油腻程度</view>
					<radio-group class="answer-list" @change="radioChange">
						<label class="answer-item" v-for="(item, index) in items2" :key="item.value">
							<view class="radio"><radio color="#2975FF" :value="item.value" :checked="index === current" /></view>
							<view class="text">{{ item.name }}</view>
						</label>
					</radio-group>
				</view>
				<view class="form-item">
					<view class="question">3、饮水情况</view>
					<radio-group class="answer-list" @change="radioChange">
						<label class="answer-item" v-for="(item, index) in items3" :key="item.value">
							<view class="radio"><radio color="#2975FF" :value="item.value" :checked="index === current" /></view>
							<view class="text">{{ item.name }}</view>
						</label>
					</radio-group>
				</view>
				<view class="form-item">
					<view class="question">4、一般吃到什么感觉会终止进餐？</view>
					<radio-group class="answer-list" @change="radioChange">
						<label class="answer-item" v-for="(item, index) in items4" :key="item.value">
							<view class="radio"><radio color="#2975FF" :value="item.value" :checked="index === current" /></view>
							<view class="text">{{ item.name }}</view>
						</label>
					</radio-group>
				</view>
				<view class="form-item">
					<view class="question">5、三餐分配情况</view>
					<radio-group class="answer-list" @change="radioChange">
						<label class="answer-item" v-for="(item, index) in items5" :key="item.value">
							<view class="radio"><radio color="#2975FF" :value="item.value" :checked="index === current" /></view>
							<view class="text">{{ item.name }}</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="btn">提交</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			current: 0,
			items1: [
				{
					value: 'A',
					name: 'A 较咸'
				},
				{
					value: 'B',
					name: 'B 清淡',
					checked: 'true'
				},
				{
					value: 'C',
					name: 'C 比较爱重口'
				}
			],
			items2: [
				{
					value: 'A',
					name: 'A 少油'
				},
				{
					value: 'B',
					name: 'B 一般',
					checked: 'true'
				},
				{
					value: 'C',
					name: 'C 多油'
				}
			],
			items3: [
				{
					value: 'A',
					name: 'A 定时定量，1500ml以上'
				},
				{
					value: 'B',
					name: 'B 定时定量，大多数会选择奶茶，咖啡，果汁含糖型饮料',
					checked: 'true'
				},
				{
					value: 'C',
					name: 'C 渴了才喝，应该不到1500ml'
				}
			],
			items4: [
				{
					value: 'A',
					name: 'A 七分饱，差不多了，如果有好吃的还想吃两口'
				},
				{
					value: 'B',
					name: 'B 六分饱：有点饱感，开始吃的慢了',
					checked: 'true'
				},
				{
					value: 'C',
					name: 'C 八分饱，感觉胃里满满的，有满足感'
				},
				{
					value: 'D',
					name: 'D 九分饱，感觉吃不下了'
				}
			],
			items5: [
				{
					value: 'A',
					name: 'A 早餐吃的最好'
				},
				{
					value: 'B',
					name: 'B 午餐吃的最好',
					checked: 'true'
				},
				{
					value: 'C',
					name: 'C 晚餐吃的最丰盛'
				}
			]
		};
	}
};
</script>

<style lang="less">
page {
	background-color: #f7f6f9;
}
.page-five {
	margin: 4vw;
	background: #ffffff;
	border-radius: 16rpx;
	padding: 40rpx 0 48rpx 0;
	.desc-content {
		height: 158rpx;
		padding: 16rpx 18rpx 22rpx 16rpx;
		margin: 0 46rpx 36rpx 46rpx;
		background: #f7f7f7;
		border-radius: 12rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #bebebe;
		line-height: 30rpx;
		letter-spacing: 4rpx;
		text-align: justify;
		box-sizing: border-box;
	}
	.form-content {
		.title {
			margin: 0 0 24rpx 36rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 40rpx;
		}
		.form-list {
			margin-bottom: 32rpx;
			.question {
				margin: 0 0 26rpx 36rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 40rpx;
			}
			.answer-list {
				margin: 0 46rpx 32rpx 46rpx;
				border-radius: 12rpx;
				border: 2rpx solid #97bcff;
				box-sizing: border-box;
				.answer-item {
					position: relative;
					display: flex;
					align-items: center;
					padding: 20rpx 24rpx;
					&::after {
						content: '';
						position: absolute;
						left: 0;
						right: 0;
						bottom: 0;
						height: 2rpx;
						background-color: #97bcff;
					}
					&:last-child::after {
						display: none;
					}
					.radio {
						width: 36rpx;
					}
					radio {
						transform: scale(0.7);
					}
					.text {
						margin-left: 36rpx;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #333333;
						line-height: 40rpx;
					}
				}
			}
		}
		.btn {
			width: 226rpx;
			height: 72rpx;
			margin: 122rpx auto 0 auto;
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
}
</style>
