<template>
    <div class="v-picker-list-wrap">
        <div v-for="(list,index) in options" :key="index" class="v-picker-column-item">
            <list :list="list"
                  :checked="checked[index]"
                  @change="listChange($event,index)"></list>
        </div>
    </div>
</template>

<script>
    import util from './util'
    import List from './components/list'

    export default {
        name: 'PICKER',
        props: {
            options: {
                type: Array,
                default() {
                    return []
                }
            },
            value: {
                type: Array,
                default() {
                    return []
                }
            },
        },
        computed: {
            checked() {
                let arr = util.objectDeepCopy(this.value).map((item, index) => {
                    if (this.options[index]) {
                        return this.value2Item(this.options[index], item).index
                    } else {
                        return 0
                    }
                })
                if (arr.length !== this.options.length) {
                    arr.length = this.options.length
                }
                for (let i = 0; i < arr.length; i++) {
                    if (typeof arr[i] !== 'number') {
                        arr[i] = 0
                    }
                }
                return arr
            },
        },
        components: {
            List
        },
        methods: {
            listChange(e, index) {
                this.checked.splice(index, 1, e)
                this.change()
                let values = []
                this.checked.map((item, index) => {
                    values[index] = this.options[index][item].value
                })
                this.$emit('input', values)
            },
            change() {
                this.$emit('change', this.getResult())
            },
            getValue() {
                let val = []
                this.checked.forEach((item, index) => {
                    val.push(this.options[index][item])
                })
                return val
            },
            value2Item(list, value) {
                let data = {
                    item: list[0],
                    index: 0
                }
                list.map((item, index) => {
                    if (item.value === value) {
                        data.item = item
                        data.index = index
                    }
                    return item
                })
                return data
            },
            getResult() {
                return util.objectDeepCopy({value: this.getValue(), checked: this.checked})
            }
        },
    }
</script>

<style lang="scss">
    .v-picker-list-wrap {
        position: relative;
        height: 220px;
        width: 100%;
        background-color: #fff;
        display: flex;
        justify-content: center;

        &:after, &:before {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            z-index: 2;
            pointer-events: none;
            backface-visibility: hidden;
        }

        &:before {
            top: 0;
            bottom: 132px;
            background-image: linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.3));
            border-bottom: 1px solid #ccc;
        }

        &:after {
            top: 132px;
            bottom: 0;
            background-image: linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.75));
            border-top: 1px solid #ccc;
        }

        .v-picker-column-item {
            flex: 1;
            height: 100%;
            display: flex;
            color: #333;
            font-size: 14px;
            line-height: 1;

            .v-picker-column-append {
                height: 100%;
                padding: 0 5px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
</style>
