import { IsNumber, IsString } from 'class-validator';

export class UpdateMilestoneDto {

    @IsString()
    roadmapId?:string
    @IsString()
    description?:string
    @IsNumber()
    orderNumber?:number
}