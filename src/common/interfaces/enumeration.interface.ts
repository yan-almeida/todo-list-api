import { EnumerationDto } from '../dtos/enumeration.dto';
import { EnumerationEntity } from '../entities/enumeration.entity';

export interface IEnumerationService {
  findAll(): Promise<EnumerationEntity[]>;
  findOne(id: number): Promise<EnumerationEntity>;
}

export interface IEnumerationDtoController {
  findAll(): Promise<EnumerationDto[]>;
}
