
## Parameters for docker-compose

    MONGODB_HOST    the host/ip of your mongodb database
    MONGODB_PORT    the port number of your mongodb database
    MONGODB_USER    the username of your mongodb database. If MONGODB_USER is empty while MONGODB_PASS is not, the image will use admin as the default username
    MONGODB_PASS    the password of your mongodb database
    MONGODB_DB      the database name to dump. If not specified, it will dump all the databases
    EXTRA_OPTS      the extra options to pass to mongodump command
    CRON_TIME       the interval of cron job to run mongodump. `0 0 * * *` by default, which is every day at 00:00
    MAX_BACKUPS     the number of backups to keep. When reaching the limit, the old backup will be discarded. No limit, by default
    INIT_BACKUP     if set, create a backup when the container launched

## Restore from a backup

See the list of backups, you can run:

    docker exec tutum-backup ls /backup

To restore database from a certain backup, simply run:

    docker exec tutum-backup /restore.sh /backup/2015.08.06.171901