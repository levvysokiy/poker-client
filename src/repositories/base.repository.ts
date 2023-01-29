import { FindOptions, Model, ModelStatic } from 'sequelize';

export class Repository<T> {
  private model: ModelStatic<Model>;

  constructor(model: ModelStatic<Model>) {
    this.model = model;
  }

  async findById(id: string): Promise<T | null> {
    return (await this.model.findByPk(id))?.toJSON() ?? null;
  }

  async findOne(options: FindOptions): Promise<T | null> {
    return (await this.model.findOne(options))?.toJSON() ?? null;
  }

  async create(body: Partial<T>): Promise<T> {
    return (await this.model.create(body)).toJSON();
  }
}
