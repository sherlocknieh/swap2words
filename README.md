# Swap-Words

[English](#introduction) | [中文](#简介)


## 简介

开发此插件的初衷是实现 "快速交换算式两边的式子, 而符号留在中间" 的功能, 避免总是需要两次剪切粘贴+后续调整空格的麻烦;

采用了 "交换首尾单词" 的简单逻辑来实现; 

## 使用示例

使用空白字符 (空格,制表符,换行符) 区分单词:

- 选中 `a = b` 快速交换得 `b = a`
- 选中 `中文 | English` 快速交换得 `English | 中文`


如果文本中只含一个单词, 则交换首尾字符;

- 选中 `abc` 快速交换得 `cba`
- 选中 `”中文引号“` 快速交换得 `“中文引号”`


额外支持一些分隔符, 这些情况下没有空格也能正确区分:

- 选中 `13,12,11` 快速交换得 `11,12,13`;

目前支持的分隔符已全部在此列出:

- 常见分隔符: `,`, `;`, `|`, `"`,
- 常见运算符: `<`, `>`, `=`, `<=`, `>=`, `!=`;


## 使用方式

鼠标:

- 在编辑器中选中文本。
- 右键选择 "SWAP: 交换首尾"

键盘：

- 目前没有设置默认快捷键
- 需要的话可自行添加:

keybindings.json
```json
{
  "key": "ctrl+shift+left",
  "command": "swap-words.swapWords",
  "when": "editorTextFocus && editorHasSelection"
}
```

## TODO

- 后续可能支持括号识别, 把带括号的内容识别为一个整体;
- 未来可能支持不等式变号, 例如 `a > b` 交换后变为 `b < a`;


## Introduction

This extension was created to quickly swap the two sides of an expression while keeping separators in the middle, so you do not need repeated cut-paste and manual spacing fixes.

It is implemented with a simple "swap head and tail words" strategy.

## Examples

Words can be split by whitespace (space, tab, newline):

- Select `a = b` to get `b = a`

If the selected text contains only one word, the first and last characters are swapped:

- Select `abc` to get `cba`

Additional separators are also supported, so swapping works even without spaces:

- Select `13,12,11` to get `11,12,13`

All currently supported separators are listed below:

- Common separators: `,`, `;`, `|`, `"`
- Common operators: `<`, `>`, `=`, `<=`, `>=`, `!=`

## Usage

Mouse:

- Select text in the editor.
- Right-click and choose `SWAP HEAD & TAIL`.

Keyboard:

- No default shortcut is assigned.
- Add one manually if needed:

keybindings.json
```json
{
  "key": "ctrl+shift+left",
  "command": "swap-words.swapWords",
  "when": "editorTextFocus && editorHasSelection"
}
```

## TODO

- Support bracket-aware parsing so bracketed content can be treated as a whole.
- Support inequality inversion in the future, for example `a > b` becomes `b < a` after swapping.
