import * as vscode from 'vscode';

// 定义多语言消息
const messages = {
	noSelection: {
		zh: '空白文本',
		en: 'Blank text',
	},
} as const;

// 根据用户语言返回对应的消息
function i18n(key: keyof typeof messages): string {
	const locale = vscode.env.language.toLowerCase();
	const isChinese = locale.startsWith('zh');
	return isChinese ? messages[key].zh : messages[key].en;
}

// 首尾单词或字符交换逻辑
export function swapFirstLastWordOrChar(selectedText: string): string {
	// 把文本拆分为空白串和非空白串的交替序列
	const tokens = selectedText.match(/\S+|\s+/g) ?? [];
	// 找到所有非空白串的位置
	const wordTokenIndexes = tokens
		.map((token, index) => (token.trim() ? index : -1))
		.filter(index => index !== -1);
	// 没有单词，直接返回原文本
	if (wordTokenIndexes.length === 0) {
		vscode.window.showInformationMessage(i18n('noSelection'));
		return selectedText;
	}
	// 只有一个单词，交换首尾字符
	if (wordTokenIndexes.length === 1) {
		const word = tokens[wordTokenIndexes[0]];
		if (word.length < 2) {
			return selectedText;
		}

		tokens[wordTokenIndexes[0]] = word[word.length - 1] + word.slice(1, -1) + word[0];
	}
	// 多于一个单词，交换首尾单词
	else {
		const firstWordIndex = wordTokenIndexes[0];
		const lastWordIndex = wordTokenIndexes[wordTokenIndexes.length - 1];
		[tokens[firstWordIndex], tokens[lastWordIndex]] = [tokens[lastWordIndex], tokens[firstWordIndex]];
	}
	// 返回重组的文本
	return tokens.join('');
}

// 入口函数: 扩展被激活时调用
export function activate(context: vscode.ExtensionContext) {

	// 注册交换首尾单词的命令
	const swapWordsDisposable = vscode.commands.registerCommand('swap-words.swapWords', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}
		// 获取选中文本
		const selection = editor.selection;
		const selectedText = editor.document.getText(selection);

		// 执行交换逻辑
		const swappedText = swapFirstLastWordOrChar(selectedText);

		// 替换原文本
		editor.edit(editBuilder => {
			editBuilder.replace(selection, swappedText);
		});
	});

	// 将命令添加到到可释放资源列表，便于自动清理
	context.subscriptions.push(swapWordsDisposable);
}

// 出口函数：扩展被停用时调用
export function deactivate() {}
