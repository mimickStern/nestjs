export interface Order {
    id: string;
    foodtype: string;
    animal: string;
    status: OrderStatus;
}
export declare enum OrderStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}
