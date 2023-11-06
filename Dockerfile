FROM node:18.14.1 as Builder

RUN mkdir -p /home/opengauss/web
WORKDIR /home/opengauss/web
COPY . /home/opengauss/web

RUN git clone -b v2 https://gitee.com/opengauss/blog.git /home/opengauss/blog && \
    cp -r /home/opengauss/blog/app/zh/blogs/* /home/opengauss/web/app/zh/blogs && \
    cp -r /home/opengauss/blog/app/en/blogs/* /home/opengauss/web/app/en/blogs && \
    rm -rf /home/opengauss/blog

RUN npm install pnpm -g
RUN pnpm install
RUN pnpm build

FROM swr.cn-north-4.myhuaweicloud.com/opensourceway/openeuler/nginx:1.24.0-22.03-lts-sp1 as NginxBuilder

FROM openeuler/openeuler:22.03-lts-sp1

ENV PATH /usr/share/nginx/sbin:$PATH
ENV NGINX_CONFIG_FILE /etc/nginx/nginx.conf
ENV NGINX_PID /var/run/nginx.pid
ENV NGINX_USER nginx
ENV NGINX_GROUP nginx
ENV NGINX_BIN /usr/share/nginx/sbin
ENV NGINX_HOME /usr/share/nginx
COPY --from=NginxBuilder /usr/share/nginx /usr/share/nginx
COPY --from=NginxBuilder /usr/share/nginx/sbin/nginx /usr/share/nginx/sbin/nginx
COPY --from=NginxBuilder /etc/nginx/modules /etc/nginx/modules
COPY --from=NginxBuilder /etc/nginx/geoip  /etc/nginx/geoip
COPY --from=NginxBuilder /etc/nginx/mime.types  /etc/nginx/mime.types
COPY --from=Builder /home/opengauss/web/app/.vitepress/dist /usr/share/nginx/html/
RUN chmod -R 700 /usr/share/nginx/html
COPY ./deploy/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --chown=$NGINX_USER:$NGINX_GROUP ./server.crt ./server.key ./password.txt ./dhparam.pem /etc/nginx/cert/


RUN touch /var/run/nginx.pid \
    && groupadd -g 1000 nginx \
    && useradd -u 1000 -g nginx -s /sbin/nologin nginx \
    && chown -R nginx:nginx /usr/share/nginx \
    && chmod -R 550 /usr/share/nginx/ \
    && mkdir -p /var/log/nginx \
    && chown -R nginx:nginx /var/log/nginx \
    && chmod -R 640 /var/log/nginx \
    && mkdir -p /var/lib/nginx/tmp/client_body \
    && chown -R nginx:nginx /var/lib/nginx/tmp/client_body \
    && mkdir -p /var/lib/nginx/tmp/fastcgi \
    && chown -R nginx:nginx /var/lib/nginx/tmp/fastcgi \
    && mkdir -p /var/lib/nginx/tmp/proxy \
    && chown -R nginx:nginx /var/lib/nginx/tmp/proxy \
    && mkdir -p /var/lib/nginx/tmp/scgi \
    && chown -R nginx:nginx /var/lib/nginx/tmp/scgi \
    && mkdir -p /var/lib/nginx/tmp/uwsgi \
    && chown -R nginx:nginx /var/lib/nginx/tmp/uwsgi \
    && chmod -R 500 /var/lib/nginx/ \
    && chown -R nginx:nginx /var/lib/nginx/ \
    && chown -R nginx:nginx /var/run/nginx.pid \
    && chmod 640 /var/run/nginx.pid \
    && chown -R nginx:nginx /etc/nginx \
    && chmod 550 /etc/nginx \
    && chmod 700 /etc/nginx/cert/ \
    && chmod 400 /etc/nginx/cert/server.crt \
    && chmod 400 /etc/nginx/cert/server.key \
    && chmod 600 /etc/nginx/cert/password.txt \
    && chmod 400 /etc/nginx/cert/dhparam.pem \
    && chmod 550 /etc/nginx/geoip/ \
    && chmod 440 /etc/nginx/geoip/* \
    && chmod 550 /etc/nginx/modules \
    && chmod 440 /etc/nginx/modules/* \
    && chmod 400 /etc/nginx/nginx.conf \
    && chmod 440 /etc/nginx/mime.types \
    && rm -rf /usr/share/nginx/html/50x.html \
    && echo "umask 0027" >> /etc/bashrc \
    && echo "set +o history" >> /etc/bashrc \
    && sed -i "s|HISTSIZE=1000|HISTSIZE=0|" /etc/profile \
    && sed -i "s|PASS_MAX_DAYS[ \t]*99999|PASS_MAX_DAYS 30|" /etc/login.defs

EXPOSE 8080

USER nginx

ENTRYPOINT ["nginx", "-g", "daemon off;"]
