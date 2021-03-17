/**
 * @param {string} value 时间
 * @returns {Date} 创建日期
*/
var parseDate = function (value) {
    if (typeof value === 'string' || value instanceof String) {
        //解决safari浏览器下的日期格式兼容性问题
        return new Date(value.replace(/-/g, "/"));
    } else {
        return new Date(value);
    }
}
/**
 * @param {number} time 需要被格式化的时间戳
 * @param {string} format 需要输出的时间格式 默认为 yyyy-MM-dd hh:mm:ss 年-月-日 时:分:秒
 * @returns {string} 格式化后的时间
*/
var formatTime = function (time, format = "yyyy-MM-dd hh:mm:ss") {
    // 解决ios出现NaN问题
    var realDate = parseDate(time);
    var regYear = getRegExp("(y+)", "i");
    var date = [
        ["M+", realDate.getMonth() + 1],
        ["d+", realDate.getDate()],
        ["h+", realDate.getHours()],
        ["m+", realDate.getMinutes()],
        ["s+", realDate.getSeconds()],
        ["q+", Math.floor((realDate.getMonth() + 3) / 3)],
        ["S+", realDate.getMilliseconds()],
    ];
    var reg1 = regYear.exec(format);
    if (reg1) {
        format = format.replace(reg1[1], (realDate.getFullYear() + '').substring(4 - reg1[1].length));
    }
    for (var i = 0; i < date.length; i++) {
        var reg2 = getRegExp("(" + date[i][0] + ")").exec(format);
        if (reg2) {
            format = format.replace(reg2[1], reg2[1].length == 1 ? v : ("00" + date[i][1]).substring(("" + date[i][1]).length));
        }
    }
    return format;
}
module.exports = {
    parseDate,
    formatTime
}