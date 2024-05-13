            // 判断是否为正整数
            function isPositiveNum(s) { //是否为正整数
              var re = /^[0-9]*[1-9][0-9]*$/;
              return re.test(s)
            }

            function GetQueryString(name) {
              var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
              var r = window.location.search.substr(1).match(reg);
              if (r != null) return decodeURI(r[2]);
              return null;
            }

            // 判断是否为整数，不是整数的话取小数点后一位
            function dealnumber(obj) {
              if (obj % 1 === 0) { // 为整数
                return obj;
              } else { // 为非整数
                var f_x = parseFloat(obj);
                if (isNaN(f_x)) {
                  return false;
                }
                f_x = Math.round(f_x * 10) / 10;
                return f_x;

              }
            }

            // 整数的话增加小数点，并且小数点后5位0
            // 有小数点的情况下，让小数点后面保留5位数，不足补0
            function getFloat5(x) {
              if (x != '.') {
                var f = Math.round(x * 100000) / 100000;
                var s = f.toString();
                var rs = s.indexOf('.');
                if (rs <= 0) {
                  rs = s.length;
                  s += '.';
                }
                while (s.length <= rs + 5) {
                  s += '0';
                }
                return s;
              } else {
                return '0.00';
              }
            }

            function getFloat2(x) {
              if (x != '.') {
                var f = Math.round(x * 100) / 100;
                var s = f.toString();
                var rs = s.indexOf('.');
                if (rs <= 0) {
                  rs = s.length;
                  s += '.';
                }
                while (s.length <= rs + 2) {
                  s += '0';
                }
                return s;
              } else {
                return '0';
              }
            }


            function commonfomat5(obj) {
              var float5 = getFloat5(obj);
              var obj5 = float5.substring(0, 6);
              return obj5;
            }

            function commonfomat2(obj) {
              var float2 = getFloat2(obj);
              return float2;
            }

            function Mounthdate(obj) {
              var objtime = obj.split('T')[0];
              var str1= objtime.split('-');
              var mdata='',ddata='',backdata;
              var themounth = str1[1];
              var thedate = str1[2];

              if(themounth.substr(0, 1) == '0'){
                  mdata = themounth.substr(1, 2);
              }else {
                  mdata = themounth;
              }
              if(thedate.substr(0, 1) == '0'){
                  ddata = thedate.substr(1, 2);
              }else {
                  ddata = thedate;
              }
              backdata = mdata + '月' + ddata + '日';
              return backdata;
            }

            // 获取当前月份
            function Mounthnow(){
              var d = new Date();
              var themounth = d.getMonth() + 1;
              return themounth;

            }

            function dealnumber(obj) {
              if (obj % 1 === 0) {
                return obj;
              } else {
                var f_x = parseFloat(obj);
                if (isNaN(f_x)) {
                  return false;
                }
                f_x = Math.round(f_x * 10) / 10;
                return f_x;
              }
            }