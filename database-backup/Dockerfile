
FROM mongo

RUN  apt-get update && \
     DEBIAN_FRONTEND=noninteractive apt-get install cron && \
     apt-get clean && \
     rm -rf /var/lib/apt/lists/* && \
     mkdir /backup

ENV CRON_TIME="0 0 * * *"

ADD run.sh /run.sh
RUN ["chmod", "+x", "/run.sh"]
CMD ["/run.sh"]
