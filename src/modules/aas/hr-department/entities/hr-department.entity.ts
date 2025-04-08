import { Column, Entity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { HrEmployee } from '~/modules/aas/hr-employee/entities';
import { BaseEntity } from '~/common/entities';

@Entity('hr_departments')
export class HrDepartment extends BaseEntity {
  @Column('varchar', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column({ type: 'int', name: 'parent_id' })
  parentId: number;

  @ManyToOne(() => HrDepartment, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parentDepartment: HrDepartment | null;

  @OneToMany(() => HrDepartment, (department) => department.parentDepartment)
  subDepartments: HrDepartment[];

  @OneToMany(() => HrEmployee, (employee) => employee.department)
  employees: HrEmployee[];
}
