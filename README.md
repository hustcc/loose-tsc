# loose-tsc

> 解决 `tsc` 编译 ts 文件的时候，无法跳过 type checking 步骤。


## Install

> npm i loose-tsc


## Usage

在 `package.json` 中：

```diff
"script": {
-  "build": "tsc",
+  "build": "loose-tsc"
}
```


## 场景使用

 - 可以先使用 shell 脚本，一键将目录中的 `.js` 文件改成 `.ts` 后缀。


```shell
find ./src -name "*.js*" -exec rename -v 's/\.js/\.ts/i' {} \;   
```

 - 然后使用 `tsc` 编译肯定无法通过，所以使用 `loose-tsc` 替换即可。
 - 后续在逐步将 js 语法的 ts 代码修正。
