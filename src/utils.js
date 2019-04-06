import moment from "moment";

//1.convert a date string to moment
export function momentDate(date) {
    if (date) {
        return moment(moment(date).format("MM/DD/YYYY"), "MM/DD/YYYY")
    } else {
        return "";
    }
}//6.convert a date string to moment
export function momentToDate(date) {
    if (date) {
        return moment(moment(date).format("MM/DD/YYYY"), "MM/DD/YYYY")
    } else {
        return "";
    }
}

//7.convert a date string to moment string
export function momentDate(date) {
    if (date) {
        return moment(date).format("MM/DD/YYYY");
    } else {
        return "";
    }
}

//2.convert a date string to moment string
export function momentDateToString(date) {
    if (date) {
        return moment(date).format("MM/DD/YYYY");
    } else {
        return "";
    }
}