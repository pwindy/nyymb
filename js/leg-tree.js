((global) => {
	//添加的dom方法   $().xxx 或 leg().xxx
	$.fn.extend({
		uuid() {
			var s = [];
			var hexDigits = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
			for (var i = 0; i < 8; i++) {
				s[i] = hexDigits.substr(Math.floor(Math.random() * 0x30), 1);
			}
			var uuid = s.join("");
			return uuid;
		},
		tree(data, arrs) {
			var tree = this;

			$(tree).on("click", ".isShow", function () {
				let that = this;
				isShow(that);
			})

			function isShow(that) {
				//:visible 判断当前元素是否可见。
				// console.log($(that).parent().find("ul").is(":visible"));
				if ($(that).parent('li').children("ul").is(":visible")) {
					$(that).parent().children("ul").hide();
					$(that).attr("style", 'transform:rotate(-90deg)');
					$(that).next().attr('data-show', 'false');
				} else {
					if ($(that).parent().children("ul").length == 1) {
						$(that).attr("style", 'transform:rotate(0deg)');
						$(that).next().attr('data-show', 'true');
						$(that).parent().children("ul").show();
						if ($(that).parent().children("ul").children('li').children('ul').length == 0) {
							$(that).parent().children("ul").children('li').children('img').attr("style", 'opacity: 0');
						}
					}
				}
			}

			//判断父级选中状态
			function checkParent(param) {
				// 一代父级
				var lisibling1 = $(param).parent().parent().children('li').children('input');
				var arr1 = []
				$.each(lisibling1, function (index, item) {
					arr1.push(item.checked);
				});
				if (isAllEqual(arr1) && arr1[0]) {
					$(param).parent().parent().prev().prev().prev().prev().prop("checked", 'true');
				} else {
					$(param).parent().parent().prev().prev().prev().prev().removeAttr("checked");
					$(param).parent().parent().parent().parent().prev().prev().prev().prev().removeAttr("checked");
					$(param).parent().parent().parent().parent().parent().parent().prev().prev().prev().prev().removeAttr("checked");
				}

				// 二代父级
				var lisibling2 = $(param).parent().parent().parent().parent().children('li').children('input');
				var arr2 = [];
				$.each(lisibling2, function (index, item) {
					arr2.push(item.checked);
				});
				if (isAllEqual(arr2) && arr2[0]) {
					$(param).parent().parent().parent().parent().prev().prev().prev().prev().prop("checked", 'true');
				} else {
					$(param).parent().parent().parent().parent().prev().prev().prev().prev().removeAttr("checked");
					$(param).parent().parent().parent().parent().parent().parent().prev().prev().prev().prev().removeAttr("checked");
				}

				// 三代父级
				var lisibling3 = $(param).parent().parent().parent().parent().parent().parent().children('li').children('input');
				var arr3 = [];
				$.each(lisibling3, function (index, item) {
					arr3.push(item.checked);
				});
				if (isAllEqual(arr3) && arr3[0]) {
					$(param).parent().parent().parent().parent().parent().parent().prev().prev().prev().prev().prop("checked", 'true');
				} else {
					$(param).parent().parent().parent().parent().parent().parent().prev().prev().prev().prev().removeAttr("checked");
					$(param).parent().parent().parent().parent().parent().parent().parent().parent().prev().prev().prev().prev().removeAttr("checked");
				}

			}

			// 判断数组里面的元素是否都相同
			function isAllEqual(array) {
				if (array.length > 0) {
					return !array.some(function (value, index) {
						return value !== array[0];
					});
				} else {
					return true;
				}
			}

			//判断子级选中状态
			function checkChildren(param) {
				if (param.checked) {
					$(param).next().next().next().next().children().find("input").prop("checked", 'true');
				} else {
					$(param).next().next().next().next().children().find("input").removeAttr("checked");
				}
			}

			$(tree).on("click", "input", function () {
				//先子级再父级避免出错（父级里面有判断子级是否选中的）
				if (data[0].cascade) {
					checkChildren(this);
					checkParent(this);
					if (selectdata().length > 0) {
						$("#chosed").attr("style", 'display: block');
						$("#chosed_con").html('');
						$("#chosed_con").html(eachfinaldata(selectdata()));
						$("#chosecount").html('');
						$("#chosecount").html(selectdata().length);
					} else if (selectdata().length == 0) {
						$("#chosed").attr("style", 'display: none');
					}
				}
			})


			function eachfinaldata(obj) {
				var str = '';
				if (obj.constructor == Array) {
					for (var i = 0, len = obj.length; i < len; i++) {
						str += `<span>` + obj[i].parentname + obj[i].name + `</span>`;
					}
					return str;
				}
			}

			function selectdata() {
				var allselectdata = $.getCheckedNodes();
				var finalselectdata = [];
				if (allselectdata.length > 0) {
					for (var i in allselectdata) {
						if (allselectdata[i].level == 3) {
							finalselectdata.push(allselectdata[i]);
						}
					}
				}
				return finalselectdata;
			}

			//使点击a标签等同于点击 input
			$(tree).on("click", "a", function () {

				if ($(this).prev().prev().prev()[0].checked) {
					$(this).prev().prev().prev().removeAttr("checked");
				} else {
					$(this).prev().prev().prev().prop("checked", 'true');
				}
				//判断是否为子父级联
				if (data[0].cascade) {
					checkChildren($(this).prev().prev().prev()[0]);
					checkParent($(this).prev().prev().prev()[0]);
				}
				if (selectdata().length > 0) {
					$("#chosed").attr("style", 'display: block');
					$("#chosed_con").html('');
					$("#chosed_con").html(eachfinaldata(selectdata()));
					$("#chosecount").html('');
					$("#chosecount").html(selectdata().length);
				} else if (selectdata().length == 0) {
					$("#chosed").attr("style", 'display: none');
				}
			})

			//id相等就选中
			const insert = (children, arr) => {
				for (var a in arr) {
					if (children.id == arr[a]) {
						children.checked = true
					}
				}
			}

			//设置tree节点是否选中
			function setCheckedNodes(data, arrs) {
				for (let x in data) {
					let children = data[x].children;
					if (children != null) {
						for (let y in children) {
							insert(children[y], arrs)
							setCheckedNodes(children, arrs);
						}
					} else {
						return;
					}
				}

			}

			//递归
			var ids = 0;
			var uuid = $(this).uuid();

			function createTree(data) {
				var str = '<ul>';
				for (var i = 0; i < data.length; i++) {
					ids++;
					str +=
						'<li><img class="isShow" src="./images/minus.png" />'
					if (data[i].checked == true) {
						str += '<input id="' + uuid + ids + '" type="checkbox" checked ' +
							'data-show="' + data[i].open + '" data-level="' + data[i].level + '" data-devid="' + data[i].devid + '" data-typeid="' + data[i].typeid + '" data-columnName="' + data[i].columnName + '"/>'
					} else {
						str += '<input id="' + uuid + ids + '" type="checkbox" ' +
							'data-show="' + data[i].open + '" data-level="' + data[i].level + '" data-devid="' + data[i].devid + '" data-typeid="' + data[i].typeid + '" data-columnName="' + data[i].columnName + '" data-name="' + data[i].name + '"/>'
					}
					str += '<label class="label" for="' +
						uuid + ids + '"/><i class="' + data[i].ico + '"/><a href="#">' + data[i].name + '</a>';
					if (data[i].children && data[i].children != '') {
						str += createTree(data[i].children);
					}
					str += '</li>';
				};
				str += '</ul>';
				return str;
			};

			//通过ID选中
			if (arrs.constructor == Array) { //判断是否为数组
				setCheckedNodes(data, arrs);
			}

			//把树放到容器
			$(tree).html(createTree(data));

			//通过原始数据选中
			$.each($("input:checkbox:checked"), function () {
				checkParent(this)
			});

			//是否展开
			$.each($("input"), function () {
				if (this.getAttribute('data-show') == 'false') {
					$(this).parent().find("ul").hide();
					$(this).prev()[0].setAttribute("style", 'transform:rotate(-90deg)');

				} else if (this.getAttribute('data-show') == 'true') {
					$(this).parent().find("ul").show();
					$(this).prev()[0].setAttribute("style", 'transform:rotate(0deg)');
				}
			});
		},
	})

	//添加的$.xxx() 或者leg.xxx()
	$.extend({
		getCheckedNodes() { //获取选中id集合
			var dataarr = []
			$.each($('input:checkbox:checked'), function () {
				let temp = $(this).val();
				var checkedobj = {};
				checkedobj.level = $(this).data('level');
				checkedobj.devid = $(this).data('devid');
				checkedobj.typeid = $(this).data('typeid');
				checkedobj.columnname = $(this).data('columnname');
				checkedobj.name = $(this).data('name');
				checkedobj.parentname = $(this).parent().parent().prev().prev().prev().prev().data('name');
				dataarr.push(checkedobj)
			});
			return dataarr;
		}
	});

	global.leg = global.$ = $;

})(window)