/**
 *  功能：
 */

'use strict';

import {TomatoState, TomatoType} from '../config/GlobalData'
import GlobalData from "../config/GlobalData";
import uuid from "uuid";

export default class TomatoModel {

    constructor(state = TomatoState.TomatoStateInit, type = TomatoType.TomatoTypeInit, curTask = {}) {
        this.id = uuid();
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deleted = false;

        this.startTime = new Date();
        this.endTime = new Date();
        this.isInterrupt = false;
        this.state = state;
        this.type = type;

        if (this.type === TomatoType.TomatoTypeWorking) {
            this.duration = GlobalData.defaultTomatoConfig.duration;
        } else if (this.type === TomatoType.TomatoTypeResting) {
            this.duration = GlobalData.defaultTomatoConfig.shortRestDuration;
        } else {
            this.duration = 0;
        }

        this.curTask = curTask
    }

    // constructor() {
    //     this.id = uuid();
    //     this.createdAt = new Date();
    //     this.updatedAt = new Date();
    //     this.deleted = false;
    //
    //     this.startTime = new Date();
    //     this.endTime = new Date();
    //     this.isInterrupt = false;
    //     this.state = TomatoState.TomatoStateInit;
    //     this.type = TomatoType.TomatoTypeInit;
    //     this.duration = 0;
    //     this.curTask = {}
    // }

    // start() {
    //     if (this === undefined) {
    //         return;
    //     }
    //
    //     this.state = TomatoState.TomatoStateStart;
    //     return this;
    // }
    //
    // stop() {
    //     if (this === undefined) {
    //         return;
    //     }
    //
    //     this.state = TomatoState.TomatoStateCancel;
    //     return this;
    // }
    //
    // finish() {
    //     if (this === undefined) {
    //         return;
    //     }
    //
    //     this.state = TomatoState.TomatoStateFinished;
    //     return this;
    // }

}