var GlobalData = Object.create(null);

// GlobalData.addData = function(key, value){
// 	var obj = GlobalData[key];
// 	if(!obj)
// 	{
// 		obj = Object.create(null);
// 		GlobalData[key] = obj;
// 		obj.count = 0;
// 	}
// 	obj.count += 1;

// 	if(value)
// 	{

// 	}
// }

GlobalData.removeData = function(key){
	var obj = GlobalData[key];
	if(!obj)
	{
		return;
	}

	obj.count -= 1;
	if(obj.count <= 0)
	{
		GlobalData[key] = null;
	}
}

var _globalData = undefined;
module.exports = (function(){
	if(_globalData === undefined)
	{
		_globalData = GlobalData;
	}
	return _globalData;
})();