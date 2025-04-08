import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '~/common/entities';
import { HrDepartment } from '~/modules/aas/hr-department/entities';

@Entity('hr_employees')
export class HrEmployee extends BaseEntity {
  @ApiProperty({ type: 'string' })
  @Column('varchar', { name: 'username', nullable: true, length: 255 })
  username: string | null;

  @Exclude()
  @Column('varchar', { name: 'password', nullable: true, length: 255 })
  password: string;

  @ApiProperty({ type: 'string' })
  @Column('varchar', { name: 'fullname', nullable: true, length: 255 })
  fullname: string | null;

  @ApiProperty({ type: 'string' })
  @Column('varchar', { name: 'fullname_en', nullable: true, length: 255 })
  fullnameEn: string | null;

  @ApiProperty({ type: 'string' })
  @Column('varchar', { name: 'profile', nullable: true, length: 255 })
  profile: string | null;

  @ApiProperty({ type: 'string' })
  @Column('varchar', { name: 'phoneNumber', nullable: true, length: 255 })
  phoneNumber: string;

  @ApiProperty({ type: 'string' })
  @Column('varchar', { name: 'gender', nullable: true, length: 255 })
  gender: string | null;

  @ApiProperty({ type: 'string' })
  @Column('varchar', { name: 'day_of_dob', nullable: true, length: 255 })
  dayOfDob: string | null;

  @ApiProperty({ type: 'string' })
  @Column('varchar', { name: 'month_of_dob', nullable: true, length: 255 })
  monthOfDob: string | null;

  @ApiProperty({ type: 'string' })
  @Column('varchar', { name: 'year_of_dob', nullable: true, length: 255 })
  yearOfDob: string | null;

  @ApiProperty({ type: 'string' })
  @Column('varchar', { name: 'nationality', nullable: true, length: 255 })
  nationality: string | null;

  @ApiProperty({ type: 'string' })
  @Column('varchar', { name: 'national_id', nullable: true, length: 255 })
  nationalId: string | null;

  @ApiProperty({ type: 'string' })
  @Column('varchar', { name: 'position_level', nullable: true, length: 255 })
  positionLevel: string | null;

  @ApiProperty({ type: 'string' })
  @Column('varchar', {
    name: 'additional_position_level',
    nullable: true,
    length: 255,
  })
  additionalPositionLevel: string | null;

  @ManyToOne(() => HrDepartment, { nullable: true })
  @JoinColumn({ name: 'leader_department_id' })
  leaderDepartment: HrDepartment | null;

  @ManyToOne(() => HrDepartment, { nullable: true })
  @JoinColumn({ name: 'general_department_id' })
  generalDepartment: HrDepartment | null;

  @ManyToOne(() => HrDepartment, { nullable: true })
  @JoinColumn({ name: 'department_id' })
  department: HrDepartment | null;

  @ManyToOne(() => HrDepartment, { nullable: true })
  @JoinColumn({ name: 'office_id' })
  office: HrDepartment | null;

  @ApiProperty({ type: 'string' })
  @Column('varchar', { name: 'officer_id', nullable: true, length: 255 })
  officerId: string | null;

  @ApiProperty({ type: 'string' })
  @Column('varchar', { name: 'wage_scale', nullable: true, length: 255 })
  wageScale: string | null;

  @ApiProperty({ type: 'string' })
  @Column('varchar', {
    name: 'contact_city_or_province',
    nullable: true,
    length: 255,
  })
  contactCityOrProvince: string | null;

  @ApiProperty({ type: 'string' })
  @Column('varchar', { name: 'contact_district', nullable: true, length: 255 })
  contactDistrict: string | null;

  @ApiProperty({ type: 'string' })
  @Column('varchar', { name: 'contact_commune', nullable: true, length: 255 })
  contactCommune: string | null;

  @ApiProperty({ type: 'string' })
  @Column('varchar', { name: 'contact_village', nullable: true, length: 255 })
  contactVillage: string | null;

  @ApiProperty({ type: 'boolean' })
  @Column('tinyint', {
    name: 'newPassword',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  newPassword: boolean | null;
}
