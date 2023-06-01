# Помогатор
*Веб-сайт для всяких веб-полезностей*

## Установка

1. `git clone git@github.com:fix-ik/pomogator.git`
2. `cd pomogator`
3. `npm install`
4. `git submodule update --init --remote`
5. `npm run build`

Убедитесь, что установлены следующие переменные окружения:

* `GITHUB_TOKEN`: [API key Github](https://www.github.com)
* `MAPBOX_TOKEN`: [API key Mapbox](https://www.mapbox.com)

Сгенерированные файлы записываются в директорию `www`.

## Разработка

В режиме разработки файлы автоматически компилируются, а браузер самостоятельно обновляется. Для запуска просто выполните `npm start`.
