FROM mongo

COPY init.json /init.json
CMD mongoimport --host root:rootPass@mongo:27017 --db ur_critical --collection users --type json --file /init.json --jsonArray