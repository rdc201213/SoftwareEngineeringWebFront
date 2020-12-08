import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from './Pages/LoginPage.vue'
import HomePage from './Pages/HomePage.vue'
import HotelInformationPage from './Pages/HotelInformationPage.vue'
import UserInformationPage from './Pages/UserInformationPage.vue'

Vue.use(Router)

var router=new Router(
    {
        routes:[
            {
                path:'/',redirect:'/Home'
            },
            {
                path:'/Login',
                component:LoginPage,
            },
            {
                path:'/Home',
                component:HomePage,
            },
            {
                path:'/HotelInformation',
                component:HotelInformationPage,
            },
            {
                path:'/UesrInformation',
                component:UserInformationPage,
            }

        ]
    }
)

export default router