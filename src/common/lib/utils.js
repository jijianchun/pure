export default {
  DEBUG_TOGGLE: true,
  /**
   * 扩展(继承)
   * extends(oriObj, newObj, newObj ...) or extends({}, obj, obj ...)
   * extends(obj, obj...)扩展到自身
   * 第一个参数是布尔值 默认不填写为:false 当值为true则使用深拷贝
   * @return new Object gather
   */
  extends () {
    var options
    var name
    var src
    var copy
    var copyIsArray
    var clone
    var target = arguments[0] || {}
    var i = 1
    var length = arguments.length
    var deep = false
    if (typeof target === 'boolean') {
      deep = target
      target = arguments[1] || {}
    }
    if (typeof target !== 'object' && !this.isFunction(target)) {
      target = {}
    }
    if (length === i) {
      target = this
      --i
    }
    for (; i < length; i++) {
      if ((options = arguments[ i ]) != null) {
        for (name in options) {
          src = target[ name ]
          copy = options[ name ]
          if (target === copy) {
            continue
          }
          if (deep && copy && (this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false
              clone = src && this.isArray(src) ? src : []
            } else {
              clone = src && this.isPlainObject(src) ? src : {}
            }
            target[name] = this.extends(deep, clone, copy)
          } else if (copy !== undefined) {
            target[ name ] = copy
          }
        }
      }
    }
    return target
  },
  /**
   * 测试对象是否是纯粹的对象（通过 "{}" 或者 "new Object" 创建的）
   * @param  {[type]}  obj
   * @return {Boolean}
   */
  isPlainObject (obj) {
    if (this.type(obj) !== 'object' || obj.nodeType || this.isWindow(obj)) {
      return false
    }
    try {
      if (obj.constructor && !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
        return false
      }
    } catch (e) {
      return false
    }
    return true
  },
  /**
   * 判断数据类型
   * @param  obj
   * @return 返回的是由Object toString返回的格式 如 [Object String] [Object Object]
   */
  type (obj) {
    if (obj == null) {
      return String(obj)
    }
    return typeof obj === 'object' || typeof obj === 'function' ? Object.prototype[Object.prototype.toString.call(obj)] || 'object' : typeof obj
  },
  /**
   * 判断是否window对象
   * @param  {[type]}  obj
   * @return {Boolean}
   */
  isWindow (obj) {
    return obj != null && obj === obj.window
  },
  /**
   * 判断值是否存在数组中
   * @param  {[type]} elem 搜索内容
   * @param  {[type]} arr  被搜索数组
   * @param  {[type]} i    用来搜索数组队列，默认值为0。
   * @return {[type]} 未找到返回-1，否则返回位置下标
   */
  inArray (elem, arr, i) {
    return arr == null ? -1 : Array.prototype.indexOf.call(arr, elem, i)
  },
  /**
   * 判断是否数组
   * @type {Boolean}
   */
  isArray: Array.isArray,
  /**
   * 判断是否函数
   * @param  obj
   * @return {Boolean}
   */
  isFunction (obj) {
    return this.type(obj) === 'function'
  },
  /**
   * 判断是否数值类型
   * @param  {[type]} obj
   * @return {[Boolean]}
   */
  isNumeric: function (obj) {
    return !isNaN(parseFloat(obj)) && isFinite(obj)
  },
  /**
   * 日期(时间)格式化
   * @param  arguments[0] 可被new Date()识别的日期或时间戳或时间差
   * @param  arguments[1] 可选's' 传入时间格式以秒为单位  默认为'ms'
   * date('时间戳').getTime() 获取时间戳

   * date('String' or number).format('string') 格式化日期
     date('1978-01-01').format('Y-m') //1978-01

   * date('时间差').timeset() 获取计算后的时间
     date(301,'s').timeset() //{year:0,month:0,day:0,hour:0,minute:6,second:1}

   * date('时间差').state() 获取当前时间状态
     date('301','s').state //{minute:6}=>6分钟前

   * date(number)._year|_month|_day|_hour|_minute|_second() 将数字转化为若干年|月|日........

   *** 继承自 new Date() 可使用于原生date方法 : date('xxxx').getFullYear()...
   */
  date () {
    // 格式化目标
    var target = arguments[0] || new Date().getTime()
    // 时间戳为ms/s 默认为ms
    var second = arguments[1] === 's' ? 1 : 1000
    target = this.isNumeric(target) ? +target : '' + target

    return this.extends(true, new Date(target), {
      /**
       * 初始化
       @param target 日期/时间戳/时间差
       */
      init (target) {
        this.target = target / second
        return this
      },
      /**
       * 日期时间参数
       */
      data () {
        var second = 1
        var minute = 60 * second
        var hour = minute * 60
        var day = hour * 24
        var halfamonth = day * 15
        var month = halfamonth * 2
        var year = month * 12
        return {
          // 基本时间条件转换(毫秒)
          basicUnit: {
            second: 1,
            minute: minute,
            hour: hour,
            day: day,
            halfamonth: halfamonth,
            month: month,
            year: year
          },
          // 转义列表
          trope: {
            'Y': this.getFullYear(),
            'y': this.getFullYear(),
            'M': this.getMonth() + 1,
            'm': this.getMonth() + 1 < 10 ? '0' + (this.getMonth() + 1) : this.getMonth() + 1,
            'D': this.getDate(),
            'd': this.getDate() < 10 ? '0' + this.getDate() : this.getDate(),
            'H': this.getHours() < 10 ? '0' + this.getHours() : this.getHours(),
            'h': this.getHours() % 12 === 0 ? 12 : (this.getHours() % 12 < 10 ? '0' + this.getHours() % 12 : this.getHours() % 12),
            'I': this.getMinutes(),
            'i': this.getMinutes() < 10 ? '0' + this.getMinutes() : this.getMinutes(),
            'S': this.getSeconds(),
            's': this.getSeconds() < 10 ? '0' + this.getSeconds() : this.getSeconds()
          },
          // 数字化列表
          timeset: {
            year: this.count(year),
            month: this.count(month),
            day: this.count(day),
            hour: this.count(hour),
            minute: this.count(minute),
            second: this.count(1)
          }
        }
      },
      /**
       * 时间计算
       * @param  {[type]} u [description]
       * @return {[type]}   [description]
       */
      count (time) {
        return Math.floor(Math.abs(this.target / time))
      },
      /**
       * 按照format转义格式转换时间
       * @param  {[String]} order 带有转义意义的字符串 如 "Y-m-d H:i:s" "M-D"
       * @return {[String or Object Date]}  返回转义后的时间或本对象
       */
      format (order) {
        try {
          var fm = '' + order
          for (var per in this.data().trope) {
            fm = (per && new RegExp(per).test(fm)) ? fm.replace(per, this.data().trope[per]) : fm
          }
          return fm
        } catch (e) {
          return this
        }
      },
      /**
       * 返回日期对象
       */
      timeset () {
        var bs = this.data().basicUnit
        var ts = this.data().timeset
        for (var per in ts) {
          ts[per] = this.count(bs[per])
          var diff = this.target - ts[per] * bs[per]
          this.target = diff >= 0 ? diff : 0
        }
        return ts
      },
      /**
       * 获取时间状态  例：3分钟/小时/天前 返回对象格式数据
       * {minute:3} / {hour:3} / {day:3}
       * @return {[object]}
       */
      state () {
        var bs = this.data().basicUnit
        if (this.target > bs.year) {
          return {year: this.count(bs.year)}
        }
        if (this.target > bs.month) {
          return {month: this.count(bs.month)}
        }
        if (this.target > bs.day) {
          return {day: this.count(bs.day)}
        }
        if (this.target > bs.hour) {
          return {hour: this.count(bs.hour)}
        }
        if (this.target > bs.minute) {
          return {minute: this.count(bs.minute)}
        }
        return {second: this.target}
      },
      _year () {
        return this.data().timeset.year
      },
      _month () {
        return this.data().timeset.month
      },
      _day () {
        return this.data().timeset.day
      },
      _hour () {
        return this.data().timeset.hour
      },
      _minute () {
        return this.data().timeset.minute
      },
      _second () {
        return this.data().timeset.second
      },
      /**
       * 是否在格林威治时间段
       * @return {Boolean} [description]
       */
      isGreenwichTime (number) {
        return number > this.getTime('1970-01-01 00:00:00') && number < this.getTime('2038-01-19 11:14:07')
      },
      /**
       * 返回时间戳
       * @return {[number]}
       */
      toNumber () {
        return this.getTime()
      },
      end () {
        return this
      }
    }).init(target)
  },
  /**
   * 去除字符串所有的空格
   * @argument {[string]}
   * @return {[string]}
   */
  trim (str) {
    return str.replace(/\s|\xA0/g, '')
  },
  /**
   * 数组去重
   * @argument {[string]}
   * @return {[string]}
   */
  arrunique (arr) {
    var res = []
    var json = {}
    for (var i = 0; i < arr.length; i++) {
      if (!json[arr[i]]) {
        res.push(arr[i])
        json[arr[i]] = 1
      }
    }
    return res
  },
  /**
  * @description 添加ajax请求参数
  * @param formObj from表单和接口参数的键值对
  * @param param ajax参数键值对
  */
  handleGetAjaxParams (formObj, param) {
    let resParam = param
    for (let key in formObj) {
      if (formObj[key] !== '') {
        resParam[key] = formObj[key]
      }
    }
    return resParam
  }
}
