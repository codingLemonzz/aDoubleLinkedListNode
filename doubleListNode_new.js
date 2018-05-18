/*
 * LRU算法实现
 * 注：传入的obj对象必须有唯一标识的id属性
 */

var doubleLinkedListNode = {
	arr: [],
	map: {},
	length: 0,
	firstIndex: undefined,
	lastIndex: undefined,

	init: function(arrLength) {
		if(util.checkNumber(arrLength)) {
			doubleLinkedListNode.length = arrLength;
		} else {
			return "The args is not a number !";
		}
	},

	put: function(obj) {
		if(doubleLinkedListNode.arr.length == 0){
			//若为第一个被添加的元素
			doubleLinkedListNode.arr.push(obj);
			doubleLinkedListNode.firstIndex=0;
			doubleLinkedListNode.lastIndex=0;
			doubleLinkedListNode.map[obj["id"]]={
				prev: undefined,
				index: 0,
				next: undefined
			};
		}else{
			if(doubleLinkedListNode.arr.length < doubleLinkedListNode.length){
				//若arr内的元素未满
				doubleLinkedListNode.arr.push(obj);
				var lastFirstIndex=doubleLinkedListNode.firstIndex;
				doubleLinkedListNode.firstIndex=doubleLinkedListNode.arr.length-1;
				var prevObj =doubleLinkedListNode.arr[lastFirstIndex];
				doubleLinkedListNode.map[prevObj["id"]].prev=doubleLinkedListNode.arr.length-1;
				doubleLinkedListNode.map[obj["id"]]={
					prev: undefined,
					index: doubleLinkedListNode.arr.length-1,
					next: lastFirstIndex
				};
			}else{
				//若arr已满，则将排序为最后一号的元素取出，将新加入的元素放入
				var lastLastIndex=doubleLinkedListNode.lastIndex;
				var lastObj=doubleLinkedListNode.arr[lastLastIndex];
				//将最后一号元素的前一号元素的next值设为undefined
				doubleLinkedListNode.map[doubleLinkedListNode.arr[doubleLinkedListNode.map[lastObj["id"]].prev]["id"]].next=undefined;
				//将lastIndex值设为最后一号元素的前一号元素的index
				doubleLinkedListNode.lastIndex=doubleLinkedListNode.map[lastObj["id"]].prev;
				//删除最后一号元素
				delete doubleLinkedListNode.map[lastObj["id"]];
				//将当前元素放入最后一号元素所在的位置
				doubleLinkedListNode.arr[lastLastIndex]=obj;
				var lastFirstIndex=doubleLinkedListNode.firstIndex;
				//将当前元素放在首位，改变之前首位的prev值
				doubleLinkedListNode.firstIndex=lastLastIndex;
				var prevObj =doubleLinkedListNode.arr[lastFirstIndex];
				doubleLinkedListNode.map[prevObj["id"]].prev=lastLastIndex;
				doubleLinkedListNode.map[obj["id"]]={
					prev: undefined,
					index: lastLastIndex,
					next: lastFirstIndex
				};
			}
		}
	},
	
	get: function(id) {
		if(doubleLinkedListNode.map[id] !=undefined){
			var index=doubleLinkedListNode.map[id].index;
			var prevFirstIndex=doubleLinkedListNode.firstIndex;
			//将firstIndex改为当前的index
			doubleLinkedListNode.firstIndex=index;
			var prevObj=doubleLinkedListNode.arr[prevFirstIndex];
			//将当前元素抽出，将当前元素的前一个元素和后一个元素的prev和index修改
			var mapObj=doubleLinkedListNode.map[id];
			if(mapObj.prev !=undefined){
				doubleLinkedListNode.map[doubleLinkedListNode.arr[mapObj.prev]["id"]].next=mapObj.next;
			}
			if(mapObj.next != undefined){
				doubleLinkedListNode.map[doubleLinkedListNode.arr[mapObj.next]["id"]].prev=mapObj.prev;
			}else{
				doubleLinkedListNode.lastIndex=mapObj.prev;
			}
			//将之前的firstIndex所在的元素的prev改为当前获得到的元素的index
			doubleLinkedListNode.map[prevObj["id"]].prev=index;
			
			//将当前元素放入第一位
			doubleLinkedListNode.map[id].prev=undefined;
			doubleLinkedListNode.map[id].next=prevFirstIndex;
			return doubleLinkedListNode.arr[index];
		}
		
		return "no such object!";
	}

}