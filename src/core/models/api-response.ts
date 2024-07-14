
export class ApiResponse {
    public success:boolean = false;
    public data?:any
    public errorMessage?:string

    constructor(data:any, success = true){
        console.log(data);
        
        this.success = success
        this.data = data
    }

}