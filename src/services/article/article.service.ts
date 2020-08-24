import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Article } from "entities/article.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// Kad god se prvi put pomene repozitorijum obavezno ga dodati u app modulu

@Injectable()
export class ArticleService extends TypeOrmCrudService<Article> {
    constructor(@InjectRepository(Article) private readonly article: Repository<Article>) {
        super(article);
    }
}