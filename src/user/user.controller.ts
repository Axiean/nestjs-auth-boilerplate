import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
@ApiBearerAuth('access-token')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
