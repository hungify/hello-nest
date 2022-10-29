import { ForbiddenError } from '@casl/ability';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Action } from '~/common/enums/action.enum';
import { AbilityFactory } from '../abilities/ability.factory';
import { CheckAbility } from '../abilities/decorators/abilities.decorator';
import type { CreateUserDto } from './dto/createUser.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly abilityFactory: AbilityFactory,
  ) {}

  @Post()
  async create(@Body() { email }: CreateUserDto) {
    const user = await User.findOne({ where: { email: email } });
    const ability = this.abilityFactory.defineAbilitiesFor(user);

    ForbiddenError.from(ability).throwUnlessCan(Action.CREATE, User);
    return {
      message: 'You can create a user',
    };
  }

  @Get()
  @CheckAbility({ action: Action.READ, subject: User })
  async findAll() {
    const users = await User.find();
    return users;
  }
}
