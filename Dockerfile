FROM gplane/pnpm as Builder

RUN mkdir -p /home/opengauss/web
WORKDIR /home/opengauss/web
COPY . /home/opengauss/web

RUN git clone -b v2 https://gitee.com/opengauss/blog.git /home/opengauss/blog && \
    cp -r /home/opengauss/blog/app/zh/blogs/* /home/opengauss/web/app/zh/blogs && \
    cp -r /home/opengauss/blog/app/en/blogs/* /home/opengauss/web/app/en/blogs && \
    rm -rf /home/opengauss/blog

RUN pnpm install
RUN pnpm build

FROM swr.cn-north-4.myhuaweicloud.com/opensourceway/openeuler/nginx:1.22.0-22.03-lts

COPY --from=Builder /home/opengauss/web/app/.vitepress/dist /usr/share/nginx/html/
COPY ./sitemap/sitemap-en.xml ./sitemap/sitemap-zh.xml /usr/share/nginx/html/

RUN chmod -R 755 /usr/share/nginx/html
COPY ./deploy/nginx/nginx.conf /etc/nginx/nginx.conf

RUN touch /var/run/nginx.pid \
    && chown -R nginx:nginx /var/log/nginx \
    && chown -R nginx:nginx /var/run/nginx.pid \
    && chown -R nginx:nginx /etc/nginx

EXPOSE 8080

USER nginx

ENTRYPOINT ["nginx", "-g", "daemon off;"]

