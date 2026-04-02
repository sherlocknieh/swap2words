# swap2words

[中文](#简介) | [English](#introduction)


## 简介

开发此插件是为了实现类似 "快速交换算式两边的式子,符号留在中间" 的功能;

采用了 "交换首尾单词" 的逻辑来实现, 所以也很方便用来交换相邻两个单词;

如果选中的文本只包含一个单词, 则交换首尾字符.

## 使用示例


- 选中 `中文 | English` 快速交换为 `English | 中文`

- 选中 `”中文引号“` 快速交换得 `“中文引号”`

- 在 `mian` 中选中 `ia` 快速交换得 `main`



## 使用方式

鼠标:

- 在编辑器中选中文本。
- 右键选择 "SWAP: 交换首尾"

键盘：

- 目前没有设置默认快捷键
- 需要的话可自行添加:

```json
// keybindings.json
{
  "key": "ctrl+shift+left",
  "command": "swap2words.swapWords",
  "when": "editorTextFocus && editorHasSelection"
}
```

## 后续计划

- 目前仅靠空白字符拆分单词;
- 以后可能支持更多常见字符, 如: `+`, `-`, `*`, `/`, `,`, `|`, `=`, `:` 等等.
- 以后也许还会支持不等式变号, 如: `a >= b` 交换成 `b <= a`.


## Introduction

This extension is designed for quick text swapping scenarios, such as swapping the two sides of an expression while keeping the operator in the middle.

It's implemented by "swapping the head and tail", so it is also useful for swapping two neighbouring words.

If the selected text contains only one word, the extension swaps the first and last characters instead.

## Examples

- Swap `sin(x) = f(x)` to get `f(x) = sin(x)`;

- Swap `ie` in `recieve` to get `receive`;

- Swap `2, 1,` in `[2, 1, 3]` to get `[1, 2, 3]`;


## Usage

Mouse:

- Select text in the editor.
- Right-click and choose `SWAP Head & Tail`.

Keyboard:

- No default shortcut is assigned.
- You can add one yourself if needed:

```json
// keybindings.json
{
  "key": "ctrl+shift+left",
  "command": "swap2words.swapWords",
  "when": "editorTextFocus && editorHasSelection"
}
```

## Future Plans

- Currently, words are split only by whitespace.
- In the future, support may be added for more common symbols, such as `+`, `-`, `*`, `/`, `,`, `|`, `=`, `:` and more.
- Inequality sign swapping may also be supported later, for example converting `a >= b` to `b <= a`.

