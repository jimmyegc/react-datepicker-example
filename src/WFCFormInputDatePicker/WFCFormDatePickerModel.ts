export interface WFCFormDatePickerModel {
  idComponent?: string;
  /* Basics */
  fieldName: string;
  internalName?: string;
  position?: string;
  sectionLabel?: string;
  guideText?: string;
  isRequired: boolean;
  readyonly: boolean;
  separator?: string;
  formatDate?: string;
  startOfWeek?: string;
  isHourRequired: boolean;
  formatHour?: string;
  daysOfWeek: daysOfWeek[];
  defaultDate?: string;
  defaultDateType: string;
  defaultDateValue: string;
  /* Advanced */
  canBlockDays: boolean;
  enabledDays: ListItem[];
  canEnabledDays: boolean;
  disabledDays: ListItem[];
  isRangeOfAge: boolean;
  minAge?: number;
  maxAge?: number;
  canSelectPastDates: boolean;
  maxPastDays?: number;
  canSelectFutureDates: boolean;
  maxFutureDays?: number;
  isEnableCurrentDay: boolean;
  maxHourCurrentDay?: string;
  column?: string;
}

interface ListItem {
  id: string;
  rawDate: string;
  humanDate: string;
  status: "enabled" | "disabled";
}

interface daysOfWeek {
  name: string;
  enabled: boolean;
}
