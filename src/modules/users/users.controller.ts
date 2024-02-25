import { ForbiddenError } from '@casl/ability';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AbilityFactory } from '../abilities/ability.factory';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { AppAction } from '~/common/enums/action.enum';
import { CreateUserDto } from './dtos/create-user.dto';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@Controller('users')
@UseGuards(AccessTokenGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly abilityFactory: AbilityFactory,
  ) {}

  @Post()
  async create(@Body() { email }: CreateUserDto) {
    const user = await UserEntity.findOne({ where: { email: email } });
    const ability = this.abilityFactory.defineAbilitiesFor(user);

    ForbiddenError.from(ability).throwUnlessCan(AppAction.CREATE, UserEntity);
    return {
      message: 'You can create a user',
    };
  }

  @Get()
  async findAll() {
    const users = await UserEntity.find();
    return users;
  }
}
