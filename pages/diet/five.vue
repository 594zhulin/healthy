<template>
	<view class="page-five">
		<view class="desc-content">吃什么很重要，怎么吃也同样重要，不良的饮食习惯，会导致多种身体疾病的发生，要注意科学管理饮食习惯。</view>
		<view class="form-content">
			<view class="title">请根据您日常的饮食习惯以及认知如实回答：</view>
			<view class="form-list">
				<view class="form-item" v-for="(item, index) in question" :key="item.question_id">
					<view class="question">{{ index + 1 }}、{{ item.content }}</view>
					<radio-group class="answer-list" :id="item.question_id" @change="bindRadioChange">
						<label class="answer-item" v-for="(answer, index) in item.option" :key="answer.option_id">
							<view class="radio"><radio color="#2975FF" :value="answer.option_id" :checked="index === current" /></view>
							<view class="text">{{ answer.content }}</view>
						</label>
					</radio-group>
				</view>
			</view>
		</view>
		<view class="btn-content">
			<view class="prev-btn" @click="navigateBack">上一步</view>
			<view class="next-btn" @click="relaunchTo('/pages/diet/result')">提交</view>
		</view>
	</view>
</template>

<script>
import { getSurvey, submitSurvey } from '@/api/diet.js';
export default {
	data() {
		return {
			question: [],
			current: 0,
			answer: []
		};
	},
	onLoad() {
		getSurvey({ is_model: 5 }).then(
			result => {
				this.question = result;
				result.map(item => {
					let obj = { questionnaire_id: item.question_id, is_model: 5, answer: [item.option[0].option_id] };
					this.answer.push(obj);
				});
			},
			err => {}
		);
	},
	methods: {
		bindRadioChange(e) {
			this.answer.map(item => {
				if (item.questionnaire_id == e.target.id) {
					item.answer = [e.detail.value];
				}
			});
		},
		navigateBack() {
			uni.navigateBack({
				delta: 1
			});
		},
		relaunchTo(url) {
			submitSurvey({ is_model: 5, data: JSON.stringify(this.answer) }).then(
				result => {
					uni.reLaunch({
						url
					});
				},
				err => {}
			);
		}
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
	}
	.btn-content {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 60rpx auto 0 auto;
		.prev-btn {
			width: 226rpx;
			height: 72rpx;
			background: #ffffff;
			border-radius: 4rpx;
			border: 2rpx solid #2975ff;
			font-size: 28rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #2975ff;
			line-height: 68rpx;
			text-align: center;
			box-sizing: border-box;
		}
		.next-btn {
			width: 226rpx;
			height: 72rpx;
			margin-left: 50rpx;
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
