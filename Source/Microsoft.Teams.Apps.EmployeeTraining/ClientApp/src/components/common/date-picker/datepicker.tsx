﻿// <copyright file="date-picker.tsx" company="Microsoft">
// Copyright (c) Microsoft. All rights reserved.
// </copyright>

import * as React from "react";
import { Flex } from '@fluentui/react-northstar';
import { useState } from "react";
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { Fabric, Customizer, IDatePickerStrings } from 'office-ui-fabric-react';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { DarkCustomizations } from "../../../helpers/dark-customizations";
import { DefaultCustomizations } from "../../../helpers/default-customizations";
import Constants from "../../../constants/resources";
import moment from "moment";
import 'moment/min/locales.min';
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

let dayPickerStrings = {
    months: moment.months(),
    shortMonths: moment.monthsShort(),
    days: moment.weekdays(),
    shortDays: moment.weekdaysShort(),
    goToToday: ""
};

const onFormatDate = (date?: Date): string => {
    return !date ? '' : moment.utc(date).local().format("LL");
};

const StartDate: React.FC<IDateePickerProps> = props => {
    let bgcolor = "";
    let theme = props.theme;
    let datePickerTheme;

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
                                formatDate={onFormatDate}
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
