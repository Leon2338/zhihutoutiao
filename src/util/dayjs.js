import dayjs from 'dayjs'

import vue from 'vue'

//加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

//设置配置为中文
dayjs.locale('zh-cn')

//配置全局过滤器
vue.filter('relativeTime',value=>{
    return dayjs().to(dayjs(value))
})