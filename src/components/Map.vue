<template>
    <div
        class="py-9"
        style="background: linear-gradient(45deg, #c32ae0 14.5%, #2526a9 85.5%)"
        id="map"
    >
        <div class="container mx-auto mb-16">
            <h1
                class="
                    text-white
                    font-extrabold
                    text-2xl
                    md:text-[32px]
                    px-4
                "
            >
                {{ title }}
            </h1>
            <div class="w-full relative hidden md:block">
                <img :src="bgImage" alt="" class="w-full select-none" />
                <svg
                    width="1300"
                    height="679"
                    viewBox="0 0 1300 679"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    id="cities1"
                    class="absolute left-0 top-0 w-full h-full"
                    @click="clickMap"
                >
                    <g v-if="svgItems" id="svg-map" class="svg-map">
                      <g v-html="svgItems.path"  mask="url(#svg-map__mask_total)"/>
                      <g v-html="svgItems.city"/>
                      <defs>
                        <mask id="svg-map__mask_total">
                          <rect width="100%" height="100%" fill="white"/>
                          <g
                            v-html="svgItems.mask"
                            fill="#000" stroke="#000" stroke-width="4"  stroke-linecap="round"
                          />
                        </mask>
                      </defs>
                    </g>
                </svg>
                <div
                    v-if="city"
                    ref="card"
                    class="
                        svg-map__popup
                        absolute
                        lg:w-[320px]
                        xl:w-[350px]
                        flex flex-col
                        bg-white
                        rounded-lg
                        left-1/2
                        top-20
                        -translate-x-1/2
                        py-4
                        px-9
                        gap-2
                        shadow-lg
                    "
                    :class="{'svg-map__popup_on': popupTransition}"
                >
                    <div class="flex">
                        <span class="text-pink underline font-bold">{{
                            city.text
                        }}</span>
                        <span
                            class="ml-auto cursor-pointer"
                            title="Закрыть"
                            @click="closePopup"
                            >✖</span
                        >
                    </div>

                    <div
                        v-for="(item, _) in cityData"
                        :key="_"
                        class="flex justify-between"
                    >
                        <span class="text-black"> {{ item.name }} </span>
                        <span
                            class="
                                text-white
                                leading-2
                                rounded-full
                                font-bold
                                px-4
                                bg-blue
                            "
                        >
                            {{ item.value }}
                        </span>
                    </div>
                    <a :href="mapLink(city.city)" class="mx-auto">
                        <button
                            class="
                                px-4
                                py-2
                                mx-auto
                                bg-blue
                                text-white
                                font-bold
                                rounded-md
                            "
                        >
                            Разместить рекламу
                        </button>
                    </a>
                </div>
            </div>
            <div class="grid md:hidden grid-cols-2 gap-2 px-4">
                <a
                    v-for="c in mapCities"
                    :key="c.city"
                    :href="mapLink(c.city)"
                >
                    <span class="text-xl text-white">
                        {{ c.text }}
                    </span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'

export default {
    props: ['title'],
    data() {
        return {
            constructions: null,
            cities: null, // TODO: переделать на computed mapCities обагащенные constructions, а тут хранить данные из api
            city: null,
            popupTransition: null,
        }
    },


    mounted(){
        // в оригинале получается по api
        this.constructions = [{"city":"Моршанск","pl":6,"dpl":0,"ss":0,"dss":0,"sb":0,"dsb":0,"spb":0,"dspb":0},{"city":"Рассказово","pl":4,"dpl":0,"ss":0,"dss":0,"sb":0,"dsb":0,"spb":0,"dspb":0},{"city":"Серов","pl":6,"dpl":0,"ss":0,"dss":0,"sb":0,"dsb":0,"spb":0,"dspb":0},{"city":"Уварово","pl":6,"dpl":0,"ss":0,"dss":0,"sb":0,"dsb":0,"spb":0,"dspb":0},{"city":"Энгельс","pl":36,"dpl":0,"ss":1,"dss":0,"sb":0,"dsb":0,"spb":0,"dspb":0},{"city":"Ангарск","pl":24,"dpl":0,"ss":0,"dss":0,"sb":0,"dsb":0,"spb":0,"dspb":0},{"city":"Кировград","pl":4,"dpl":0,"ss":0,"dss":0,"sb":0,"dsb":0,"spb":0,"dspb":0},{"city":"Котовск","pl":2,"dpl":0,"ss":0,"dss":0,"sb":0,"dsb":0,"spb":0,"dspb":0},{"city":"Нижняя Тура","pl":8,"dpl":0,"ss":0,"dss":0,"sb":0,"dsb":0,"spb":0,"dspb":0},{"city":"Ростов-на-Дону","pl":0,"dpl":7,"ss":0,"dss":0,"sb":0,"dsb":2,"spb":0,"dspb":0},{"city":"Москва","pl":263,"dpl":384,"ss":34,"dss":38,"sb":0,"dsb":17,"spb":13,"dspb":9},{"city":"Санкт-Петербург","pl":384,"dpl":128,"ss":2,"dss":0,"sb":0,"dsb":0,"spb":0,"dspb":0},{"city":"Уфа","pl":289,"dpl":22,"ss":0,"dss":3,"sb":0,"dsb":0,"spb":0,"dspb":0},{"city":"Воронеж","pl":20,"dpl":12,"ss":2,"dss":0,"sb":0,"dsb":0,"spb":4,"dspb":0},{"city":"Иркутск","pl":152,"dpl":3,"ss":0,"dss":0,"sb":38,"dsb":0,"spb":2,"dspb":0},{"city":"Саратов","pl":266,"dpl":20,"ss":0,"dss":0,"sb":6,"dsb":0,"spb":4,"dspb":0},{"city":"Екатеринбург","pl":100,"dpl":54,"ss":5,"dss":5,"sb":67,"dsb":15,"spb":0,"dspb":2},{"city":"Красноярск","pl":76,"dpl":44,"ss":0,"dss":0,"sb":1,"dsb":0,"spb":6,"dspb":3},{"city":"Хабаровск","pl":104,"dpl":17,"ss":0,"dss":0,"sb":4,"dsb":0,"spb":9,"dspb":0},{"city":"Новосибирск","pl":67,"dpl":21,"ss":0,"dss":2,"sb":0,"dsb":0,"spb":11,"dspb":1},{"city":"Краснодар","pl":177,"dpl":11,"ss":8,"dss":1,"sb":169,"dsb":0,"spb":6,"dspb":1},{"city":"Волгоград","pl":190,"dpl":12,"ss":2,"dss":0,"sb":7,"dsb":0,"spb":10,"dspb":0},{"city":"Челябинск","pl":70,"dpl":8,"ss":0,"dss":0,"sb":1,"dsb":3,"spb":0,"dspb":0},{"city":"Сочи","pl":26,"dpl":7,"ss":0,"dss":0,"sb":42,"dsb":18,"spb":0,"dspb":0},{"city":"Нижний Новгород","pl":7,"dpl":28,"ss":0,"dss":0,"sb":0,"dsb":0,"spb":0,"dspb":14},{"city":"Тюмень","pl":42,"dpl":7,"ss":0,"dss":0,"sb":3,"dsb":5,"spb":0,"dspb":0},{"city":"Барнаул","pl":450,"dpl":13,"ss":4,"dss":0,"sb":4,"dsb":5,"spb":5,"dspb":0},{"city":"Тамбов","pl":156,"dpl":5,"ss":0,"dss":0,"sb":0,"dsb":0,"spb":0,"dspb":0},{"city":"Самара","pl":0,"dpl":4,"ss":0,"dss":0,"sb":0,"dsb":0,"spb":0,"dspb":2},{"city":"Владивосток","pl":142,"dpl":0,"ss":0,"dss":0,"sb":0,"dsb":0,"spb":0,"dspb":2},{"city":"Нижний Тагил","pl":306,"dpl":0,"ss":0,"dss":0,"sb":0,"dsb":0,"spb":0,"dspb":0},{"city":"Пермь","pl":111,"dpl":0,"ss":0,"dss":0,"sb":32,"dsb":0,"spb":0,"dspb":0},{"city":"Ставрополь","pl":0,"dpl":12,"ss":0,"dss":0,"sb":0,"dsb":0,"spb":2,"dspb":1}]
        this.cities = [{"ru":"Ангарск","createdAt":"2023-02-22T10:32:34.756Z","updatedAt":"2023-04-19T10:31:34.389Z","publishedAt":"2023-02-22T10:32:37.372Z","oid":"161-Ar","x":null,"y":null,"size":null,"align":null},{"ru":"Барнаул","createdAt":"2022-08-30T15:58:31.987Z","updatedAt":"2023-04-19T10:31:34.426Z","publishedAt":"2022-08-30T15:58:31.986Z","oid":"L4WS3RCSPRYEBJKCEM1KSOHWIM","x":550,"y":580,"size":"small","align":null},{"ru":"Владивосток","createdAt":"2022-08-30T15:58:36.542Z","updatedAt":"2023-04-19T10:31:34.656Z","publishedAt":"2022-08-30T15:58:36.541Z","oid":"121-Ar","x":1115,"y":665,"size":null,"align":"left"},{"ru":"Волгоград","createdAt":"2022-08-30T15:58:26.191Z","updatedAt":"2023-04-19T10:31:34.522Z","publishedAt":"2022-08-30T15:58:26.190Z","oid":"201-Ar","x":150,"y":450,"size":"small","align":null},{"ru":"Воронеж","createdAt":"2022-08-30T15:58:17.170Z","updatedAt":"2023-04-19T10:31:34.482Z","publishedAt":"2022-08-30T15:58:17.168Z","oid":"4-Ar","x":136,"y":369,"size":null,"align":null},{"ru":"Екатеринбург","createdAt":"2022-08-30T15:58:20.533Z","updatedAt":"2023-04-19T10:31:34.580Z","publishedAt":"2022-08-30T15:58:20.532Z","oid":"7-Ar","x":360,"y":440,"size":null,"align":null},{"ru":"Иркутск","createdAt":"2022-08-30T15:58:18.265Z","updatedAt":"2023-04-19T10:31:34.636Z","publishedAt":"2022-08-30T15:58:18.264Z","oid":"142-Ar","x":762,"y":616,"size":null,"align":"left"},{"ru":"Кировград","createdAt":"2023-02-22T10:33:21.282Z","updatedAt":"2023-04-19T10:31:34.399Z","publishedAt":"2023-02-22T10:33:22.534Z","oid":"6600000900000","x":null,"y":null,"size":null,"align":null},{"ru":"Котовск","createdAt":"2023-02-22T10:33:42.367Z","updatedAt":"2023-04-19T10:31:34.408Z","publishedAt":"2023-02-22T10:33:43.965Z","oid":"6800000200000","x":null,"y":null,"size":null,"align":null},{"ru":"Краснодар","createdAt":"2022-08-30T15:58:25.048Z","updatedAt":"2023-04-19T10:31:34.512Z","publishedAt":"2022-08-30T15:58:25.046Z","oid":"241-Ar","x":55,"y":440,"size":"small","align":null},{"ru":"Красноярск","createdAt":"2022-08-30T15:58:21.695Z","updatedAt":"2023-04-19T10:31:34.626Z","publishedAt":"2022-08-30T15:58:21.694Z","oid":"184-Ar","x":653,"y":535,"size":null,"align":null},{"ru":"Моршанск","createdAt":"2023-02-08T08:43:39.211Z","updatedAt":"2023-04-19T10:31:34.338Z","publishedAt":"2023-02-08T08:43:40.349Z","oid":"6800000300000","x":null,"y":null,"size":null,"align":null},{"ru":"Москва","createdAt":"2022-08-30T15:58:13.750Z","updatedAt":"2023-04-19T10:31:34.449Z","publishedAt":"2022-08-30T15:58:13.748Z","oid":"MOSCOW","x":180,"y":310,"size":"big","align":"top"},{"ru":"Нижний Новгород","createdAt":"2022-08-30T15:58:29.775Z","updatedAt":"2023-04-19T10:31:34.472Z","publishedAt":"2022-08-30T15:58:29.774Z","oid":"DTNSZS20KCHEDFAFB0KUX3E2BM","x":235,"y":350,"size":null,"align":null},{"ru":"Нижний Тагил","createdAt":"2022-08-30T15:58:37.643Z","updatedAt":"2023-04-19T10:31:34.570Z","publishedAt":"2022-08-30T15:58:37.641Z","oid":"IV2DMTIDRPBEHFOV3I5OS5JXQU","x":345,"y":410,"size":"small","align":null},{"ru":"Нижняя Тура","createdAt":"2023-02-22T10:34:07.672Z","updatedAt":"2023-04-19T10:31:34.417Z","publishedAt":"2023-02-22T10:34:11.803Z","oid":"6600001400000","x":null,"y":null,"size":null,"align":null},{"ru":"Новосибирск","createdAt":"2022-08-30T15:58:23.958Z","updatedAt":"2023-04-19T10:31:34.616Z","publishedAt":"2022-08-30T15:58:23.957Z","oid":"12-Ar","x":535,"y":545,"size":null,"align":"top"},{"ru":"Пермь","createdAt":"2022-08-30T15:58:38.959Z","updatedAt":"2023-04-19T10:31:34.560Z","publishedAt":"2022-08-30T15:58:38.958Z","oid":"6-Ar","x":320,"y":390,"size":null,"align":null},{"ru":"Рассказово","createdAt":"2023-02-08T08:44:00.079Z","updatedAt":"2023-04-19T10:31:34.350Z","publishedAt":"2023-02-08T08:44:00.902Z","oid":"6800000700000","x":null,"y":null,"size":null,"align":null},{"ru":"Ростов-на-Дону","createdAt":"2023-04-11T09:14:19.940Z","updatedAt":"2023-04-19T10:31:34.492Z","publishedAt":"2023-04-11T09:14:21.950Z","oid":"162-Ar","x":72,"y":405,"size":null,"align":null},{"ru":"Самара","createdAt":"2022-08-30T15:58:34.259Z","updatedAt":"2023-04-19T10:31:34.550Z","publishedAt":"2022-08-30T15:58:34.257Z","oid":"2-Ar","x":280,"y":430,"size":null,"align":"left"},{"ru":"Санкт-Петербург","createdAt":"2022-08-30T15:58:14.864Z","updatedAt":"2023-04-19T10:31:34.437Z","publishedAt":"2022-08-30T15:58:14.863Z","oid":"0AMQVT3XT3UETHBNGCHGOALSUM","x":193,"y":215,"size":"big","align":"bottom"},{"ru":"Саратов","createdAt":"2022-08-30T15:58:19.428Z","updatedAt":"2023-04-19T10:31:34.502Z","publishedAt":"2022-08-30T15:58:19.427Z","oid":"244-Ar","x":190,"y":425,"size":"small","align":"left"},{"ru":"Серов","createdAt":"2023-02-08T08:44:21.767Z","updatedAt":"2023-04-19T10:31:34.360Z","publishedAt":"2023-02-08T08:44:22.977Z","oid":"163-Ar","x":null,"y":null,"size":null,"align":null},{"ru":"Сочи","createdAt":"2022-08-30T15:58:28.378Z","updatedAt":"2023-04-19T10:31:34.531Z","publishedAt":"2022-08-30T15:58:28.376Z","oid":"298-Ar","x":55,"y":490,"size":"small","align":null},{"ru":"Ставрополь","createdAt":"2022-08-30T15:58:39.987Z","updatedAt":"2023-04-19T10:31:34.541Z","publishedAt":"2022-08-30T15:58:39.986Z","oid":"242-Ar","x":115,"y":475,"size":"small","align":null},{"ru":"Тамбов","createdAt":"2022-08-30T15:58:33.093Z","updatedAt":"2023-04-19T10:31:34.462Z","publishedAt":"2022-08-30T15:58:33.092Z","oid":"HE4JQHDE2ATU1HIP0WQJC1431U","x":175,"y":335,"size":"small","align":"left"},{"ru":"Тюмень","createdAt":"2022-08-30T15:58:30.890Z","updatedAt":"2023-04-19T10:31:34.598Z","publishedAt":"2022-08-30T15:58:30.889Z","oid":"10-Ar","x":413,"y":461,"size":"small","align":null},{"ru":"Уварово","createdAt":"2023-02-08T08:44:42.082Z","updatedAt":"2023-04-19T10:31:34.370Z","publishedAt":"2023-02-08T08:44:42.983Z","oid":"6800000800000","x":null,"y":null,"size":null,"align":null},{"ru":"Уфа","createdAt":"2022-08-30T15:58:15.987Z","updatedAt":"2023-04-19T10:31:34.589Z","publishedAt":"2022-08-30T15:58:15.986Z","oid":"9-Ar","x":305,"y":450,"size":null,"align":null},{"ru":"Хабаровск","createdAt":"2022-08-30T15:58:22.799Z","updatedAt":"2023-04-19T10:31:34.646Z","publishedAt":"2022-08-30T15:58:22.798Z","oid":"182-Ar","x":1110,"y":565,"size":null,"align":"left"},{"ru":"Челябинск","createdAt":"2022-08-30T15:58:27.285Z","updatedAt":"2023-04-19T10:31:34.608Z","publishedAt":"2022-08-30T15:58:27.284Z","oid":"143-Ar","x":348,"y":475,"size":null,"align":null},{"ru":"Энгельс","createdAt":"2023-02-08T08:45:02.929Z","updatedAt":"2023-04-19T10:31:34.379Z","publishedAt":"2023-02-08T08:45:03.861Z","oid":"YSSFN3ULTPNUZKYVMLHQUPBD3Y","x":null,"y":null,"size":null,"align":null}]

    },

  computed: {
        mapCities(){
          if(!this.cities || this.cities === []) return null

          let result = _.cloneDeep(this.cities)
          result = result.map( city=>{
            let text = city.ru
            // TODO: это костыль, переделать через поле alias в админке
            if (city.oid === "MOSCOW") text = "Москва и МО"
            // TODO: переделать на сравнение по Oid (добавив его в constructions)
            const found = this.constructions.find(constr => city.ru === constr.city)
            return found? {...city, ...found, "text": text} : {...city, "text": text}
          })

          // сортировка как во vuex
          const msk = 'MOSCOW'
          const spb = '0AMQVT3XT3UETHBNGCHGOALSUM'

          result.sort((a,b)=>{
            if(a.oid === msk) return -1
            if(b.oid === msk) return 1
            if(a.oid === spb) return -1
            if(b.oid === spb) return 1
            return 0
          })

          return result
        },

        cityData() {
            const city = this.city
            return [
                { name: 'Digital Билборд 3х6', value: city.dpl },
                { name: 'Digital Суперсайт', value: city.dss },
                { name: 'Digital Ситиборд', value: city.dsb },
                { name: 'Digital Суперборд', value: city.dspb },
                { name: 'Билборд 3х6', value: city.pl },
                { name: 'Суперсайт', value: city.ss },
                { name: 'Ситиборд', value: city.sb },
                { name: 'Суперборд', value: city.spb },
            ].filter(x=> x.value)
        },
        citiesSvg() {
          if(!this.mapCities) return  null
          return this.mapCities.filter(c=> !!c.x && !!c.y)
        },
        svgItems(){
          if(!this.citiesSvg) return null

          let svgItem
          // noinspection UnnecessaryLocalVariableJS
          const result = this.citiesSvg.reduce(
            (accumulator, city) => {
              svgItem = this.createSvgCity(city)
              accumulator.city += svgItem.city
              accumulator.path += svgItem.path
              accumulator.mask += svgItem.mask
              return accumulator
            }
            ,{"city": "","path":"", "mask": ""})

          return result
        },

      bgImage() {
            return `${process.env.BASE_URL}images/russia.svg`
      },
    },

    watch: {
      city(val, old){
        if(val===null && old !== null) this.clearSelected()
      },
    },

    methods: {
        mapLink(city) {
            // return `/map?city=${city}`
            return `javascript:alert('Переход на страницу с информацией по городу ${city}');`
        },

        closePopup() {
            this.city = null
        },

        createSvgCity({x,y,text,oid,size,align}){

          const bcQuadratic = (x1,y1,x2,y2,w, right)=>{
            w= w ?? 0.5
            let x,y
            if(!right){
              x = (x1 + x2 + w*(y2-y1))/2
              y = (y1 + y2 - w*(x2-x1))/2
            }else{
              x = (x1 + x2 - w*(y2-y1))/2
              y = (y1 + y2 + w*(x2-x1))/2
            }
            return {"x": x, "y":y}
          }

          const popup={
            "left":{
              "x": 500,
              "y": 140,
            },
            "right":{
              "x": 800,
              "y": 140,
            },
          }

          const yPopup = popup.left.y
          let xPopup, cp, w = 1
          const xCenter = (popup.right.x + popup.left.x) / 2
          const isRight = x > xCenter
          xPopup = !isRight ? popup.left.x : popup.right.x
          w = (y - yPopup) / (600 - yPopup) + (1 - Math.abs(xCenter - x)/ xCenter) * 0.7
          if (w<0.3) w = 0.3
          if (w>2) w = 2
          cp = bcQuadratic(x,y,xPopup,yPopup, w, isRight)

          let fz="" // font-size style
          let r //радиус кружочка
          if(size === "big" || size === "small"){
            fz = "svg-map__text_" + size
            r = size === "big" ? 11 : 5
          }else {
            r = 7
          }

          let xText,yText, textAnchor=""
          if(!align){
            xText = x + r + 5
            yText = y + r - 1
          }else if(align === "left"){
            xText = x - r -5
            yText = y + r - 1
            textAnchor= 'text-anchor="end"'
          }else if(align === "top"){
            xText = x
            yText = y - r - 8
            textAnchor= 'text-anchor="middle"'
          }else if(align === "bottom"){
            xText = x
            yText = y + r + 18
            textAnchor= 'text-anchor="middle"'
          }

          let result = {}

          result.city = `
            <g data-oid="${oid}" class="city svg-map__node">
            <g class="svg-map__link svg-map--click">
            <circle class="svg-map__circle svg-map--click" cx="${x}" cy="${y}" r="${r}" fill="currentColor"/>
            <text class="svg-map__text ${fz} svg-map--click" x="${xText}" y="${yText}" fill="currentColor" ${textAnchor}>${text}</text>
            </g>
            <defs>
            <mask id="svg-map__mask_${oid}">
            <path class="svg-map__mask-path" d="M${x} ${y} Q${cp.x} ${cp.y} ${xPopup},${yPopup}" stroke="#fff" stroke-width="4" />
            </mask>
            </defs>
           </g>
          `

          result.path = `
            <path class="svg-map__path" d="M${x} ${y} Q${cp.x} ${cp.y} ${xPopup},${yPopup}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 6" mask="url(#svg-map__mask_${oid})" />
          `

          result.mask = `
          <circle class="svg-map__circle" cx="${x}" cy="${y}" r="${r}"/>
          <text class="svg-map__text ${fz}" x="${xText}" y="${yText}" ${textAnchor}>${text}</text>
          `

          return result
        },

        clickMap(e){
          const target = e.target
          if (!target.classList.contains("svg-map--click")) {
            //TODO закрытие окна, очистка путей
            this.city = null
            return
          }
          const node = target.closest(".svg-map__node")
          this.clearSelected()
          node.classList.add("svg-map__node_selected")

          //мягко прокручиваем карту к началу блока
          const topMap = document.getElementById('map')
          topMap.scrollIntoView({ behavior: 'smooth' })

          const oid = node.dataset.oid

          if(!this.city || this.city.oid !== oid){
            setTimeout(() => {
              this.city = this.mapCities.find(c => c.oid === oid)
            }, 450)
            this.popupTransition = true;
            setTimeout(() => {
              this.popupTransition = false;
            }, 1500)
          }

        },

        clearSelected() {
          document.querySelectorAll('#svg-map .svg-map__node_selected').forEach(n => n.classList.remove("svg-map__node_selected"))
        },

    },
}
</script>

<style lang="scss">

.svg-map{
  color:  white;

  &__link{
    pointer-events: bounding-box;
    cursor: pointer;

  }

  &__circle{
    transform-origin: 50% 50%;
    transform-box: fill-box;
    transition: all 200ms;
  }

  &__text{
    font-size: 16px;
    transition: all 200ms;

    &_big{
      font-size: 20px;
    }
    &_small{
      font-size: 14px;
    }
  }

  &__node {
    &_selected{
      .svg-map__mask-path{
        animation: svg-map--dash 2s forwards;
      }
    }

    &:not(&_selected){
      .svg-map__link:hover{
        .svg-map__circle{
          transform: scale(1.2);
          color: #f5c4ff;
        }
        .svg-map__text{
          color: #f5c4ff;
        }
      }
    }

  }

  &__path{opacity: 0.8}

  &__mask-path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
  }


  &__popup{
    &_on{
      animation: svg-map--popup 900ms;
    }
  }

}

@keyframes svg-map--dash {
  from{
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes svg-map--popup {
  0%{
    transform: scale(1) translateX(-50%);
  }
  50% {
    transform: scale(1.1) translateX(-45.5%);
  }
  100%{
    transform: scale(1) translateX(-50%);
  }
}

</style>
