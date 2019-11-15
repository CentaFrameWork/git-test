// JavaScript source code
function yCommon() {
    // nsnsnsosnsosnsosnsosnossnsons
    //公用方法
    this.isPointOnLine = function (line, point) {
        var d1 = Math.sqrt(Math.pow(line.point1.x - point.x, 2) + Math.pow(line.point1.y - point.y, 2));
        var d2 = Math.sqrt(Math.pow(line.point2.x - point.x, 2) + Math.pow(line.point2.y - point.y, 2));
        var lineDis = Math.sqrt(Math.pow(line.point1.x - line.point2.x, 2) + Math.pow(line.point1.y - line.point2.y, 2));
        if (d1 + d2 - lineDis <= 0.09) {
            return true;
        }
        return false;
    };
    this.validStr = function (str) {
        if (str == "" || str == null || str == undefined) {
            return false;
        }
        return true;
    };
    this.validObj = validObj = function (obj) {
        if (obj == null || obj == undefined) {
            return false;
        }
        return true;
    };
    this.log = function (log) {
        //console.log(log);
        //alert(log);
    };
    this.lightColor = function (colorRGB) {
        if (this.validStr(colorRGB) == false) {
            this.log("func lightColor / colorRGB invalid");
            return;
        }
        if (colorRGB.index < 0) {
            this.log("func lightColor / colorRGB error");
            return;
        }
        var start = colorRGB.indexOf('(');
        var word = colorRGB.substring(start).replace("(", "").replace(")", "");
        var arr = word.split(',');

        for (var i = 0; i < arr.length; i++) {
            var num = parseInt(arr[i]) + 30;
            if (num > 255) {
                num = 255;
            }
            arr[i] = num;
        }

        var lightColor = "rgb(" + arr[0] + "," + arr[1] + "," + arr[2] + ")";

        return lightColor;
    };
    this.darkColor = function (colorRGB) {
        if (this.validStr(colorRGB) == false) {
            this.log("func lightColor / colorRGB invalid");
            return;
        }
        if (colorRGB.index < 0) {
            this.log("func lightColor / colorRGB error");
            return;
        }
        var start = colorRGB.indexOf('(');
        var word = colorRGB.substring(start).replace("(", "").replace(")", "");
        var arr = word.split(',');

        for (var i = 0; i < arr.length; i++) {
            var num = parseInt(arr[i]) - 50;
            if (num < 0) {
                num = 0;
            }
            arr[i] = num.toString();
        }

        var darkColor = "rgb(" + arr[0] + "," + arr[1] + "," + arr[2] + ")";

        return darkColor;
    };
    this.changeTwoDecimal = function (floatvar) {
        var f_x = parseFloat(floatvar);
        if (isNaN(f_x)) {
            this.log("func changeTwoDecimal / floatvar error");
            return false;
        }
        var f_x = Math.round(floatvar * 100) / 100;
        return f_x;
    };
    this.rad2Angle = function (rad) {
        return rad / Math.PI * 180;
    };
    this.angle2Rad = function (angle) {
        return angle / 180 * Math.PI;
    };
    this.isTouchDevice = function () {
        var isTouch = 'ontouchstart' in window;
        return isTouch;
    }
    this.getPosition = function (obj, evt) {
        var x = evt.clientX - obj.offsetLeft;
        var y = evt.clientY - obj.offsetTop;
        return { x: x, y: y };
    };
};
function yBaseChart() {
    yCommon.call(this);
    //attribute
    //目标元素id
    this.targetId = "";
    //目标canvas对象
    this.targetCanvas = null;
    ////数据源
    //this.dataSource = null;
    //动画是否开启
    this.animation = false;
    //是否绘制3d效果
    this.is3d = false;
    this.areaList = new Array(new yBaseArea());
    this.areaList.splice(0, 1);
    //interface
    this.drawPie = function () { };
    this.drawColumn = function () { };
    this.drawBar = function () { };
    this.drawFoldLine = function () { };
    this.move = function (evt, index) { };
    this.itemClick = function (index) { };
    this.appendTitle = function () { };
    this.appendLegend = function (x, y, w, h) { };
    //function
    this.anchor = function (targetId) {
        this.targetId = targetId;
        if (this.validStr(this.targetId) == false) {
            this.log("【func anchor / msg:targetId invalid】");
            return;
        }
        this.targetCanvas = document.getElementById(targetId);
    };
    this.draw = function () {
        if (this.validObj(this.chartType) == false) {
            this.log("【func draw / chartType invalid】");
            return;
        }
        if (this.validStr(this.targetId) == false) {
            this.log("【func draw / msg:targetId invalid】");
            return;
        }
        if (this.validObj(this.areaList) == false) {
            this.log("【func draw / msg:areaList invalid】");
            return;
        }

        switch (this.chartType) {

            case ySeries.chartTypeEnum.pie:
                this.drawPie();
                break;

            case ySeries.chartTypeEnum.column:
                this.drawColumn();
                break;

            case ySeries.chartTypeEnum.bar:
                this.drawBar();
                break;

            case ySeries.chartTypeEnum.foldLine:
                drawFoldLine();
                break;

            default:
                break;
        }
    };
};
function yBaseArea() {
    var that = this;

    //一组对于area的描述数据，area真实占据的宽度和高度
    this.areaLeft = 0;
    this.areaTop = 0;
    this.areaWidth = 0;
    this.areaHeight = 0;

    //一组画图区域的真实区域
    this.left = 0;
    this.top = 0;
    this.right = 0;
    this.bottom = 0;
    this.width = 0;
    this.height = 0;

    this.paddingLeft = 0;
    this.paddingRight = 0;
    this.paddingTop = 0;
    this.paddingBottom = 0;

    this.setPadding = function (lr, tb) {
        this.paddingLeft = lr;
        this.paddingRight = lr;
        this.paddingTop = tb;
        this.paddingBottom = tb;
    };
    this.setPaddings = function (padding) {
        this.paddingLeft = padding;
        this.paddingRight = padding;
        this.paddingTop = padding;
        this.paddingBottom = padding;
    };

    this.seriesList = null;
    //每一个数值占据多少个像素
    this.yScale = 0;
    //每一个像素相当于多少数值
    this.vyScale = 0;
    this.xScale = 0;
    this.vxScale = 0;

    //series中最高最低数据
    this.dataHighest = -99999;
    this.dataLowest = 99999;


    this.init = function () {
        this.getHighestAndLowestData();

        this.width = this.right - this.left;
        this.height = this.bottom - this.top;

        //每一个数值占据多少个像素
        this.yScale = this.height / (this.dataHighest - this.dataLowest);
        //每一个像素相当于多少数值
        this.vyScale = (this.dataHighest - this.dataLowest) / this.height;
        this.xScale = this.width / this.seriesList[0].length;
        this.vxScale = this.seriesList[0].length / this.width;
    };


    //得到该区域内所有series的最大最小值，赋值给this.dataHighest和this.dataLowest
    this.getHighestAndLowestData = function () {
        //把最大最小值恢复为初始状态
        this.dataHighest = -99999;
        this.dataLowest = 99999;

        var seriesLength = this.seriesList.length;
        for (var i = 0; i < seriesLength; i++) {
            if (this.seriesList[i].chartType != ySeries.chartTypeEnum.pie) {
                var cur_dataSource = this.seriesList[i].dataSource;
                var dataLength = cur_dataSource.length;
                for (var j = 0; j < dataLength; j++) {
                    var cur_value = cur_dataSource[j].value;
                    if (cur_value > this.dataHighest) {
                        this.dataHighest = cur_value;
                    }
                    if (cur_value < this.dataLowest) {
                        this.dataLowest = cur_value;
                    }
                }
            }
        }
    };
    this.vy2y = function (vy) {
        return this.bottom - vy * this.yScale;
    };
    this.vx2x = function (vx) {
        return this.left + vx * this.xScale;
    };
    this.x2vx = function (x) {
        return x * this.vxScale;
    };
    this.y2vy = function (y) {
        return y * this.vyScale;
    };
    this.getCenterPoint = function () {
        var x = this.width / 2
        var y = this.height / 2;
        return { x: x, y: y };
    };

};
function ySeries() {
    var that = this;

    this.multiSeriesType = ySeries.chartTypeEnum.parallelingBar;
    this.chartType = null;
    //数据源[{ name: '时代', value: 26, color: 'rgb(200,0,0)' }...]
    this.dataSource = [{ name: '时代', value: 26, color: 'rgb(200,0,0)' }];
};
ySeries.chartTypeEnum =
{
    pie: "pie_view",
    //堆积的条状图
    stackedBar: "stacked_bar_view",
    //并列的条状图
    parallelingBar: "paralleling_bar_view",
    column: "column_view",
    foldLine: "foldLine_view"
};



function yPieChart(isSuportHtml5) {
    yBaseChart.call(this);
    var that = this;

    this.drawPie = function () {

        this.log("绘制开始");
        var startTime = new Date().getTime();

        var valid = false;
        if (this.areaList.pieCenter) {
            valid = true;
        }
        if (valid == false) {
            this.log("【func drawPie / pieCenter invalid】");
            return;
        }
        var canvas = document.getElementById(this.targetId);
        if (this.validObj(canvas) == false) {
            this.log("【func drawPie / canvas notfound】");
            return;
        }

        var suc = false;
        if (canvas.getContext) {
            suc = true;
        }
        if (suc == false) {
            this.log("【func drawPie / getContext fail】");
            return;
        }
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, 500, 500);

        var centerX = 0;
        var centerY = 0;
        if (this.areaList.pieCenter.center == true) {
            centerX = this.areaList.width / 2 + this.areaList.left;
            centerY = this.areaList.height / 2 + this.areaList.top;
            this.areaList.pieCenter = { center: true, x: centerX, y: centerY }
        }
        else {
            centerX = this.areaList.pieCenter.x;
            centerY = this.areaList.pieCenter.y;
        }

        var start = 0;
        var _step = 4;
        var interval = 10;
        var isTouch = this.isTouchDevice();
        if (isSuportHtml5 == false || isTouch) {
            _step = 50;
            interval = 80;
        }
        var animationStop = false;

        if (this.areaList.animation == true) {
            this.areaList.animation = false;
            var timer = setInterval(function () {
                if (animationStop == true) {
                    clearInterval(timer);
                    that.areaList.pie(context, centerX, centerY, that.areaList.radiusX, that.areaList.radiusY);
                    that.areaList.drawLabel(context);
                    var endTime = new Date().getTime();
                    that.log("绘制结束,耗时：" + (endTime - startTime));
                    that.areaList.appendEvent(that.targetCanvas);
                    return;
                }
                start += _step;
                if (start > 360) {
                    start = 360;
                    animationStop = true;
                }
                that.areaList.pieAnimation(context, centerX, centerY, that.areaList.radiusX, that.areaList.radiusY, that.areaList.angle2Rad(start));
            }, interval);
        }
        else {
            that.areaList.pie(context, centerX, centerY, that.areaList.radiusX, that.areaList.radiusY);
            that.areaList.drawLabel(context);
            var endTime = new Date().getTime();
            that.log("绘制结束,耗时：" + (endTime - startTime));
            that.areaList.appendEvent(that.targetCanvas);
        }
    };
};
function yPieArea(isSuportHtml5) {
    yBaseArea.call(this);
    yCommon.call(this);
    var that = this;

    //临时变量
    var lw = 4;
    var stepb = 2.5;
    if (isSuportHtml5) {
        lw = 1;
        stepb = 0;
    }

    //#region 椭圆部分

    //动画是否开启
    this.animation = false;
    this.is3d = false;
    //点击圆上某一部分突出显示出来的距离
    this.outDis = 20;
    this.subClickEnable = false;
    this.subHighLightEnable = false;
    this.highLightColor = "cyan";
    this.pieEdgeBorderColor = "rgb(255,255,255)";
    //饼图边缘的点
    this.pieEdgePoint = null;
    this.dataToal = 0;
    //圆半径
    this.radiusX = 80;
    this.radiusY = 80;
    //圆心
    this.pieCenter = null;
    this.pie3dHight = 30;
    this.selectSub = { highlight: -1, out: -1 };

    this.move = function (evt, index) { };
    this.itemClick = function (index) { };

    //得到pie的边缘点
    this.getPieEdgePoint = function (context, x, y, a, b) {
        //max是等于1除以长轴值a和b中的较大者
        //i每次循环增加1/max，表示度数的增加
        //这样可以使得每次循环所绘制的路径（弧线）接近1像素        
        var step = (a > b) ? 1 / a : 1 / b;
        //step = step + step * 2.5;
        //var lineWidth = 3;
        step = step + step * stepb;
        var lineWidth = lw;
        var full = 2 * Math.PI;
        var index = 0;
        this.pieEdgePoint = new Array();
        this.pieEdgePoint.push(new Array());
        var lastPos = { x: x + a * Math.cos(0), y: y + b * Math.sin(0) };
        var color = this.dataSource[index].color;
        this.getDataToal();
        var startRad = 0;
        var endRad = full * (this.dataSource[index].value / this.dataToal);
        var areaRad = endRad;
        //context.strokeStyle = color;
        //context.beginPath();
        ////从圆（椭圆）的右端点开始绘制
        //context.moveTo(x + a, y);

        var findOut = true;
        var findHighLight = true;
        var tempx = x;
        var tempy = y;

        var isStart = true;

        for (var i = 0; i < full; i += step) {

            if (i >= startRad && i <= endRad) {
                if (index == that.selectSub.out && findOut == true) {
                    var rs = (that.radiusX + that.radiusY) / 2;
                    var point = that.getOutPoint(startRad, areaRad, rs, x, y);
                    x = point.x;
                    y = point.y;
                    findOut = false;
                }
                if (index == that.selectSub.highlight && findHighLight == true) {
                    color = that.highLightColor;
                    findHighLight = false;
                }
                //边缘点
                var edgeX = x + a * Math.cos(i);
                var edgeY = y + b * Math.sin(i);

                lastPos = { x: edgeX, y: edgeY };
                this.pieEdgePoint[index].push(lastPos);
            }
            else {

                isStart = true;

                //切换为下一饼图数据
                index++;
                x = tempx;
                y = tempy;
                context.stroke();
                context.beginPath();
                color = this.dataSource[index].color;
                context.strokeStyle = color;
                areaRad = Math.PI * 2 * (this.dataSource[index].value / this.dataToal);
                startRad = endRad;
                endRad = startRad + areaRad;
                this.pieEdgePoint.push(new Array());
            }
        }

        context.stroke();
        context.closePath();
    };
    this.pieAnimation = function (context, x, y, a, b, full) {
        //max是等于1除以长轴值a和b中的较大者
        //i每次循环增加1/max，表示度数的增加
        //这样可以使得每次循环所绘制的路径（弧线）接近1像素        
        var step = (a > b) ? 1 / a : 1 / b;
        //step = step + step * 2.5;
        //var lineWidth = 3;
        step = step + step * stepb;
        var lineWidth = lw;
        var index = 0;
        this.pieEdgePoint = new Array();
        this.pieEdgePoint.push(new Array());
        var lastPos = { x: x + a * Math.cos(0), y: y + b * Math.sin(0) };
        var color = this.seriesList.dataSource[index].color;
        this.getDataToal();
        var startRad = 0;
        var endRad = full * (this.seriesList.dataSource[index].value / this.dataToal);
        var areaRad = endRad;
        //context.strokeStyle = color;
        //context.beginPath();
        ////从圆（椭圆）的右端点开始绘制
        //context.moveTo(x + a, y);

        var findOut = true;
        var findHighLight = true;
        var tempx = x;
        var tempy = y;


        for (var i = 0; i < full; i += step) {

            if (i >= startRad && i <= endRad) {
                if (index == that.selectSub.out && findOut == true) {
                    var rs = (that.radiusX + that.radiusY) / 2;
                    var point = that.getOutPoint(startRad, areaRad, rs, x, y);
                    x = point.x;
                    y = point.y;
                    findOut = false;
                }
                if (index == that.selectSub.highlight && findHighLight == true) {
                    color = that.highLightColor;
                    findHighLight = false;
                }
                //边缘点
                var edgeX = x + a * Math.cos(i);
                var edgeY = y + b * Math.sin(i);


                //连接圆心（椭圆圆心）与边缘点
                context.beginPath();
                context.lineWidth = lineWidth;
                context.moveTo(x, y);
                context.strokeStyle = color;
                context.lineTo(edgeX, edgeY);
                //context.lineTo(edgeX, edgeY + 30);
                context.stroke();


                //连接外边缘
                //context.beginPath();
                //context.moveTo(lastPos.x, lastPos.y);
                //context.strokeStyle = "gray";
                //context.lineTo(edgeX, edgeY);
                //context.stroke();
                lastPos = { x: edgeX, y: edgeY };
            }
            else {
                //切换为下一饼图数据
                index++;
                x = tempx;
                y = tempy;
                context.stroke();
                context.beginPath();
                color = this.seriesList.dataSource[index].color;
                context.strokeStyle = color;
                areaRad = full * (this.seriesList.dataSource[index].value / this.dataToal);
                startRad = endRad;
                endRad = startRad + areaRad;
            }
        }

        context.stroke();
        context.closePath();
    };
    this.pie = function (context, x, y, a, b) {

        context.fillStyle = "#D677DD";
        context.fillRect(this.left, this.top, this.width, this.height);

        //max是等于1除以长轴值a和b中的较大者
        //i每次循环增加1/max，表示度数的增加
        //这样可以使得每次循环所绘制的路径（弧线）接近1像素        
        var step = (a > b) ? 1 / a : 1 / b;
        //step = step + step * 2.5;
        //var lineWidth = 3;
        step = step + step * stepb;
        var lineWidth = lw;
        var full = 2 * Math.PI;
        var index = 0;
        this.pieEdgePoint = new Array();
        this.pieEdgePoint.push(new Array());
        var lastPos = { x: x + a * Math.cos(0), y: y + b * Math.sin(0), rad: 0 };
        var color = this.seriesList.dataSource[index].color;
        this.getDataToal();
        var startRad = 0;
        var endRad = full * (this.seriesList.dataSource[index].value / this.dataToal);
        var areaRad = endRad;
        //context.strokeStyle = color;
        //context.beginPath();
        ////从圆（椭圆）的右端点开始绘制
        //context.moveTo(x + a, y);

        var findOut = true;
        var findHighLight = true;
        var tempx = x;
        var tempy = y;

        var isStart = true;
        var follwStart = false;
        var follwEnd = false;

        for (var i = 0; i <= full; i += step) {

            if (i >= startRad && i < endRad) {
                if (follwStart == true) {
                    follwStart = false;

                    var _edgeX = x + a * Math.cos(i);
                    var _edgeY = y + b * Math.sin(i);

                    context.beginPath();
                    context.strokeStyle = color;
                    context.lineWidth = 1;
                    context.moveTo(x, y);
                    context.lineTo(x, y + this.pie3dHight);
                    context.lineTo(_edgeX, _edgeY + this.pie3dHight);
                    context.lineTo(_edgeX, _edgeY);
                    context.lineTo(x, y);
                    context.closePath();
                    context.stroke();

                    context.fillStyle = this.darkColor(color);
                    //context.lineTo(edgeX, edgeY + 30);
                    context.fill();
                }
                if (index == that.selectSub.out && findOut == true) {
                    var rs = (that.radiusX + that.radiusY) / 2;
                    var point = that.getOutPoint(startRad, areaRad, rs, x, y);
                    x = point.x;
                    y = point.y;
                    findOut = false;


                    //边缘点
                    var _edgeX = x + a * Math.cos(i);
                    var _edgeY = y + b * Math.sin(i);

                    if (isStart) {
                        isStart = false;
                        //startRad转换角度
                        var angle = startRad / Math.PI * 180;
                        if (angle > 90 && angle < 270) {

                            context.beginPath();
                            context.strokeStyle = color;
                            context.lineWidth = 1;
                            context.moveTo(x, y);
                            context.lineTo(x, y + this.pie3dHight);
                            context.lineTo(_edgeX, _edgeY + this.pie3dHight);
                            context.lineTo(_edgeX, _edgeY);
                            context.lineTo(x, y);
                            context.closePath();
                            context.stroke();

                            context.fillStyle = this.darkColor(color);
                            //context.lineTo(edgeX, edgeY + 30);
                            context.fill();
                        }
                    }
                }

                var next = i + step;

                if (next >= full && index == that.selectSub.out || next >= full && that.selectSub.out == 0) {
                    var _edgeX = x + a * Math.cos(i);
                    var _edgeY = y + b * Math.sin(i);

                    context.beginPath();
                    context.strokeStyle = color;
                    context.lineWidth = 1;
                    context.moveTo(x, y);
                    context.lineTo(x, y + this.pie3dHight);
                    context.lineTo(_edgeX, _edgeY + this.pie3dHight);
                    context.lineTo(_edgeX, _edgeY);
                    context.lineTo(x, y);
                    context.closePath();
                    context.stroke();

                    context.fillStyle = this.darkColor(color);
                    //context.lineTo(edgeX, edgeY + 30);
                    context.fill();

                }
                if (index == that.selectSub.highlight && findHighLight == true) {
                    color = that.highLightColor;
                    findHighLight = false;
                }
                //边缘点
                var edgeX = x + a * Math.cos(i);
                var edgeY = y + b * Math.sin(i);


                //连接圆心（椭圆圆心）与边缘点
                context.beginPath();
                context.lineWidth = lineWidth;
                context.moveTo(x, y);
                context.strokeStyle = color;
                context.lineTo(edgeX, edgeY);
                //context.lineTo(edgeX, edgeY + 30);
                context.stroke();
                context.closePath();


                if (i < Math.PI * 0.98) {
                    context.beginPath();
                    context.lineWidth = lineWidth;
                    context.moveTo(edgeX, edgeY);
                    context.lineTo(edgeX, edgeY + this.pie3dHight * 1.2);
                    context.stroke();
                    context.closePath();
                }



                //连接外边缘
                //context.beginPath();
                //context.moveTo(lastPos.x, lastPos.y);
                //context.strokeStyle = "gray";
                //context.lineTo(edgeX, edgeY);
                //context.stroke();
                lastPos = { x: edgeX, y: edgeY, rad: i };
                this.pieEdgePoint[index].push(lastPos);
            }
            else {

                if (that.selectSub.out - index == 1) {
                    follwEnd = true;
                }

                if (index == that.selectSub.out) {
                    var angle = endRad / Math.PI * 180;
                    if (angle > 270 && angle <= 360 || angle >= 0 && angle < 90) {
                        //边缘点
                        var _edgeX = x + a * Math.cos(i);
                        var _edgeY = y + b * Math.sin(i);

                        context.beginPath();
                        context.strokeStyle = color;
                        context.lineWidth = 1;
                        context.moveTo(x, y);
                        context.lineTo(x, y + this.pie3dHight);
                        context.lineTo(_edgeX, _edgeY + this.pie3dHight);
                        context.lineTo(_edgeX, _edgeY);
                        context.lineTo(x, y);
                        context.closePath();
                        context.stroke();

                        context.fillStyle = this.darkColor(color);
                        //context.lineTo(edgeX, edgeY + 30);
                        context.fill();
                    }
                    else {
                        follwStart = true;
                    }
                    //这里本次结尾跟着下一个的开始，这一个不显示，那么跟着下一次就显示
                }
                if (follwEnd == true) {
                    follwEnd = false;
                    var angle = endRad / Math.PI * 180;
                    if (angle > 270 && angle <= 360 || angle >= 0 && angle < 90) {
                        //边缘点
                        var _edgeX = x + a * Math.cos(i);
                        var _edgeY = y + b * Math.sin(i);

                        context.beginPath();
                        context.strokeStyle = color;
                        context.lineWidth = 1;
                        context.moveTo(x, y);
                        context.lineTo(x, y + this.pie3dHight);
                        context.lineTo(_edgeX, _edgeY + this.pie3dHight);
                        context.lineTo(_edgeX, _edgeY);
                        context.lineTo(x, y);
                        context.closePath();
                        context.stroke();

                        context.fillStyle = this.darkColor(color);
                        //context.lineTo(edgeX, edgeY + 30);
                        context.fill();
                    }
                }


                isStart = true;

                //切换为下一饼图数据
                index++;
                x = tempx;
                y = tempy;
                context.stroke();
                context.beginPath();
                color = this.seriesList.dataSource[index].color;
                context.strokeStyle = color;
                areaRad = full * (this.seriesList.dataSource[index].value / this.dataToal);
                startRad = endRad;
                endRad = startRad + areaRad;
                this.pieEdgePoint.push(new Array());

            }
        }

        context.stroke();
        context.closePath();
    };
    this.drawLabel = function (ctx) {
        var partLength = this.pieEdgePoint.length;
        var far = 25;
        var rbYStep = 10;
        var lbYStep = 10;
        var rtYStep = 10;
        var ltYStep = 10;
        var yStep = 10;
        var lineColor = "#C87398";

        if (partLength > 0) {
            for (var i = 0; i < partLength; i++) {
                var mid = Math.round(this.pieEdgePoint[i].length / 2);
                var point = this.pieEdgePoint[i][mid];
                var angle = this.rad2Angle(point.rad);

                ctx.lineWidth = 1;
                ctx.beginPath();
                var text = this.seriesList.dataSource[i].value / this.dataToal * 100;
                text = this.changeTwoDecimal(text) + "%";
                ctx.font = "14px 宋体";

                if (angle < 45) {
                    ctx.strokeStyle = lineColor;
                    ctx.moveTo(point.x, point.y);
                    ctx.lineTo(point.x + far, point.y);
                    ctx.stroke();
                    ctx.fillStyle = "#000000";
                    ctx.fillText(text, point.x + far, point.y + 5);
                    //    ----->
                }
                if (angle >= 45 && angle <= 90) {
                    ctx.strokeStyle = lineColor;
                    ctx.moveTo(point.x, point.y);
                    ctx.lineTo(point.x, point.y + rbYStep);
                    ctx.lineTo(point.x + far, point.y + rbYStep);
                    ctx.stroke();
                    ctx.fillStyle = "#000000";
                    ctx.fillText(text, point.x + far, point.y + rbYStep + 5);

                    rbYStep += yStep;
                    //  |
                    //  |______>
                }
                if (angle > 90 && angle <= 135) {
                    ctx.strokeStyle = lineColor;
                    ctx.moveTo(point.x, point.y);
                    ctx.lineTo(point.x, point.y + lbYStep);
                    ctx.lineTo(point.x - far, point.y + lbYStep);
                    ctx.stroke();
                    ctx.fillStyle = "#000000";
                    ctx.fillText(text, point.x - 15 * 4.5, point.y + lbYStep + 5);

                    lbYStep += yStep;
                    //        |
                    //  <_____|
                }
                if (angle > 135 && angle < 225) {
                    ctx.strokeStyle = lineColor;
                    ctx.moveTo(point.x, point.y);
                    ctx.lineTo(point.x - far, point.y);
                    ctx.stroke();
                    ctx.fillStyle = "#000000";
                    ctx.fillText(text, point.x - 15 * 4.5, point.y + 5);
                    //  <-------
                }
                if (angle >= 225 && angle < 270) {
                    ctx.strokeStyle = lineColor;
                    ctx.moveTo(point.x, point.y);
                    ctx.lineTo(point.x, point.y - ltYStep);
                    ctx.lineTo(point.x - far, point.y - ltYStep);
                    ctx.stroke();
                    ctx.fillStyle = "#000000";
                    ctx.fillText(text, point.x - 15 * 4.5, point.y - ltYStep + 5);

                    ltYStep += yStep;
                    //  <-------|
                    //          |
                }
                if (angle >= 270 && angle <= 315) {
                    ctx.strokeStyle = lineColor;
                    ctx.moveTo(point.x, point.y);
                    ctx.lineTo(point.x, point.y - rtYStep);
                    ctx.lineTo(point.x + far, point.y - rtYStep);
                    ctx.stroke();
                    ctx.fillStyle = "#000000";
                    ctx.fillText(text, point.x + far, point.y - rtYStep + 5);

                    rtYStep += yStep;
                    //  |------->
                    //  |
                }
                if (angle > 315) {
                    ctx.strokeStyle = lineColor;
                    ctx.moveTo(point.x, point.y);
                    ctx.lineTo(point.x + far, point.y);
                    ctx.stroke();
                    ctx.fillStyle = "#000000";
                    ctx.fillText(text, point.x + far, point.y + 5);
                    //  ------->
                }

                ctx.closePath();
            }
        }
    };

    this.getOutPoint = function (startAngle, tempAngle, radius, centerX, centerY) {
        var radian = (startAngle + tempAngle / 2);
        var angle = radian / Math.PI * 180;
        var qj = 0;
        var radunit = 0;
        if (angle <= 90) {
            qj = 0;
            radunit = 0;
        }
        else if (angle > 90 && angle <= 180) {
            qj = 1;
            radunit = 0.5;
        }
        else if (angle > 180 && angle <= 270) {
            qj = 2;
            radunit = 1;
        }
        else if (angle > 270 && angle <= 360) {
            qj = 3;
            radunit = 1.5;
        }

        var _angle = angle - qj * 90;
        var _radian = radian - Math.PI * radunit;

        var bili = Math.sin(_radian);
        var duibian = bili * radius;
        var bili2 = this.outDis / radius;

        var duanduibian = bili2 * duibian;
        var yao = Math.sqrt((this.outDis * this.outDis) - (duanduibian * duanduibian));

        var czx = 0;
        var czy = 0;

        switch (qj) {
            case 0:
                czy = duanduibian;
                czx = yao;
                break;

            case 1:
                czy = yao;
                czx = -duanduibian;
                break;

            case 2:
                czy = -duanduibian;
                czx = -yao;
                break;

            case 3:
                czy = -yao;
                czx = duanduibian;
                break;

            default:
                break;

        }

        var outX = centerX + czx;
        var outY = centerY + czy;
        if (this.radiusX > this.radiusY) {
            outY -= 3;
        }
        if (this.radiusY > this.radiusX) {
            outX -= 5;
        }

        return { x: outX, y: outY };
    };
    this.appendEvent = function (targetCanvas) {
        if (targetCanvas) {
            if (this.subClickEnable) {
                targetCanvas.onmousedown = function (evt) {
                    evt = evt || event;

                    var point = that.getPosition(this, evt);
                    var index = that.pointOnWhere(point);
                    if (index >= 0) {
                        that.itemClick(index);
                    }
                }
            }

            if (this.subHighLightEnable) {
                targetCanvas.onmousemove = function (evt) {
                    evt = evt || event;

                    var point = that.getPosition(this, evt);
                    var index = that.pointOnWhere(point);
                    that.move(evt, index);
                }
            }
        }
    };
    this.pointOnWhere = function (point) {
        var x = point.x;
        var y = point.y;
        var found = false;

        if (this.validObj(this.pieEdgePoint) == false) {
            this.log("【func pointOnWhere / pieEdgePoint invalid】");
            return;
        }

        var partLength = this.pieEdgePoint.length;
        for (var i = 0; i < partLength; i++) {
            var pointLength = this.pieEdgePoint[i].length;
            for (var j = 0; j < pointLength; j++) {
                var isOn = this.isPointOnLine({ point1: this.pieCenter, point2: this.pieEdgePoint[i][j] }, point)
                if (isOn) {
                    found = true;
                    break;
                }
            }
            if (found == true) {
                return i;
            }
        }
        return -1;
    };
    this.appendLegend = function (targetCanvas, l, t, w, h) {
        //todo:添加图例
        var div = document.createElement('div');
        div.style.position = "absolute";
        div.style.left = (this.left + l + targetCanvas.offsetLeft) + "px";
        div.style.top = (t + this.top + targetCanvas.offsetTop) + "px";
        div.style.width = w + "px";
        div.style.height = h + "px";
        div.style.backgroundColor = '#ffe1cc';
        document.body.appendChild(div);

        var dataLength = this.seriesList.dataSource.length;
        this.getDataToal();
        var starty = 10;
        for (var i = 0; i < dataLength; i++) {
            var legend = document.createElement('div');
            legend.style.position = "absolute";
            legend.style.left = "10px";
            legend.style.top = starty + "px";
            legend.style.width = "20px";
            legend.style.height = "10px";
            legend.style.backgroundColor = this.seriesList.dataSource[i].color;
            div.appendChild(legend);

            var percent = this.seriesList.dataSource[i].value / this.dataToal * 100;
            percent = this.changeTwoDecimal(percent);

            var text = document.createElement("span");
            text.innerHTML = this.seriesList.dataSource[i].name + ":" + percent + "%";
            text.style.fontSize = "13px";
            text.style.position = "absolute";
            text.style.left = "35px";
            text.style.top = (starty - 1) + "px";
            div.appendChild(text);

            starty += 20;
        }

    };
    this.appendTitle = function (targetCanvas, l, t, titleString) {

        var offsetLeft = targetCanvas.offsetLeft;
        var offsetTop = targetCanvas.offsetTop
        var left = 0;
        var top = 10;
        top += this.top;
        var textLength = titleString.length * 18;
        if (this.validObj(l) == false || this.validObj(t) == false) {
            left = (targetCanvas.width / 2) - (textLength / 2);
        }
        left = (this.width / 2) - (textLength / 2) + this.left;

        var titleDiv = document.createElement('div');
        titleDiv.style.position = "absolute";
        titleDiv.style.left = left + "px";
        titleDiv.style.top = top + "px";
        //titleDiv.style.width = w + "px";
        //titleDiv.style.height = h + "px";
        titleDiv.innerHTML = "<h3>" + titleString + "</h3>";
        document.body.appendChild(titleDiv);
    };
    this.getDataToal = function () {
        if (this.validObj(this.dataToal) || this.dataToal == 0) {
            var dataLength = this.seriesList.dataSource.length;
            this.dataToal = 0;
            for (var i = 0; i < dataLength; i++) {
                this.dataToal += this.seriesList.dataSource[i].value;
            }
        }
    };
    this.initPie = function () {

        this.width = this.right - this.left;
        this.height = this.bottom - this.top;

        //每一个数值占据多少个像素
        this.yScale = this.height / (this.dataHighest - this.dataLowest);
        //每一个像素相当于多少数值
        this.vyScale = (this.dataHighest - this.dataLowest) / this.height;
        this.xScale = this.width / this.seriesList.length;
        this.vxScale = this.seriesList.length / this.width;
    };



    //#endregion
};

//十六进制颜色值域RGB格式颜色值之间的相互转换
//-------------------------------------  
//16进制颜色值的正则表达式  
var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
/*RGB颜色转换为16进制*/
String.prototype.colorHex = function () {
    var that = this;
    if (/^(rgb|RGB)/.test(that)) {
        var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        var strHex = "#";
        for (var i = 0; i < aColor.length; i++) {
            var hex = Number(aColor[i]).toString(16);
            if (hex === "0") {
                hex += hex;
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = that;
        }
        return strHex;
    } else if (reg.test(that)) {
        var aNum = that.replace(/#/, "").split("");
        if (aNum.length === 6) {
            return that;
        } else if (aNum.length === 3) {
            var numHex = "#";
            for (var i = 0; i < aNum.length; i += 1) {
                numHex += (aNum[i] + aNum[i]);
            }
            return numHex;
        }
    } else {
        return that;
    }
};

//-------------------------------------------------  

/*16进制颜色转为RGB格式*/
String.prototype.colorRgb = function () {
    var sColor = this.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值  
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return "rgb(" + sColorChange.join(",") + ")";
    } else {
        return sColor;
    }
};
