import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
const TOKEN_KEY = 'LTTYYDS' 
import {setItem,getItem} from "../util/storage"
export default new Vuex.Store({
    state:{
        user:getItem(TOKEN_KEY)
    },

    mutations:{
        //获取得到的token并把他放入vuex
        setUser(state,data){
            state.user = data
            //保存到本地
            setItem(TOKEN_KEY,state.user)
        },
        
    },
})