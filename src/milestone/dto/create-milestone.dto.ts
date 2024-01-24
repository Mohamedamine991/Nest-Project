import { IsNumber, IsString } from "class-validator";

export class CreateMilestoneDto {
    @IsString()
    id:string
    @IsString()
    roadmapId:string
    @IsString()
    description:string
    @IsNumber()
    orderNumber:number

}
