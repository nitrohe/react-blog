# Nitrohe的博客



***依赖库修改说明***

## remark-react

修改文件：remark-react/index.js

1、解析md文件时，给h2标签增加一个锚点

```javascript
//add by nitrohe
if(component == 'h2') {
	//var childH2 = createElement('a', { href: '#'+children[0], className: 'anchor' }, '#');
	var childH2 = createElement('a', { href: '#'+children[0], className: 'anchor', id: children[0] }, '');
 	h2Text.push({h2:children[0]});
 	children.push(childH2);
 }
```

2、compile函数返回值修改，修改前只返回toH，修改后返回一个数组，数组第二个元素为新增返回值

```javascript
//mofify by nitrohe
return [toH(h, hast, settings.prefix), h2Text];
```



## affix

修改文件位置：antd/lib/affix/index.js 

修改原因：使用anchor时，内部会用affix组件包住，没有可用的参数设置affix距离顶部的位置

```javascript
function getTargetRect(target) {
    // modify top from 0 to 70 
    return target !== window ? target.getBoundingClientRect() : { top: 70, left: 0, bottom: 0 };
}
```



## react-markdown-editor

重新编译(yarn)

修改文件位置：react-markdown-editor/src/BaseMarkdownEditor.js

修改原因：textarea不支持自定义样式，`className={styles.textarea}` amend `className={classes.textarea}` 

```react
<ReactTextareaAutocomplete
    loadingComponent={Loading}
    className={classes.textarea}
    ref={(ref) => {
        this.rtaRef = ref
    }}
    trigger={{
        ':': {
            dataProvider: token => emoji(token)
                .slice(0, 10)
                .filter(({char}) => char !== null)
                .map(({ name, char, keywords }) => ({ name, char, keywords })),
                component: AutocompleteItem,
                    output: item => ({ text: item.char, caretPosition: 'next' }),
        },
        }}
    {...textAreaProperties}
    placeholder={this.props.placeholder}
    value={this.props.value}
    onChange={this.props.onChange}
    />
```



## @jukben\emoji-search

重新编译(yarn)npm run build时报错：ERROR in index-5353b33322ce416969f9.js from UglifyJs  Invalid assignment [index-5353b33322ce416969f9.js:6835,89] 

修改：使用 <https://github.com/jukben/emoji-search/releases/tag/v1.1.6> 





## TODO

- 
