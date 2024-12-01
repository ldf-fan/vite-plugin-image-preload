# vite-plugin-image-preload

一个用于项目图片资源预加载的Vite插件。

## 安装

使用Npm：

```bash
npm install vite-plugin-image-preload --save-dev
```

## 用例

```js
// vite.config.js

import imagePreLoad from "vite-plugin-image-preload";

export default defineConfig({
    plugins: [
	react(), 
	imagePreload({ 
	    dir: "images/**/*.{png,jpg,jpeg,gif,svg,webp}"
	})
    ],
});
```

## 配置选项

### `dir`

类型： `string`

图片资源所在单页面应用的目录。

示例：

React项目中图片文件夹在public文件夹中：

```
--dist
|
--public
|.   |
|.   |--images
|
--src
|
|
--package.json
```

配置如用例所示。

### `attrs`

类型：

```
interface Attrs {
  /** 预加载方式 默认 preload */
  rel:'preload'|'prefetch'
}
```

连接资源标签属性配置。

示例：

```
// vite.config.js

import imagePreLoad from "vite-plugin-image-preload";

export default defineConfig({
    plugins: [
	react(), 
	imagePreload({ 
	    dir: "images/**/*.{png,jpg,jpeg,gif,svg,webp}",
	    attrs: {
	  	rel:'prefetch'
	    }
	})
    ],
});
```
