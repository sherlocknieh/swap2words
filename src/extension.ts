import * as vscode from 'vscode';
import { swapSelectedText } from './swap';

type SwapCommandArgs = {
	plus?: boolean;
};


// 入口函数: 扩展被激活时调用
export function activate(context: vscode.ExtensionContext) {
	const runSwap = (plus: boolean) => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		const selection = editor.selection;
		const selectedText = editor.document.getText(selection);
		const swappedText = swapSelectedText(selectedText, { plus });

		editor.edit(editBuilder => {
			editBuilder.replace(selection, swappedText);
		});
	};

	// 注册插件命令
	const swapWordsDisposable = vscode.commands.registerCommand(
		'swap-words.swapWords',
		() => runSwap(false),
	);
	const swapWordsPlusDisposable = vscode.commands.registerCommand(
		'swap-words.swapWords.plus',
		() => runSwap(true),
	);

	// 将命令添加到到可释放资源列表，便于自动清理
	context.subscriptions.push(swapWordsDisposable);
	context.subscriptions.push(swapWordsPlusDisposable);
}

// 出口函数：扩展被停用时调用
export function deactivate() {}
