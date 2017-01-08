/*
 * @Author: Yard
 * @Date: 2016-12-26 17:23:55
 * @Last Modified by: Yard
 * @Last Modified time: 2016-12-28 19:35:38
 */
require('./index.less');
const List = require('./list');

/**
 * 伪观察者，同名事件会相互覆盖
 */
function toArray(arr, start, end) {
    return Array.prototype.slice.call(arr, start || 0, end || arr.length);
}
class Observer {
    constructor() {
        this._events = {};
    }
    on(type, fn) {
        this._events[type] = fn;
        return this;
    }
    trigger(type) {
        const fn = this._events[type];
        if (fn) {
            const args = toArray(arguments, 1);
            fn.apply(this, args);
        }
        return this;
    }
    off(type) {
        delete this._events[type];
        this._events[type] = null;
        return this;
    }
}

class Datepicker extends Observer {
    constructor(o) {
        super();
        this.init(o);
        this.bindEvent();
    }
    init(o) {
        this.option = o;

        const today = new Date();
        this.year = this.option.year || today.getFullYear();
        this.month = this.option.month || today.getMonth() + 1;
        this.day = this.option.day || today.getDate();

        const str = `<div class="data-datepicker-modal dp-hide"><div class="data-datepicker-box">
            <div class="data-datepicker-head">
                <div class="data-datepicker-cancel">取消</div>
                <div class="data-datepicker-confirm">确认</div>
            </div>
            <div class="data-datepicker-xian"></div>
            
            <div class="data-datepicker-body">
            </div>
        </div></div>`;

        this.$wrap = $(str);
        this.$body = this.$wrap.find('.data-datepicker-body');
        this.$confirm = this.$wrap.find('.data-datepicker-confirm');
        this.$cancel = this.$wrap.find('.data-datepicker-cancel');

        const $year = new List({ type: 'year', number: this.year });
        const $month = new List({ type: 'month', number: this.month });
        const $day = new List({ type: 'day', number: this.day });
        this.$year = $year;
        this.$month = $month;
        this.$day = $day;
        this.$body.append($year.$wrap, $month.$wrap, $day.$wrap);
        $('body').append(this.$wrap);
    }
    reinit(o) {
        this.option = o;

        const today = new Date();
        this.$year.number = this.option.year || today.getFullYear();
        this.$month.number = this.option.month || today.getMonth() + 1;
        this.$day.number = this.option.day || today.getDate();
        this.$year.$contant.html(this.$year.getList(this.$year.number));
        this.$month.$contant.html(this.$month.getList(this.$month.number));
        this.$day.$contant.html(this.$day.getList(this.$day.number));
    }
    show() {
        this.$wrap.removeClass('dp-hide');
        return this;
    }
    hide() {
        this.$wrap.addClass('dp-hide');
        return this;
    }
    isRunYear(year) {
        if (year % 100 === 0 && year % 400 === 0) {
            return true;
        } else if (year % 100 !== 0 && year % 4 === 0) {
            return true;
        } else {
            return false;
        }
    }
    bindEvent() {
        const me = this;
        this.$wrap.on('touchstart', () => false).find('.data-datepicker-box').on('touchend', (e) => {
            e.stopPropagation();
        });
        this.$body.find('.data-datepicker-year').on('touchend', () => {
            this.$day.getDays(this.$month.number, this.isRunYear(this.$year.number));
        });
        this.$body.find('.data-datepicker-month').on('touchend', () => {
            this.$day.getDays(this.$month.number, this.isRunYear(this.$year.number));
        });
        this.$confirm.on('touchend', () => {
            me.trigger('ok');
            this.hide();
        });
        this.$cancel.on('touchend', () => {
            me.trigger('cancel');
            this.hide();
        });
        this.$wrap.on('touchend', () => {
            this.hide();
        });
    }
}

let datepicker;
function getDatePicker() {
    if (!datepicker) {
        datepicker = new Datepicker({});
    }
    return datepicker;
}

module.exports = getDatePicker;
