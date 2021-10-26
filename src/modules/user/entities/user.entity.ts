import { UniqueIdentifierEntity } from 'src/common/entities/unique-identifier.entity';
import { EncryptedColumn } from 'src/decorators/encrypted-column.decorator';
import { NormalizedColumn } from 'src/decorators/normalized-column.decorator';
import { Entity } from 'typeorm';
import { AppRoles } from '../../../app.roles';


@Entity()
export class User extends UniqueIdentifierEntity {
  @EncryptedColumn()
  fullName: string;

  @EncryptedColumn()
  email: string;

  @EncryptedColumn({
    nullable: true,
  })
  phoneNumber?: string;

  @NormalizedColumn({
    nullable: true,
  })
  address?: string;

  @NormalizedColumn({
    default: AppRoles.USER,
    length: 40,
  })
  role: string;

  @NormalizedColumn()
  password: string;
}
