import { createApp } from "vue";
import App from "./App.vue";
//import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faLock, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUser)
library.add(faLock)
library.add(faEdit)
library.add(faTrash)


createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount("#app");
