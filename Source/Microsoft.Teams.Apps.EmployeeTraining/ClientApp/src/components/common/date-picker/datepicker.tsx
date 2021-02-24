// <copyright file="date-picker.tsx" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

import * as React from "react";
import moment from "moment";
import { Flex } from '@fluentui/react-northstar';
import { useState } from "react";
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { Fabric, Customizer, IDatePickerStrings } from 'office-ui-fabric-react';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { DarkCustomizations } from "../../../helpers/dark-customizations";
import { DefaultCustomizations } from "../../../helpers/default-customizations";
import Constants from "../../../constants/resources";
import "./date-picker.css";

initializeIcons();

interface IDateePickerProps {
    selectedDate: Date;
    onDateSelect: (startDate: Date) => void,
    theme: string,
    screenWidth: number,
    minDate: Date;
    disableSelectionForPastDate:boolean
}

let dayPickerStrings: IDatePickerStrings = {
    months: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],

    shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

    days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],

    shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

    goToToday: 'Сегодня',
    prevMonthAriaLabel: 'Предыдущий месяц',
    nextMonthAriaLabel: 'Следующий месяц',
    prevYearAriaLabel: 'Предыдущий год',
    nextYearAriaLabel: 'Следующий год',
    closeButtonAriaLabel: 'Закрыть',
    monthPickerHeaderAriaLabel: '{0}, выберите для смены года',
    yearPickerHeaderAriaLabel: '{0}, выберите для смены месяца',
  };

const StartDate: React.FC<IDateePickerProps> = props => {
    let bgcolor = "";
    let theme = props.theme;
    let datePickerTheme;

    //initializeDate();
    // Date for Sunday in Jan month
    let date: Date = new Date("1970-01-04T00:00");
    let locale: string = "ru-RU";/*props.locale;*/

    for (let i = 0; i < 7; i++) {
        dayPickerStrings.days[i] = date.toLocaleDateString(locale, { weekday: "long" });
        dayPickerStrings.shortDays[i] = date.toLocaleDateString(locale, { weekday: "narrow" });
        date.setDate(date.getDate() + 1);
    }

    for (let i = 0; i < 12; i++) {
        dayPickerStrings.months[i] = date.toLocaleDateString(locale, { month: "long" });
        dayPickerStrings.shortMonths[i] = date.toLocaleDateString(locale, { month: "short" });
        date.setMonth(date.getMonth() + 1);
    }

    if (theme === Constants.dark) {
        bgcolor = "dark-datepicker";
        datePickerTheme = DarkCustomizations
    }
    else if (theme === Constants.contrast) {
        bgcolor = "dark-datepicker";
        datePickerTheme = DarkCustomizations
    }
    else {
        bgcolor = "default-datepicker";
        datePickerTheme = DefaultCustomizations
    }

    const [selectedDate, setDate] = useState<Date | null | undefined>(props.selectedDate);
    const [minDate, setMinDate] = useState<Date | null | undefined>(props.minDate);

    React.useEffect(() => {
        setDate(props.selectedDate);
    }, [props.selectedDate]);

    React.useEffect(() => {
        setMinDate(props.minDate);
    }, [props.minDate]);

    /**
       * Handle change event for cycle start date picker.
       * @param date | cycle start date.
       */
    const onSelectStartDate = (date: Date | null | undefined): void => {
        let startCycle = moment(date)
            .set('hour', moment().hour())
            .set('minute', moment().minute())
            .set('second', moment().second());
        props.onDateSelect(startCycle.toDate()!);
        setDate(startCycle.toDate());
    };

    return (
        <>
            {
                <Flex gap="gap.small">
                    <Fabric className="full-width">
                        <Customizer {...datePickerTheme}>
                            <DatePicker
                                className={bgcolor}
                                label={''}
                                strings={dayPickerStrings}
                                showMonthPickerAsOverlay={true}
                                minDate={minDate!}
                                isMonthPickerVisible={true}
                                value={selectedDate!}
                                onSelectDate={onSelectStartDate}
                                disabled={props.disableSelectionForPastDate}
                            />
                        </Customizer>
                    </Fabric>
                </Flex>
            }
        </>
    );
}

export default StartDate;
