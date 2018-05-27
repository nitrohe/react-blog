# Nitrohe的博客



***依赖库修改说明***

## remark-react

修改文件：remark-react/index.js

1、解析md文件时，给h2标签增加一个锚点

```javascript
if(component == 'h2') {
	//zyf
	//var childH2 = createElement('a', { href: '#'+children[0], className: 'anchor' }, '#');
	var childH2 = createElement('a', { href: '#'+children[0], className: 'anchor', id: children[0] }, '');
 	h2Text.push({h2:children[0]});
 	children.push(childH2);
 }
```

2、compile函数返回值修改，修改前只返回toH，修改后返回一个数组，数组第二个元素为新增返回值

```javascript
//zyf
return [toH(h, hast, settings.prefix), h2Text];
```



## affix

修改文件位置：antd/lib/affix/index.js

修改原因：使用anchor时，内部会用affix组件包住，没有可用的参数设置affix距离顶部的位置

```javascript
function getTargetRect(target) {
    //zyf modify top from 0 to 70 
    return target !== window ? target.getBoundingClientRect() : { top: 70, left: 0, bottom: 0 };
}
```





## TODO

- 
