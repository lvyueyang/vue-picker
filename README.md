# v-picker

> vue的picker组件，无依赖，轻量

## 安装

```sh
npm i v-picker --save
```

## 引入插件

### 全局引入

``` js
import Vue from 'vue'
import VPicker from 'v-picker'

Vue.use(VPicker)
```

### 局部引入

```js
import {VPicker, VPickerModal} from 'v-picker'
```

## 基本用法

### 使用组件

```html
// 基础组件
<v-picker :options="list" v-model="checked"></v-picker>

// 弹出层
<v-picker-modal :visible.sync="visible"
                :options="list"
                title="这是组件调用"
                :value="checked"
                @change="change"
                @confirm="confirm"
                @cancel="cancel"></v-picker-modal>
```

### 函数式调用

``` js
const picker = this.$picker({
    options: list,
    value: ['1-1', '2-2', '3-3', '4-4'],
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    title: 'title',
    mask: false, // 点击遮罩层是否关闭 默认 true
    change: e => {
        console.log('触发change', e)
        // 设置第一列
        picker.setOptions(0, [{
            label: '12312',
            value: '12312',
        }])
    },
    confirm: e => {
        console.log('点击了确定', e)
    },
    cancel: () => {
        console.log('点击了取消')
    }
})
```

## API

### `Picker`

#### `Props` 属性

| 参数              | 说明     | 类型  | 默认值 |
| ----------------- | -------- | ----- | ------ |
| `value (v-model)` | 选中的值 | Array | []     |
| `options`         | 数据列表 | Array | []     |

#### `Events `方法

| 事件名称 | 说明         | 回调参数           |
| -------- | ------------ | ------------------ |
| `input`  | 监听变化事件 | 对应选中的value    |
| `change` | 监听变化事件 | 回调参数示例.示例1 |

> input 和 change 只是回调的数据不同

### `PickerModal`

`Props` 属性

| 参数           | 说明                   | 类型    | 默认值 |
| -------------- | ---------------------- | ------- | ------ |
| `value`        | 选中的值               | Array   | []     |
| `options`      | 数据列表               | Array   | []     |
| `visible.sync` | 控制显示               | Boolean | false  |
| `mask`         | 点击遮罩层是否关闭     | Boolean | true   |
| `confirmText`  | 确认按钮文字           | String  | '确定' |
| `cancelText`   | 取消按钮文字           | String  | '取消' |
| `title`        | 弹出层标题             | String  | ''     |
| `appendBody`   | 是否将弹出层插入body中 | Boolean | true   |

#### `Events `方法

| 事件名称  | 说明         | 回调参数           |
| --------- | ------------ | ------------------ |
| `change`  | 监听变化事件 | 回调参数示例.示例1 |
| `confirm` | 点击确认按钮 | 回调参数示例.示例1 |
| `cancel`  | 点击取消按钮 | 无                 |

## `setOptions(index,data)`

用于动态改变`options`的值

>  注：此方法仅在函数式调用时使用

| 名称    | 说明                  | 类型   |
| ------- | --------------------- | ------ |
| index   | 对应options中列的下标 | Number |
| options | 要被替换的值          |        |

```js
picker.setOptions(0, [{
    label: '12312',
    value: '12312', 
}])
```

### `options`示例

```js
[
    [
        {label: "选项1-1", value: "1-1"},
        {label: "选项1-2", value: "1-2"},
        {label: "选项1-3", value: "1-3"},
        {label: "选项1-4", value: "1-4"}
    ],
    [
        {label: "选项2-1", value: "2-1"},
        {label: "选项2-2", value: "2-2"},
        {label: "选项2-3", value: "2-3"},
        {label: "选项2-4", value: "2-4"}
    ],
    [
        {label: "选项3-1", value: "3-1"},
        {label: "选项3-2", value: "3-2"},
        {label: "选项3-3", value: "3-3"},
        {label: "选项3-4", value: "3-4"}
    ],
    [
        {label: "选项4-1", value: "4-1"},
        {label: "选项4-2", value: "4-2"},
        {label: "选项4-3", value: "4-3"},
        {label: "选项4-4", value: "4-4"}
    ]
]
```

## 回调参数示例

### 示例1

``` js
{
    value:[
        {
            label: "选项1-2",
            value: "1-2"
        },
        {
            label: "选项2-2",
            value: "2-2"
        },
        {
            label: "选项3-3",
            value: "3-3"
        },
        {
            label: "选项4-4",
            value: "4-4"
        }
    ],
    checked:[1, 1, 2, 3]
}
```



