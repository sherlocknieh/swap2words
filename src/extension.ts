import * as vscode from 'vscode';
import { swapSelectedText } from './swap';


// 入口函数: 扩展被激活时调用
export function activate(context: vscode.ExtensionContext) {

	// 注册插件命令
	const swapWordsDisposable = vscode.commands.registerCommand('swap-words.swapWords', () => {
		// 获取当前活动的文本编辑器
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}
		// 获取选中文本
		const selection = editor.selection;
		const selectedText = editor.document.getText(selection);

		// 执行交换逻辑
		const swappedText = swapSelectedText(selectedText);

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
