module.exports = {
    formatTime: function (timestamp, separator) {
        var newStamp;
        var sep = separator || '/';
        if(timestamp.length < 13){
            newStamp = parseInt(timestamp * 1000);
        }else{
            newStamp = parseInt(timestamp);
        }
        var time = new Date(newStamp);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();

        return y + sep + m + sep + d + ' ' + h + ':' + mm;
    }
}