import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserReferralLinkDto } from './dto/user.referral-link.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  find(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findByEmail(email: string): Promise<User>{
    return this.userRepository.findOne({ email: email });
  }

  getReferralUrl(id: number): object {
    const dto = new UserReferralLinkDto()
    const token = Buffer.from(id.toString()).toString('base64')

    Object.assign(dto, { token })

    return dto
  }
}
