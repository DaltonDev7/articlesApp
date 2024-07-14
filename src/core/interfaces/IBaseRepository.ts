
export interface IBaseRepository<Table> {
    getById(id:number) : Promise<Table | null>;
    get():Promise<Table[] | []>;
    create(payload: Table): Promise<Table>;
    delete(id: number): Promise<boolean>;
    update(payload: Table): Promise<Table>;
}