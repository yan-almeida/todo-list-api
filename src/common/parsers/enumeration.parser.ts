import { EnumerationDto } from '../dtos/enumeration.dto';
import { EnumerationEntity } from '../entities/enumeration.entity';

export class EnumerationParser {
  static toEnumerationDto(entity: EnumerationEntity): EnumerationDto {
    return {
      id: entity.id,
      description: entity.description,
    };
  }
}
