import { Property } from '@mikro-orm/core';

export class BaseEntity {
	@Property()
	created_at: Date = new Date();

	@Property({ onUpdate: () => new Date() })
	updated_at = new Date();

	@Property({ hidden: true })
	isDeleted = false;

	@Property({ hidden: true })
	isPermanent = false;

	@Property({ type: 'uuid' })
	createdBy: string;

	@Property({ type: 'uuid' })
	updatedBy: string;
}
