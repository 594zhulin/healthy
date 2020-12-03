<template>
	<view class="page-index">
		<home v-if="currentId == 0"></home>
		<discover v-if="currentId == 1"></discover>
		<mall v-if="currentId == 3"></mall>
		<user v-if="currentId == 4"></user>
		<custom-tabbar :currentId="currentId" @switchTab="switchTab"></custom-tabbar>
	</view>
</template>

<script>
import home from './home.vue';
import discover from './discover.vue';
import mall from './mall.vue';
import user from './user.vue';
export default {
	components: {
		home,
		discover,
		mall,
		user
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
		}
	}
};
</script>

<style></style>
