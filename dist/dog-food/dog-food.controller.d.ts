import { DogFoodService } from './dog-food.service';
export declare class DogFoodController {
    private dogFoodService;
    constructor(dogFoodService: DogFoodService);
    getAllDogFood(): any[];
}
