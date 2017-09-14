var $ = require('jquery');

module.exports = {
    //设置接口主机
    getHost: function () {
        var host = window.location.host;
        var hostUrl = "";

        if (host.indexOf("localhost") > -1 || host.indexOf("10.1") > -1) {
            hostUrl = window.location.protocol + "//photobazaar-testing-dev.camera360.com";
        }
        return hostUrl;
    },

    //格式化时间
    formatTime: function (timestamp, separator) {
        var newStamp;
        var sep = separator || '/';
        if (timestamp.length < 13) {
            newStamp = parseInt(timestamp * 1000, 10);
        } else {
            newStamp = parseInt(timestamp, 10);
        }
        var time = new Date(newStamp);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();

        return (y.length <2 ? '0'+y : y ) + sep + 
                (m.length <2 ? '0'+m : m ) + sep + 
                (d.length <2 ? '0'+d : d ) + ' ' + 
                (h.length <2 ? '0'+h : h ) + ':' + 
                (mm.length <2 ? '0'+mm : mm );
    },

    //调用接口
    getJSON: function (url, data, callback) {
        let _this = this;
        // alert(_this.getHost + url)
        $.ajax({
            url: _this.getHost() + url,
            type: 'GET',
            data: data,
            dataType: 'jsonp',
            jsonp: 'jsonpCallback',
            success: function(res){
                if(callback) callback(res);
            }
        });
    }
}