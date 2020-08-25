<template>
<div class="swiper-container" @touchstart="start" @touchmove.prevent="move" @touchend="end">
    <div class="wrapper" style="transform: translate3d(0,0,0)" ref="wrapper">
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
    name: 'Swiper',
    props: {
        options: {
            type: Object
        }
    },
    data() {
        return {
            clientXStart: 0,
            moveX: 0,
            lastMoveX: 0,
            currentTransormX: 0,
            id: 0,
            startTime: 0,
            swiper: null
        }
    },
    created() {
        this.swiperClass();
    },
    methods: {
        start(e) {
            let clientX = e.touches[0].clientX;
            this.clientXStart = clientX;
            let transform = e.target.parentNode.style.transform;
            this.lastMoveX = transform;
            e.target.parentNode.style.transition = 'transform 0s';
            let time = new Date().getTime();
            this.startTime = time;
        },
        move(e) {
            let clientX = e.touches[0].clientX;
            let moveX = this.clientXStart - clientX;
            this.moveX = moveX;
            let reg = /-?[0-9]+/g;
            let currentTransormX = 0;
            if (this.lastMoveX.match(reg)[1]) {
                currentTransormX = Number(this.lastMoveX.match(reg)[1]);
            }
            this.currentTransormX = currentTransormX;
            let t = currentTransormX - moveX;
            e.target.parentNode.style.transform = `translate3d(${t}px, 0, 0)`;

        },
        end(e) {
            if (this.options && Reflect.has(this.options, 'on')) {
                // 点击事件
                this.clickEvent(e);
            }
            let endTime = new Date().getTime();
            let during = endTime - this.startTime; // 持续时间
            let idLen = e.target.parentNode.children.length;
            // 判断是否为 第一个向右划 或者 最后一个向左划
            if ((this.id === 0 && this.moveX < 0) || (this.id === idLen - 1 && this.moveX >= 0)) {
                e.target.parentNode.style.transform = `translate3d(${-screen.width * this.id}px, 0, 0)`;
                return;
            }
            // 如果速度大于 0.5 则切换轮播
            if (Math.abs(this.moveX) / during > 0.5) {
                if (this.moveX > 0) {
                    // 向左划
                    e.target.parentNode.style.transform = `translate3d(${-screen.width * ++this.id}px, 0, 0)`;
                } else {
                    // 向右划
                    e.target.parentNode.style.transform = `translate3d(${-screen.width * --this.id}px, 0, 0)`;
                }
                e.target.parentNode.style.transition = 'transform .3s';
                this.moveX = 0;
                return;
            }
            // 如果滑到屏幕一半的距离则切换轮播
            if (Math.abs(this.moveX) >= screen.width / 2) {
                if (this.moveX > 0) {
                    // 向左划
                    e.target.parentNode.style.transform = `translate3d(${-screen.width * ++this.id}px, 0, 0)`;
                } else {
                    // 向右划
                    e.target.parentNode.style.transform = `translate3d(${-screen.width * --this.id}px, 0, 0)`;
                }
            } else {
                e.target.parentNode.style.transform = `translate3d(${-screen.width * this.id}px, 0, 0)`;
            }
            this.moveX = 0;
            e.target.parentNode.style.transition = 'transform .3s';
        },
        pxToRem(px) {
            return px / (0.1333333 * screen.availWidth);
        },
        checkType(type) {
            return Object.prototype.toString.call(type);
        },
        clickEvent(e) {
            // 触发 click 事件
            if (this.moveX === 0 && this.options.on.click) {
                this.options.on['click'](e, this.swiper);
                return;
            }
        },
        swiperClass() {
            const _this = this;
            class Swiper {
                getId() {
                    return _this.id;
                }
                slideTo(index, speed = 300, callback) {
                    _this.id = index;
                    _this.$refs.wrapper.style.transform = `translate3d(${-screen.width * _this.id}px, 0, 0)`;
                    _this.$refs.wrapper.style.transition = `transform ${speed / 1000}s`;
                    if (callback && _this.checkType(callback) === '[object Function]') {
                        callback.call(this, this);
                    }
                }
            }
            this.swiper = new Swiper();
        }
    },
    watch: {
        id: function (val) {
            return this.swiper.getId = function () {
                return val;
            }
        }
    },
}
</script>

<style lang="sass">
.swiper-container {
    /*overflow: hidden;*/
    width: 100%;

    overflow: hidden;
    width: 100vw;

    .wrapper {
        display: flex;
        text-align: center;

    }
}
</style>
