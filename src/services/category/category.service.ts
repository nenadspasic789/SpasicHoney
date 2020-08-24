import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Category } from "entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// Kad god se prvi put pomene repozitorijum obavezno ga dodati u app modulu

@Injectable()
export class CategoryService extends TypeOrmCrudService<Category> {
    constructor(@InjectRepository(Category) private readonly category: Repository<Category>) {
        super(category);
    }
    
}

