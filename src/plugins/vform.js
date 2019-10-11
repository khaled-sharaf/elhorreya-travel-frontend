import Vue from 'vue'
import { Form, HasError, AlertError, AlertErrors, AlertSuccess } from "vform"
window.Form = Form
// vue form
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.component(AlertErrors.name, AlertErrors)
Vue.component(AlertSuccess.name, AlertSuccess)
