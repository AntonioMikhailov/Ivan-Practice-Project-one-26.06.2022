"use strict";
//Сборка на require - без модулей import
//Внутри GULP используем WebPack

//Импортируем пакеты которые утсновили npm i
const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync"); //не нужен т.к. есть LiveServer

const dist = "./dist/"; // куда складываем готовый проект

//Начало задач

// копруем html из src in dist
gulp.task("copy-html", () => {
    return gulp.src("./src/index.html")
                .pipe(gulp.dest(dist));
               // .pipe(browsersync.stream()); // для перезагрузки страницы
});

// //Компиляция скриптов JS c WebPack
gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js") // точка входа
    .pipe(webpack({
        mode: 'development', // production
        output: {
            filename: 'script.js' // bundle
        },
        watch: false, //т.к. будет watcher gulp
        devtool: "source-map", //пути к скриптам
        module: {
            rules: [
              // {
              //   test: /\.m?js$/,
              //   exclude: /(node_modules|bower_components)/,
              //   use: {
              //     loader: 'babel-loader',
              //     options: {
              //       presets: [['@babel/preset-env', { // самый классический пресет babel
              //           debug: true, // увидим в консоли где ошибка
              //           corejs: 3, // подключит те полифилы которые именно нужны исход из browserlist >1 <1%
              //           useBuiltIns: "usage"
              //       }]]
              //     }
              //   }
              // }
            ]
          }
}))
    .pipe(gulp.dest(dist)); // копируем готовый файл JS в dist
    //.on("end", browsersync.reload); // перезагрузка
});


//Копируем все папки из assets  в dist/assets
gulp.task("copy-assets", () => {
    return gulp.src("./src/assets/**/*.*")
                .pipe(gulp.dest(dist + "/assets"));
               // .on("end", browsersync.reload); // нужен
});


//задача для Watch
gulp.task("watch", () => {
  //для browsersync - отключил  - не нужен
    // browsersync.init({
		// server: "./dist/",
		// port: 4000,
		// notify: true
    // });
    //за чем следить, в каком режиме parallel или series и что запускать после изменений
    gulp.watch("./src/index.html", gulp.parallel("copy-html"));
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

//TAsk который в самом начале запускает основные задачи
gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-js"));
// В самом конце - задача - переходим в режим Production + Babel подключаем. Убираем source-map, debug
gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist));
});

//Запускаем по умолчанию - просто gulp пишем в терминале
gulp.task("default", gulp.parallel( "watch", "build"));
//