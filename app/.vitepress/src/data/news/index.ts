import { reactive } from 'vue'
import { data as newsZh } from '~@/data/news/news-zh.data'
import { data as newsEn } from '~@/data/news/news-en.data'
export default reactive({ zh: newsZh, en: newsEn })
