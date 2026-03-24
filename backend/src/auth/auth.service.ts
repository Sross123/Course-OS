import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
   private readonly logger = new Logger(AuthService.name);
  constructor(private readonly userService: UserService) { }
  async create(createAuthDto: CreateAuthDto) {
    const { email, name, password, role } = createAuthDto;

    const existingUser = await this.userService.getUserByEmail(email);

    if(existingUser){
      throw new ConflictException("Email already taken");
    }

    const user = await this.userService.createUser(createAuthDto);
    this.logger.log(`New user created: ${user.id}`);

    return {
      message: 'User registered successfully.',
      data: user,
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
