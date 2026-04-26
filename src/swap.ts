// 简单模式
// token: 单词串和空白串
const tokenPattern = /\s+|\S+/g;
// 分隔符: 空白串
const separatorPattern = /^\s+$/;

// 增强模式
// token: 单词,空白串,特定字符序列
const tokenPatternPlus = /\s+|!=|[;,|"<>=]+|(?:!(?!=)|[^\s;,|"<>!=])+/g;
// 分隔符: 空白串,特定字符序列
const separatorPatternPlus = /^(?:\s+|!=|[;,|"<>=]+)$/;
// 支持 `,` `;` `|` `"` `<` `>` `=` `<=` `>=` `!=`


export type SwapOptions = {
	plus?: boolean;
};

// 文本交换逻辑
export function swapSelectedText(selectedText: string, options?: SwapOptions): string {
	const usePlus = options?.plus === true;
	const activeTokenPattern = usePlus ? tokenPatternPlus : tokenPattern;
	const activeSeparatorPattern = usePlus ? separatorPatternPlus : separatorPattern;

    // 使用正则表达式分割文本为 token 列表
	const tokens = selectedText.match(activeTokenPattern) ?? [];
    // 获取所有单词的索引
	const wordTokenIndexes = tokens
		.map((token, index) => (!activeSeparatorPattern.test(token) ? index : -1))
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