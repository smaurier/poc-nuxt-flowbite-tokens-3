import Flowbite from 'flowbite-vue';
import 'flowbite-vue/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Flowbite);
});
