<template>
	<view class="page-index">
		<!-- <home v-if="currentId == 0"></home>
		<discover v-if="currentId == 1"></discover>
		<mall v-if="currentId == 3" @onChangeHeaderBg="onChangeHeaderBg"></mall>
		<user v-if="currentId == 4" @onChangeHeaderBg="onChangeHeaderBg"></user> -->
		<!-- <custom-tabbar :currentId="currentId" @switchTab="switchTab"></custom-tabbar> -->
	</view>
</template>

<script>
// import home from './home.vue';
// import discover from './discover.vue';
// import mall from './mall.vue';
// import user from './user.vue';
export default {
	components: {
		// home,
		// discover,
		// mall,
		// user
	},
	data() {
		return {
			currentId: 0
		};
	},
	onLoad() {},
	methods: {
		switchTab(id) {
			this.currentId = id;
		},
		onChangeHeaderBg(flag) {
			if (flag) {
				uni.setNavigationBarTitle({
					title: this.currentId == 4 ? '个人中心' : '步数书城'
				});
				uni.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: '#0056ff'
				});
			} else {
				uni.setNavigationBarTitle({
					title: '体能观测'
				});
				uni.setNavigationBarColor({
					frontColor: '#000000',
					backgroundColor: '#ffffff'
				});
			}
		}
	}
};
</script>

<style></style>
