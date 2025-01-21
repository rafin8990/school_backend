import { Model } from "mongoose";

export type IInfo={
    school_name:string;
    address:string;
    logo:string;
    eiin:number;
    school_code:number;
    email:string;
    mobile_no:string;
    website:string;
}

export type infoModel = Model<IInfo, Record<string, unknown>>