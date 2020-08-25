<template>
<div :class="['swiper-slider', activeId == slideId ? 'swiper-slider-active' : '']">
    <slot></slot>
</div>
</template>

<script>
export default {
    name: 'SwiperSlider',
    props: {
        slideId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            activeId: 1,

        }
    },
    methods: {

    },

}
</script>

<style lang="sass">
.swiper-slider {
    width: 100%;
    flex-shrink: 0;
    overflow: hidden;
    height: 200rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}

.swiper-slider-active {
    display: flex;
}
</style>
