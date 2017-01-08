/*
 * @Author: Yard
 * @Date: 2016-12-26 17:23:55
 * @Last Modified by: Yard
 * @Last Modified time: 2016-12-28 19:36:31
 */

class List {
    constructor(o) {
        this.pageY = 0;
        this.count = 0;
        this.days = 31;

        this.type = o.type;
        this.number = o.number;
        const li = this.getList(this.number);
        const str = `<div class="data-datepicker-${this.type}"><ul>${li}</ul></div>`;
        this.$wrap = $(str);
        this.$contant = this.$wrap.find('ul');

        this.bindEvent();
        return this;
    }
    getNumber() {
        if (this.type === 'year') {
            this.number = this.year(this.number);
        } else if (this.type === 'month') {
            this.number = this.month(this.number);
        } else {
            this.number = this.day(this.number);
        }
    }
    year(number) {
        return number;
    }
    month(number) {
        while (number > 12) {
            number -= 12;
        }
        while (number < 1) {
            number += 12;
        }
        return number;
    }
    day(number) {
        while (number > this.days) {
            number -= this.days;
        }
        while (number < 1) {
            number += this.days;
        }
        return number;
    }
    getList(number) {
        let li = '';
        switch (this.type) {
        case 'year':
            for (let i = number - 8; i < number + 7; i++) {
                li += `<li>${i}</li>`;
            }
            return li;
        case 'month':
            for (let i = number - 8; i < number + 7; i++) {
                let inode;
                if (i > 12) {
                    inode = i - 12;
                } else if (i < 1) {
                    inode = i + 12;
                } else {
                    inode = i;
                }
                li += `<li>${inode}</li>`;
            }
            return li;
        case 'day':
            for (let i = number - 8; i < number + 7; i++) {
                let inode;
                if (i > this.days) {
                    inode = i - this.days;
                } else if (i < 1) {
                    inode = i + this.days;
                } else {
                    inode = i;
                }
                li += `<li>${inode}</li>`;
            }
            return li;
        default:
            for (let i = number - 8; i < number + 7; i++) {
                li += `<li>${i}</li>`;
            }
            return li;
        }
    }
    getDays(month, runYear) {
        if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
            this.days = 31;
        } else if (month === 4 || month === 6 || month === 9 || month === 11) {
            this.days = 30;
        } else if (runYear) {
            this.days = 29;
        } else {
            this.days = 28;
        }
        this.number = this.number > this.days ? this.days : this.number;
        this.$contant.html(this.getList(this.number));
    }
    bindEvent() {
        this.$wrap.on('touchstart', (e) => {
            this.handleStart(e);
        }).on('touchmove', (e) => {
            this.handleMove(e);
        }).on('touchend', (e) => {
            this.handleEnd(e);
        });
    }
    handleStart(e) {
        this.pageY = e.pageY || e.targetTouches[0].pageY;
    }
    handleMove(e) {
        const pageY = e.pageY || e.targetTouches[0].pageY;
        const long = this.pageY - pageY;
        this.$contant.css('transform', `translateY(${-long}px)`);
        this.$contant.css('transition', 'transform 0.2s ease-out');
    }
    handleEnd(e) {
        const pageY = e.pageY || e.changedTouches[0].pageY;
        const long = this.pageY - pageY;
        this.count = Math.round(long / 40);
        this.$contant.css('transform', `translateY(${-((this.count) * 40)}px)`);
        this.$contant.css('transition', 'transform 0.2s ease-out');
        this.number += this.count;
        this.getNumber();
        setTimeout(() => {
            this.$contant.css('transform', 'translateY(0px)');
            this.$contant.css('transition', 'none');
            this.$contant.html(this.getList(this.number));
        }, 200);
    }
    clearTeansform() {
        this.$contant.css('transform', 'translateY(0px)');
        this.count = 0;
    }
}

module.exports = List;
