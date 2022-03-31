FROM swr.cn-north-4.myhuaweicloud.com/opensourceway/openeuler/nginx:1.16.1-20.03-lts-sp2

RUN yum update && \
    yum install -y curl git tar


ENV HUGO_VERSION=0.56.3

RUN cd /usr/local/src && \
    curl -L https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz | tar -xz && \
    mv hugo /usr/local/bin/

RUN mkdir -p /src/
COPY . /src/website

RUN cd /src/ && \
    git clone -b stable https://gitee.com/opengauss/blog blogs && \
    mkdir -p /src/website/content/zh/blogs/post && \
    cp -rf /src/blogs/content/zh/post/* /src/website/content/zh/blogs/post && \

    git clone https://gitee.com/opengauss/docs latest/docs && \
    mkdir -p /src/website/content/zh/docs/latest && \
    cp -rf /src/latest/docs/content/zh/* /src/website/content/zh/docs/latest && \
    mkdir -p /src/website/content/en/docs/latest && \
    cp -rf /src/latest/docs/content/en/* /src/website/content/en/docs/latest && \

    mkdir -p /src/website/content/zh/docs/latest-lite/ && \
    cp -rf /src/latest/docs/content/docs-lite/zh/* /src/website/content/zh/docs/latest-lite/ && \
    mkdir -p /src/website/content/en/docs/latest-lite/ && \
    cp -rf /src/latest/docs/content/docs-lite/en/* /src/website/content/en/docs/latest-lite/ && \

    git clone -b 1.0.0 https://gitee.com/opengauss/docs 1.0.0/docs && \
    mkdir -p /src/website/content/zh/docs/1.0.0 && \
    cp -rf /src/1.0.0/docs/content/zh/* /src/website/content/zh/docs/1.0.0 && \
    mkdir -p /src/website/content/en/docs/1.0.0 && \
    cp -rf /src/1.0.0/docs/content/en/* /src/website/content/en/docs/1.0.0 && \
    git clone -b 1.0.1 https://gitee.com/opengauss/docs 1.0.1/docs && \
    mkdir -p /src/website/content/zh/docs/1.0.1 && \
    cp -rf /src/1.0.1/docs/content/zh/* /src/website/content/zh/docs/1.0.1 && \
    mkdir -p /src/website/content/en/docs/1.0.1 && \
    cp -rf /src/1.0.1/docs/content/en/* /src/website/content/en/docs/1.0.1 && \
    git clone -b 1.1.0 https://gitee.com/opengauss/docs 1.1.0/docs && \
    mkdir -p /src/website/content/zh/docs/1.1.0 && \
    cp -rf /src/1.1.0/docs/content/zh/* /src/website/content/zh/docs/1.1.0 && \
    mkdir -p /src/website/content/en/docs/1.1.0 && \
    cp -rf /src/1.1.0/docs/content/en/* /src/website/content/en/docs/1.1.0 && \
    git clone -b 2.0.0 https://gitee.com/opengauss/docs 2.0.0/docs && \
    mkdir -p /src/website/content/zh/docs/2.0.0 && \
    cp -rf /src/2.0.0/docs/content/zh/* /src/website/content/zh/docs/2.0.0 && \
    mkdir -p /src/website/content/en/docs/2.0.0 && \
    cp -rf /src/2.0.0/docs/content/en/* /src/website/content/en/docs/2.0.0 && \
    git clone -b 2.0.1 https://gitee.com/opengauss/docs 2.0.1/docs && \
    mkdir -p /src/website/content/zh/docs/2.0.1 && \
    cp -rf /src/2.0.1/docs/content/zh/* /src/website/content/zh/docs/2.0.1 && \
    mkdir -p /src/website/content/en/docs/2.0.1 && \
    cp -rf /src/2.0.1/docs/content/en/* /src/website/content/en/docs/2.0.1 && \
    git clone -b 2.1.0 https://gitee.com/opengauss/docs 2.1.0/docs && \
    mkdir -p /src/website/content/zh/docs/2.1.0 && \
    cp -rf /src/2.1.0/docs/content/zh/* /src/website/content/zh/docs/2.1.0 && \
    mkdir -p /src/website/content/en/docs/2.1.0 && \
    cp -rf /src/2.1.0/docs/content/en/* /src/website/content/en/docs/2.1.0 && \
    cd /src/website && /usr/local/bin/hugo -b / && /usr/local/bin/hugo --gc --minify && \
    cp -rf /src/website/public/* /usr/share/nginx/html/ && \
    chmod -R 755 /usr/share/nginx/html && \
    rm -rf /src/*

ENV RUN_USER nginx
ENV RUN_GROUP nginx
EXPOSE 80
ENTRYPOINT nginx -g "daemon off;"
