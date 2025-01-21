import { Request, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import { InfoService } from "./info.service"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import { IInfoFilter, InfoFilterableFields } from "./info.constant"
import pick from "../../../shared/pick"
import { paginationFields } from "../../constants/pagination"
import { IInfo } from "./info.interface"

const createInfo = catchAsync(async (req: Request, res: Response) => {
    const  file  = req.file
    const info  = req.body
    const data = await InfoService.createInfo(info,file)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'School created  Successfully',
      data: data,
    })
  })
  
  
  const getAllInfo = catchAsync(async (req: Request, res: Response) => {
      const filters: IInfoFilter= {
        ...pick(req.query, InfoFilterableFields),
        searchTerm: req.query.searchTerm as string,
      };
      const paginationOptions = pick(req.query, paginationFields);
    
      const result = await InfoService.getAllInfo(filters, paginationOptions);
    
      sendResponse<IInfo[]>(res, {
        statusCode: httpStatus.OK,
        message: "Info retrieved successfully",
        success: true,
        meta: result.meta,
        data: result.data,
      });
    });
    
    const getSingleInfo = catchAsync(async (req: Request, res: Response) => {
      const InfoId = req.params.id;
      const result = await InfoService.getSingleInfo(InfoId);
    
      sendResponse<IInfo>(res, {
        statusCode: httpStatus.OK,
        message: "Info retrieved successfully",
        success: true,
        data: result,
      });
    });
    
    const updateInfo = catchAsync(async (req: Request, res: Response) => {
      const InfoId = req.params.id;
      const  file  = req.file
      const InfoData = req.body
  
      const result = await InfoService.updateInfo(InfoId, InfoData,file);
    
      sendResponse<IInfo>(res, {
        statusCode: httpStatus.OK,
        message: "Info updated successfully",
        success: true,
        data: result,
      });
    });
    
    const deleteInfo = catchAsync(async (req: Request, res: Response) => {
      const InfoId = req.params.id;
      const result = await InfoService.deleteInfo(InfoId);
    
      sendResponse<IInfo>(res, {
        statusCode: httpStatus.OK,
        message: "Info deleted successfully",
        success: true,
        data: result,
      });
    });

    export const InfoController={
        createInfo,
        getAllInfo,
        getSingleInfo,
        updateInfo,
        deleteInfo
    }