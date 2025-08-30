export abstract class Mapper<Dto, Domain> {
  abstract toDomainObject(param: Dto): Domain;
  abstract toDataDto(param: Domain): Dto;
}
