<template>
	<scroll-view
		class="custom-pull-refresh"
		scroll-y="true"
		refresher-enabled="true"
		:refresher-triggered="triggered"
		@refresherrefresh="onRefresh"
		@refresherrestore="onRestore"
		@scrolltolower="onReachbottom"
	>
		<slot></slot>
	</scroll-view>
</template>

<script>
export default {
	data() {
		return {
			triggered: false
		};
	},
	onReady() {
		this._freshing = false;
		setTimeout(() => {
			this.triggered = true;
		});
	},
	methods: {
		onRefresh() {
			if (this._freshing) return;
			this._freshing = true;
			this.$emit('pulldownRefresh');
		},
		onRestore() {
			this.triggered = 'restore';
		},
		onReachbottom() {
			this.$emit('pullupRefresh');
		},
		endPulldown() {
			this.triggered = false;
			this._freshing = false;
		}
	}
};
</script>

<style lang="less">
.custom-pull-refresh {
	width: 100%;
	height: 100%;
}
</style>
