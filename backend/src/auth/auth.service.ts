import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }
  async create(createAuthDto: CreateAuthDto) {
    const { email, name, password, role } = createAuthDto;

    const existingUser = await this.userService.getUserByEmail(email);

    if (existingUser) {
      throw new ConflictException("Email already taken");
    }

    const user = await this.userService.createUser(createAuthDto);
    this.logger.log(`New user created: ${user.id}`);

    return {
      message: 'User registered successfully.',
      data: user,
    };
  }

  async login(loginAuthDto: LoginAuthDto) {
    /**
     * 1. check valid email and password
     * 2. check email is valid and exist
     * 3. 
     */
    const { email, password } = loginAuthDto;

    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const payload = {
      sub: user?.id,
      role: user?.role
    }

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: "15m"
    });

    // create a refresh token (Longer expiry than access token)
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    const { password: _password, ...userWithoutPassword } = user;

    return {
      message: 'User authenticated successfully.',
      data: {
        user: userWithoutPassword,
        accessToken,
        refreshToken,
      },
    };
  }

  findAll() {
    return this.userService.getAllUsers();
  }

  findOne(id: string) {
    return this.userService.getuserById(id)
  }

  update(id: string, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: string) {
    return `This action removes a #${id} auth`;
  }
}
