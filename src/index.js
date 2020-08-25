import Swiper from './components/Swiper.vue';
import SwiperSlider from './components/SwiperSlider.vue';

Swiper.install = Vue => Vue.component(Swiper.name, Swiper);
SwiperSlider.install = Vue => Vue.component(SwiperSlider.name, SwiperSlider);

export {
    Swiper, SwiperSlider
}
