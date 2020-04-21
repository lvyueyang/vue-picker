<template>
    <div class="v-picker-column"
         @touchstart="handlerStart"
         @touchmove="handlerMove"
         @touchend="handlerEnd">
        <ul :style="ulStyle">
            <li v-for="(v,index) in list" :key="v.value" :class="{active: index === listenerIndex}">
                <span>{{v.label}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    function getClient(e) {
        let x = e.changedTouches[0].clientX
        let y = e.changedTouches[0].clientY
        return {
            x,
            y
        }
    }

    export default {
        name: 'List',
        props: {
            checked: {
                type: Number,
                default: 0
            },
            itemHeight: {
                type: Number,
                default: 44 // px
            },
            list: {
                type: Array,
                default() {
                    return []
                }
            },
            /*row: {
                type: Number,
                default: 5,
                validate(val) {
                    // 必须是奇数
                    return val % 2 !== 0
                }
            }*/
        },
        data() {
            return {
                row: 5,
                selectIndex: 0,
                ul: {
                    top: 0,
                    dur: 0,
                    property: 'none',
                },
                touch: {
                    start: 0,
                    startChecked: 0,
                    time: 0,
                    end: 0,
                }
            }
        },
        computed: {
            ulStyle() {
                return {
                    transform: `translate3d(0px, ${this.ul.top}px, 0px)`,
                    transitionDuration: `${this.ul.dur}s`,
                    transitionProperty: this.ul.property,
                    lineHeight: `${this.itemHeight}px`
                }
            },
            halfHeight() {
                return (Math.ceil(this.row / 2) - 1) * this.itemHeight
            },
            listHeight() {
                return this.list.length * this.itemHeight
            },
            listenerIndex() {
                // 实时获取当前选中项
                // 移动的距离 / 每个的距离 = 选中的项
                let index = Math.abs(Math.round((this.halfHeight - this.ul.top) / this.itemHeight))
                return index >= this.list.length ? this.list.length - 1 : index
            }
        },
        watch: {
            checked(val) {
                this.setIndex(val)
            },
            selectIndex(val) {
                this.$emit('input', val)
            },
            list(list) {
                const top = this.ul.top
                if (top >= (this.halfHeight + this.itemHeight)) {
                    this.setIndex()
                } else if (Math.abs(top) >= (this.listHeight - this.halfHeight)) {
                    this.setIndex(list.length - 1)
                }
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.selectIndex = this.checked
                this.setIndex(this.selectIndex)
            },
            setIndex(index = 0) {
                const top = this.halfHeight - (index * this.itemHeight)
                this.ul.top = top
                this.touch.end = top
                this.selectIndex = index
            },
            handlerStart(e) {
                this.touch.start = getClient(e).y
                this.touch.startChecked = this.selectIndex
                this.touch.time = Date.now()
            },
            handlerMove(e) {
                e.preventDefault()
                e.stopPropagation()
                this.ul.dur = 0
                this.ul.property = 'none'
                // 滑动距离
                const range = getClient(e).y - this.touch.start
                let top = this.touch.end + range
                // 计算边界（是否到顶或者到底）
                if (top > (this.halfHeight + this.itemHeight)) {
                    top = this.halfHeight + this.itemHeight
                }
                if ((-top >= (this.listHeight - this.halfHeight))) {
                    top = -(this.listHeight - this.halfHeight)
                }
                this.ul.top = top
            },
            handlerEnd(e) {
                let top = this.ul.top
                // 设置过渡效果
                this.ul.dur = .5
                this.ul.property = 'all'
                // 设置惯性距离
                const range = getClient(e).y - this.touch.start // 拖动距离
                const time = Date.now() - this.touch.time // 所用时间
                const speed = range / time
                top += speed * 100
                this.ul.top = top
                // 计算边界（是否到顶或者到底）
                if (top >= (this.halfHeight + this.itemHeight)) {
                    this.setIndex()
                } else if ((-top >= (this.listHeight - this.halfHeight))) {
                    this.setIndex(this.list.length - 1)
                } else {
                    this.touch.end = top
                    this.setIndex(this.listenerIndex)
                }
                if (this.touch.startChecked !== this.selectIndex) {
                    this.$emit('change', this.selectIndex)
                }
            },

        },
        components: {}
    }
</script>

<style lang="scss">
    .v-picker-column {
        padding: 0;
        flex: 1;
        width: 100%;
        margin: 0 auto;
        overflow: hidden;
        font-size: 14px;
        color: #333;
        height: 100%;

        ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        li {
            text-align: center;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
</style>
