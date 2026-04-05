// token: 包含单词和分隔符
const tokenPattern = /\s+|!=|[;,|"<>=]+|(?:!(?!=)|[^\s;,|"<>!=])+/g;
// 分隔符
const separatorTokenPattern = /^(?:\s+|!=|[;,|"<>=]+)$/;

// 文本交换逻辑
export function swapSelectedText(selectedText: string): string {

    // 使用正则表达式分割文本为 token 列表
	const tokens = selectedText.match(tokenPattern) ?? [];
    // 获取所有单词的索引
	const wordTokenIndexes = tokens
		.map((token, index) => (!separatorTokenPattern.test(token) ? index : -1))
		.filter(index => index !== -1);
    // 如果没有单词, 直接返回原文本
	if (wordTokenIndexes.length === 0) {
		return selectedText;
	}
    // 只有一个单词时交换其首尾字符
	if (wordTokenIndexes.length === 1) {
		const word = tokens[wordTokenIndexes[0]];
		if (word.length < 2) {
			return selectedText;
		}
		tokens[wordTokenIndexes[0]] = word[word.length - 1] + word.slice(1, -1) + word[0];
    }
    // 多于一个单词时交换首尾单词
    else {
		const firstWordIndex = wordTokenIndexes[0];
		const lastWordIndex = wordTokenIndexes[wordTokenIndexes.length - 1];
		[tokens[firstWordIndex], tokens[lastWordIndex]] = [tokens[lastWordIndex], tokens[firstWordIndex]];
	}
    // 重新组合 token 列表为字符串
	return tokens.join('');
}