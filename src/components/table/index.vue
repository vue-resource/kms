<template>
    <div class="ui-table" :class="renderClass">
        <div class="table-header" v-if="fixedHeader" :style="headerStyle" ref="header">
            <table :style="tableMin">
                <slot name="header"></slot>
            </table>
        </div>
        <div class="table-body" v-if="fixedHeader" ref="body" :style="bodyMax">
            <table :style="tableMin" ref="bodyTable">
                <slot name="body"></slot>
            </table>
        </div>
        <table v-else>
            <slot name="header"></slot>
            <slot name="body"></slot>
        </table>
    </div>
</template>

<script>
import {addEvent, removeEvent} from '@/utils/tools/dom';
export default {
    name: 'kms-table',
    data() {
        return {
            key: '',
            headerStr: '',
            headerStyles: '',
            headerStyle: {
                left: 'auto',
                width: 'auto',
                paddingRight: '0px'
            },
            tableMin: {
                'minWidth': this.getMinWidth() || ''
            },
            bodyMax: {
                'maxHeight': this.getMaxHeight() || ''
            },
            renderClass: {
                'ui-table-fixed': this.fixedHeader,
                'ui-table-border': this.border,
                'ui-table-stripe': this.stripe
            },
            scrollData: { }
        };
    },
    props: {
        fixedHeader: {
            type: Boolean,
            default: false
        },
        fixedFirstColumn: { //暂不支持
            type: Boolean,
            default: false
        },
        border: {
            type: Boolean,
            default: false
        },
        stripe: {
            type: Boolean,
            default: false
        },
        minWidth: {
            type: [String, Number],
            default: ''
        },
        maxHeight: {
            type: [String, Number],
            default: ''
        }
    },
    computed: {

    },
    methods: {
        getMinWidth() {
            let min = this.minWidth;
            if (!min) {
                return '';
            }
            if (typeof min === 'number') {
                return min + 'px';
            } else {
                return min.replace('px', '') + 'px';
            }
        },
        getMaxHeight() {
            let max = this.maxHeight;
            if (!max) {
                return '';
            }
            if (typeof max === 'number') {
                return max + 'px';
            } else {
                if (max.indexOf('calc') > -1) {
                    return max;
                } else {
                    return max.replace('px', '') + 'px';
                }
            }
        },
        setHeaderData() {
            let elHeader = this.$refs.header;
            let elBody = this.$refs.body;
            let elTable = this.$refs.bodyTable;
            let padRight = elBody.offsetWidth - elBody.clientWidth;
            this.headerStyle.paddingRight =  padRight + 'px';
            this.headerStyle.width = elTable.offsetWidth + padRight + 'px';
        },
        setHeaderPosition(e) {
            let elBody = this.$refs.body;
            let elTable = this.$refs.bodyTable;
            let tableWidth;
            let padRight = elBody.offsetWidth - elBody.clientWidth;

            if (e.type == 'resize') {
                tableWidth = elTable.clientWidth;
                this.headerStyle.width = tableWidth + padRight + 'px';
            }
            if (e.type == 'scroll') {
                this.headerStyle.left = -elBody.scrollLeft + 'px';
            }
        }
    },
    created(){
    },
    mounted(){
        if (this.fixedHeader) {
            this.setHeaderData();
            addEvent(this.$refs.body, 'scroll', this.setHeaderPosition);
            addEvent(window, 'resize', this.setHeaderPosition);
        }
    },
    destroyed() {
        removeEvent(this.$refs.body, 'scroll', this.setHeaderPosition);
        removeEvent(window, 'resize', this.setHeaderPosition);
    }
};
</script>
<style lang="less">
/*table*/
.ui-table {
    margin-top: 20px;
    background-color: #fff;
}
.ui-table a,
.data-page a {
    -webkit-transition: all linear 0.1s;
    -moz-transition: all linear 0.1s;
    -o-transition: all linear 0.1s;
    transition: all linear 0.1s;
}
.ui-table table {
    width:100%;
    table-layout: fixed;
}
.ui-table tr:hover {
    background-color: #F8F9FB;
}
.ui-table th,
.ui-table td {
    font-size:13px;
    height: 30px;
    font-weight: normal;
    text-align: center;
    vertical-align: middle;
    color: #414a60;
    padding: 5px;
    border-bottom: 1px #EEF0F5 solid;
}
.ui-table th {
    background: #FBFBFC;
    color: #61687c;
    font-size: 14px;
}
.ui-table th:first-of-type,
.ui-table td:first-of-type {
    padding-left: 10px;
}
.sort-caret {
    display: inline-block;
    position: relative;
    vertical-align: middle;
    margin-left: 5px;
}
.sort-ascending,
.sort-descending {
    display: block;
    border: 5px solid transparent;
    margin-bottom: 2px;
    cursor: pointer;
}
.sort-ascending {
    border-bottom-color: #c0c4cc;
}
.sort-descending {
    border-top-color: #c0c4cc;
}
.ascending .sort-ascending {
    border-bottom-color: #1FCBC7;
}
.descending .sort-descending {
    border-top-color: #1FCBC7;
}
.ui-table table a {
    color: #18c3b1;
}
.ui-table table a:hover {
    color: #00d7c6;
}
.ui-table td {
    position: relative;
}

.ui-table-fixed {
    overflow: hidden;
}
.ui-table-fixed .table-header {
    background-color: #FBFBFC;
    position: relative;
}
.ui-table-fixed .table-body {
    overflow: auto;
}

.ui-table-border {
    border: 1px #EEF0F5 solid;
}
.ui-table-border th,
.ui-table-border td {
    border-left: 1px #EEF0F5 solid;
}
.ui-table-border .table-header,
.ui-table-border .table-body {
    margin-left: -1px;
}
.ui-table-border > table {
    margin-left: -1px;
    margin-bottom: -1px;
}
.ui-table-border .table-body {
    margin-bottom: -1px;
}

.ui-table-stripe tbody tr:nth-child(2n) {
    background-color: #f9f9f9;
}
.ui-table ~ .pager {
    margin-top: 20px;
}
</style>