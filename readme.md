## 轮播图组件(待完善)
    一个基于 vue 实现的移动端 h5 轮播图组件
## 参数列表(待完善)
+ Swiper: 
    ```js
    options（Object）: {
        on: {
            click : (e, swiper) => {  // 监听鼠标单击事件接受两个参数（e: touch事件，swiper: Swiper实例）

            }
        }
    }
    ```

+ Swiper-slider:
    - *slideId（Number）： swiper 子项的 id  (必选) 

## 安装

`npm install vue3-swiper-nice`;

## 实现方式

```html
<Swiper class="swiper" :options="option">
    <Swiper-slider :slideId="1" class="img1">轮播图1</Swiper-slider>
    <Swiper-slider :slideId="2" class="img2">轮播图2</Swiper-slider>
    <Swiper-slider :slideId="3" class="img3">轮播图3</Swiper-slider>
    <Swiper-slider :slideId="4" class="img4">轮播图4</Swiper-slider>
    <Swiper-slider :slideId="5" class="img5">轮播图5</Swiper-slider>
</Swiper>
```

```js
import {Swiper, SwiperSlider} from 'vue3-swiper-nice';
Vue.use(Swiper).use(SwiperSlider);
```

## 事件（待完善）
1. getId(): 获取当前轮播图id
2. slideTo(index, speed,callback): 滑到指定index轮播图
    - index: 轮播索引 
    - speed: 滑动速度(毫秒)
    - callback：回调函数(可接受参数为 Swiper 实例)
