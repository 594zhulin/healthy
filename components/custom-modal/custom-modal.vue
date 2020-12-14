<template>
	<view>
		<view class="modal" v-if="show" :class="{ 'show-modal': transition, coupon: direction == 'none' }">
			<view class="modal__container" :class="direction"><slot></slot></view>
		</view>
		<block v-if="maskClick"><view class="mask" v-show="show" :class="{ 'show-mask': transition }" @touchmove.stop.prevent="prevent" @click="close"></view></block>
		<block v-else><view class="mask" v-show="show" :class="{ 'show-mask': transition, coupon: direction == 'none' }" @touchmove.stop.prevent="prevent"></view></block>
	</view>
</template>

<script>
export default {
	props: {
		direction: {
			type: String,
			default: 'middle'
		},
		maskClick: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			show: false,
			transition: false
		};
	},
	methods: {
		open() {
			this.show = true;
			setTimeout(() => {
				this.transition = true;
			}, 100);
		},
		close() {
			this.show = false;
			setTimeout(() => {
				this.transition = false;
			}, 100);
			if (this.maskClick) {
				this.$emit('close');
			}
		},
		prevent() {}
	}
};
</script>

<style lang="less" scoped>
.modal {
	position: fixed;
	z-index: 99;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	box-sizing: border-box;
	opacity: 0;
	transition: all 0.4s;
	-webkit-transform: translateY(50rpx);
	transform: translateY(50rpx);
	pointer-events: none;
	&__container {
		position: absolute;
		left: 50%;
		font-size: 30rpx;
		background-color: rgba(255, 255, 255, 1);
		box-sizing: border-box;
		pointer-events: auto;
	}
}
.middle {
	top: 50%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	border-radius: 24rpx;
	box-shadow: 0px 12rpx 24rpx 0px rgba(0, 0, 0, 0.12);
}
.bottom {
	left: 0;
	right: 0;
	bottom: 0;
	border-radius: 48rpx 48rpx 0px 0px;
}
.none {
	top: 50%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	background: none;
}
.show-modal {
	opacity: 1;
	-webkit-transform: translateY(0);
	transform: translateY(0);
}
.show-modal.coupon {
	z-index: 100;
}
.mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: #000;
	z-index: 10;
	opacity: 0;
	transition: all 0.4s;
	overflow: hidden;
}
.show-mask {
	opacity: 0.4;
}
.show-mask.coupon {
	z-index: 99;
}
</style>
