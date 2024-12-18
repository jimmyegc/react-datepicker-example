export const objConf = {
  internalName: "example_date",
  fieldName: "Dia de nacimiento",
  position: "top",
  column: "one",
  sectionLabel: "Soy un texto emergente",
  guideText: "texto de apoyo",
  isRequired: false,
  readOnly: false,
  separator: "/",
  startOfWeek: "Lun",
  isHourRequired: false,
  formatDate: "dd MM yyyy",
  formatHour: "24",
  daysOfWeek: [
    {
      name: "Dom",
      enabled: true,
    },
    {
      name: "Lun",
      enabled: true,
    },
    {
      name: "Mar",
      enabled: true,
    },
    {
      name: "Mié",
      enabled: true,
    },
    {
      name: "Jue",
      enabled: true,
    },
    {
      name: "Vie",
      enabled: true,
    },
    {
      name: "Sáb",
      enabled: true,
    },
  ],
  defaultDateType: "",
  defaultDate: "",
  defaultDateValue: "",
  isRangeOfAge: false,
  minAge: null,
  maxAge: null,
  canSelectPastDates: false,
  maxPastDays: 5,
  canSelectFutureDates: true,
  maxFutureDays: 5,
  isEnableCurrentDay: true,
  maxHourCurrentDay: "20:45",
  canBlockDays: false,
  canEnabledDays: false,
  disabledDays: [
    {
      id: "ad1b8080-140b-4c79-99d0-b91f192da498",
      rawDate:
        "Thu Jul 18 2024 00:00:00 GMT-0600 (hora estándar central)@Thu Jul 18 2024 00:00:00 GMT-0600 (hora estándar central)",
      humanDate: "18/07/2024",
      status: "disabled",
    },
    {
      id: "6b28d0b4-b426-4d09-ab70-5db56b48fd32",
      rawDate:
        "Mon Jul 01 2024 00:00:00 GMT-0600 (hora estándar central)@Wed Jul 10 2024 00:00:00 GMT-0600 (hora estándar central)",
      humanDate: "01/07/2024-10/07/2024",
      status: "disabled",
    },
  ],
  enabledDays: [
    {
      id: "ad1b8080-140b-4c79-99d0-b91f192da498",
      rawDate:
        "Thu Jul 18 2024 00:00:00 GMT-0600 (hora estándar central)@Thu Jul 18 2024 00:00:00 GMT-0600 (hora estándar central)",
      humanDate: "18/07/2024",
      status: "enabled",
    },
  ], 
}