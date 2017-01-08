const getDatepicker = require('./datepicker');

const datePicker = getDatepicker();

class DateInput {
    constructor() {
        // this.year = o.year;
        // this.month = o.month;
        // this.day = o.day;
        const me = this;

        datePicker.on('ok', function() {
            me.year = this.$year.number;
            me.month = this.$month.number;
            me.day = this.$day.number;
            $(me.element).html(`${me.year}-${me.month}-${me.day}`);
        });
        datePicker.on('cancel', function() {

        });

        this.init();
        return this;
    }
    init() {
        const me = this;
        const $dp = $('[data-datepicker]').removeAttr('data-datepicker');
        if ($dp.length) {
            $dp.on('touchend', function() {
                me.element = $(this);
                const date = me.element.html().trim().split('-');
                datePicker.reinit({
                    year: +date[0],
                    month: +date[1],
                    day: +date[2],
                });
                datePicker.show();
            });
        }
    }
}

$(document).ready(() => {
    new DateInput({});
});

module.exports = DateInput;
