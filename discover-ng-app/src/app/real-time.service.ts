import {Injectable} from '@angular/core';
import {Socket} from "ngx-socket-io";
import {BehaviorSubject} from "rxjs";
import {JobData} from "./data/job";

@Injectable({
  providedIn: 'root'
})
export class RealTimeService {

  private log: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _jobData: JobData;
  public jobData: BehaviorSubject<JobData> = new BehaviorSubject<JobData>(null);
  public jobFinished: BehaviorSubject<null> = new BehaviorSubject<null>(null);

  private i: number = 0;

  constructor(socket: Socket) {
    socket.on('connect', () => {
      this.log.next('Established connection to server');
    });
    socket.on('disconnect', (socket) => {
      this.log.next(this.log.value + '\nDisconnected from server');
    });
    socket.on('server message', (msg) => {
      this.log.next(this.log.value + '\n' + msg.message);
    });
    socket.on('job header', (header: any) => {
      this.setHeader(header);
    });
    socket.on('job data', (dataRow: any) => {
      setTimeout(() => {
        this.addRow(dataRow);
      }, this.i * 1000);
      this.i++;
    });
    socket.on('job finished', () => {
      this.jobFinished.next(null);
      this.i = 0;
    });
  }

  getLog() {
    return this.log;
  }

  public setHeader(header: string[]) {
    this._jobData = new JobData(header);
    this.jobData.next(this._jobData);
  }

  public addRow(dataRow: any) {
    this._jobData.addRow(dataRow);
  }
}
