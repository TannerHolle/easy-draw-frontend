import { Injectable } from '@angular/core';

export enum mainDisplayActiveViewTypes {
  information = 'information',
  search = 'search',
  addRecords = 'addRecords',
}

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  constructor() { }

  public mainDisplayActiveView: mainDisplayActiveViewTypes = mainDisplayActiveViewTypes.information;
  setMainDisplayActiveView(val: mainDisplayActiveViewTypes): mainDisplayActiveViewTypes {
    this.mainDisplayActiveView = val;
    return this.mainDisplayActiveView;
  }

  public isLoading: boolean = false;
  turnOnIsLoading(): boolean {
    this.isLoading = true;
    return this.isLoading;
  }
  turnOffIsLoading(): boolean {
    this.isLoading = false;
    return this.isLoading;
  }
}
