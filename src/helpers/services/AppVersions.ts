import { randomUUID } from 'node:crypto';
import db from 'clients/database';

const tableName = 'app_versions';

export type BaseAppVersion = {
  app_version: string;
  is_allowed: boolean;
  version_to_update_to: string;
  no_longer_works: boolean;
  created_at?: string;
};

export interface AppVersion extends BaseAppVersion {
  id: string;
}

const AppVersions = {
  async create(data: BaseAppVersion) {
    const createdAt = new Date().toISOString();
    const id = randomUUID();

    const defalutAppVersions: AppVersion = {
      id,
      app_version: data.app_version,
      is_allowed: data.is_allowed,
      version_to_update_to: data.version_to_update_to,
      no_longer_works: data.no_longer_works,
      created_at: createdAt,
    };

    await db
      .insert({
        ...defalutAppVersions,
        ...data,
      })
      .into(tableName);

    return id;
  },

  async findOne(condition: Partial<AppVersion>): Promise<AppVersion> {
    return await db.select().where(condition).from(tableName).first();
  },

  async delete(condition: string) {
    await db.delete().from(tableName).where({
      id: condition,
    });
  },
};

export default AppVersions;
