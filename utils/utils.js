/**
 * 处理富文本里的图片宽度自适应
 * 1.去掉img标签里的style、width、height属性
 * 2.img标签添加style属性：max-width:100%;height:auto
 * 3.修改所有style里的width属性为max-width:100%
 * 4.去掉<br/>标签
 * @param html
 * @returns {void|string|*}
 */
function formatRichText(html) {
	let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
		match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
		match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
		match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
		return match;
	});
	newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
		match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
		return match;
	});
	newContent = newContent.replace(/<br[^>]*\/>/gi, '');
	newContent = newContent.replace(/\<img/gi,
		'<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"');
	return newContent;
}

function timestampToTime(timestamp, type) {
	const date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	Y = date.getFullYear() + '-';
	if (type == 'short') {
		M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
	} else {
		M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	}
	D = date.getDate() + ' ';
	h = date.getHours() + ':';
	m = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
	if (type == 'short') {
		return M + D;
	} else {
		return Y + M + D + h + m;
	}
}

module.exports = {
	formatRichText,
	timestampToTime
}
