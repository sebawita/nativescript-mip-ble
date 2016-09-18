import {Observable} from 'data/observable';

import {MipFinder} from 'nativescript-mip-ble';
import {Mip} from 'nativescript-mip-ble';


export class HelloWorldModel extends Observable {
  public message: string;
  
  private mipFinder: MipFinder;

  private mip: Mip;

  driveDirection: number = 0;
  turnDirection: number = 0;

  constructor() {
    super();
    
    this.mipFinder = new MipFinder();
  }

  getPermissions() {
    this.mipFinder.getPermissions();
  }

  getMipsFoundList() {
        var mips: Array<Mip> = this.mipFinder.getMipsFoundList();
        console.log("getMipsFoundList");

        mips.forEach(mip => {
          console.log("mip found: " + mip.name);
        });
    }

    connect() {
      var mips: Array<Mip> = this.mipFinder.getMipsFoundList();
      if(mips.length > 0) {
        console.log("connecting...");
        this.mip = mips[0];
        this.mip.connect();
      }
    }

    clearFoundMipList() {
        this.mipFinder.clearFoundMipList();
        console.log("getMipsFoundList");
    }

    getMipsConnected() {
        var connectedMips: Array<Mip> = this.mipFinder.getMipsConnected();
        console.log("getMipsConnected count:" + connectedMips.length);
    }

    scanForMips() {
        this.mipFinder.scanForMips();
        console.log("scanForMips");
    }

    stopScanForMips() {
        this.mipFinder.stopScanForMips();
        console.log("stopScanForMips");
    }

    loop = 0;
    mipDriveTest() {
        this.loop = setInterval( () => {
            this.mip.drive(this.turnDirection/100, this.driveDirection/100);
        }, 50);
    }

    

}