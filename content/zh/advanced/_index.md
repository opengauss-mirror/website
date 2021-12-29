+++
title = "知识进阶"
bgImg = "../img/breadcrumbs/certificate_bg.png"
moImg = "../img/breadcrumbs/certificate_mo.png"
search = "搜索"



typeBasices = "从零开始学习openGauss"
typeModules = "知识分类"

type_docs_label = "文档资料"
type_video_label = "视频学习"
type_practice_label = "实践操作"

[[ modules ]]
    name = "基础准备"
    [[ modules.item ]]
        name = "git使用"
        desc = "git使用描述"
        [[ modules.item.docs ]]
            name = "git命令使用基础"
            link = "https://opengauss.org/zh/blogs/blogs.html?post/xingchen/2020-05-30-start1/"
        [[ modules.item.videos ]]
            name = "视频2"
            link = ""
        [[ modules.item.practices ]]
            name = "实践1"
            link = ""
    [[ modules.item ]]
        name = "linux使用"
        desc = "linux使用描述"
        [[ modules.item.docs ]]
            name = "vmware安装linux虚拟机"
            link = "https://opengauss.org/zh/blogs/blogs.html?post/zhaoyanliang/opengauss%E5%AD%A6%E4%B9%A0%E4%B8%80-centos%E5%AE%89%E8%A3%85/"
        [[ modules.item.docs ]]
            name = "linux基础命令介绍"
            link = "https://www.runoob.com/linux/linux-command-manual.html"


[[ modules ]]
    name = "部署安装"
    [[ modules.item ]]
        name = "极简安装"
        desc = "什么是极简安装"
        [[ modules.item.docs ]]
            name = "极简安装数据库"
            link = "https://opengauss.org/zh/blogs/blogs.html?post/jiajunfeng/opengauss2-0-0%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85/"
        [[ modules.item.videos ]]
            name = "视频2"
            link = ""
        [[ modules.item.practices ]]
            name = "实践1"
            link = ""
    [[ modules.item ]]
        name = "OM安装数据库"
        desc = "什么是OM安装"
        [[  modules.item.docs ]] 
            name = "OM安装单机版openGauss数据库"
            link = "https://blog.opengauss.org/zh/post/zhangxb/%E5%AE%89%E8%A3%85%E5%8D%95%E6%9C%BA%E7%89%88opengauss%E6%95%B0%E6%8D%AE%E5%BA%93/"  
        [[ modules.item.videos ]]
            name = "安装视频"
            link = ""
        [[ modules.item.practices ]]
            name = "基于华为云ECS安装openGauss沙箱实验"
            link = ""   












[[ basics ]]
    name = "基础准备"
    [[ basics.item ]]
        name = "git命令使用基础"
        link = "https://opengauss.org/zh/blogs/blogs.html?post/xingchen/2020-05-30-start1/"
    [[ basics.item ]] 
        name = "vmware安装linux虚拟机"
        link = "https://opengauss.org/zh/blogs/blogs.html?post/zhaoyanliang/opengauss%E5%AD%A6%E4%B9%A0%E4%B8%80-centos%E5%AE%89%E8%A3%85/"
    [[ basics.item ]] 
        name = "linux基础命令介绍"
        link = "https://www.runoob.com/linux/linux-command-manual.html"
[[ basics ]]
    name = "部署安装"
    [[ basics.item ]]
        name = "极简安装数据库"
        link = "https://opengauss.org/zh/blogs/blogs.html?post/jiajunfeng/opengauss2-0-0%E6%9E%81%E7%AE%80%E7%89%88%E5%AE%89%E8%A3%85/"
    [[ basics.item ]] 
        name = "安装单机版openGauss数据库"
        link = "https://blog.opengauss.org/zh/post/zhangxb/%E5%AE%89%E8%A3%85%E5%8D%95%E6%9C%BA%E7%89%88opengauss%E6%95%B0%E6%8D%AE%E5%BA%93/"   
    [[ basics.item ]]
        name = "openGauss升级入门学习"
        link = "https://blog.opengauss.org/zh/post/zhengxue/upgrade_primer/"
    [[ basics.item ]] 
        name = "openGauss数据库扩容指导"
        link = "https://blog.opengauss.org/zh/post/xuemengen/gs_expansion/"
[[ basics ]]
    name = "连接使用"
    [[ basics.item ]]
        name = "openGauss常用gsql命令锦集"
        link = "https://opengauss.org/zh/blogs/blogs.html?post/zhangxb/opengauss%E5%B8%B8%E7%94%A8gsql%E5%91%BD%E4%BB%A4%E9%9B%86%E5%90%88/"
    [[ basics.item ]] 
        name = "JDBC使用及源码编译"
        link = "https://blog.opengauss.org/zh/post/douxin/jdbc_usage_compile/"
    [[ basics.item ]] 
        name = "DataStudio工具连接openGauss"
        link = "https://blog.opengauss.org/zh/post/mingruifu/opengauss%E5%AE%89%E8%A3%85%E5%B9%B6%E4%BD%BF%E7%94%A8datastudio%E5%B7%A5%E5%85%B7%E8%BF%9E%E6%8E%A5%E4%BD%BF%E7%94%A8/"
[[ basics ]]
    name = "编译开发"
    [[ basics.item ]]
        name = "使用openGauss源码编译数据库"
        link = "https://opengauss.org/zh/blogs/blogs.html?post/xingchen/opengauss_compile/"
    [[ basics.item ]] 
        name = "openGauss编译安装常见错误及解决"
        link = "https://blog.opengauss.org/zh/post/cchen676/opengauss_%E7%BC%96%E8%AF%91%E5%AE%89%E8%A3%85%E5%B8%B8%E8%A7%81%E9%94%99%E8%AF%AF/"
    [[ basics.item ]] 
        name = "如何使用gdb工具调试数据库"
        link = "https://opengauss.org/zh/blogs/blogs.html?post/zhangxb/gdb_opengauss/"
[[ basics ]]
    name = "内核进阶"
    [[ basics.item ]]
        name = "BenchmarkSQL高性能测试"
        link = "https://blog.opengauss.org/zh/post/justbk/2021-12-17_how_to_test_perfermance_for_opengauss/"
    [[ basics.item ]] 
        name = "openGauss系统函数添加指导"
        link = "https://blog.opengauss.org/zh/post/huzhengchao/2021-12-09-howtoaddanewfunc/"



+++