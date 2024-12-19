import { Migration } from '@mikro-orm/migrations';

export class Migration20241212133518 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "design" ("id" text not null, "imageLocation" text not null, "prompt" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "design_pkey" primary key ("id"));');
    this.addSql('CREATE INDEX IF NOT EXISTS "IDX_design_deleted_at" ON "design" (deleted_at) WHERE deleted_at IS NULL;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "design" cascade;');
  }

}
