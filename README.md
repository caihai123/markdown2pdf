# markdown2pdf
一个快速将 `markdown` 转为 `pdf` 的工具网页。

# 介绍
这看起来或许像是一个 `markdown` 编辑器，实际上它主要的功能的是将 `markdown` 快速的转为 `pdf` 文件；编辑内容后，点击打印按钮将会调用 `window.print` 函数以实现快速转变为 `pdf` 的功能，这或许不是一个好的方式，但是对于 `markdown` 来说却是足够且高效的实现方式。

与市面上大多数类似工具相比：
* 大多数服务需要注册会员，并且需要依赖服务器处理文件，存在数据安全隐患。
* 一些工具通过截屏方式生成 PDF，导致清晰度和排版都不理想。
* 本工具完全在本地浏览器处理，无需上传服务器，安全可靠；PDF 输出清晰，保持原有格式。

# markdown 支持
* 高亮代码块
```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
```
* 表情符号（Emoji）

    :smile: :grin: :laughing: :blush: :relaxed: :smirk: [...](https://github.com/ikatyang/emoji-cheat-sheet?utm_source=chatgpt.com)

* 数学公式
$a+b$
$$
\displaystyle \left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)
$$

# 注意事项
由于 `window.print` 的限制，代码中无法控制打印对话框的设置。用户在打印 PDF 时需要手动：
* 勾选“背景图形和颜色”选项（保证样式显示完整）
* 关闭页眉页脚（保证内容干净整洁）
# 未来
* 添加同步滚动功能，让编辑和预览保持一致
* 支持图片上传，丰富文档内容
* 提供多主题切换，适应不同阅读和打印需求（目前仅支持github默认主题）

# 技术
[markdown-it](https://github.com/markdown-it/markdown-it)

[github-syntax-light](https://github.com/primer/github-syntax-light)

[Monaco](https://microsoft.github.io/monaco-editor/)

# 注意


# ❤️ 如果这个工具对你有帮助，欢迎请作者喝一杯 ☕️
<img src="https://github.com/caihai123/finder-icon-mix/raw/main/public/static/reward/wechat.JPG" height="240px"/><img src="https://github.com/caihai123/finder-icon-mix/raw/main/public/static/reward/alipay.JPG" height="240px"/>