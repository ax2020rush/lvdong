import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/js/rem'
import 'vant/lib/index.css'
import './assets/css/rest.scss'
import 'animate.css'
import vue3videoPlay from 'vue3-video-play'
import 'vue3-video-play/dist/style.css'
import './assets/img/ico/iconfont.css'
import 'videojs-contrib-hls'
import {
  Col,
  Row,
  Icon,
  ShareSheet,
  NoticeBar,
  Loading,
  Tabbar,
  TabbarItem,
  NavBar,
  PullRefresh,
  Tab,
  Tabs,
  List,
  Image as VanImage,
  Empty,
  Checkbox,
  Cell,
  Popover,
  Badge,
  Toast,
  DropdownMenu,
  DropdownItem,
  Field,
  Popup,
  CellGroup,
  Button,
  CheckboxGroup,
  PasswordInput,
  NumberKeyboard,
  Dialog
} from 'vant'

createApp(App)
  .use(Loading)
  .use(Badge)
  .use(Field)
  .use(ShareSheet)
  .use(PasswordInput)
  .use(NumberKeyboard)
  .use(Toast)
  .use(Popover)
  .use(Dialog)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Popup)
  .use(vue3videoPlay)
  .use(Button)
  .use(CellGroup)
  .use(Cell)
  .use(Empty)
  .use(CheckboxGroup)
  .use(Checkbox)
  .use(VanImage)
  .use(List)
  .use(Tab)
  .use(Tabs)
  .use(NoticeBar)
  .use(PullRefresh)
  .use(NavBar)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Icon)
  .use(Col)
  .use(Row)
  .use(store)
  .use(router)
  .mount('#app')
