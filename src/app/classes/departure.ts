export class Departure {
    lineName: String;
    lineType: String;
    departureName: String;
    departureDatetime: Date;
    arrivalName: String;
    arrivalDatetime: Date;

    constructor(lineName: String, lineType: String, departureName: String, departureTime: Date,
                arrivalName: String, arrivalTime: Date) {
        this.lineName = lineName;
        this.lineType = lineType;
        this.departureName = departureName;
        this.departureDatetime = departureTime;
        this.arrivalName = arrivalName;
        this.arrivalDatetime = arrivalTime;
    }

    departureTime(): String {
        return this.departureDatetime.getHours()+":"+this.departureDatetime.getMinutes();
    }

    arrivalTime(): String {
        return this.arrivalDatetime.getHours()+":"+this.arrivalDatetime.getMinutes();
    }
}