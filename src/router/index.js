import Vue from "vue"
import VueRouter from "vue-router"
//引入登陆页面吗
import login from "@/view/login"
import layout from "@/view/layout"
import home from "@/view/home"
import my from "@/view/my"
import qa from "@/view/qa"
import video from "@/view/video"
import search from "@/view/search"
import article from "@/view/article"
import profile from "@/view/profile"
Vue.use(VueRouter)

const routes =[
    //配置登陆路由
    {
        path:'/login',
        name:"logn",
        component:login
    },
    //主页路由
    {
        path:'/',
        name:"layout",
        component:layout,
        children:[
            {
                path:'',
                name:"home",
                component:home,
            },
            {
                path:'/my',
                name:"my",
                component:my,
            },
            {
                path:'/qa',
                name:"qa",
                component:qa,
            },
            {
                path:'/video',
                name:"video",
                component:video,
            },
            
        ]
    },
    // 搜索路由
    {
        path:'/search',
        name:"search",
        component:search,
    },
    //文章详情路由
    {
        path:'/article/:articleId',
        name:"article",
        component:article,
        //实现路由传参
        props:true
    },
    {
        path:'/profile',
        name:'profile',
        component:profile,
    }

]
const router = new VueRouter({
    routes
})

export default router