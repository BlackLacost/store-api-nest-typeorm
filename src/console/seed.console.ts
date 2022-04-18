import { Inject } from '@nestjs/common';
import { Command, Console, createSpinner } from 'nestjs-console';
import { ItemsService } from '../items/items.service';
import { items } from './items.seed';

@Console()
export class SeedService {
  constructor(@Inject(ItemsService) private itemsService: ItemsService) {}

  @Command({
    command: 'seed',
    description: 'Seed DB',
  })
  async seed(): Promise<void> {
    const spin = createSpinner();

    spin.start('Seeding the DB\n');

    await this.seedItems();

    spin.succeed('Seeding done');
  }

  async seedItems() {
    for (let item of items) {
      await this.itemsService.create(item);
    }
  }

  @Command({
    command: 'clear',
    description: 'Clear DB',
  })
  async clear(): Promise<void> {
    const spin = createSpinner();

    spin.start('Clear the DB\n');

    await this.clearItems();

    spin.succeed('Clear done');
  }

  clearItems() {
    return this.itemsService.clear();
  }
}
