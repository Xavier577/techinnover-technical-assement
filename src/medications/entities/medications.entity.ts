import PartialInstantiable from '@common/utils/partial-instantiable';

export class Medication extends PartialInstantiable<Medication> {
  id: string;
  name: string;
  weight: number;
  code: string;
  image: string;
  droneId: string;
}
