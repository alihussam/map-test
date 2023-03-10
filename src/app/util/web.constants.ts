/**
 * @author RIAZ JAFFARY
 */

export const WebConstants = {
  DEFAULT_HEADERS: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  METHOD_TYPE: {
    POST: "POST",
    GET: "GET",
    PUT: "PUT",
    DELETE: "DELETE",
  },
  ORIGIN: {
    WEB: "WEB",
  },
  NUMERIC: {
    ZERO: 0,
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8,
    NINE: 9,
    TEN: 10,
  },
  BIN_STATUS: {
    FULL: "red",
    HALF_FULL: "orange",
    EMPTY: "green",
  },
  INT_ZERO: 0,
  INT_ONE: 1,
  INT_TWO: 2,
  INT_THREE: 3,
  INT_FOUR: 4,
  INT_FIVE: 5,
  DATE: {
    FORMAT_YYYY_MM_DD: "yyyy-MM-dd",
    FORMAT_MM_DD_YYYY: "MM-dd-yyyy",
    FORMAT_DD_MM_YYYY: "dd/MM/yyyy",
    DAYS_IN_WEEK: 6,
    LAST_DAY_OF_MONTH: 29,
  },
  USER: {
    LOGGED_IN: "CITS_CD_LOGGED_IN_USER", //"currentUser",
    ID: "CITS_CD_USER_ID",
    ORGANIZATION_ID: "CITS_CD_ORGANIZATION_ID",
    TOKEN: "CITS_CD_USER_TOKEN",
    AUTHORITIES: "CITS_CD_AUTHORITIES",
  },
  USER_ROLE: {
    SUPER_ADMIN: "ROLE_SUPER_ADMIN",
    ADMIN: "ROLE_ADMIN",
    MANAGER: "ROLE_MANAGER",
    PEO: "ROLE_PEO",
  },
  STATUS: {
    CODE_SUCCESS: 0,
    MSG_SUCCESS: "success",
    CODE_NOTFOUND: 404,
    MSG_NOTFOUND: "not found",
    CODE: {
      ACTIVE: 1,
      INACTIVE: 2,
      ORGANIZATION_ACTIVE: 11,
      ORGANIZATION_INACTIVE: 12,
    },
    MSG: {
      ACTIVE: "Active",
      INACTIVE: "Inactive",
      ORGANIZATION_ACTIVE: "Active",
      ORGANIZATION_INACTIVE: "Inactive",
    },
  },
  ERROR: {
    UNDEFINED_INTERNAL_SERVER: "Internal server error undefined",
    INTERNAL_SERVER: "Internal server error",
  },
  MAP_TAB: {
    CURRENT_SESSION: "CURRENT_SESSION",
    PAST_SESSION: "PAST_SESSION",
    LIVE_SESSION: "LIVE_SESSION",
    TODAY_SESSION: "TODAY_SESSION",
  },
  GRAPH: {
    ACTION_TYPE: {
      DAILY: "DAILY",
      WEEKLY: "WEEKLY",
      MONTHLY: "MONTHLY",
      DATE_RANGE: "DATE_RANGE",
    },
    ACTION_TYPE_DAILY: "DAILY",
    ACTION_TYPE_WEEKLY: "WEEKLY",
    ACTION_TYPE_MONTHLY: "MONTHLY",
    ACTION_TYPE_DATE_RANGE: "DATE_RANGE",
  },
  ACTION_TAKEN: {
    TICKET: "TICKET",
    VEHICLE_LEFT: "VEHICLE_LEFT",
    WARNING_GIVEN: "WARNING_GIVEN",
    PERMIT: "PERMIT",
    PEO_NOT_AVAILABLE: "PEO_NOT_AVAILABLE",
    TICKET_VALUE: "Ticket",
    VEHICLE_LEFT_VALUE: "Vehicle Left",
    WARNING_GIVEN_VALUE: "Warning Given",
    PERMIT_VALUE: "Permit",
    PEO_NOT_AVAILABLE_VALUE: "Peo not available",
  },
  SPOT_STATUS: {
    OCCUPIED: "Occupied",
    UNOCCUPIED: "Unoccupied",
  },
  API_URL: {
    // DONE
    LOGIN: "/api/authenticate",
    BIN_SPOT_COLOR: {
      FIND: "/api/binSpotColor/find",
      FIND_BY_ORGANIZATION: "/api/binSpotColor/find/organization",
      ADD: "/api/binSpotColor/add",
      UPDATE: "/api/binSpotColor/update",
      DELETE: "/api/binSpotColor/delete/",
    },
    BIN_TYPE: {
      FIND: "/api/bintype/find-all",
      FIND_BY_ORGANIZATION: "/api/bintype/findbyOrgId",
      ADD: "/api/bintype/add",
      UPDATE: "/api/bintype/update",
      DELETE: "/api/bintype/delete",
    },
    ORGANIZATION: {
      FIND_ALL_ORGANIZATION: "/api/organization/find-all",
      FIND_ALL_ACTIVE_ORGANIZATION: "/api/organization/find-all-active",
      FIND_ORGANIZATION_BY_ID: "/api/organization/find/",
      ADD_ORGANIZATION: "/api/organization/add",
      UPDATE_ORGANIZATION: "/api/organization/update",
      DELETE_ORGANIZATION: "/api/organization/delete/",
    },
    DESIGNATION: {
      FIND_ALL_DESIGNATIONS: "/api/role/find-all-roles",
      FIND_ALL_DESIGNATIONS_Active: "/api/role/find-all-active-roles",
    },
    USER: {
      FIND_ALL: "/api/user/find-all-users",
      FIND_USER_BY_ID: "/api/user/find-user-by-id/",
      FIND_ALL_USER_BY_ORGANIZATION: "/api/user/find-by-organization/",
      ADD_USER: "/api/user/add-user",
      UPDATE_USER: "/api/user/update-user",
      DELETE_USER: "/api/user/delete-user/",

      // not implemented
      FORGOT_PASSWORD: "/api/user/forgot",
      FORGOT_EMAIL_ADDRESS: "/api/user/forgot-email-address",
      VERIFY_RESET_TOKEN: "/api/user/verify-reset-token",
      RESET_PASSWORD: "/api/user/reset-password",
      CHANGE_PASSWORD: "/api/user/change-password",
      PROFILE: "",
      TERMINATE_USER: "",
      FIND_USER_PRIVILEGES: "/api/userprivilege/findUserPrivilegesByUserId/",
      ADD_USER_PRIVILEGE: "/api/userprivilege/add",
      DELETE_USER_PRIVILEGE:
        "/api/userprivilege/deleteUserPrivilegeByUserIdAndPrivId/",
    },
    PARKING_SPOT: {
      ADD_PARKING_SPOT: "/api/parkingspot/add",
      UPDATE_PARKING_SPOT: "/api/parkingspot/update",
      DELETE_PARKING_SPOT: "/api/parkingspot/delete/",
      FIND_ALL_PARKING_SPOT: "/api/parkingspot/find-all",
      FIND_PARKING_SPOT_BY_ORGANIZATION: "/api/parkingspot/findbyOrgId/",
      FIND_PARKING_SPOT_BY_ID: "/api/parkingspot/findById/",

      // not implemented
      FILE_UPLOADER_PARKING_SPOT: "/api/parkingspot/upload",
      FIND_ALL_PARKING_SPOT_BY_DEALER_ID: "/api/parkingspot/findbydealerId/",
      FIND_PARKING_SPOT_BY_DEVEUI: "/api/parkingspot/findByDevEUI/",
    },

    // not implemented
    LOGOUT: "/api/logout",
    PRIVILEGE: {
      FIND_ALL_PRIVILEGE: "/api/privilege/find-all",
    },
    MAP: {
      SESSION_EXPIRED_ACTION: "/api/map/session-expired-action",
      FIND_ALL_PARKING_SPOT: "/api/map/find-all-parking-spot",
      FIND_CURRENT_SESSIONS: "/api/map/find-all-current-sessions",
      FIND_EXPIRED_SESSIONS: "/api/map/find-records",
      FIND_LIVE_SESSIONS: "/api/map/payment/find-live-sessions",
      FIND_TODAY_SESSIONS: "/api/map/payment/find-today-sessions",
      FIND_SINGLE_PARKING_SPOT_BY_DEVEUI:
        "/api/map/find-parking-spot-by-DevEui/",
    },
    DEALER: {
      FIND_ALL_DEALER: "/api/dealer/find-all",
      ADD_DEALER: "/api/dealer/add",
      UPDATE_DEALER: "/api/dealer/update",
      DELETE_DEALER: "/api/dealer/delete/",
      FIND_DEALER_BY_ORGANIZATION: "/api/dealer/findDealerByOrgId/",
    },
    GEOFENCE: {
      FIND_ALL_GEOFENCE: "/api/geofence/find-all",
      ADD_GEOFENCE: "/api/geofence/add",
      UPDATE_GEOFENCE: "/api/geofence/update",
      DELETE_GEOFENCE: "/api/geofence/delete/",
      FILE_UPLOADER_GEOFENCE: "",
      FIND_GEOFENCE_BY_ORGANIZATION: "/api/geofence/findbyOrgId/",
    },
    GEOFENCE_DETAIL: {
      FIND_ALL_GEOFENCE_DETAIL: "/api/geofencedetail/find-all",
      ADD_GEOFENCE_DETAIL: "/api/geofencedetail/add",
      UPDATE_GEOFENCE_DETAIL: "/api/geofencedetail/update",
      DELETE_GEOFENCE_DETAIL: "/api/geofencedetail/delete/",
      GEOFENCE_DETAIL_FIND_BY_GEOFENCE_ID:
        "/api/geofencedetail/find-all-By-GeofenceId/",
    },
    VEHICLE: {
      FIND_ALL_VEHICLE: "/api/vehicle/find-all",
      ADD_VEHICLE: "/api/vehicle/add",
      UPDATE_VEHICLE: "/api/vehicle/update",
      DELETE_VEHICLE: "/api/vehicle/delete/",
      FIND_ALL_BY_DEALER_ID: "/api/vehicle/findbydealerId/",
      FILE_UPLOADER_VEHICLE: "",
      FIND_VEHICLE_BY_ORGANIZATION: "/api/vehicle/findbyOrgId/",
      FIND_ALL_WITH_DEVICE: "/api/vehicle/find-allwithdevice",
      FIND_ALL_VEHICLE_WITH_LAST_LAT_LNG:
        "/api/vehicle/find-allvehicleswithlastlatlng",
    },
    DEVICE: {
      FIND_ALL_DEVICE: "/api/device/find-all",
      ADD_DEVICE: "/api/device/add",
      UPDATE_DEVICE: "/api/device/update",
      DELETE_DEVICE: "/api/device/delete/",
      FILE_UPLOADER_DEVICE: "",
      FIND_DEVICE_BY_ORGANIZATION: "/api/device/findbyOrgId/",
      FIND_ALL_DEVICE_TYPE: "/api/devicetype/find-all",
    },
    SENSOR: {
      FIND_ALL_SENSOR: "",
      ADD_SENSOR: "/api/sensor/add",
      UPDATE_SENSOR: "",
      DELETE_SENSOR: "/api/sensor/delete/",
      FIND_ALL_SENSOR_TYPE: "/api/sensortype/find-all",
      FIND_ALL_SENSOR_BY_DEVICE_ID: "/api/sensor/findSenorByDeviceId/",
    },
    DEVICE_ALERT: {
      FIND_ALL_DEVICE_ALERT: "/api/devicealert/find-all",
      ADD_DEVICE_ALERT: "/api/devicealert/add",
      UPDATE_DEVICE_ALERT: "/api/devicealert/update",
      DELETE_DEVICE_ALERT: "/api/devicealert/delete/",
      FIND_DEVICE_ALERT_BY_ORGANIZATION: "/api/devicealert/findbyOrgId/",
    },
    GPS_TRACKER: {
      FIND_BY_DEV_EUI: "/api/gpstracker/findbydevEui/",
      FIND_ALL_TRACKER_LAST_LAT_LNG: "/api/gpstracker/find-all",
    },
    REPORT: {
      FIND_REPORT_BY_MONTH: "/api/geofence-activity/findbymonth/",
      FIND_REPORT_DETAIL_BY_DATE: "/api/geofence-activity/finddetailbydate/",
      FIND_REPORT_BY_DATERANGE: "/api/geofence-activity/findbydaterange/",
      FIND_REPORT_BY_DAILY: "/api/geofence-activity/findbydaily/",
      FIND_REPORT_BY_WEEK: "/api/geofence-activity/findbyweek/",
      UTILIZATION_COUNT: "/api/report/utilization-count",
      UTILIZATION_COUNT_DATA_TABLE: "/api/report/utilization-count-data-table",
      UTILIZATION_HOUR: "/api/report/utilization-hour",
      UTILIZATION_HOUR_DATA_TABLE: "/api/report/utilization-hour-data-table",
      HOURLY_COUNT: "/api/report/hourly-count",
      HOURLY_COUNT_DATA_TABLE: "/api/report/hourly-count-data-table",
      PEO_TEAM_PERFORMANCE: "/api/report/peo-team-performance",
      PEO_TEAM_PERFORMANCE_DATA_TABLE:
        "/api/report/peo-team-performance-data-table",
      TICKET_ISSUED: "/api/report/find-daily-ticket-count",
      TICKET_ISSUED_DATA_TABLE:
        "/api/report/find-daily-ticket-count-data-table",
      ACTION_NOT_TAKEN: "/api/report/find-action-not-taken",
      ACTION_NOT_TAKEN_DETAIL: "/api/report/find-action-not-taken-detail",
      PAST_ACTION_DETAIL: "/api/report/find-past-action-detail",
    },
    EXCEL: {
      FIND_OCCUPANCY_COUNT: "/api/excel/find-occupancy-count",
      FIND_OCCUPANCY_HOUR: "/api/excel/find-occupancy-hour",
      FIND_OCCUPANCY_TIME_COUNT: "/api/excel/find-occupancy-time-count",
      FIND_PEO_ACTION: "/api/excel/find-peo-action",
      FIND_DAILY_TICKET_ISSUED: "/api/excel/find-daily-ticket-issued",
      FIND_ACTION_NOT_TAKEN_DETAIL: "/api/excel/find-action-not-taken-detail",
    },
    REGISTRATION: {
      FIND_ALL_REGISTRATION: "/api/registration/find-all",
      ADD_REGISTRATION: "/api/registration/add",
      UPDATE_REGISTRATION: "/api/registration/update",
      DELETE_REGISTRATION: "/api/registration/deletebyId/",
      FIND_REGISTRATION_BY_ID: "/api/registration/findById/",
    },
    LOOKUP: {
      FIND_ALL_PEO_USERS: "/api/lookup/find-all-peo-users",
    },
    PREFERENCES: {
      FIND_ALL_PREFERENCES: "/api/preference/find-all",
      ADD_PREFERENCES: "/api/preference/add",
      UPDATE_PREFERENCES: "/api/preference/update",
      DELETE_PREFERENCES: "/api/preference/delete/",
    },
    NOTIFICATION: {
      FIND_ALL_ACTIVE: "/api/notifications/find-all-notification",
      MARK_AS_READ: "/api/notifications/mark-notification-as-read",
      MARK_ALL_AS_READ: "/api/notifications/mark-all-notification-as-read",
    },
  },
  WEB_URL: {
    HOME: "",
    LOGIN: "login",
    ADD_NEW_PASSWORD: "add-new-password",
    FORGOT_PASSWORD: "forget-password",
    FORGOT_USERNAME: "forget-username",
    USER: "user",
    USER_PROFILE: "user/user-profile",
    CHANGE_PASSWORD: "user/change-password",
    ORGANIZATION: "organization",
    DEALER: "dealer",
    GEOFENCE: "geofence",
    GEOFENCE_DETAIL: "geofence/geofence-detail",
    PARKING_SPOT: "parking-spot",
    VEHICLE: "vehicle",
    DEVICE: "device",
    DEVICE_ALERT: "device/device-alert",
    MAP: "map",
    MAP_VIEW: "map/map-view",
    DEVICE_MATRICS: "dashboard/device-metrics",
    REAL_TIME_MONITORING: "dashboard/rtmonitoring",
    REPORT: "report",
    REGISTRATION: "registration",
    HISTORY_MAP: "map/history-map",
  },
  WEB_SOCKET: {
    ENDPOINT: {
      WEB_NOTIFICATION: "/web-notification",
    },
    TOPIC: {
      MAP: "",
      RTM_NOTIFICATION: "/topic/rtmonitoring-notification",
      DEVICE_METRICS: "",
      SENSOR: "",
      WEB_NOTIFICATION: "/topic/web-notification",
      BINWISE_NOTIFICATION: "/topic/binwise-notification",
      SESSION_EXPIRED_NOTIFICATION: "/topic/session-expired-notification",
      REPORT_NOTIFICATION: "",
    },
    PAYLOAD_TYPE: {
      MESSAGE: "MESSAGE",
    },
    WEB_SOCKET_URL: "wss://apps2.conurets.com:8443/staging-binwise-web-v1",
  },
};
