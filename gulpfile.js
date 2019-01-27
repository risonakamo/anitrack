const gulp=require("gulp");

const plumber=require("gulp-plumber");

const less=require("gulp-less");

const babel=require("gulp-babel");

console.log("gulp is watching");

//remove any configs not being used
var defaultPlumber=(err)=>{
    console.log(err);
};

var lessConfig={
    watchTargets:["*.less","**/*.less"],
    targets:["options2/options2.less"],
    base:"."
};

var reactConfig={
    targets:["options2/js/showblock.jsx"],
    base:"."
};

//remove any watchers not being used:

//for less
gulp.watch(lessConfig.watchTargets).on("change",()=>{
    gulp.src(lessConfig.targets,{base:lessConfig.base}).pipe(less()).pipe(gulp.dest(lessConfig.base));
});

//for react
gulp.watch(reactConfig.targets).on("change",()=>{
    gulp.src(reactConfig.targets,{base:reactConfig.base})
        .pipe(plumber(defaultPlumber))
        .pipe(babel({presets:["@babel/preset-react"],comments:false}))
        .pipe(gulp.dest(reactConfig.base));
});