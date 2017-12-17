var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var gulpSequece = require('gulp-sequence');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var changed = require('gulp-changed');
var autoprefixer = require('autoprefixer');
var cleanCSS = require('gulp-clean-css');
var babel = require("gulp-babel");
var htmlmin = require('gulp-htmlmin');
var del = require('del');
var imageMin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cache = require('gulp-cache');

//删除dist下的所有文件
gulp.task('delete', function (cb) {
    return del(['dist/css/*','dist/js/*','dist/*.html','!dist/images'],cb);
});

//es6转换为es5
gulp.task("es6to5", function () {
    return gulp.src("js/*.js")
        .pipe(babel({presets: ['env']}))
        .pipe(gulp.dest("dist/js6"));
});
//只压缩js代码
gulp.task('uglify', function () {
    setTimeout(function () {
        gulp.src('dist/js6/*.js')
            .pipe(uglify())
            .pipe(gulp.dest('dist/js'))
    }, 200)
});

gulp.task('css', function () {  
    gulp.src(['css/*.css'])  
        .pipe(changed('dist/css', {hasChanged: changed.compareSha1Digest}))  
        .pipe(postcss([  
            autoprefixer({  
                browsers: ['last 4 version','Android >= 4.0'],//添加浏览器最近的四个版本需要的前缀，兼容安卓4.0以上版本  
                cascade: false,//是否美化属性,默认true  
                remove: true//移除不必要的前缀  
            })]))  
        .pipe(concat('main.css'))  
        .pipe(cleanCSS())  
        .pipe(gulp.dest('dist/css'))  
        .pipe(browserSync.reload({stream:true}));  
});

//连接所有js文件并压缩
gulp.task('scripts',function(){
	return gulp.src('dist/js6/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(rename('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

//压缩html
gulp.task('htmlmin', function () {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值<input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值<input id="" />==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面js
        minifyCSS: true//压缩页面css
    };
    gulp.src('index.html')
        .pipe(changed('dist', {hasChanged: changed.compareSha1Digest}))
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist'))
});

//压缩图片
gulp.task('imagemin', function () {
    gulp.src('img/*.{png, jpg, gif, ico}')
        .pipe(cache(imageMin({
            //optimizationLevel: 5,//类型：Number 默认：3 取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认： false 无损压缩jpg图片
            //interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行算然
            //multipass: true, //类型： Boolean 默认： false 多次优化svg直到完全优化
            svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
            use: [pngquant()]//使用pngquant深度压缩png图片的imagemin插件
        })))
        .pipe(gulp.dest('dist/images'));
});

//Watch Files For Changes
gulp.task('watch', function(){
	gulp.watch('js/*.js', ['scripts']);//gulp.watch('js/*.js', ['lint', 'scripts']);
	gulp.watch('css/*.css',['css']);
	gulp.watch('index.html',['htmlmin']);
	//gulp.watch('scss/*.scss',['sass']);
});

gulp.task('serve', function(){
	browserSync.init({
		server: {
		    baseDir: './'
        }
	});
	gulp.watch(['index.html','css/*.css'],{cwd: './'}, reload);
});

//Default Task
gulp.task('default', ['delete', 'es6to5', 'uglify', 'css', 'htmlmin', 'imagemin', 'watch', 'serve']);
