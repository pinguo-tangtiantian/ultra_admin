import Reflux from 'reflux';


//创建actions
var Actions = Reflux.createActions([
    "getList",
    "handleList",
    "initPage",
    "lastPage",
    "nextPage",
    "modifyConf"
]);

export default Actions;