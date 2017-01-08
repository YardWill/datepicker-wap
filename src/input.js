const Datepicker = require('./datepicker');

class DateInput {
    constructor(o) {
        this.year = o.year;
        this.month = o.month;
        this.day = o.day;
        this.$node = o.$node;

        const str = `<div class="data-datepicker-input">${this.year}-${this.month}-${this.day}</div>`;
        this.$wrap = $(str);
        $(this.$node).append(this.$wrap);
        this.Datepicker = new Datepicker({
            year: this.year,
            month: this.month,
            day: this.day,
        });

        this.bindEvent();
        return this;
    }
    bindEvent() {
        this.$wrap.on('touchend', () => {
            this.Datepicker.show();
        });
        this.Datepicker.$confirm.on('touchend', () => {
            this.year = this.Datepicker.$year.number;
            this.month = this.Datepicker.$month.number;
            this.day = this.Datepicker.$day.number;
            this.$wrap.html(`${this.year}-${this.month}-${this.day}`);
        });
    }
}

module.exports = DateInput;
