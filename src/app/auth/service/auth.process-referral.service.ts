import { Repository } from 'typeorm';
import { User } from '../../user/user.entity';
import { Injectable } from '@nestjs/common';

const REFERRAL_AMOUNT = 10
const REFERRAL_STACK_COUNT = 5

@Injectable()
export default class AuthProcessReferralService
{
  constructor(private userRepository: Repository<User>) {}

  async call(user: User): Promise<boolean> {
    if (!user.id) return false

    const referrer = await this.fetchUser(user.referrerId)

    if (referrer) {
      await this.processReferrer(referrer)
      await this.processReferee(user)
    }

    return true
  }

  protected async processReferrer(user: User) {
    this.increaseReferralCount(user)
    this.addReferralAmountPerStackCount(user)

    this.updateUser(user)
  }

  protected async processReferee(user: User) {
    this.addReferalAmount(user)

    this.updateUser(user)
  }

  protected async increaseReferralCount(user: User) {
    const referralCount = user.referralCount + 1

    Object.assign(user, { referralCount })
  }

  protected async addReferralAmountPerStackCount(user: User) {
    if (user.referralCount < REFERRAL_STACK_COUNT) return

    this.resetReferralCount(user)
    this.addReferalAmount(user)
  }

  protected async resetReferralCount(user: User) {
    const referralCount = 0

    Object.assign(user, { referralCount })
  }

  protected addReferalAmount(user: User) {
    const balance = user.balance + REFERRAL_AMOUNT

    Object.assign(user, { balance })
  }

  protected async updateUser(user) {
    await this.userRepository.save(user)
  }

  protected async fetchUser(id: number) {
    return await this.userRepository.findOne({ id })
  }
}
