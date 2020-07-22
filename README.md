# ur-critical

## About FrontEnd
This project uses [Vue.js](https://vuejs.org/). An open source progressive framework for building user interfaces.

## About BackEnd
This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## About Deployment
This project uses docker to auto deployment

- Remove Images and Volumes
```
$ docker system prune -a
```

- Deploy containers
```
$ docker-compose up --build --force-recreate --renew-anon-volumes
```

- Stop containers
```
$ docker-compose down
```

## Changelog

__0.1.0__

- Initial release

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
