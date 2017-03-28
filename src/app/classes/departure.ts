export class Departure {
    lineName: String;
    lineType: String;
    departureName: String;
    departureTime: String;
    arrivalName: String;
    arrivalDatetime: Date;

    constructor(lineName: String, lineType: String, departureName: String, departureTime: String,
                arrivalName: String, arrivalTime: Date) {
        this.lineName = lineName;
        this.lineType = lineType;
        this.departureName = departureName;
        this.departureTime = departureTime;
        this.arrivalName = arrivalName;
        this.arrivalDatetime = arrivalTime;
    }

    arrivalTime(): String {
        if (this.arrivalDatetime == null) {
            return '?';
        }

        return this.dateToTimeString(this.arrivalDatetime);
    }

    private dateToTimeString(date: Date): String {
        var hours = date.getHours();
        var minutes = date.getMinutes();

        var hourString = hours >= 10 ? ''+hours : '0'+hours;
        var minuteString = minutes >= 10 ? ''+minutes : '0'+minutes;

        return hourString+':'+minuteString;
    }
}