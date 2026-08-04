import { reactive } from 'vue'
import { data as blogsZh } from '~@/data/blogs/blogs-zh.data'
import { data as blogsEn } from '~@/data/blogs/blogs-en.data'
export default reactive({ zh: blogsZh, en: blogsEn })
